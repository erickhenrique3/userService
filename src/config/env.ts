import { config } from "dotenv";

config();

export const ENV = {
  PORT: process.env.PORT || 2025,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  DATABASE_URL: process.env.DATABASE_URL!,
};
