import { FastifyInstance } from "fastify";
import { register, login } from "../services/auth.service.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/login", login);
}
