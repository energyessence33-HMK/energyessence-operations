import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { apiRateLimiters } from "../../lib/services/rate-limiter";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Enable CORS for all routes - reflect the request origin to support credentials
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.header("Access-Control-Allow-Credentials", "true");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }
    next();
  });

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use("/api", (req, res, next) => {
    if (req.path === "/health") {
      next();
      return;
    }

    const forwardedFor = req.headers["x-forwarded-for"];
    const forwardedAddress = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor?.split(",")[0]?.trim();
    const clientKey = forwardedAddress || req.socket.remoteAddress || "anonymous";
    const limiter = req.path.includes("oauth") ? apiRateLimiters.authentication : apiRateLimiters.general;

    if (!limiter.isAllowed(clientKey)) {
      const status = limiter.getStatus(clientKey);
      const retryAfterSeconds = Math.max(1, Math.ceil((status.resetTime - Date.now()) / 1000));
      res.setHeader("Retry-After", retryAfterSeconds.toString());
      res.setHeader("X-RateLimit-Remaining", status.remaining.toString());
      res.setHeader("X-RateLimit-Reset", Math.ceil(status.resetTime / 1000).toString());
      res.status(429).json({
        error: "rate_limit_exceeded",
        retryAfterSeconds,
      });
      return;
    }

    const status = limiter.getStatus(clientKey);
    res.setHeader("X-RateLimit-Remaining", status.remaining.toString());
    res.setHeader("X-RateLimit-Reset", Math.ceil(status.resetTime / 1000).toString());
    next();
  });

  registerOAuthRoutes(app);

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, timestamp: Date.now() });
  });

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`[api] server listening on port ${port}`);
  });
}

startServer().catch(console.error);
