const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "venturevilla.in@gmail.com", // Your Gmail address
    pass: "qmpltgsxoflstjea",         // Your app password
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates
  },
});

const mailOption = (email, verificationlink) => ({
  from: {
    name: "Harkirat",
    address: "venturevilla.in@gmail.com", // Correct email format
  },
  to: email, // List of receivers
  subject: "Verification Link", // Subject line
  text: "Hello! Please use the link below to verify your account.",
  html: `<b>Verification Link: <a href="${verificationlink}">${verificationlink}</a></b>`, // Make the link clickable in the email
});

const sendMail = async (email, verificationlink) => {
  try {
    const info = await transporter.sendMail(mailOption(email, verificationlink));
    console.log("Email sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = {
  sendMail,
};
