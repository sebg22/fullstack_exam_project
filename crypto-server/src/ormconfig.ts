import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./entities/User";
import { Crypto } from "./entities/Crypto";

dotenv.config();

console.log("Using DATABASE_URL:", process.env.DATABASE_URL); // Debugging line

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, Crypto],
  synchronize: true,
  ssl: { rejectUnauthorized: false }, // Ensure SSL is enabled
});

AppDataSource.initialize()
  .then(() => console.log("✅ Connected to PostgreSQL with TypeORM"))
  .catch((error) => console.log("❌ Error connecting to DB:", error));
