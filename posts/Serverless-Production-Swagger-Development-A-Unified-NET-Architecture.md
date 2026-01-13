---
title: "Serverless Production, Swagger Development: A Unified .NET Architecture"
date: 2026-01-12
tags:
  - DotNet
  - Cloud
---
In modern cloud development, we often face a tradeoff: **Serverless** offers amazing scalability and cost efficiency, but the **Local Developer Experience (DX)** often suffers—lacking proper debugging tools, fast iteration loops, or a nice Swagger UI.

For **Xlsx-Grid-Flow**, I implemented a "Have Your Cake and Eat It Too" architecture that uses a shared .NET 10 Core library to power *two* identical backends.

## The 3-Layer Structure

```
/Xlsx-Grid-Flow

├── XlsxGridFlow.Core/ # 🧠 The "Brain" (Shared Library)
│ ├── Services/ # Business Logic (Calculations, PDF, Excel)
│ ├── Orchestrators/ # Workflow Logic (Save, Audit)
│ └── Models/DTOs # Shared Types
│
├── backend/ # 🛠️ Local Dev Host (ASP.NET Web API)
│ ├── Controllers/ # Thin Wrappers
│ └── Swagger/ # API Documentation UI
│
└── backend-functions/ # 🚀 Production Host (Azure Functions)
└── Functions/ # Thin Triggers
```
## The "Thin Wrapper" Pattern

The key to this architecture is ensuring **Zero Code Duplication**. We moved 100% of the business logic—including complex workflows—into `XlsxGridFlow.Core`.
Both the **Standard API Controller** and the **Azure Function** are just dumb terminals. They accept a request, hand it to the Core, and return the result.

**The Logic (Core/SessionOrchestrator.cs):**

```csharp
public async Task<SaveResult> SaveSessionAsync(...) {
// 1. Recalculate Formulas
// 2. Generate Audit Drift
// 3. Update Blob Storage
// 4. Return new version
}
```

**The Function (Thin Wrapper):**

```csharp
[Function("SaveSession")]
public async Task<HttpResponseData> Run(...) =>
await _orchestrator.SaveSessionAsync(...);
```

**The Controller (Thin Wrapper):**

```csharp
[HttpPost("save")]
public async Task<IActionResult> Save(...) =>
Ok(await _orchestrator.SaveSessionAsync(...));
```
## Why This Wins

1. **🚀 Superior Local DX**: We run the standard `backend` locally. We get **Swagger UI**, instant startup, and familiar debugging.
2. **☁️ Serverless Scale**: In production, we deploy `backend-functions`. We get auto-scaling and pay-per-execution.
3. **🛡️ Bulletproof Consistency**: Since they run the *exact same code* from the Core library, there is no "it works on my machine but breaks in serverless" drift.