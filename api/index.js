import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Express app and configs
const app = express();
dotenv.config();

// Express middlewares
app.use(express.json());
app.use(cors());

// Environment variables
const port = process.env.PORT;
const username = process.env.USER;
const password = process.env.PASS;
const to = process.env.RECEIVER || 'iyanuajimobi12@gmail.com';

// Nodemailer transporter
const createTransporter = ({
  user = username,
  pass = password,
  host,
  port,
  type = 'gmail',
}) => {
  if (type === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });
  } else {
    return nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: {
        user,
        pass,
      },
    });
  }
};

// App route to test if the app is running
app.get('/', (_, res) =>
  res.status(200).send({ message: 'Mailer app is running!' })
);

// App route to check status of the app
app.get('/status', (_, res) =>
  res.status(200).send({ status: 'ok', timestamp: new Date(), emote: '🚀' })
);

// App route to send an email
app.post('/send', async (req, res) => {
  let { sender, subject, messageBody, name, to, config } = req.body;
  const { user, pass, host, port, type } = config || {};

  if (!sender || !subject || !messageBody) {
    return res.status(400).send({ message: 'Missing required fields.' });
  }

  if (!name) {
    messageBody = messageBody;
  } else {
    messageBody = `New Message from ${name},\n\n${messageBody}`;
  }

  console.log(req.body);

  try {
    const transporter = createTransporter({ user, pass, host, port, type });
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
        return res.status(400).send({ message: 'Invalid configuration.' });
      }
    });

    const mailOptions = {
      from: user,
      to,
      cc: sender,
      subject: subject,
      text: messageBody,
    };
    const info = await transporter.sendMail(mailOptions);
    transporter.close();
    return res
      .status(200)
      .send({ message: 'Email sent.', messageId: info.messageId });
  } catch (error) {
    return res.status(500).send({ message: 'Internal server error.' });
  }
});

// Initialize the server
app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app;