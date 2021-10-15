const transporter = require("../config/mail");
const path = require("path");
const { send } = require("process");

const sendMail = ({ from, to, subject, text, html, filename, path }) => {
  var message = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
    attachments: [
      {
        filename: filename,
        path: path,
      },
    ],
  };
  transporter.sendMail(message);
};

module.exports = sendMail;
