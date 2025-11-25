"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
// Get project root path (works in dev & prod)
const rootPath = process.cwd();
// Set server URL based on environment
const SERVER_URL = process.env.NODE_ENV === "production"
    ? process.env.PROD_API_URL || "https://api.yourdomain.com"
    : "http://localhost:5000";
// Swagger config options
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Backend API Documentation",
            version: "1.0.0",
            description: "API documentation for the backend system.",
            contact: {
                name: "Backend Team",
                email: "ugsatna@gmail.com",
            },
        },
        servers: [
            {
                url: SERVER_URL,
                description: process.env.NODE_ENV === "production"
                    ? "Production Server"
                    : "Development Server",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        // Apply JWT auth globally
        security: [{ BearerAuth: [] }],
    },
    // Scan project files for swagger annotations
    apis: [
        path_1.default.join(rootPath, "src/routes/*.{ts,js}"),
        path_1.default.join(rootPath, "src/models/*.{ts,js}"),
        path_1.default.join(rootPath, "src/controllers/*.{ts,js}"),
        path_1.default.join(rootPath, "src/dto/*.{ts,js}"),
    ],
};
// Generate swagger specification
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
