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

  // Endpoint for specific coin by id
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
        top, // <-- no default here
        price_range,
        gainers,
        losers,
        stablecoins,
        new: isNew,
        old: isOld,
        page = "1",
        pageSize = "10",
      } = req.query;

      const repo = AppDataSource.getRepository(Crypto);
      const qb = repo.createQueryBuilder("crypto");

      // Only apply top filter if provided and > 0
      if (top !== undefined) {
        const topNum = parseInt(top as string);
        if (!isNaN(topNum) && topNum > 0) {
          qb.andWhere("crypto.market_cap_rank <= :top", { top: topNum });
        }
      }

      // Price range filters
      if (price_range === "under_1") {
        qb.andWhere("crypto.current_price < 1");
      } else if (price_range === "1_100") {
        qb.andWhere("crypto.current_price BETWEEN 1 AND 100");
      } else if (price_range === "above_100") {
        qb.andWhere("crypto.current_price > 100");
      }

      // Gainers / losers
      if (gainers === "true") {
        qb.andWhere("crypto.price_change_percentage_24h > 0");
      } else if (losers === "true") {
        qb.andWhere("crypto.price_change_percentage_24h < 0");
      }

      // Stablecoins
      if (stablecoins === "true") {
        qb.andWhere("crypto.is_stablecoin = true");
      }

      // New coins (last 6 months)
      if (isNew === "true") {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        qb.andWhere("crypto.genesis_date IS NOT NULL AND crypto.genesis_date > :newDate", {
          newDate: sixMonthsAgo.toISOString().split("T")[0],
        });
      }

      // Old coins (more than 5 years old)
      if (isOld === "true") {
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
        qb.andWhere("crypto.genesis_date IS NOT NULL AND crypto.genesis_date < :oldDate", {
          oldDate: fiveYearsAgo.toISOString().split("T")[0],
        });
      }

      // Pagination params
      const takeRaw = parseInt(pageSize as string);
      const pageRaw = parseInt(page as string);

      const take = !isNaN(takeRaw) && takeRaw > 0 && takeRaw <= 100 ? takeRaw : 10;
      const currentPage = !isNaN(pageRaw) && pageRaw > 0 ? pageRaw : 1;
      const skip = (currentPage - 1) * take;

      // Query with pagination & sorting
      const cryptos = await qb
        .select(["crypto.id", "crypto.image", "crypto.name", "crypto.symbol", "crypto.current_price", "crypto.price_change_percentage_24h", "crypto.market_cap", "crypto.total_volume", "crypto.circulating_supply"])
        .orderBy("crypto.market_cap", "DESC")
        .skip(skip)
        .take(take)
        .getMany();

      res.json({
        data: cryptos,
        pageSize: take,
        page: currentPage,
      });
    } catch (error) {
      console.error("Error with filtered cryptos:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
