const express = require("express");
const auth = require("../middleware/auth.js");
const {
  getDirectMessagesHistory,
} = require("../controllers/messageController.js");

const router = express.Router();

router.get("/direct/:receiverUserId", auth, getDirectMessagesHistory);

module.exports = router;
