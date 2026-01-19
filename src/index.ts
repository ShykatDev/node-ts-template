/** 
Node Modules
*/
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

/**
Custom Modules
*/
import config from "@/config";
import limiter from "@/lib/rate-limiter";

/**
Router
*/
import v1Routes from "@/routes/v1";

const app = express();

// Apply CORS middleware
app.use(cors(config.corsOptions));

// Enable JSON request body parsing
app.use(express.json());

/**
Enable URL-encoded request body parsing with extended mode
`extended: true` allows rich object and arrays via querystring library
*/
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Enable response compression to reduce payload size and improve performance
app.use(
  compression({
    threshold: 1024, // Only compress responses larger than 1kb
  }),
);

// Use Helmet to enhance security by setting various HTTP headers
app.use(helmet());

// Apply rate-limiting middleware to prevent excessive requests and enhance security
app.use(limiter);

(async () => {
  try {
    app.use("/api/v1", v1Routes);

    app.listen(config.PORT, () => {
      console.log(`Server is running: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.error("Failed to start the server", err);

    if (config.NODE_ENV === "development") {
      process.exit(1);
    }
  }
})();

// Handle server shutdown gracefully by disconnecting from database
const handleServerShutdown = async () => {
  try {
    console.log("Server SHUTDOWN");
    process.exit(0);
  } catch (error) {
    console.error("Error during server shutdown", error);
  }
};

process.on("SIGTERM", handleServerShutdown); // kill command or container shutdown
process.on("SIGINT", handleServerShutdown); // `ctrl+c` to terminate server
