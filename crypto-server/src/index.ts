import express from "express";
import cors from "cors";
import { AppDataSource } from "./ormconfig";
import { Crypto } from "./entities/Crypto";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log("Connected to DB");

  // Get  10 or all cryptos
  app.get("/cryptos", async (req, res) => {
    try {
      // Henter limit-parameteren fra URL'en, så enten 10 eller undefined
      const limitParam = req.query.limit as string | undefined;
      // Hvis limitParam findes (altså ikke er undefined eller tom), så parser vi det som tal. Hvis limitParam ikke findes, så bliver limit sat til undefined
      const limit = limitParam ? parseInt(limitParam) : undefined;

      console.log("DETTE ER LIMIT", limit);

      const cryptos = await AppDataSource.getRepository(Crypto).find({
        take: limit,
        order: { market_cap: "DESC" },
      });

      res.json(cryptos);
    } catch (error) {
      console.error("Error fetching cryptos:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
