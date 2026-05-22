const FriendInvitation = require("../models/friendInvitation.js");
const User = require("../models/users.js");
const serverStore = require("../serverStore.js");

const invite = async (req, res) => {
  try {
    const { targetMailAddress } = req.body;
    const { userId, mail } = req.user;

    if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
      return res.status(409).send("You cannot invite yourself");
    }

    const targetUser = await User.findOne({
      mail: targetMailAddress.toLowerCase(),
    });

    if (!targetUser) {
      return res.status(404).send("User not found");
    }

    const invitationAlreadyExists = await FriendInvitation.exists({
      senderId: userId,
      receiverId: targetUser._id,
    });

    if (invitationAlreadyExists) {
      return res.status(409).send("Invitation already sent");
    }

    const invitation = await FriendInvitation.create({
      senderId: userId,
      receiverId: targetUser._id,
    });

    const populatedInvitation = await invitation.populate("senderId", "username mail");
    const receiverSockets = serverStore.getActiveConnections({
      userId: targetUser._id,
    });
    const io = serverStore.getSocketServerInstance();

    if (io) {
      receiverSockets.forEach((socketId) => {
        io.to(socketId).emit("friend-invitation", populatedInvitation);
      });
    }

    return res.status(201).send("Invitation has been sent");
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

const getPendingInvitations = async (req, res) => {
  try {
    const { userId } = req.user;

    const invitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "username mail");

    return res.status(200).json({
      pendingInvitations: invitations,
    });
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

const emitFriendListUpdate = async (userId) => {
  const io = serverStore.getSocketServerInstance();

  if (!io) {
    return;
  }

  const user = await User.findById(userId).populate("friends", "username mail");

  if (!user) {
    return;
  }

  const receiverSockets = serverStore.getActiveConnections({
    userId,
  });

  receiverSockets.forEach((socketId) => {
    io.to(socketId).emit("friend-list-updated", user.friends);
  });
};

const accept = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(404).send("Invitation not found");
    }

    if (invitation.receiverId.toString() !== userId) {
      return res.status(403).send("You cannot accept this invitation");
    }

    const senderId = invitation.senderId;
    const receiverId = invitation.receiverId;

    await User.findByIdAndUpdate(senderId, {
      $addToSet: { friends: receiverId },
    });

    await User.findByIdAndUpdate(receiverId, {
      $addToSet: { friends: senderId },
    });

    await FriendInvitation.findByIdAndDelete(id);

    await emitFriendListUpdate(senderId);
    await emitFriendListUpdate(receiverId);

    return res.status(200).send("Invitation accepted");
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

const reject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(404).send("Invitation not found");
    }

    if (invitation.receiverId.toString() !== userId) {
      return res.status(403).send("You cannot reject this invitation");
    }

    await FriendInvitation.findByIdAndDelete(id);

    return res.status(200).send("Invitation rejected");
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

const getFriends = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).populate("friends", "username mail");

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json({
      friends: user.friends,
    });
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

module.exports = {
  invite,
  getPendingInvitations,
  accept,
  reject,
  getFriends,
};
