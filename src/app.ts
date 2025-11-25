import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import cookieParser from "cookie-parser";
// @ts-ignore - this package has no types
import xss from "xss-clean";

const app = express();          // creating express app

// adding some global middleware
app.use(helmet());              // Adds 11+ security headers (XSS, clickjacking, MIME sniffing, etc.)
app.use(xss());                 // Sanitizes user input to prevent XSS attacks
app.use(cookieParser());        // Parses cookies (required for JWT authentication in cookies)
app.use(compression());         // Compresses response bodies (gzip) → faster API responses
app.use(hpp());                 // Prevents HTTP Parameter Pollution attacks (?id=1&id=2)
app.use(express.json({ limit: "10mb" }));   // Body parser: allows JSON payloads up to 10mb
app.use(express.urlencoded({ extended: true }));    // Body parser for form-data (URL-encoded)
app.use(cors({                  //// Enables cross-origin requests (for frontend → backend communication)
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

export default app;

