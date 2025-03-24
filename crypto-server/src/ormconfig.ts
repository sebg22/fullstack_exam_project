import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./entities/User";
import { Crypto } from "./entities/Crypto";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // Use Render's PostgreSQL URL
  entities: ["src/entities/*.ts", User, Crypto], // Path to entity files
  synchronize: true, // ⚠️ Auto-syncs schema; disable in production
  ssl: { rejectUnauthorized: false },
});

AppDataSource.initialize()
  .then(() => console.log("Connected to PostgreSQL with TypeORM"))
  .catch((error) => console.log("Error connecting to DB:", error));
