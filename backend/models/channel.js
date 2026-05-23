const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 2,
    maxlength: 32,
  },
  creatorUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Channel", channelSchema);
