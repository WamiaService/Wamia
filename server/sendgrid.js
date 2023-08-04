const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key here
const sendgridApiKey = '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';
sgMail.setApiKey(sendgridApiKey);

const sendConfirmationEmail = async (email, activationCode) => {
  try {
    const msg = {
      to: email,
      from: 'aymensaidany@gmail.com', // Use your verified sender email address
      subject: 'Confirm account',
      html: `<div><h1>Email de Confirmation</h1>
      <a href=http://192.168.11.127:3000/confirmer/${activationCode}> click ici </a>
      </div>`,
    };
    await sgMail.send(msg);
    console.log('Confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};



module.exports = {
  sendConfirmationEmail,
};