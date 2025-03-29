"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./entities/User");
const Crypto_1 = require("./entities/Crypto");
dotenv_1.default.config();
console.log("Using DATABASE_URL:", process.env.DATABASE_URL); // Debugging line
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User_1.User, Crypto_1.Crypto],
    synchronize: true,
    ssl: { rejectUnauthorized: false }, // Ensure SSL is enabled
});
exports.AppDataSource.initialize()
    .then(() => console.log("✅ Connected to PostgreSQL with TypeORM"))
    .catch((error) => console.log("❌ Error connecting to DB:", error));
