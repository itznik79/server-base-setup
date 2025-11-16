import path from "path";
import { Sequelize } from "sequelize-typescript";
import { ENV } from "./env.config";
import logger from "./logger.config";

// Path to models folder
const modelsPath = path.join(process.cwd(), "src/models");

export const sequelize = new Sequelize({
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  dialect: ENV.DB_DIALECT as any,
  models: [modelsPath],

  // Logging (do not log in production)
  logging: ENV.NODE_ENV === "development" ? (msg) => logger.info(msg) : false,

  // Connection pool settings
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
});

// Test connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connected successfully");
  } catch (error: any) {
    logger.error("Database connection failed: " + error.message);
    process.exit(1);
  }
};
