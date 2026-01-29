import { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/protected", { preHandler: app.authenticate }, async (request) => {
    return {
      message: "you are authenticated",
      user: request.user,
    };
  });
  app.get("/health", async (_request, reply) => {
    return reply.status(200).send({ status: "ok" });
  });
}
