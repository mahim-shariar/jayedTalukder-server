const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create reusable transporter object
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // For services that don't have valid SSL certs
      rejectUnauthorized: false,
    },
  });

  // Email content
  const message = {
    from: `Video Editor Portfolio <${process.env.SMTP_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html (for HTML emails)
  };

  // Send email
  try {
    await transporter.sendMail(message);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
