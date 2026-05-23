const mongoose = require("mongoose");

const channelMessageSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  senderUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("ChannelMessage", channelMessageSchema);
