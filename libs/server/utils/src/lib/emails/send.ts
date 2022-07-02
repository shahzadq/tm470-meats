import { createTransport } from 'nodemailer';

export async function sendMail(
  from: string,
  to: string,
  subject: string,
  html: string
) {
  const transporter = createTransport({
    host: process.env.EMAIL_HOST as string,
    port: process.env.EMAIL_PORT as string,
    auth: {
      user: process.env.EMAIL_AUTH_USER as string,
      pass: process.env.EMAIL_AUTH_PASS as string,
    },
  } as any);

  const mailOptions = {
    from: from + '@tm470-meats.com',
    to: to,
    subject: subject + ' - TM470 MEATS DEMO',
    text: html,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return false;
    } else {
      console.log('Email Info: ' + info.response);
      return true;
    }
  });
}
