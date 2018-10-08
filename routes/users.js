const express = require("express");
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, inputSchema } = require("../models/User");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const debug = require("debug")("routers:users");

const router = express.Router();

router.get("/current", auth, async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-password");

  res.status(200).send(user);
});

router.get("/all", admin, async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).send(users);
});

router.post("/", async (req, res) => {
  const input = _.pick(req.body, Object.keys(inputSchema));
  await Joi.validate(input, inputSchema);
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(input.password, salt);
  const user = await new User({ ...input, password }).save();
  res.status(200).send("user successfully created");
});

module.exports = router;
