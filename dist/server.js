"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const env_config_1 = require("./config/env.config");
const db_config_1 = require("./config/db.config");
const logger_config_1 = __importDefault(require("./config/logger.config"));
const PORT = env_config_1.ENV.PORT || 8000;
/**
 * -----------------------------------------------------
 * 🚀 Start Express Server (Production Ready)
 * -----------------------------------------------------
 */
const startServer = async () => {
    try {
        //  Connect Database
        await (0, db_config_1.connectDB)();
        logger_config_1.default.info("Database connected successfully");
        //  Start HTTP Server
        app_1.default.listen(PORT, () => {
            logger_config_1.default.info(`Server running in ${env_config_1.ENV.NODE_ENV} mode on port ${PORT}`);
        });
        //  Handle unexpected crashes (mandatory in production)
        process.on("unhandledRejection", (reason) => {
            logger_config_1.default.error("❌ Unhandled Rejection:", reason);
            process.exit(1);
        });
        process.on("uncaughtException", (error) => {
            logger_config_1.default.error("❌ Uncaught Exception:", error);
            process.exit(1);
        });
        // 4️⃣ Graceful shutdown (handled for Docker / PM2)
        process.on("SIGTERM", () => {
            logger_config_1.default.info(" SIGTERM received. Shutting down gracefully...");
            process.exit(0);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};
startServer();
