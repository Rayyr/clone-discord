const Channel = require("../models/channel.js");
const ChannelMessage = require("../models/channelMessage.js");
const serverStore = require("../serverStore.js");

const isChannelMember = (channel, userId) =>
  channel.members?.some((memberId) => memberId.toString() === userId.toString());

const formatChannel = (channel, userId) => ({
  id: channel._id.toString(),
  name: channel.name,
  creatorUserId: channel.creatorUserId.toString(),
  members: channel.members?.map((memberId) => memberId.toString()) || [],
  isMember: userId ? isChannelMember(channel, userId) : false,
});

const formatChannelMessage = (message) => ({
  id: message._id.toString(),
  channelId: message.channelId.toString(),
  senderUserId: message.senderUserId._id
    ? message.senderUserId._id.toString()
    : message.senderUserId.toString(),
  senderUsername: message.senderUserId.username,
  content: message.content,
  date: message.createdAt,
});

const getChannels = async (req, res) => {
  try {
    const { userId } = req.user;
    const channels = await Channel.find().sort({ createdAt: 1 });

    return res.status(200).json({
      channels: channels.map((channel) => formatChannel(channel, userId)),
    });
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

const createChannel = async (req, res) => {
  try {
    const { name } = req.body;
    const { userId } = req.user;
    const normalizedName = name?.trim().toLowerCase().replace(/\s+/g, "-");

    if (!normalizedName || normalizedName.length < 2 || normalizedName.length > 32) {
      return res.status(400).send("Channel name must be between 2 and 32 characters");
    }

    const existingChannel = await Channel.findOne({ name: normalizedName });

    if (existingChannel) {
      return res.status(409).send("Channel already exists");
    }

    const channel = await Channel.create({
      name: normalizedName,
      creatorUserId: userId,
      members: [userId],
    });

    const formattedChannel = formatChannel(channel, userId);
    serverStore.getSocketServerInstance()?.emit("channel-created", formatChannel(channel));

    return res.status(201).json({
      channel: formattedChannel,
    });
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

const getChannelMessages = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { userId } = req.user;

    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).send("Channel not found");
    }

    if (!isChannelMember(channel, userId)) {
      return res.status(403).send("Join this channel to read messages");
    }

    const messages = await ChannelMessage.find({ channelId })
      .populate("senderUserId", "username")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      messages: messages.map(formatChannelMessage),
    });
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

const joinChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { userId } = req.user;

    const channel = await Channel.findByIdAndUpdate(
      channelId,
      { $addToSet: { members: userId } },
      { new: true }
    );

    if (!channel) {
      return res.status(404).send("Channel not found");
    }

    return res.status(200).json({
      channel: formatChannel(channel, userId),
    });
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

const leaveChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { userId } = req.user;

    const channel = await Channel.findByIdAndUpdate(
      channelId,
      { $pull: { members: userId } },
      { new: true }
    );

    if (!channel) {
      return res.status(404).send("Channel not found");
    }

    return res.status(200).json({
      channel: formatChannel(channel, userId),
    });
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

module.exports = {
  getChannels,
  createChannel,
  getChannelMessages,
  joinChannel,
  leaveChannel,
  formatChannelMessage,
  isChannelMember,
};
