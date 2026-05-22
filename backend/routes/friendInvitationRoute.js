const express = require("express");
const joi = require("joi");
const validation = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth.js");
const { invite } = require("../controllers/friendInvitationController.js");

const router = express.Router();

const inviteSchema = joi.object({
  targetMailAddress: joi.string().email().required(),
});

router.post("/invite", auth, validation.body(inviteSchema), invite);

module.exports = router;
