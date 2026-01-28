import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      email: string;
      iat: number;
      exp: number;
    };
  }
}
