import nodemailer from 'nodemailer';

const now = new Date();
console.log(now);

function date(classes,subject,then,contact,type) {
    let email;
    if(type == "tmobile"){
        email = contact + "@tmomail.net";
    }
    else if (type == "verizon"){
        email = contact + "@vtext.com";
    }
    else if (type == "att"){
        email = contact + "@txt.att.net";
    }
    else if (type == "sprint"){
        email = contact + "@pm.sprint.com";
    }
    else{
        email = contact;
    }
    const thens = new Date(then);
    let days = Math.floor(daysBetween(now,thens));
    if(((daysBetween(now,thens) == 7) | ((daysBetween(now,thens) == 1)) ){
        sendEmail(email,'StudyCues',`You have your ${subject} test in ${classes} coming up in ${days} days.`)
    }
}
function daysBetween(date1, date2) {
        // Calculate difference in milliseconds
        const diffInMs = date2 - date1;
        // Convert milliseconds to days
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays;
  }

  // Function to send an email
async function sendEmail(recipient, subject, messageBody) {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service
      auth: {
        user: "ericfromsquidgames@gmail.com",
        pass:"oguriixdmrstltco",
      },
    });
  
    // Setup email data
    let mailOptions = {
      from: "ericfromsquidgames@gmail.com",
      to: recipient,
      subject: subject,
      text: messageBody,
    };
  
    try {
      // Send email
      let info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      // Handle the error properly
      if (error instanceof Error) {
        console.error('Error sending email: ' + error.message);
      } else {
        console.error('Unknown error occurred while sending email');
      }
    }
  }
  date('history',"voting","2024-09-08T21:40:47.956Z","colinjenn123@gmail.com","email")