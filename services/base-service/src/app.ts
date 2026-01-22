import Fastify from "fastify";
import { registerErrorHandler } from "./plugins/error-handler.js";
import { healthRoutes } from "./routes/health.js";
import { logger } from "./plugins/logger.js";

export function buildApp() {
  const app = Fastify({ logger });

  registerErrorHandler(app);
  app.register(healthRoutes);

  return app;
}
