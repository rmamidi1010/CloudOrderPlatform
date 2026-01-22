# Service Pattern

Each microservice:

- Runs independently
- Owns its data
- Exposes HTTP APIs
- Communicates with other services via events

To create a new service:

1. Copy `base-service`
2. Rename service and port
3. Add business logic
4. Register events

This pattern keeps services consistent and easy to maintain.
