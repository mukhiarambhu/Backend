const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const path = require("path");

const sendMail = require("../utility/sendmail");
//to send email as attachmnet
const fs = require("fs");
//to send html file
var htmlstream = fs.createReadStream(path.join(__dirname, "../html/name.html"));

router.get("", async (req, res) => {
  const page = +req.query.page || 1;
  const size = +req.query.size || 10;

  const offset = (page - 1) * size;

  const totalUser = await User.find().count();
  const totalPage = Math.ceil(totalUser / size);

  var message = {
    from: "sender@server.com",
    to: "receiver@sender.com",
    subject: "Message title",
    text: "Hello ",
    html: htmlstream,
    attachments: [
      {
        filename: "name.txt",
        path: path.join(__dirname, "../attachments/name.txt"),
      },
    ],
  };

  sendMail(message);

  const user = await User.find().skip(offset).limit(size).lean().exec();
  res.send({ user, page, totalPage });
});

module.exports = router;
