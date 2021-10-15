const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const { CURRENT_ENVIRONMENT, SMTP_USERNAME, SMTP_PASSWORD, HOST } = process.env;
const transporter = nodemailer.createTransport({
  host: CURRENT_ENVIRONMENT == "development" ? HOST : "",
  port: 587,
  secure: false,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});
module.exports = transporter;
