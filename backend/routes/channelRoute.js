const express = require("express");
const auth = require("../middleware/auth.js");
const {
  createChannel,
  getChannelMessages,
  getChannels,
  joinChannel,
  leaveChannel,
} = require("../controllers/channelController.js");

const router = express.Router();

router.get("/", auth, getChannels);
router.post("/", auth, createChannel);
router.post("/:channelId/join", auth, joinChannel);
router.post("/:channelId/leave", auth, leaveChannel);
router.get("/:channelId/messages", auth, getChannelMessages);

module.exports = router;
