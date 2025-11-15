import winston from "winston";
import path from "path";
import fs from 'fs'
import DailyRotateFile from "winston-daily-rotate-file";

// checking for the directory, if not creates new
const logFolder = "logs"
if (!fs.existsSync(logFolder)) fs.mkdirSync(logFolder);

// setting a format for log
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

// creating logger
export const logger = winston.createLogger({
    level: 'info', //logger level
    format: winston.format.combine( // format
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [ //transporting logs to different files
        // Daily Rotate File - Error Logs
        new DailyRotateFile({
            filename: path.join("logs", "error-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxFiles: "30d",
            zippedArchive: true
        }),

        // Daily Rotate File - All Logs
        new DailyRotateFile({
            filename: path.join("logs", "combined-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            maxFiles: "30d",
            zippedArchive: true,
        }),
    ],


    // Handle Uncaught Errors
    exceptionHandlers: [
        new DailyRotateFile({
            filename: path.join(logFolder, "exceptions-%DATE%.log"),
            datePattern: "YYYY-MM-DD"
        })
    ],

    rejectionHandlers: [
        new DailyRotateFile({
            filename: path.join(logFolder, "rejections-%DATE%.log"),
            datePattern: "YYYY-MM-DD"
        })
    ]
});

export default logger;