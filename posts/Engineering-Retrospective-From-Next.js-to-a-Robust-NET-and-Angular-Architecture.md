---
title: "Engineering Retrospective: From Next.js to a Robust .NET & Angular Architecture"
date: 2025-12-07
tags:
  - TypeScript
  - Next.js
  - EBR
  - .NET
  - Angular
  - Spec-Driven Development
---

Every enterprise-grade project is a classroom. While our initial Next.js implementation proved the concept, the journey toward long-term maintainability led us to a significant architectural pivot. 

Here is a post-mortem on our trade-offs, the "technical debt" tax, and our evolution to a more robust enterprise stack.

### 1. The Pivot: Moving to C# and Angular
While Next.js provided incredible initial velocity, we realized that for the long-term lifecycle of FDA-regulated software, **C#/.NET and Angular** offered a more "opinionated" and stable foundation.

* **Why the shift?** C#’s strong typing and Angular’s structured framework are better suited for complex, multi-year enterprise lifecycles. 
* **The Demo:** We have already begun rebuilding core features in this new stack. You can explore the progress here: [Xlsx-Grid-Flow Demo](https://hangxigood.github.io/Xlsx-Grid-Flow/)

### 2. The "Split-Brain" Database Lesson
**The Mistake:** Initially using MongoDB for dynamic forms and PostgreSQL for the training module.
**The Friction:** This led to data redundancy. User profiles had to be synced across two systems, violating the *Single Source of Truth* principle.
**The Better Way:** We realized **PostgreSQL with `jsonb`** is the superior choice. It provides the relational integrity needed for compliance while handling dynamic JSON data for batch records—all in one engine.

### 3. Alignment Before Implementation
**The Mistake:** Delegating the "Image Data Type" feature without a locked-down data contract.
**The Friction:** We agreed on the *requirements* but not the *schema*. I spent two weeks refactoring code to fix structural mismatches found during integration.
**The Lesson:** "Alignment before Implementation." We now enforce a **Schema-First Review**—locking down JSON contracts before a single line of feature code is written.

---

### 4. Spec-Driven Development: Our Secret Weapon
To maintain high velocity with a 2-man team, we treated documentation as the "executable prompt" for our code.



**The Workflow:**
1.  **Domain First:** Freeze DB schemas and types in Markdown.
2.  **Logic Gating:** Define business logic independent of the API for 100% unit testability.
3.  **The Doc-Fix Cycle:** Any logical gaps found during coding resulted in an immediate update to the Tech Spec first, keeping documentation live and accurate.

---

### Final Reflections
Architecture is an evolution. Transitioning from the flexibility of Next.js to the rigor of .NET and Angular represents our commitment to building software that isn't just "fast to build," but "built to last" in a regulated environment.

**Check out the new architecture in action:** [View the Demo on GitHub Pages](https://hangxigood.github.io/Xlsx-Grid-Flow/)
