"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const path_1 = __importDefault(require("path"));
const sequelize_typescript_1 = require("sequelize-typescript");
const env_config_1 = require("./env.config");
const logger_config_1 = __importDefault(require("./logger.config"));
// Path to models folder
const modelsPath = path_1.default.join(process.cwd(), "src/models");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    host: env_config_1.ENV.DB_HOST,
    port: Number(env_config_1.ENV.DB_PORT),
    username: env_config_1.ENV.DB_USER,
    password: env_config_1.ENV.DB_PASS,
    database: env_config_1.ENV.DB_NAME,
    dialect: env_config_1.ENV.DB_DIALECT,
    models: [modelsPath],
    // Logging (do not log in production)
    logging: env_config_1.ENV.NODE_ENV === "development" ? (msg) => logger_config_1.default.info(msg) : false,
    // Connection pool settings
    pool: {
        max: 10,
        min: 2,
        acquire: 30000,
        idle: 10000,
    },
});
// Test connection
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        logger_config_1.default.info("Database connected successfully");
    }
    catch (error) {
        logger_config_1.default.error("Database connection failed: " + error.message);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
