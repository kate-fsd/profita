const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "profita.mail@gmail.com",
    pass: "kkbp uwjz fhia zbze",
  },
});

export default async function (request, response) {
  const { email } = request.body;

  if (!email) {
    return response.status(400).statusText("No email");
  }

  try {
    const info = await transporter.sendMail({
      from: '"Profita" <hello@profita.io>',
      to: "profita.mail@gmail.com",
      subject: "Pitch deck",
      text: "Email: " + email,
    });

    return response.status(200).json({ id: info.messageId });
  } catch (e) {
    console.error(e);
    return response.status(500).statusText(e.message);
  }
}
