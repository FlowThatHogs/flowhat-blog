---
title: "What Is Andrej Karpathy Skills?"
description: "Andrej Karpathy Skills is a community-made Claude Code guideline repo inspired by Karpathy's comments on LLM coding failures, rather than an official Karpathy project."
pubDate: 2026-05-05
updatedDate: 2026-05-05
lang: en
translationGroup: what-is-andrej-karpathy-skills
baseSlug: 2026-05-05-what-is-andrej-karpathy-skills
tags:
  - claude-code
  - agents
  - skills
  - ai-engineering
  - workflows
heroImage: ../../assets/blog-placeholder-1.jpg
---

**Andrej Karpathy Skills** is best understood as a small instruction layer for coding agents.

More precisely, the GitHub repository `forrestchang/andrej-karpathy-skills` packages Andrej Karpathy's public observations about LLM coding failures into a `CLAUDE.md` file, a Claude Code plugin, a reusable skill, and a Cursor rule. It is not, based on the public sources checked here, an official Andrej Karpathy project. The repository says it is "derived from Andrej Karpathy's observations on LLM coding pitfalls," and GitHub lists the repository owner as `forrestchang`.[1]

So this post treats the repo as a community project built from Karpathy's critique, not as an official Karpathy tool. One of the most widely discussed critiques of coding agents has been converted into a small set of working rules that can sit inside a real project.

The repo's point is simple: better models are not enough. An agent also needs rules for when to ask, when to stop, how much to change, and what to verify.

## What the repository contains

The project is intentionally small. Its main artifact is a `CLAUDE.md` file that can be added to a project so Claude Code reads the guidelines before working. The repository also includes Claude Code plugin metadata, a `skills/karpathy-guidelines/SKILL.md` file, Cursor rule support, and examples that show common failure patterns.[2][3][4]

The four principles are:

1. **Think Before Coding**
2. **Simplicity First**
3. **Surgical Changes**
4. **Goal-Driven Execution**

The ideas are simple. That is part of the point. The repository is not trying to invent a new software methodology. It gives a coding agent the discipline that human engineers often expect but do not always write down.

At the time of research on May 5, 2026, the GitHub API showed the repository with about **111,962 stars** and **11,178 forks**. That does not prove the guidelines improve every coding task. It does show that many developers recognize the problem the repo is trying to solve.[1]

## The Karpathy post behind it

The background is Karpathy's long X post about recent Claude and Codex-style coding-agent workflows.[5]

In that post, Karpathy describes a sharp personal workflow change: from mostly manual coding and autocomplete to mostly agent-driven coding with manual edits and touchups. He calls it one of the largest changes to his coding workflow in roughly two decades.

But the post is not simple AI-agent hype.

Karpathy also says the "no need for an IDE" and "agent swarm" narratives are too much for the current state of the tools. If the code matters, he says he still watches the models closely in an IDE. The mistakes have changed. They are less often syntax errors and more often subtle conceptual mistakes, similar to what a rushed junior developer might do.[5]

The failure modes he names are the important part:

- models make wrong assumptions and continue without checking;
- they do not manage confusion well;
- they do not seek clarification enough;
- they do not surface inconsistencies or tradeoffs;
- they do not push back when they should;
- they overcomplicate code and APIs;
- they create bloated abstractions;
- they sometimes change comments or code they do not understand, even when that code is unrelated to the task.[5]

The `andrej-karpathy-skills` repo is a compact response to those failure modes.

## Principle 1: think before coding

The first rule is about assumptions.

A typical coding-agent mistake starts before code generation. The model silently chooses an interpretation of the task and starts editing. If the user says "make search faster," the agent may add caching, rewrite a query, introduce async behavior, or change the UI without first asking what kind of speed matters.

The guideline pushes the agent to state assumptions, present multiple interpretations, ask when uncertain, and surface tradeoffs before implementation.[2]

This is not ceremony. It is a guardrail against expensive wrong work.

For trivial tasks, asking too many questions is annoying. For non-trivial work, hidden assumptions are where many failures begin.

## Principle 2: simplicity first

The second rule fights overengineering.

LLM coding agents are good at producing structure. That is useful until it becomes a liability. A simple feature can become a strategy interface, a registry, a plugin system, and five configuration switches that nobody requested.

The repository's wording is blunt: use the minimum code that solves the problem, add nothing speculative, avoid abstractions for single-use code, and simplify if 200 lines could be 50.[2]

This matters because coding agents can make complexity feel cheap. They can generate the extra files quickly, so the cost is easy to miss. But the maintenance cost remains human. Someone still has to read, review, test, debug, and live with the code later.

## Principle 3: surgical changes

The third rule targets diff pollution.

When an agent edits existing code, it can be tempted to "improve" nearby code, reformat unrelated sections, remove comments it does not understand, or refactor adjacent logic. Sometimes those changes look harmless. Sometimes they bury the actual change inside a noisy diff.

The guideline says to touch only what is required, match the existing style, avoid drive-by refactors, and clean up only the mess created by the current change.[2]

In real projects, the value of an agent includes reviewability. Working code is only half of it. A human still has to inspect the change safely, and smaller diffs are easier to trust.

## Principle 4: goal-driven execution

The fourth rule is the most important one for agent leverage.

Karpathy's post says LLMs are exceptionally good at looping until they meet specific goals. His advice is not to tell the model every step. Give it success criteria and let it work toward them.[5]

The repository translates that into a coding habit: turn vague tasks into verifiable outcomes. Instead of "fix the bug," write a test that reproduces the bug and then make it pass. Instead of "add validation," define invalid inputs and verify the behavior. Instead of "refactor this," ensure tests pass before and after.[2]

This changes the agent loop from:

```text
ask → assume → edit → claim done
```

into something closer to:

```text
define success → test or inspect → change → verify → report
```

That is a small shift in wording, but a large shift in control.

## Why this is more than a prompt pack

It is easy to dismiss a `CLAUDE.md` as "just prompts." That misses the more interesting pattern.

Coding agents increasingly operate inside project-specific instruction layers: `CLAUDE.md`, Cursor rules, Codex instructions, reusable skills, MCP-connected workflows, and repository conventions. These layers do not replace model capability; they shape where and how that capability is used.

The `andrej-karpathy-skills` repo is a minimal example of that pattern. It does not add a new tool, run tests by itself, or guarantee correctness. It tells the agent how to behave before and during software work.

That is why the repo has traveled beyond Claude Code. The same idea appears in its Cursor support and in the reusable skill file.[3][4]

The useful abstraction is agent behavior as a project artifact, not a Claude-specific feature.

## What to be careful about

There are three caveats.

First, this is not an official Karpathy release. Public sources checked for this post did not show Karpathy endorsing or discussing the repository directly. The repo is inspired by his observations, not authored by him.[1][5]

Second, popularity is not proof. The star count shows attention, not measured effectiveness. The guidelines are sensible, but teams still need tests, code review, CI, and project-specific rules.

Third, the rules bias toward caution. The repository itself notes that trivial tasks do not need the full rigor.[2] A typo fix should not become a planning meeting. The value appears when the work is ambiguous, multi-file, risky, or hard to review.

## The practical takeaway

The best way to read Andrej Karpathy Skills is as a small case study in how coding-agent workflows are maturing, not as a celebrity-branded tool.

Early agent usage often looked like chat:

```text
please build this
```

Better agent usage increasingly looks like a controlled loop:

```text
state assumptions, keep the change small, avoid unrelated edits, define success, verify before finishing
```

That is the real lesson.

As coding agents become more capable, the bottleneck moves from raw generation to steering, reviewability, and verification. A small `CLAUDE.md` cannot solve all of that. But it can make the failure modes visible. And for coding agents, visible failure modes are much easier to manage than silent ones.

## References

[1] `forrestchang/andrej-karpathy-skills` GitHub repository, checked May 5, 2026: https://github.com/forrestchang/andrej-karpathy-skills

[2] `CLAUDE.md`, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md

[3] Claude Code plugin metadata, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/.claude-plugin/plugin.json

[4] Cursor usage notes, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CURSOR.md

[5] Andrej Karpathy on X, post about Claude/Codex-style coding-agent workflow and pitfalls: https://x.com/karpathy/status/2015883857489522876
