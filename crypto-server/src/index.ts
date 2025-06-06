import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./ormconfig";
import { Crypto } from "./entities/Crypto";
import { User } from "./entities/User";
import session from "express-session";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

declare module "express-session" {
  interface SessionData {
    userId?: string | number;
  }
}

interface CustomRequest extends Request {
  session: session.Session & {
    userId?: string | number;
  };
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true if using HTTPS
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

AppDataSource.initialize().then(() => {
  console.log("Connected to DB");

  // POST /signup
  app.post("/signup", async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, lastName, email, password } = req.body;

      if (!name || !lastName || !email || !password) {
        res.status(400).json({ error: "All fields are required." });
        return;
      }

      // Regexes
      const nameRegex = /^[A-Za-zæøåÆØÅ\s'-]{2,20}$/;
      const lastNameRegex = /^[A-Za-zæøåÆØÅ\s'-]{2,50}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^.{6,}$/;

      // input validation
      const errors: Record<string, string> = {};

      if (!nameRegex.test(name)) {
        errors.name = "First name must only contain letters and be between 2 and 20 characters.";
      }
      if (!lastNameRegex.test(lastName)) {
        errors.lastName = "Last name must only contain letters and be between 2 and 20 characters.";
      }
      if (!emailRegex.test(email)) {
        errors.email = "Invalid email format.";
      }
      if (!passwordRegex.test(password)) {
        errors.password = "Password must be at least 8 characters and contain letters and numbers.";
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const userRepo = AppDataSource.getRepository(User);
      const existingUser = await userRepo.findOneBy({ email });

      if (existingUser) {
        res.status(409).json({ error: "Email already in use." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepo.create({
        name,
        last_name: lastName,
        email,
        password: hashedPassword,
      });

      await userRepo.save(newUser);

      res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ error: "Something went wrong." });
    }
  });

  // POST /login
  app.post("/login", async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required." });
        return;
      }

      // Regexes
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^.{6,}$/;

      // input validation
      const errors: Record<string, string> = {};
      if (!emailRegex.test(email)) {
        errors.email = "Invalid email format.";
      }
      if (!passwordRegex.test(password)) {
        errors.password = "Password must be at least 8 characters and contain letters and numbers.";
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ email });

      if (!user) {
        res.status(401).json({ error: "Invalid credentials." });
        return;
      }

      if (user.is_deleted) {
        res.status(403).json({ error: "Account is deleted." });
        return;
      }

      if (user.is_blocked) {
        res.status(403).json({ error: "Account is blocked." });
        return;
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        res.status(401).json({ error: "Invalid credentials." });
        return;
      }

      req.session.userId = user.id;

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      // DEBUG: log what's inside the session
      console.log("Session after login:", req.session);
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Something went wrong." });
    }
  });

  // GET /me
  app.get("/me", (req, res) => {
    if (req.session.userId) {
      res.json({ userId: req.session.userId });
    } else {
      res.status(401).json({ error: "Not logged in." });
    }
  });

  // POST /logout
  app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed." });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully." });
    });
  });

  // PUT /profile
  app.put("/profile", async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.session.userId;

    if (!userId) {
      res.status(401).json({ error: "Not authenticated." });
      return;
    }

    const { name, lastName, email } = req.body;

    // Regexes
    const nameRegex = /^[A-Za-zæøåÆØÅ\s'-]{2,20}$/;
    const lastNameRegex = /^[A-Za-zæøåÆØÅ\s'-]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // input validation
    const errors: Record<string, string> = {};

    if (!nameRegex.test(name)) {
      errors.name = "First name must only contain letters and be between 2 and 20 characters.";
    }
    if (!lastNameRegex.test(lastName)) {
      errors.lastName = "Last name must only contain letters and be between 2 and 20 characters.";
    }
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ errors });
      return;
    }

    if (!name && !lastName && !email) {
      res.status(400).json({ error: "No fields to update." });
      return;
    }

    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ id: String(userId) });

      if (!user) {
        res.status(404).json({ error: "User not found." });
        return;
      }

      if (name) user.name = name;
      if (lastName) user.last_name = lastName;
      if (email) user.email = email;

      await userRepo.save(user);

      res.json({ id: user.id, email: user.email, name: user.name });
    } catch (err) {
      console.error("Profile update error:", err);
      res.status(500).json({ error: "Failed to update profile." });
    }
  });

  // GET /user/:id - returns full profile info
  app.get("/user/:id", async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const user = await AppDataSource.getRepository(User).findOneBy({ id: req.params.id });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json({
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      console.error("Error fetching user:", err);
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
          "chart_data",
        ],
      });

      res.json(crypto);
    } catch (error) {
      console.error("Error fetching crypto by id:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  // 🔍 ADVANCED: Filtered list for /cryptocurrencies page
  app.get("/cryptos/filtered", async (req, res) => {
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
        .select(["crypto.id", "crypto.image", "crypto.name", "crypto.symbol", "crypto.current_price", "crypto.price_change_percentage_24h", "crypto.market_cap", "crypto.total_volume", "crypto.circulating_supply", "crypto.chart_data"])
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

  // GET /admin/users - only accessible by admin
  app.get("/admin/users", async (req: CustomRequest, res: Response) => {
    const userRepo = AppDataSource.getRepository(User);

    const currentUser = await userRepo.findOneBy({ id: String(req.session.userId) });

    if (!currentUser || currentUser.role !== "admin") {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    const users = await userRepo.find();
    res.json(users);
  });

  // BLOCK user
  app.patch("/admin/block/:id", async (req: CustomRequest, res: Response) => {
    const userId = req.session.userId;
    const adminUser = await AppDataSource.getRepository(User).findOneBy({ id: String(userId) });

    if (!adminUser || adminUser.role !== "admin") {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    const targetUser = await AppDataSource.getRepository(User).findOneBy({ id: req.params.id });
    if (!targetUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    targetUser.is_blocked = true;
    await AppDataSource.getRepository(User).save(targetUser);

    res.json({ message: "User blocked" });
  });

  // UNBLOCK user
  app.patch("/admin/unblock/:id", async (req: CustomRequest, res: Response) => {
    const userId = req.session.userId;
    const adminUser = await AppDataSource.getRepository(User).findOneBy({ id: String(userId) });

    if (!adminUser || adminUser.role !== "admin") {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    const targetUser = await AppDataSource.getRepository(User).findOneBy({ id: req.params.id });
    if (!targetUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    targetUser.is_blocked = false;
    await AppDataSource.getRepository(User).save(targetUser);

    res.json({ message: "User unblocked" });
  });

  // SOFT DELETE user
  app.patch("/admin/delete/:id", async (req: CustomRequest, res: Response) => {
    const userId = req.session.userId;
    const adminUser = await AppDataSource.getRepository(User).findOneBy({ id: String(userId) });

    if (!adminUser || adminUser.role !== "admin") {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    const targetUser = await AppDataSource.getRepository(User).findOneBy({ id: req.params.id });
    if (!targetUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    targetUser.is_deleted = true;
    await AppDataSource.getRepository(User).save(targetUser);

    res.json({ message: "User soft deleted" });
  });

  // Add coin to favorites
  app.post("/favorites/:coinId", async (req: CustomRequest, res: Response) => {
    const userId = req.session.userId;
    const coinId = req.params.coinId;

    if (!userId) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({
        where: { id: String(userId) },
        relations: ["favoriteCoins"],
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const coinRepo = AppDataSource.getRepository(Crypto);
      const coin = await coinRepo.findOneBy({ id: coinId });

      if (!coin) {
        res.status(404).json({ error: "Coin not found" });
        return;
      }

      const alreadyFavorited = user.favoriteCoins.some((c) => c.id === coin.id);

      if (!alreadyFavorited) {
        user.favoriteCoins.push(coin);
        await userRepo.save(user);
      }

      res.json({ message: "Coin added to favorites" });
    } catch (err) {
      console.error("Error adding favorite:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  // get user's favorite coins
  app.get("/favorites", async (req: CustomRequest, res: Response) => {
    const userId = req.session.userId;

    if (!userId) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: { id: String(userId) },
        relations: ["favoriteCoins"],
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // map to just the fields used in CryptoData
      const simplifiedFavorites = user.favoriteCoins.map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        current_price: coin.current_price,
        market_cap: coin.market_cap,
        total_volume: coin.total_volume,
        circulating_supply: coin.circulating_supply,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        chart_data: coin.chart_data,
      }));

      res.json(simplifiedFavorites);
    } catch (err) {
      console.error("Error fetching favorites:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  // Remove coin from favorites
  app.delete("/favorites/:coinId", async (req: CustomRequest, res: Response) => {
    const userId = req.session.userId;
    const coinId = req.params.coinId;

    if (!userId) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({
        where: { id: String(userId) },
        relations: ["favoriteCoins"],
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      user.favoriteCoins = user.favoriteCoins.filter((coin) => coin.id !== coinId);

      await userRepo.save(user);

      res.json({ message: "Coin removed from favorites" });
    } catch (err) {
      console.error("Error removing favorite:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
