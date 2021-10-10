const transporter = require("../config/mail");
const path = require("path");
const sendMail = ({ from, to, text, subject, html, filename, path }) => {
  var message = {
    from: from,
    to: to,
    text: text,
    subject: subject,
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
