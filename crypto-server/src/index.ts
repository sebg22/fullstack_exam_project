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
  app.get("/all_cryptos", async (req, res) => {
    try {
      // Henter limit-parameteren fra URL'en, så enten 10 eller undefined
      const limitParam = req.query.limit as string | undefined;
      // Hvis limitParam findes (altså ikke er undefined eller tom), så parser vi det som tal. Hvis limitParam ikke findes, så bliver limit sat til undefined
      const limit = limitParam ? parseInt(limitParam) : undefined;

      console.log("DETTE ER LIMIT", limit);

      const cryptos = await AppDataSource.getRepository(Crypto).find({
        take: limit,
        order: { market_cap: "DESC" },
        //Her definerer vi præcist de kolonner vi vil have retur fra databasen
        select: ["id", "image", "name", "symbol", "current_price", "price_change_percentage_24h", "market_cap", "total_volume", "circulating_supply"],
      });

      res.json(cryptos);
    } catch (error) {
      console.error("Error fetching cryptos:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  //endpoint for specific coin by id
  app.get("/coins/:id", async (req, res) => {
    try {
      const id = req.params.id;

      const crypto = await AppDataSource.getRepository(Crypto).findOne({
        where: { id },
        select: [
          "id",
          "name",
          "symbol",
          "image",
          "current_price",
          "price_change_percentage_24h",
          "description",
          "market_cap",
          "fdv",
          "circulating_supply",
          "total_supply",
          "max_supply",
          "ath",
          "market_cap_rank",
          "total_volume",
          "price_change_percentage_1y",
        ],
      });

      res.json(crypto);
    } catch (error) {
      console.error("Error fetching crypto by id:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
