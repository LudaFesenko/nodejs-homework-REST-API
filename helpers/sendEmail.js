const nodemailer = require("nodemailer");
// require("dotenv").config();

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const configOptions = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(configOptions);

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };

  await transporter.sendMail(email);

  return true;
};

module.exports = sendEmail;