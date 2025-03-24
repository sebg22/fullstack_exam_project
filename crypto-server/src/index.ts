import express from "express";
import cors from "cors";
import { AppDataSource } from "./ormconfig";
import { User } from "./entities/User";
import { Crypto } from "./entities/Crypto";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log("Connected to DB");

  // DELETE AT SOME POINT: Get all users
  app.get("/users", async (_, res) => {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
  });

  // DELETE AT SOME POINT: Create a new user
  app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    const user = AppDataSource.getRepository(User).create({ name, email });
    await AppDataSource.getRepository(User).save(user);
    res.status(201).json(user);
  });

  // Get all users
  app.get("/cryptos", async (_, res) => {
    try {
      const cryptos = await AppDataSource.getRepository(Crypto).find();
      if (!cryptos) {
        res.status(404).json({ message: "No cryptocurrencies found." });
      } else {
        res.json(cryptos);
      }
    } catch (error) {
      console.error("Error fetching cryptos:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
