const express = require("express");
const auth = require("../middleware/auth.js");
const {
  getDirectMessagesHistory,
  getUnreadMessages,
} = require("../controllers/messageController.js");

const router = express.Router();

router.get("/direct/:receiverUserId", auth, getDirectMessagesHistory);
router.get("/unread", auth, getUnreadMessages);

module.exports = router;
