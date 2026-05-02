---
title: "How to Use gstack Without Overcomplicating Claude Code"
description: "A practical guide to using gstack as a lightweight workflow layer for Claude Code: when to plan, review, QA, and ship without turning every task into ceremony."
pubDate: 2026-05-02
updatedDate: 2026-05-02
lang: en
translationGroup: how-to-use-gstack
baseSlug: 2026-05-02-how-to-use-gstack
tags:
  - gstack
  - claude-code
  - ai-engineering
  - workflows
heroImage: ../../assets/blog-placeholder-1.jpg
---

gstack is not a magic AI company inside your terminal. It is a set of structured skills for Claude Code that helps you think before coding, review before trusting, and test before shipping.

If you want the broader explanation of what gstack is and why people noticed it, start with [What gstack Gets Right About AI Agents: Roles Beat Prompts](/blog/2026-04-30-gstack-roles-beat-prompts/).

That is the main value.

Most AI coding failures do not start in the code. They start earlier. The feature is poorly framed. The scope is too big. The agent starts implementing before the architecture is clear. The result looks complete, but nobody tested the real user flow.

gstack gives Claude Code a more disciplined workflow:

```text
Think → Plan → Build → Review → Test → Ship
```

You do not need to run every command every time. The trick is knowing which role to use for which kind of work.

## What gstack gives you

gstack installs a set of Claude Code slash commands, including:

- `/office-hours`
- `/plan-ceo-review`
- `/plan-eng-review`
- `/plan-design-review`
- `/autoplan`
- `/review`
- `/qa`
- `/ship`
- `/investigate`
- `/cso`

Each command gives Claude Code a different working posture. Some are for product thinking. Some are for architecture. Some are for review, QA, security, or release.

The point is not roleplay. The point is to stop treating AI coding as one giant prompt.

## Basic installation

The official install path assumes you already use Claude Code.

Requirements:

- Claude Code
- Git
- Bun
- Node.js on Windows

Install:

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack
./setup
```

After setup, the gstack commands become available inside Claude Code.

For a first test, keep it simple:

```text
/office-hours
/plan-ceo-review
/review
/qa
```

Do not start with the full workflow. Try it on one real feature.

## A practical way to use it

### Use `/office-hours` when the idea is unclear

Start here when you have a vague product idea.

For example, “build a daily briefing app” is not clear enough. Is the real problem calendar prep? Missing meeting context? Bad prioritization? Stale customer notes?

`/office-hours` helps turn a loose request into a sharper feature.

Skip it for tiny fixes.

### Use `/plan-ceo-review` to control scope

AI makes it easy to build too much.

A small feature can quickly become settings pages, dashboards, onboarding flows, and abstractions nobody asked for.

Use `/plan-ceo-review` to ask:

- What is the smallest useful version?
- What should be removed from v1?
- What would make this actually valuable?

This is useful before you let the agent write a lot of code.

### Use `/plan-eng-review` before risky implementation

Use this when the change touches architecture, data flow, APIs, authentication, background jobs, migrations, or state management.

The goal is simple: expose hidden assumptions before code changes spread through the project.

For small fixes, skip it. For multi-file work, it is usually worth it.

### Use design review only when UI quality matters

gstack has design commands like `/plan-design-review`, `/design-review`, and `/design-shotgun`.

Use them for landing pages, dashboards, onboarding flows, forms, and user-facing polish.

Do not force design review into backend work. That just adds ceremony.

### Use `/review` before trusting the branch

After Claude Code implements something, run `/review`.

This is one of the most useful gstack habits. The agent that wrote the code can be too optimistic about it. A separate review pass helps catch:

- missing edge cases
- weak error handling
- incomplete implementation
- test gaps
- security assumptions
- plan/code mismatch

This should become a normal step before you accept AI-written code.

### Use `/qa` when there is a real user flow

If the feature has a staging URL or browser flow, use `/qa`.

Many AI-generated changes pass tests but fail in the actual product. Buttons do not connect. Empty states break. Auth redirects fail. A modal works alone but not inside the real flow.

`/qa` matters because it tests the product like a user, not just like a compiler.

### Use `/ship` at the end, not the beginning

`/ship` is for release preparation. Use it after planning, implementation, review, and QA.

It cannot rescue messy work. It only packages work that is already ready.

## A good first workflow

Try this:

```text
1. Pick one real feature.
2. Run /office-hours to clarify the user problem.
3. Run /plan-ceo-review to reduce scope.
4. Run /plan-eng-review if the implementation is risky.
5. Let Claude Code build the smaller version.
6. Run /review.
7. Run /qa if there is a browser flow.
8. Run /ship only when it is ready.
```

The most important part is reducing scope before implementation.

gstack is useful when it stops you from building too much too early.

## When not to use gstack

Do not use the full gstack loop for everything.

It is overkill for:

- typo fixes
- one-line bugs
- simple dependency updates
- tiny refactors
- tasks with an obvious fix
- changes already covered by a failing test

For those, just tell Claude Code what to change, run the test, and move on.

The rule is simple:

> If a command reduces risk, use it. If it only adds ceremony, skip it.

## Final take

gstack is best understood as a workflow layer for Claude Code.

It helps solo builders add product thinking, architecture review, code review, QA, and release discipline to AI-assisted development.

Use it lightly at first:

- `/office-hours` when the problem is unclear
- `/plan-ceo-review` when scope may be wrong
- `/plan-eng-review` when architecture matters
- `/review` before trusting the code
- `/qa` when real user flows matter
- `/ship` when the work is ready

The goal is not to pretend Claude Code is a company.

The goal is to stop coding from a single prompt and start working through a better loop.

## Sources

- [garrytan/gstack GitHub repository](https://github.com/garrytan/gstack)
- [gstack README](https://github.com/garrytan/gstack/blob/main/README.md)
- [gstack: On the LOC controversy](https://github.com/garrytan/gstack/blob/main/docs/ON_THE_LOC_CONTROVERSY.md)
