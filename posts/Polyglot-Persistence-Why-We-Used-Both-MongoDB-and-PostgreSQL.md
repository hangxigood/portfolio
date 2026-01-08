---
title: "Polyglot Persistence: Why We Used Both MongoDB and PostgreSQL"
date: 2025-12-02
tags:
  - TypeScript
  - Next.js
  - MongoDB
  - PostgreSQL
  - EBR
---

When building an enterprise-grade Electronic Batch Record (EBR) system, a "one-size-fits-all" database approach often falls short. For this project, we adopted a **Polyglot Persistence** strategy to balance rapid iteration with strict relational integrity.

---

### The Evolution of the Stack

Our architecture evolved in two distinct phases to meet shifting requirements without compromising the delivery timeline.

| Component | Tech Choice | Why? |
| :--- | :--- | :--- |
| **Frontend/API** | **Next.js** | Prioritized team fluency and execution velocity over a "theoretical" .NET fit. |
| **EBR Module** | **MongoDB** | Its document model mapped 1:1 with our nested JSON forms, allowing rapid UI iteration. |
| **Training Module** | **PostgreSQL** | Handled complex relational data (Users, Roles, Matrices) with strict integrity. |
| **State Mgmt** | **Zustand** | Lightweight, predictable state management for complex grid interactions. |

---

### The Strategic Trade-off

1.  **Speed vs. Schema:** MongoDB allowed us to build the "Dynamic Form Engine" without constant schema migrations. This was critical for handling 500+ different Excel-based templates.
2.  **Compliance vs. Flexibility:** When the "Training Firewall" was added midway, we chose PostgreSQL for its relational strengths rather than forcing relational logic into NoSQL.
3.  **Risk Mitigation:** While a unified database (like Postgres with `jsonb`) might have been cleaner in hindsight, maintaining two databases was a tactical decision to avoid refactoring a stable core and missing our production deadline.

---

### Key Takeaway
Architecture is the art of trade-offs. By decoupling our data storage—using MongoDB for flexibility and PostgreSQL for structure—we delivered a production-ready system passing 3 rounds of UAT with zero critical bugs.