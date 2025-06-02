import express from "express";
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

  // POST /signup
  app.post("/signup", async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;

      if (!name || !lastName || !email || !password) {
        res.status(400).json({ error: "All fields are required." });
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
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required." });
        return;
      }

      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ email });

      if (!user) {
        res.status(401).json({ error: "Invalid credentials." });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
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

  // Start server
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
