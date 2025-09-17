import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { name, email, phone, service, date, time, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: "Nouvelle réservation",
    text: `
📩 Réservation reçue :

- Nom : ${name}
- Email : ${email}
- Téléphone : ${phone}
- Service : ${service}
- Date : ${date}
- Heure : ${time}
- Message : ${message || "Aucun message"}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email envoyé avec succès ✅" });
  } catch (error) {
    console.error("Erreur email :", error);
    res.status(500).json({ error: "Échec de l’envoi de l’email" });
  }
}