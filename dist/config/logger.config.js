"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
// checking for the directory, if not creates new
const logFolder = "logs";
if (!fs_1.default.existsSync(logFolder))
    fs_1.default.mkdirSync(logFolder);
// setting a format for log
const logFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});
// creating logger
exports.logger = winston_1.default.createLogger({
    level: 'info', //logger level
    format: winston_1.default.format.combine(// format
    winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [
        // Daily Rotate File - Error Logs
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join("logs", "error-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxFiles: "30d",
            zippedArchive: true
        }),
        // Daily Rotate File - All Logs
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join("logs", "combined-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            maxFiles: "30d",
            zippedArchive: true,
        }),
    ],
    // Handle Uncaught Errors
    exceptionHandlers: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(logFolder, "exceptions-%DATE%.log"),
            datePattern: "YYYY-MM-DD"
        })
    ],
    rejectionHandlers: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(logFolder, "rejections-%DATE%.log"),
            datePattern: "YYYY-MM-DD"
        })
    ]
});
exports.default = exports.logger;
