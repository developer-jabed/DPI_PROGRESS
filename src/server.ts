/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import config from "./config";
import { seedAdmin } from "./app/helper/seedAdmin";
import 'dotenv/config'; // loads .env automatically
import { prisma } from "./app/shared/prisma";



// Optional: Redis connection placeholder
// import { connectRedis } from "./app/config/redis.config";

let server: Server;

const startServer = async () => {
  try {
    // ✅ Connect to Prisma (PostgreSQL)
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL via Prisma!");

    // ✅ Start Express server
    server = app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);

    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

(async () => {
  try {
    // await connectRedis(); // If Redis is used
    await startServer();
    await seedAdmin(); // Seed default Admin if not exists
  } catch (error) {
    console.error("❌ Startup Error:", error);
    process.exit(1);
  }
})();

// ✅ Handle graceful shutdowns and crashes
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      console.log("HTTP server closed.");

      await prisma.$disconnect();
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

// Handle process signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle unexpected errors
process.on("unhandledRejection", (err) => {
  console.error("🚨 Unhandled Rejection detected:", err);
  gracefulShutdown("unhandledRejection");
});

process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception detected:", err);
  gracefulShutdown("uncaughtException");
});
