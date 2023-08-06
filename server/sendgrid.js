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
      <a href=http://192.168.1.7:3000/confirmer/${activationCode}> click ici </a>
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
