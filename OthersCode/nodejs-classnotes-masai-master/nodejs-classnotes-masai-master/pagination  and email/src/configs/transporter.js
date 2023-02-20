const nodemailer = require("nodemailer");


module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "16f7c912201194",
      pass: "422374fda06c7f"
    }
  });