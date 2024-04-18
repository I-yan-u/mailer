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
const user = process.env.USER;
const pass = process.env.PASS;
const to = process.env.RECEIVER || 'iyanuajimobi12@gmail.com';

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user,
        pass,
    },
});

// App route to test if the app is running
app.get("/", (_, res) => res.status(200).send({message: "Mailer app is running!"}));

// App route to check status of the app
app.get("/status", (_, res) => res.status(200).send({ status: "ok", timestamp: new Date(), 'emote': '🚀'}));

// App route to send an email
app.post("/send", async (req, res) => {
    const { sender, subject, text, name } = req.body;

    if (!sender || !subject || !text) {
        return res.status(400).send({ message: "Missing required fields." });
    }

    if (name) {
        text = `New Message from ${name},\n\n${text}`;
    } else {
        text = text;
    }
    try{
        const mailOptions = {
            from: user,
            to,
            cc: sender,
            subject: subject,
            text: text
        };
        const info = await transporter.sendMail(mailOptions);
        return res.status(200).send({ message: "Email sent.", messageId: info.messageId });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error." });
    }
});

// Initialize the server
app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app;