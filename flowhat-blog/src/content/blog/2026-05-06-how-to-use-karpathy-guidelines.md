---
title: "How to Use Karpathy Guidelines: Five Examples for Safer AI Coding"
description: "Karpathy Guidelines work best as a lightweight behavior contract for coding agents: clarify assumptions, keep implementations small, make surgical edits, and verify success before finishing."
pubDate: 2026-05-06
updatedDate: 2026-05-06
lang: en
translationGroup: how-to-use-karpathy-guidelines
baseSlug: 2026-05-06-how-to-use-karpathy-guidelines
tags:
  - claude-code
  - codex
  - agents
  - skills
  - ai-engineering
  - workflows
heroImage: ../../assets/blog-placeholder-1.jpg
---

Karpathy Guidelines are useful when you treat them as a working rulebook, not as a magic prompt.

In the previous post, [we looked at what Andrej Karpathy Skills are](/blog/2026-05-05-what-is-andrej-karpathy-skills/): a community-made package by Forrest Chang that turns Karpathy's public comments about LLM coding failures into `CLAUDE.md`, a Claude Code plugin, a reusable `karpathy-guidelines` skill, and related instruction files.[1][2]

This follow-up is more practical. If you load the skill, what should you actually ask the agent to do differently?

The short answer is this: make the agent behave less like a hasty junior developer.

The guidelines push four habits:

1. **Think Before Coding** — surface assumptions before editing.
2. **Simplicity First** — solve the requested problem without speculative architecture.
3. **Surgical Changes** — touch only the code that needs to change.
4. **Goal-Driven Execution** — define success and verify it before saying done.[2]

That sounds simple. The value appears when you apply the rules to real coding-agent tasks.

## The basic prompt

You do not need a complicated ritual. For a non-trivial task, start with a prompt like this:

```text
Use the karpathy-guidelines skill for this task.
Before editing, state assumptions and unclear points.
Prefer the smallest implementation that solves the request.
Make surgical changes only.
Define how you will verify success, then run that verification before finishing.
```

For tiny edits, this is too much. A typo fix does not need a planning loop. But for features, refactors, bug fixes, and multi-file changes, this prompt changes the shape of the session.

A weak agent loop looks like this:

```text
ask → assume → edit → explain confidently
```

A better loop looks like this:

```text
clarify → choose the smallest path → edit narrowly → test or inspect → report what changed
```

The examples below show where that matters.

## Example 1: an ambiguous feature request

Bad prompt:

```text
Add a user export feature.
```

A coding agent can easily run with that. It may assume the export should include every user, use CSV, run from the admin dashboard, include all fields, ignore permissions, and work synchronously. Some of those choices may be wrong.

Karpathy Guidelines should make the agent stop before implementation:

```text
I see several decisions hidden in this request:
- Should export include all users or the current filtered result?
- Should the format be CSV, JSON, or XLSX?
- Which fields are allowed to leave the system?
- Should this be an admin-only action?
- Is the data size small enough for a direct download, or does it need a background job?

My assumption, unless corrected: admin-only CSV export of the currently filtered user list, with only non-sensitive fields.
```

That is not bureaucracy. It prevents the most expensive mistake: building the wrong thing quickly.

Once the assumptions are confirmed, the implementation can stay small. Add the route, wire the button, include the allowed fields, and verify with the relevant test or manual check.

Use this pattern when the request contains hidden product, security, data, or UX decisions.

## Example 2: stopping overengineering

Bad prompt:

```text
Add CSV export for invoices.
```

Bad agent output:

```text
ExportService
ExportProviderInterface
CsvExportAdapter
JsonExportAdapter
ExportJobQueue
ExportRegistry
export.config.ts
```

Maybe that architecture will be useful one day. Maybe it will not. The user asked for CSV export, not an export platform.

Karpathy Guidelines should push the agent toward the smallest useful implementation:

```text
I will implement only CSV invoice export for the requested screen.
I will not add a generic export framework unless there is already an existing pattern in the codebase.
Verification: run the existing invoice tests and manually inspect one generated CSV row.
```

The important move is not “write fewer lines” for its own sake. The important move is to keep future maintenance proportional to the actual problem.

AI agents make complexity feel cheap because they can generate it quickly. Review, debugging, and ownership are still expensive.

## Example 3: avoiding collateral edits

Bad prompt:

```text
Change the checkout button label from “Continue” to “Pay now”.
```

Bad agent behavior:

- reformats the whole component;
- renames local variables;
- changes import ordering;
- rewrites nearby conditional rendering;
- updates unrelated CSS classes.

The final UI may work, but the diff is noisy. Reviewers now have to ask whether the unrelated changes are intentional.

With the guidelines loaded, the agent should behave more narrowly:

```text
This is a surgical text change.
I will only update the button label and any test/snapshot that directly expects the old label.
I will not reformat or refactor adjacent code.
```

For coding agents, reviewability is part of correctness. A change that works but hides itself inside a messy diff is harder to trust.

Use this pattern for copy changes, styling tweaks, one-line bug fixes, and targeted configuration edits.

## Example 4: fixing a bug without guessing

Bad prompt:

```text
The date filter is broken. Fix it.
```

A rushed agent may inspect one file, guess that timezone handling is wrong, patch a helper, and declare success. Sometimes that works. Often it only moves the bug.

Karpathy Guidelines should turn the task into a verifiable loop:

```text
First I will reproduce the bug or identify the failing case.
Then I will write or update a test for that case.
Then I will make the smallest code change needed for the test to pass.
Verification: run the date-filter test file and any related query tests.
```

A better agent response might start like this:

```text
I need one concrete failing case. I will check how the filter handles inclusive end dates, local timezone conversion, and empty dates. If an existing test already covers this area, I will add the failing case there instead of creating a new test structure.
```

This is where “Goal-Driven Execution” matters most. The agent should not be rewarded for sounding done. It should be rewarded for making the failure reproducible and then making the check pass.

## Example 5: refactoring without drifting

Bad prompt:

```text
Refactor this module.
```

This request is too open. Refactor for what?

- Smaller functions?
- Less duplication?
- Better type boundaries?
- Faster runtime?
- Easier testing?
- A simpler public API?

Without a goal, a coding agent may produce an impressive but arbitrary rewrite. That can be worse than doing nothing.

A Karpathy-guided agent should stop and narrow the objective:

```text
Before refactoring, I need the target outcome.
Possible goals:
1. reduce duplication while preserving the public API;
2. split parsing and validation for easier testing;
3. improve performance without changing behavior;
4. make the module easier to read with smaller helpers.

Which goal should I optimize for?
```

Once the goal is chosen, verification becomes clear:

```text
Success criteria:
- public API unchanged;
- existing tests pass before and after;
- duplicated validation branches are consolidated;
- no unrelated files changed.
```

That is the difference between “refactor” as a vibe and refactor as controlled engineering work.

## How to use it with Claude Code, Codex, or Hermes

The exact installation method differs by client, but the operating model is the same.

In Claude Code, the repository provides a `CLAUDE.md` and plugin-oriented packaging. In skills-compatible clients, the `skills/karpathy-guidelines/SKILL.md` file gives the same behavioral rules as a reusable skill. In other agents, you can put the same four principles into project instructions or a repository-level agent file.[1][2]

For daily work, use it in four places:

- **Feature work**: force assumptions and scope to be stated before code.
- **Bug fixes**: require reproduction and verification.
- **Refactors**: define the refactor goal before changing structure.
- **Reviews**: look for overengineering, unrelated edits, missing tests, and hidden assumptions.

The skill is less useful for one-line edits where the overhead is larger than the risk. The original `SKILL.md` also notes this tradeoff: the guidelines bias toward caution, so trivial tasks may not need the full process.[2]

## A review checklist based on the guidelines

After the agent finishes, review the result with four questions:

1. **Assumptions**: Did it state unclear decisions before acting?
2. **Simplicity**: Did it add architecture that was not requested?
3. **Diff discipline**: Did every changed line connect to the task?
4. **Verification**: Did it run or define a meaningful success check?

If the answer is no, send it back with a tighter instruction:

```text
Re-apply karpathy-guidelines.
Reduce the change to the requested scope.
Remove speculative abstractions.
List the exact verification you ran or could not run.
```

That is often enough to turn a sprawling agent patch into something reviewable.

## What the skill cannot do

Karpathy Guidelines do not make generated code correct by default. They do not replace tests, CI, code review, type checking, security review, or domain knowledge.

They also do not remove the need for human judgment. Sometimes the agent should ask. Sometimes it should proceed with an explicit assumption. Sometimes a larger abstraction is justified because the codebase already has that pattern.

The point is not to make every coding session slower. The point is to stop the agent from silently choosing risky defaults.

## The practical takeaway

The useful part of Karpathy Guidelines is not the celebrity name or the star count. It is the behavioral contract.

Before coding, the agent should reveal assumptions. During implementation, it should keep the solution small. When editing, it should avoid collateral damage. Before finishing, it should verify the result.

That is a modest idea, but it matches the current reality of AI coding well. Modern coding agents are powerful enough to change a lot of software quickly. That makes their failure modes more important, not less.

A small guideline file will not make an agent perfect. It can make the agent easier to supervise. For real projects, that is already useful.

## References

[1] `forrestchang/andrej-karpathy-skills` GitHub repository, checked May 6, 2026: https://github.com/forrestchang/andrej-karpathy-skills

[2] `karpathy-guidelines` skill file, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/skills/karpathy-guidelines/SKILL.md

[3] Andrej Karpathy on X, post about Claude/Codex-style coding-agent workflow and pitfalls: https://x.com/karpathy/status/2015883857489522876
