import Fastify from "fastify";
import { registerErrorHandler } from "./plugins/error-handler.js";
import { healthRoutes } from "./routes/health.js";
import { logger } from "./plugins/logger.js";
import { jwtPlugin } from "./plugins/jwt.js";

export function buildApp() {
  const app = Fastify({ logger });

  registerErrorHandler(app);
  app.register(healthRoutes);
  app.register(jwtPlugin);

  return app;
}
