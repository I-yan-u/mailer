import express from "express";
import cors from "cors";
import dotenv from "dotenv";


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
const port = process.env.PORT;

app.get("/", (req, res) => res.send("Mailer app is running!"));

app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app;