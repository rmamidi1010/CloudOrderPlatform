import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      email: string;
      iat: number;
      exp: number;
    };
  }

  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}
