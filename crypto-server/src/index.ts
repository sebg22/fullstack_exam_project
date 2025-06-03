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

  // 🔍 ADVANCED: Filtered list for /cryptocurrencies page
  app.get("/all_cryptos/filtered", async (req, res) => {
    try {
      const {
        top,
        price_range,
        gainers,
        losers,
        stablecoins,
        new: isNew,
        old: isOld, // ✅ use this name in the if-statement below
        page = "1",
        pageSize = "50",
      } = req.query;

      const repo = AppDataSource.getRepository(Crypto);
      const qb = repo.createQueryBuilder("crypto");

      // 🔝 Top Coins
      if (top) {
        qb.andWhere("crypto.market_cap_rank <= :top", { top: parseInt(top as string) });
      }

      // 💲 Price Range
      if (price_range === "under_1") {
        qb.andWhere("crypto.current_price < 1");
      } else if (price_range === "1_100") {
        qb.andWhere("crypto.current_price BETWEEN 1 AND 100");
      } else if (price_range === "above_100") {
        qb.andWhere("crypto.current_price > 100");
      }

      // 📈 Gainers / 📉 Losers
      if (gainers === "true") {
        qb.andWhere("crypto.price_change_percentage_24h > 0");
      } else if (losers === "true") {
        qb.andWhere("crypto.price_change_percentage_24h < 0");
      }

      // 🏦 Stablecoins
      if (stablecoins === "true") {
        qb.andWhere("crypto.is_stablecoin = true");
      }

      // 🆕 New (last 6 months)
      if (isNew === "true") {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        qb.andWhere("crypto.genesis_date IS NOT NULL AND crypto.genesis_date > :newDate", {
          newDate: sixMonthsAgo.toISOString().split("T")[0],
        });
      }

      // 🏛️ Old (over 5 years)
      if (isOld === "true") {
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
        qb.andWhere("crypto.genesis_date IS NOT NULL AND crypto.genesis_date < :oldDate", {
          oldDate: fiveYearsAgo.toISOString().split("T")[0],
        });
      }

      // 📄 Pagination
      const take = parseInt(pageSize as string) || 50;
      const skip = (parseInt(page as string) - 1) * take;

      const [cryptos, total] = await qb
        .select(["crypto.id", "crypto.image", "crypto.name", "crypto.symbol", "crypto.current_price", "crypto.price_change_percentage_24h", "crypto.market_cap", "crypto.total_volume", "crypto.circulating_supply"])
        .orderBy("crypto.market_cap", "DESC")
        .skip(skip)
        .take(take)
        .getManyAndCount();

      res.json({
        data: cryptos,
        total,
        page: parseInt(page as string),
        pageSize: take,
        totalPages: Math.ceil(total / take),
      });
    } catch (error) {
      console.error("Error with filtered cryptos:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
