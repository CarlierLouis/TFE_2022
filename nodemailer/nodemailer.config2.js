const nodemailer = require("nodemailer");

const user = process.env.EMAIL;
const pass = process.env.PASS;

const transport = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: user,
    pass: pass,
  },
});

sendLostedPasswordEmail = (firstname, email, usertype, confirmationCode) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Veillez confirmez votre email",
      html: `<h1>Email de confirmation</h1>
          <h2>Bonjour ${firstname}</h2>
          <p>Vous avez oublié votre mot de passe ?<br></br> 
          Cliquez sur le lien suivant afin d'en créer un nouveau</p>
          <a href=${process.env.REACT_APP_FRONTEND_URL}/${usertype}/mot-de-passe-oublie/${confirmationCode}> Cliquez ici</a>
          </div>`
    }).catch(err => console.log(err));
  };


module.exports.sendLostedPasswordEmail = sendLostedPasswordEmail;