const express = require("express");
const router = express.Router();
const sendMail = require("../utility/sendmail");
const path = require("path");

router.get("", async (req, res) => {
  sendMail({
    from: "sender@server.com",
    to: "receiver@sender.com",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>",
    attachments: [
      {
        filename: "name.txt",
        path: path.join(__dirname, "../files/name.txt"),
      },
    ],
  });
  res.send("mail sent");
});

module.exports = router;
