const FriendInvitation = require("../models/friendInvitation.js");
const User = require("../models/users.js");

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

    await FriendInvitation.create({
      senderId: userId,
      receiverId: targetUser._id,
    });

    return res.status(201).send("Invitation has been sent");
  } catch (error) {
    return res.status(500).send("Something went wrong, please try again");
  }
};

module.exports = {
  invite,
};
