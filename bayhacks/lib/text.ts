const nodemailer = require('nodemailer');

async function sendEmail(recipient:any, subject:any, messageBody:any) {
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
      user: 'ericfromsquidgames@gmail.com',
      pass: 'honogilltwjmvynf'
    }
  });

  // Setup email data
  let mailOptions = {
    from: 'ericfromsquidgames@gmail.com',
    to: recipient,
    subject: subject,
    text: messageBody
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ' + error.message);
  }
}
