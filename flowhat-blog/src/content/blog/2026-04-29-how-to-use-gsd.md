---
title: "How to Actually Use GSD: The Workflow Behind Get Shit Done"
description: "GSD is not a prompt pack. It works best as a project loop: create durable context, plan by phase, execute in bounded tasks, and verify the result."
pubDate: 2026-04-29
updatedDate: 2026-04-29
translationGroup: how-to-use-gsd
baseSlug: 2026-04-29-how-to-use-gsd
heroImage: ../../assets/blog-placeholder-1.jpg
lang: en
tags:
  - gsd
  - claude-code
  - agents
  - workflows
  - spec-driven-development
  - context-engineering
---

In the previous post, [we looked at what **GSD (get-shit-done)** is](/blog/2026-04-28-what-is-gsd/). The name makes it sound like a loud Claude Code prompt pack, but the project is better understood as a workflow system for coding agents.

The practical question is simpler:

**How do you actually use it?**

The short answer: you do not have to run every GSD command in a strict ceremony. Most people can install it, use the command they need, and keep moving.

But GSD becomes more valuable when the work grows beyond a one-off prompt. For small fixes, quick mode may be enough. For larger features or existing codebases, the useful pattern is to create project state, clarify decisions, plan the work, execute in bounded pieces, and verify the result.

## Start with project state

A normal GSD flow begins with:

```bash
/gsd-new-project
```

The official user guide says this command asks questions about the project, runs research agents, extracts requirements, and creates a roadmap before code is written.[2]

The key output is not the chat response. It is the `.planning/` directory:

```text
.planning/
  PROJECT.md
  REQUIREMENTS.md
  ROADMAP.md
  STATE.md
  config.json
  research/
```

This is the first important shift. Many coding-agent sessions keep too much state inside conversation history. That works for small fixes, but longer work quickly becomes fragile. Earlier decisions get buried, the context window gets noisy, and the agent starts guessing.

GSD moves project memory into files that both the human and the agent can inspect later.[3]

For an existing codebase, the better starting point is usually:

```bash
/gsd-map-codebase
/gsd-new-project
```

That matters because real repositories already have structure, tests, conventions, similar features, and architectural constraints. Without that context, an agent can produce code that looks plausible but does not fit the project.

## Discuss before planning

Once the project and roadmap exist, the next step is not execution. It is discussion:

```bash
/gsd-discuss-phase 1
```

This step captures implementation preferences before planning. For example: how errors should be handled, which library should be used, or whether a behavior should be global or route-specific.[2]

The result is usually saved as a phase context file:

```text
.planning/phases/01-core-middleware/CONTEXT.md
```

This is more important than it looks. Many agent failures start before coding. The model silently guesses a decision, then that guess becomes part of the implementation and tests.

GSD’s discuss step reduces that risk.

There is also an assumptions mode. In that mode, GSD reads the codebase first and presents structured assumptions: “Here is how I think this repo works. Correct me before I build.”[2] For existing projects, that can be faster and more useful than open-ended questioning.

## The main value is planning

The next step is:

```bash
/gsd-plan-phase 1
```

The docs describe a multi-agent planning process. Phase researchers investigate stack, features, architecture, and risks. A planner turns that context into plans. A plan-checker verifies that the plans can achieve the phase goal before execution.[2][4]

The output is usually a set of files like this:

```text
.planning/phases/01-core-middleware/
  RESEARCH.md
  01-01-PLAN.md
  01-02-PLAN.md
  VALIDATION.md
```

This is where GSD differs from ordinary “vibe coding.”

A weak agent session says:

> Build the feature.

A GSD-style session says:

> These are the requirements. These are the decisions. This is the research. The work is split into small plans, and each plan has files to read and a way to verify the result.

That structure is not decoration. It reduces ambiguity before the expensive execution phase begins.

GSD also documents a “Nyquist” validation layer that tries to connect requirements to test commands or automated checks before code is written.[2] That matters because AI-generated code can look right without being right. The useful question is whether it passes the right feedback loop.

## Execute in small, clean contexts

After planning, execution is:

```bash
/gsd-execute-phase 1
```

GSD says it groups plans into dependency waves, runs independent work in parallel, and gives each plan a fresh executor context.[2]

That is central to the design. Long agent sessions get messy. Logs, mistakes, corrections, and abandoned ideas pile up until the model loses focus.

GSD’s answer is to give each task a cleaner context while keeping project state in `.planning/`.[3]

A good execution phase should feel boring:

- each plan is small
- each executor knows what to read first
- each task has acceptance criteria
- each commit maps back to a plan
- verification checks the result against the phase goal

If a plan is too broad, execution can fail or produce stubs. The docs recommend replanning into smaller scope when that happens.[2]

## Verification is not optional

After execution comes verification:

```bash
/gsd-verify-work 1
```

The user guide describes this as manual UAT. GSD extracts testable items from the phase goal and walks the user through them. If something fails, it can diagnose the issue and create a follow-up fix plan.[2]

This is where many AI coding workflows are weak. People often treat “the agent says it is done” as the end of the task.

For coding agents, done should mean something stricter: the work passed an independent check against the original requirement.

The questions are practical:

- Does the feature actually run?
- Does the expected user path work?
- Did the implementation preserve the decisions in `CONTEXT.md`?
- Were the necessary tests added?
- Did the agent quietly narrow the scope?

GSD is useful because it does not force the human to supervise every line, but it does bring the human back for the important gates.

## Use quick mode for small work

Not every task needs the full loop. Small bug fixes can use:

```bash
/gsd-quick
> "Fix the login button not responding on mobile Safari"
```

But quick mode should not become the default for serious work. The full loop exists to protect larger tasks from context drift, missing decisions, and weak verification.

A practical rule:

- use **`/gsd-quick`** for small fixes
- use **`/gsd-new-project` → discuss → plan → execute → verify** for new features or multi-file work
- use **`/gsd-map-codebase`** before serious work in an existing repo
- use **`/gsd-progress`** or **`/gsd-resume-work`** when returning later
- use **`/clear`** between major steps when the context gets noisy[2]

The last point is important. GSD can tolerate cleared context because its durable state lives in `.planning/`.

## What the creator’s demo shows

The creator’s long walkthrough, *I Created GSD For Claude Code. This Is How I Use It.*, is also useful.[8]

The live transcript is messy, but the operating model is clear. The creator frames himself less as a coder and more as a high-level project manager for Claude Code. Instead of reading and writing every line directly, he focuses on making Claude understand the code, plan the work, and verify the result.[8]

That explains GSD’s real audience. It is not only for expert developers trying to save keystrokes. It is also for builders who are increasingly supervising AI coding work instead of manually implementing everything.

That makes workflow discipline more important, not less. If the human is not deeply reading every diff, the system around the agent must be stricter about context, planning, tests, and verification.

## The operating model

So the practical answer is not “always run the full sequence.” A better mental model is:

```text
Small fix:
  install GSD -> use /gsd-quick -> verify the result

Existing repo:
  map the codebase -> create project state -> work phase by phase if needed

Larger feature:
  discuss decisions -> plan -> execute -> verify -> ship
```

GSD is useful not because it forces everyone into the same rigid process, but because it gives you a repeatable loop when a normal chat session starts to fall apart.

There is a tradeoff. The full system is heavier than a plain Claude Code session. It can add process, tokens, and waiting time. For small one-off tasks, it may be too much.

But real software work already has process. The question is where that process lives: in your head, in a fragile chat transcript, or in files and gates an agent can actually follow.

GSD’s answer is clear: put the process into files, phases, commands, and verification gates.

Its real purpose is not to make Claude write more code.

It is to help Claude finish the work without losing the plot.

## References

1. GSD Build, *GET SHIT DONE* README  
   https://github.com/gsd-build/get-shit-done
2. GSD Build, *GSD User Guide*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/USER-GUIDE.md
3. GSD Build, *GSD Architecture*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/ARCHITECTURE.md
4. GSD Build, *GSD Command Reference*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/COMMANDS.md
5. GSD Build, *GSD Shipped Surface Inventory*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/INVENTORY.md
6. npm, *get-shit-done-cc package metadata and download stats*  
   https://www.npmjs.com/package/get-shit-done-cc  
   https://api.npmjs.org/downloads/point/last-month/get-shit-done-cc
7. GSD documentation site, *Get Shit Done documentation index*  
   https://gsd-build-get-shit-done.mintlify.app/  
   https://mintlify.com/gsd-build/get-shit-done/llms.txt
8. TÂCHES, *I Created GSD For Claude Code. This Is How I Use It.*  
   https://www.youtube.com/watch?v=5L3dm7KBCmY
