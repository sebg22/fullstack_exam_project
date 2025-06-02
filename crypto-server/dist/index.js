"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const ormconfig_1 = require("./ormconfig");
const Crypto_1 = require("./entities/Crypto");
const User_1 = require("./entities/User");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax",
    },
}));
ormconfig_1.AppDataSource.initialize().then(() => {
    console.log("Connected to DB");
    app.get("/all_cryptos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const limitParam = req.query.limit;
            const limit = limitParam ? parseInt(limitParam) : undefined;
            const cryptos = yield ormconfig_1.AppDataSource.getRepository(Crypto_1.Crypto).find({
                take: limit,
                order: { market_cap: "DESC" },
                select: [
                    "id",
                    "image",
                    "name",
                    "symbol",
                    "current_price",
                    "price_change_percentage_24h",
                    "market_cap",
                    "total_volume",
                    "circulating_supply",
                ],
            });
            res.json(cryptos);
        }
        catch (error) {
            console.error("Error fetching cryptos:", error);
            res.status(500).json({ error: "Something went wrong" });
        }
    }));
    app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, lastName, email, password } = req.body;
            if (!name || !lastName || !email || !password) {
                return res.status(400).json({ error: "All fields are required." });
            }
            const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
            const existingUser = yield userRepo.findOneBy({ email });
            if (existingUser) {
                return res.status(409).json({ error: "Email already in use." });
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = userRepo.create({
                name,
                last_name: lastName,
                email,
                password: hashedPassword,
            });
            yield userRepo.save(newUser);
            res.status(201).json({ message: "User created successfully!" });
        }
        catch (err) {
            console.error("Signup error:", err);
            res.status(500).json({ error: "Something went wrong." });
        }
    }));
    app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required." });
            }
            const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
            const user = yield userRepo.findOneBy({ email });
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                return res.status(401).json({ error: "Invalid credentials." });
            }
            req.session.userId = user.id;
            res.json({ id: user.id, email: user.email, name: user.name });
        }
        catch (err) {
            console.error("Login error:", err);
            res.status(500).json({ error: "Something went wrong." });
        }
    }));
    // ✅ FIXED: /profile with typed req.session
    app.put("/profile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ error: "Not authenticated." });
        }
        const { name, lastName, email } = req.body;
        if (!name && !lastName && !email) {
            return res.status(400).json({ error: "No fields to update." });
        }
        try {
            const userRepo = ormconfig_1.AppDataSource.getRepository(User_1.User);
            const user = yield userRepo.findOneBy({ id: String(userId) });
            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }
            if (name)
                user.name = name;
            if (lastName)
                user.last_name = lastName;
            if (email)
                user.email = email;
            yield userRepo.save(user);
            res.json({ id: user.id, email: user.email, name: user.name });
        }
        catch (err) {
            console.error("Profile update error:", err);
            res.status(500).json({ error: "Failed to update profile." });
        }
    }));
    app.get("/me", (req, res) => {
        if (req.session.userId) {
            res.json({ userId: req.session.userId });
        }
        else {
            res.status(401).json({ error: "Not logged in." });
        }
    });
    app.post("/logout", (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: "Logout failed." });
            }
            res.clearCookie("connect.sid");
            res.json({ message: "Logged out successfully." });
        });
    });
    app.get("/coins/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const crypto = yield ormconfig_1.AppDataSource.getRepository(Crypto_1.Crypto).findOne({
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
        }
        catch (error) {
            console.error("Error fetching crypto by id:", error);
            res.status(500).json({ error: "Something went wrong" });
        }
    }));
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
