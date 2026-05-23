const Channel = require("../models/channel.js");
const ChannelMessage = require("../models/channelMessage.js");
const serverStore = require("../serverStore.js");
const {
  formatChannelMessage,
  isChannelMember,
} = require("../controllers/channelController.js");

const channelMessageHandler = async (socket, io, data) => {
  const { channelId, content } = data;

  if (!channelId || !content?.trim()) {
    return;
  }

  const channel = await Channel.findById(channelId);

  if (!channel || !isChannelMember(channel, socket.user.userId)) {
    return;
  }

  const savedMessage = await ChannelMessage.create({
    channelId,
    senderUserId: socket.user.userId,
    content,
  });

  const populatedMessage = await savedMessage.populate("senderUserId", "username");

  const message = formatChannelMessage(populatedMessage);
  const memberSocketIds = new Set();

  channel.members.forEach((memberId) => {
    serverStore.getActiveConnections({ userId: memberId }).forEach((socketId) => {
      memberSocketIds.add(socketId);
    });
  });

  memberSocketIds.forEach((socketId) => {
    io.to(socketId).emit("channel-message", message);
  });
};

module.exports = channelMessageHandler;
