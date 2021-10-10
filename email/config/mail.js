const nodemailer = require("nodemailer");
require("dotenv").config(); // install dotenv package and to get all varible of .env use this
const { CURRENT_ENVIRONMENT, SMTP_PASSWORD, SMTP_USERNAME, HOSTNAME } =
  process.env;

const transporter = nodemailer.createTransport({
  host: CURRENT_ENVIRONMENT == "development" ? HOSTNAME : "",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

//export transporter to controller
module.exports = transporter;
