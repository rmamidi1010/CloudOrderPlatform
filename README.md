# Cloud Order Platform

An event-driven microservices system built with Node.js and AWS.

## Architecture

See `docs/architecture.md` for service boundaries and data ownership.

## Services

- base-service: reusable Node.js service template
- auth-service: authentication and user management (WIP)

## Local Development

Each service is developed and run independently.

```bash
cd services/base-service
npm install
npm run dev
```
