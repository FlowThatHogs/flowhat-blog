---
title: "GSD, Karpathy Skills, Superpowers, and gstack: Four Layers for Better Coding Agents"
description: "GSD, Karpathy Skills, Superpowers, and gstack solve different coding-agent problems: behavior, project state, development process, and role-based review."
pubDate: 2026-05-07
updatedDate: 2026-05-07
lang: en
translationGroup: four-layers-for-better-coding-agents
baseSlug: 2026-05-07-four-layers-for-better-coding-agents
tags:
  - gsd
  - karpathy-skills
  - superpowers
  - gstack
  - agents
  - workflows
  - ai-engineering
heroImage: ../../assets/blog-placeholder-1.jpg
---

Coding agents are getting better, but the practical question is no longer only which model writes the best code.

The harder question is how to keep the agent inside a reliable working shape.

That is why projects such as **GSD**, **Karpathy Skills**, **Superpowers**, and **gstack** are worth comparing together. They are often discussed as Claude Code workflows, prompt packs, skill libraries, or agent frameworks. That description is not wrong, but it misses the more useful pattern.

Each one tries to control a different failure mode:

- Karpathy Skills narrows bad agent behavior.
- GSD keeps long work from losing project state.
- Superpowers turns software-development habits into reusable skills.
- gstack adds role-based review and product-team structure.

They are not the same thing. They are closer to four different layers around a coding agent.

## The shared problem: agent output is cheap, agent control is not

Modern coding agents can produce a lot of code quickly. That is useful. It is also dangerous.

The familiar failures are no longer just syntax errors. The agent makes an assumption and runs with it. It overbuilds a solution. It changes unrelated files. It forgets decisions made earlier in the project. It says the task is complete without running the check that would actually prove completion.

Andrej Karpathy described many of these issues in his public comments on LLM coding: wrong assumptions, hidden confusion, weak clarification, overcomplicated APIs, bloated abstractions, dead code, and collateral edits.[1]

That observation explains why these workflow projects exist. The model can write code. The surrounding system has to make the work inspectable, bounded, and verifiable.

## Karpathy Skills: a behavior patch

**Karpathy Skills** is the lightest layer in this group.

The popular `forrestchang/andrej-karpathy-skills` repository packages Karpathy's observations into a `CLAUDE.md`, a Claude Code plugin, a Cursor rule, and a reusable `karpathy-guidelines` skill.[2][3] The core rules are compact:

1. Think before coding.
2. Simplicity first.
3. Surgical changes.
4. Goal-driven execution.[3]

That makes Karpathy Skills less like a project-management system and more like a behavior patch for coding agents.

It is most useful when the agent's main risk is acting too fast: assuming requirements, creating speculative abstractions, touching unrelated files, or finishing without a clear success check. For a small feature, bug fix, refactor, or risky multi-file edit, those rules help keep the diff smaller and the reasoning more visible.

The limitation is also clear. Karpathy Skills does not give you durable project state. It does not create a phased roadmap. It does not simulate a product team. It tells the agent how to behave while doing the task in front of it.

That is valuable because many failures begin at that level.

For the deeper version, read [What Is Andrej Karpathy Skills?](/blog/2026-05-05-what-is-andrej-karpathy-skills/) first, then [How to Use Karpathy Guidelines](/blog/2026-05-06-how-to-use-karpathy-guidelines/) for concrete coding examples.

## GSD: a project-state layer

**GSD**, short for `get-shit-done`, works at a heavier layer.

The official GSD docs frame it around context engineering, spec-driven development, fresh-context agents, and a `.planning/` filesystem state.[4][5] Its command surface includes project creation, codebase mapping, discussion, planning, execution, verification, shipping, progress, and resume commands.[5]

The important shift is that GSD moves long-running work out of one fragile chat transcript.

A typical GSD-style flow creates files such as:

```text
.planning/
  PROJECT.md
  REQUIREMENTS.md
  ROADMAP.md
  STATE.md
  phases/
```

Then the agent can discuss a phase, plan it, execute bounded tasks, verify the result, and resume later without depending entirely on the conversation history.

GSD is strongest when the work is large enough for context rot to matter: existing codebases, multi-day features, larger refactors, or projects where requirements and implementation decisions need to survive across sessions.

The tradeoff is weight. GSD adds ceremony, files, commands, and a workflow to follow. That can be unnecessary for a simple change. But for longer work, the structure is the feature. It gives the agent something more durable than memory and something more specific than “please build this carefully.”

If you want the full GSD path, start with [What Is GSD?](/blog/2026-04-28-what-is-gsd/) and then move to [How to Actually Use GSD](/blog/2026-04-29-how-to-use-gsd/).

## Superpowers: a development-methodology layer

**Superpowers** sits in a different place.

The `obra/superpowers` repository describes itself as an agentic skills framework and software-development methodology.[6] Its skill surface includes brainstorming, writing plans, test-driven development, systematic debugging, subagent-driven development, code review, verification before completion, and finishing a development branch.[6]

The core idea is process discipline.

A raw coding-agent session often looks like this:

```text
request → edit → explain → maybe test
```

Superpowers tries to make the loop closer to ordinary engineering practice:

```text
understand → design → plan → test → implement → review → verify → finish
```

The project also cares about automatic skill use. Its README says the agent checks for relevant skills before tasks, and its contributor guidance treats skills as behavior-shaping artifacts rather than casual prose.[6][7]

That matters. A skill library is weak if the human has to remember every time which skill should be loaded. Superpowers is trying to make the development method part of the agent's default operating behavior.

This makes it useful for teams or solo builders who want repeatable development habits around AI coding: TDD when appropriate, systematic debugging instead of guessing, code review before claiming done, and verification as a required gate.

The risk is methodology overhead. Some tasks do not need a full development loop. Superpowers works best when the task is complex enough that skipping process would be more expensive than following it.

For a focused introduction, see [What Is Superpowers?](/blog/2026-05-03-what-is-superpowers/). For the practical path through its skills, see [How to Use Superpowers](/blog/2026-05-04-how-to-use-superpowers/).

## gstack: a role and review layer

**gstack** takes another approach: it models the work as a virtual engineering team.

Garry Tan's `gstack` repository positions the setup around roles such as CEO, engineering manager, designer, reviewer, QA, security, release, and documentation.[8][9] The interesting part is not that the agent receives a longer prompt. The interesting part is that different review perspectives become reusable roles.

That is useful because coding work is rarely only coding.

A feature may need product judgment, design review, engineering review, security attention, QA checks, release notes, and documentation. A single agent can try to cover all of that, but it often collapses those perspectives into one generic answer.

gstack's role framing pushes the agent to look at the work from more than one angle.

That makes it especially relevant for product-facing changes, release work, QA-heavy tasks, and workflows inspired by multi-agent or multi-role systems. It is also why gstack connects naturally to OpenClaw- or Hermes-style discussions about roles, teams, and reusable agent sessions.

The caution is that roles are not proof of quality. A “security reviewer” role still has to actually inspect the right risks. A “QA” role still needs useful checks. And productivity or LOC-based claims should be treated carefully, especially when they are self-reported or controversial.[10]

The value of gstack is not that a role name guarantees expertise. The value is that role separation makes missing perspectives easier to notice.

For more context, read [What gstack Gets Right About AI Agents: Roles Beat Prompts](/blog/2026-04-30-gstack-roles-beat-prompts/) and the follow-up [How to Use gstack](/blog/2026-05-02-how-to-use-gstack/).

## The comparison

Here is the practical map:

| Layer | Karpathy Skills | GSD | Superpowers | gstack |
|---|---|---|---|---|
| Main unit | Rule file / skill | Project workflow | Skill library / methodology | Role-based team structure |
| Main problem | Bad agent habits | Context rot and lost plans | Improvised development process | Missing product/review perspectives |
| Best for | Small to medium coding tasks | Longer features and existing codebases | Repeatable engineering workflows | Product, QA, review, release work |
| Core value | Smaller, safer agent behavior | Durable state and phased execution | Process discipline | Multiple review lenses |
| Weight | Light | Medium to heavy | Medium | Medium to heavy |
| Main risk | Too limited for large projects | Too much process for small tasks | Methodology overhead | Role-play without real verification |

This table also shows why “which one wins?” is the wrong question.

They solve different parts of the agent-control problem.

## How to combine them in practice

A practical stack can be simple.

For a small bug fix, start with Karpathy-style rules:

```text
State assumptions, make the smallest change, avoid unrelated edits, and verify the fix.
```

For a larger feature in an existing codebase, add GSD-style project state:

```text
Map the codebase, capture requirements, discuss decisions, plan the phase, execute bounded tasks, verify before shipping.
```

For recurring development work, add Superpowers-style process:

```text
Use brainstorming before design, writing-plans before execution, TDD when behavior is testable, systematic debugging for unknown failures, and verification before completion.
```

For product-facing work, add gstack-style roles:

```text
Review the plan as product, engineering, design, QA, security, and release documentation before calling it done.
```

That does not mean every task needs every layer. The layers should match the risk.

A one-line copy change does not need a virtual engineering team. A multi-day feature should not depend on a single chat transcript and a hopeful final message.

## The bigger takeaway

These projects point in the same direction: coding-agent reliability is becoming a workflow design problem.

The model matters. Better models reduce some mistakes. But model choice alone does not decide whether the agent preserves scope, remembers decisions, uses tests, avoids unrelated edits, or brings the right review perspective into the task.

Karpathy Skills answers at the behavior level. GSD answers at the project-state level. Superpowers answers at the development-process level. gstack answers at the role and review level.

That is the useful way to compare them.

The future of coding agents will not be one giant prompt that fixes everything. It will be a stack of small control layers: rules, state, skills, reviews, tests, and roles. The better the task structure, the more useful the agent becomes.

## References

1. Andrej Karpathy, X post on LLM coding workflow and failure modes  
   https://x.com/karpathy/status/2015883857489522876
2. Forrest Chang, `andrej-karpathy-skills` repository  
   https://github.com/forrestchang/andrej-karpathy-skills
3. Forrest Chang, `karpathy-guidelines` skill file  
   https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/skills/karpathy-guidelines/SKILL.md
4. GSD / get-shit-done repository  
   https://github.com/gsd-build/get-shit-done
5. GSD User Guide and command reference  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/USER-GUIDE.md  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/COMMANDS.md
6. Jesse Vincent / obra, Superpowers repository  
   https://github.com/obra/superpowers
7. Jesse Vincent / obra, Superpowers contributor guidance  
   https://github.com/obra/superpowers/blob/main/CLAUDE.md
8. Garry Tan, `gstack` repository  
   https://github.com/garrytan/gstack
9. Garry Tan, gstack skill deep dives  
   https://github.com/garrytan/gstack/blob/main/docs/skills.md
10. Garry Tan, gstack note on the LOC controversy  
   https://github.com/garrytan/gstack/blob/main/docs/ON_THE_LOC_CONTROVERSY.md
