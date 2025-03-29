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
const ormconfig_1 = require("./ormconfig");
const User_1 = require("./entities/User");
const Crypto_1 = require("./entities/Crypto");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
ormconfig_1.AppDataSource.initialize().then(() => {
    console.log("Connected to DB");
    // DELETE AT SOME POINT: Get all users
    app.get("/users", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield ormconfig_1.AppDataSource.getRepository(User_1.User).find();
        res.json(users);
    }));
    // DELETE AT SOME POINT: Create a new user
    app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email } = req.body;
        const user = ormconfig_1.AppDataSource.getRepository(User_1.User).create({ name, email });
        yield ormconfig_1.AppDataSource.getRepository(User_1.User).save(user);
        res.status(201).json(user);
    }));
    // Get all users
    app.get("/cryptos", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cryptos = yield ormconfig_1.AppDataSource.getRepository(Crypto_1.Crypto).find();
            if (!cryptos) {
                res.status(404).json({ message: "No cryptocurrencies found." });
            }
            else {
                res.json(cryptos);
            }
        }
        catch (error) {
            console.error("Error fetching cryptos:", error);
            res.status(500).json({ error: "Something went wrong" });
        }
    }));
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
