const nodemailer = require("nodemailer");

const user = process.env.EMAIL;
const pass = process.env.PASS;

const transport = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: user,
    pass: pass,
  },
pool: true,
maxConnections: 1,
});


async function sendAnnouncementEmail(mailList, annonce, school) {
    mailList.forEach(async function (to, i, array) {
        
    
    var msg = {
      from: user,
      subject: "Nouvelle annonce !",
      html: `<h1>Une nouvelle annonce vous concernant vient d'être postée</h1>
          <h2>Bonjour,</h2>
          <p>Une nouvelle annonce vient d'être postée, vous la trouverez dans la partie dédiée de votre espace personnel.</p>
          <p>→ ${annonce} ...</p>
          <a href=${process.env.REACT_APP_FRONTEND_URL}/${school}> Cliquez ici</a>
          </div>`
    };

    msg.to = to;

    await transport.sendMail(msg, err => console.log(err))
    });
  };
  

  module.exports.sendAnnouncementEmail = sendAnnouncementEmail;