import fp from "fastify-plugin";
import jwt from "jsonwebtoken";
import { FastifyRequest, FastifyReply } from "fastify";

export const jwtPlugin = fp(async (app) => {
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        return reply
          .status(401)
          .send({ message: "Missing Authorization header" });
      }

      const token = authHeader.replace("Bearer ", "");

      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        request.user = payload as any;
      } catch {
        return reply.status(401).send({ message: "Invalid or Expired token" });
      }
    },
  );
});
