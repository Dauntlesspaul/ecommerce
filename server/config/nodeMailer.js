const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port:465,
  secure:true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

async function main(user, subject, text ) {
  const info = await transporter.sendMail({
    from: `"Shoe haven" <${process.env.GMAIL_USER}>`, 
    to: user, 
    subject: subject, 
    text: text, 
  });
}

module.exports = main;
