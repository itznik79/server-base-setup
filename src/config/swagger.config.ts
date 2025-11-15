import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

// Get project root path (works in dev & prod)
const rootPath = process.cwd();

// Set server URL based on environment
const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_API_URL || "https://api.yourdomain.com"
    : "http://localhost:5000";

// Swagger config options
const options: swaggerJsdoc.Options = {
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
        description:
          process.env.NODE_ENV === "production"
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
    path.join(rootPath, "src/routes/*.{ts,js}"),
    path.join(rootPath, "src/models/*.{ts,js}"),
    path.join(rootPath, "src/controllers/*.{ts,js}"),
    path.join(rootPath, "src/dto/*.{ts,js}"),
  ],
};

// Generate swagger specification
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;