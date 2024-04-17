import express from "express";
import cors from "cors";
import dotenv from "dotenv";


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
const port = process.env.PORT;

app.get("/", (req, res) => res.status(200).send({message: "Mailer app is running!"}));
app.get("/status", (req, res) => res.status(200).send({ status: "ok" }));

app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app;