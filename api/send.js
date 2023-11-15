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
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'profita.mail@gmail.com',
          pass: 'kkbp uwjz fhia zbze',
        },
      })
      .sendMail({
        from: '"Profita" <hello@profita.io>',
        to: 'profita.mail@gmail.com',
        subject: "Pitch deck",
        text: "Email: " + email,
      })

      return response.status(200);
  } catch (e) {
    console.error(e)
    return response.status(500).statusText(e.message);
  }
}
