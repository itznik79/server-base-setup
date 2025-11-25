import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { ENV } from "./config/env.config";
import { connectDB } from "./config/db.config";
import logger from "./config/logger.config";

const PORT = ENV.PORT || 8000;

/**
 * -----------------------------------------------------
 * 🚀 Start Express Server (Production Ready)
 * -----------------------------------------------------
 */
const startServer = async () => {
  try {
    //  Connect Database
    await connectDB();
    logger.info("Database connected successfully");

    //  Start HTTP Server
    app.listen(PORT, () => {
      logger.info(`Server running in ${ENV.NODE_ENV} mode on port ${PORT}`);
    });

    //  Handle unexpected crashes (mandatory in production)
    process.on("unhandledRejection", (reason: any) => {
      logger.error("❌ Unhandled Rejection:", reason);
      process.exit(1);
    });

    process.on("uncaughtException", (error: any) => {
      logger.error("❌ Uncaught Exception:", error);
      process.exit(1);
    });

    // 4️⃣ Graceful shutdown (handled for Docker / PM2)
    process.on("SIGTERM", () => {
      logger.info(" SIGTERM received. Shutting down gracefully...");
      process.exit(0);
    });

  } catch (error: any) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
