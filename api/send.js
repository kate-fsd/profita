const nodemailer = require("nodemailer");

export default async function  (request, response) {
  if (!request.url) return response.status(400);

  const { email } = request.body;

  if (!email) {
    return response.status(400).statusText('No email');
  }

  try {	   
    await nodemailer
      .createTransport({
        host: 'smtp.forwardemail.net',
        port: 465,
        secure: true,
        auth: {
          user: 'profita@mail.io',
          pass: 'jB4ym89kPxv1',
        },
      })
      .sendMail({
        from: '"Profita" <profita@mail.io>',
        to: 'profita@mail.io',
        subject: "Pitch deck",
        text: "Email: " + email,
      })

      return response.status(200);
  } catch (e) {
    console.error(e)
    return response.status(500).statusText(e.message);
  }
}
