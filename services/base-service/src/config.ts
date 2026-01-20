import dotenv from "dotenv";

dotenv.config();

export const config = {
  serviceName: process.env.SERVICE_NAME ?? "base-service",
  port: Number(process.env.PORT ?? 3000),
  environment: process.env.NODE_ENV ?? "development",
};
