# System Architecture

## Overview
This project implements an event-driven order processing system built with Node.js microservices and AWS managed services.  
The goal is to demonstrate clear service boundaries, independent data ownership, asynchronous workflows, and cloud-native design suitable for real production systems.

The system allows users to place orders, process payments, manage inventory, and send notifications while keeping services loosely coupled.

---

## Services

### API Gateway (BFF)
**Responsibility**
- Entry point for all client requests
- Request routing, authentication enforcement
- No business logic

**Owns Data**
- None

**Communication**
- Synchronous HTTP calls to backend services

---

### Auth Service
**Responsibility**
- User registration and login
- Token issuance and validation

**Owns Data**
- Users
- Credentials
- Refresh tokens

**Publishes Events**
- None

**Consumes Events**
- None

---

### Order Service
**Responsibility**
- Create and manage orders
- Track order lifecycle

**Owns Data**
- Orders

**Publishes Events**
- OrderCreated
- OrderCancelled

**Consumes Events**
- PaymentSucceeded
- PaymentFailed

---

### Payment Service
**Responsibility**
- Process payments (mock external provider)
- Ensure idempotent payment handling

**Owns Data**
- Payments

**Publishes Events**
- PaymentSucceeded
- PaymentFailed

**Consumes Events**
- OrderCreated

---

### Inventory Service
**Responsibility**
- Track and update stock levels

**Owns Data**
- Inventory / stock

**Publishes Events**
- InventoryReserved
- InventoryFailed

**Consumes Events**
- OrderCreated

---

### Notification Service
**Responsibility**
- Send user notifications (email/SMS mocked)

**Owns Data**
- None (stateless)

**Publishes Events**
- None

**Consumes Events**
- OrderCreated
- PaymentSucceeded
- PaymentFailed

---

## Data Ownership

Each service owns its data store. No other service writes directly to that data.

| Service | Owns | Does Not Own |
|------|------|-------------|
| Auth | users | orders, payments |
| Order | orders | users, inventory |
| Payment | payments | orders |
| Inventory | stock | orders |
| Notification | none | all domain data |

Rule:
> Only the owning service can write to its data store.

---

## Communication Model

### Synchronous (HTTP)
Used for:
- Client-facing requests
- Authentication checks
- Order creation and retrieval

Examples:
- Client → API Gateway → Order Service
- API Gateway → Auth Service

---

### Asynchronous (Events)
Used for:
- Side effects
- Cross-service workflows
- Long-running operations

AWS services:
- SNS for event publishing
- SQS for event consumption

Examples:
- Order Service publishes `OrderCreated`
- Payment, Inventory, and Notification services consume the event independently

This avoids tight coupling and allows services to scale independently.

---

## Event Definitions

### OrderCreated
```json
{
  "eventId": "uuid",
  "orderId": "string",
  "userId": "string",
  "total": 120.50,
  "timestamp": "ISO-8601"
}
