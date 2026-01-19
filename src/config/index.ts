/**
Node modules
 */
import type { CorsOptions } from "cors";
import dotenv from "dotenv";

dotenv.config();

const WHITELISTED_ORIGINS: string[] = [""];

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      process.env.NODE_ENV === "development" ||
      !origin ||
      WHITELISTED_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error(`🌏 CORS error: ${origin} not allowed!`), false);

      console.log(`🌏 CORS error: ${origin} not allowed!`);
    }
  },
};

const config = {
  PORT: process.env.PORT || 3000,
  corsOptions,
  NODE_ENV: process.env.NODE_ENV,
};

export default Object.freeze(config);
