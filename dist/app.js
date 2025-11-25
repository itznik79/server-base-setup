"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// @ts-ignore - this package has no types
const xss_clean_1 = __importDefault(require("xss-clean"));
const app = (0, express_1.default)(); // creating express app
// adding some global middleware
app.use((0, helmet_1.default)()); // Adds 11+ security headers (XSS, clickjacking, MIME sniffing, etc.)
app.use((0, xss_clean_1.default)()); // Sanitizes user input to prevent XSS attacks
app.use((0, cookie_parser_1.default)()); // Parses cookies (required for JWT authentication in cookies)
app.use((0, compression_1.default)()); // Compresses response bodies (gzip) → faster API responses
app.use((0, hpp_1.default)()); // Prevents HTTP Parameter Pollution attacks (?id=1&id=2)
app.use(express_1.default.json({ limit: "10mb" })); // Body parser: allows JSON payloads up to 10mb
app.use(express_1.default.urlencoded({ extended: true })); // Body parser for form-data (URL-encoded)
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
//  404 Handler
app.use((req, res) => {
    res.status(404).json({
        status: false,
        message: `Route ${req.originalUrl} not found`,
    });
});
exports.default = app;
