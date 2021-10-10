const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

router.get("", async (req, res) => {
  const page = +req.query.page || 1; // we nedd to create var page and size we want to diaplay 1 is set as default
  const size = +req.query.size || 10; //10 is set as default

  const offset = (page - 1) * size;
  // when page is 1 it will give 10 items
  //when page is 2 it will skip 10 and give next 10 items
  const user = await User.find({ gender: { $eq: "Female" } }) // we can find any data
    .skip(offset)
    .limit(size)
    .lean()
    .exec();

  //to send total pages

  const totalUserCount = await User.find().countDocuments();

  const totalPages = Math.ceil(totalUserCount / size);

  return res.status(200).send({ user, totalPages });
});
//export router to server.js

module.exports = router;
