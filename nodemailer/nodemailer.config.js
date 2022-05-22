const nodemailer = require("nodemailer");

const user = process.env.EMAIL;
const pass = process.env.PASS;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (firstname, email, usertype, confirmationCode) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Veillez confirmez votre email",
      html: `<h1>Email de confirmation</h1>
          <h2>Bonjour ${firstname}</h2>
          <p>Merci pour votre inscription. Veuillez confirmer votre email en cliquant sur le lien suivant</p>
          <a href=${process.env.REACT_APP_FRONTEND_URL}/${usertype}/email-confirmation/${confirmationCode}> Cliquez ici</a>
          </div>`,
    }).catch(err => console.log(err));
  };