---
title: "How to Use Superpowers: A Practical Skill Path for Coding Agents"
description: "A practical guide to using Superpowers skills in stages: start with brainstorming, planning, TDD, debugging, and verification, then add worktrees, review, subagents, parallel agents, and custom skills when the work gets larger."
pubDate: 2026-05-04
updatedDate: 2026-05-04
lang: en
translationGroup: how-to-use-superpowers
baseSlug: 2026-05-04-how-to-use-superpowers
tags:
  - superpowers
  - claude-code
  - codex
  - agents
  - workflows
  - ai-engineering
heroImage: ../../assets/blog-placeholder-1.jpg
---

Superpowers gives coding agents a working process.

If you want the broader explanation first, start with [What Is Superpowers?](/blog/2026-05-03-what-is-superpowers/). This guide is the practical follow-up: which skills to use first, when to add the heavier ones, and how to keep the workflow from turning into ceremony.

The useful way to think about Superpowers is simple. It gives the agent named skills for parts of software work that raw chat sessions often skip: brainstorming, planning, testing, debugging, review, verification, and finishing the branch.[1][2]

You do not need every skill on day one.

Start small. Add more process when the task becomes larger, riskier, or harder to review.

## The basic loop

A typical coding-agent failure looks like this:

```text
ask → assume → edit files → say done
```

That can be fine for a typo. It is not fine for a feature, refactor, bug investigation, or anything that touches multiple files.

Superpowers pushes the work toward a better loop:

```text
understand → plan → implement → test → review → verify → finish
```

That is the shape to keep in mind. The point is not to make every task slow. The point is to give the agent enough process for the risk in front of it.

## Beginner path: the first skills to use

If you are new to Superpowers, start with these five skills:

- `brainstorming`
- `writing-plans`
- `test-driven-development`
- `systematic-debugging`
- `verification-before-completion`

These cover the most common AI coding problems: unclear requirements, rushed implementation, weak tests, guessy debugging, and early completion reports.

## `brainstorming`: use it before code changes

Use `brainstorming` when the request is still loose.

Good examples:

- "Add user authentication"
- "Improve the dashboard"
- "Make the app faster"
- "Refactor this module"
- "Add an AI assistant feature"

These requests hide decisions. Authentication can mean passwords, OAuth, sessions, roles, admin screens, migrations, email flows, and security rules. "Make it faster" can mean database indexes, frontend rendering, caching, API shape, or background jobs.

Before the agent edits files, make it surface those decisions.

Practical prompt:

```text
Use the brainstorming skill before implementation.
Clarify the feature, list the tradeoffs, and propose a practical direction.
Do not edit files yet.
```

You do not need a huge design document. You need the assumptions out in the open before code starts moving.

## `writing-plans`: use it once the direction is clear

After the direction is chosen, use `writing-plans`.

This skill turns the idea into small implementation steps. A useful plan should include:

- likely files to change
- order of work
- tests to add or update
- expected behavior
- risks or edge cases to watch

Practical prompt:

```text
Use the writing-plans skill.
Create a short implementation plan with small tasks.
Include likely files, test strategy, and verification steps.
Wait for approval before editing code.
```

The plan does not need to be long. For small changes, five bullets may be enough. For multi-file work, the plan should be specific enough that you can reject the direction before the repository changes.

## `test-driven-development`: use it when behavior matters

Use `test-driven-development` when the work changes behavior that can break.

That includes:

- business logic
- API behavior
- data transformation
- UI state logic
- auth rules
- billing logic
- agent workflows
- bug fixes with clear reproduction steps

The point is not to be religious about TDD. The point is to make the agent prove the behavior instead of only producing code that looks plausible.

Practical prompt:

```text
Use the test-driven-development skill.
First write or update a failing test that captures the expected behavior.
Then implement the smallest change needed to pass.
Refactor only if needed after the test passes.
```

If the project has no test setup, do not let the agent pretend one exists. Ask for the best available verification path instead: a script, a build, a manual browser flow, a reproduction command, or a small temporary check that can be removed afterward.

## `systematic-debugging`: use it when the agent starts guessing

Use `systematic-debugging` whenever something fails and the agent starts patching randomly.

Bad debugging usually looks like this:

```text
try a change → still broken → try another change → still broken → guess again
```

A better loop looks like this:

```text
reproduce → inspect evidence → form a hypothesis → test it → fix the cause → verify
```

Practical prompt:

```text
Use the systematic-debugging skill.
Do not guess. First reproduce the issue, gather evidence, identify likely causes, and test one hypothesis at a time.
```

This is useful for flaky tests, build errors, dependency problems, race conditions, frontend state bugs, API integration failures, and agent tool-call failures.

Do not let the agent patch blindly. Make it say what it knows, what it suspects, and what evidence supports the fix.

## `verification-before-completion`: use it before accepting "done"

This should become a default habit.

Coding agents often report completion too early. They may have edited the file, but not run the build. They may have fixed one test, but not checked the related path. They may have changed code, but not verified the user-facing behavior.

Practical prompt:

```text
Use verification-before-completion before you report this as done.
Run the relevant tests or checks, inspect the result, and summarize exactly what was verified.
If something was not verified, say so clearly.
```

The agent should not only say what changed. It should say how it knows the change works.

## A simple beginner workflow

For most first uses, this loop is enough:

```text
brainstorm → plan → implement with tests → debug systematically → verify
```

You can ask for it directly:

```text
Use Superpowers for this task.

First, use brainstorming to clarify the approach.
Then write a short plan.
After I approve the plan, implement with test-driven-development where possible.
If anything fails, use systematic-debugging.
Before saying done, use verification-before-completion and tell me exactly what passed.
```

This gives the agent a clear working shape without forcing the full Superpowers workflow onto every task.

## Intermediate path: when the task becomes larger

Once the basic loop feels natural, add these skills:

- `using-git-worktrees`
- `executing-plans`
- `requesting-code-review`
- `receiving-code-review`
- `finishing-a-development-branch`

These are useful when the work is closer to a real development branch than a single edit.

## `using-git-worktrees`: isolate risky work

Use `using-git-worktrees` when the agent is doing a feature, refactor, or experiment that should not disturb your current working directory.

It helps when:

- several agents may work in parallel
- the main branch needs to stay clean
- the change is risky
- the task may take several rounds
- you want an easy way to abandon the experiment

Practical prompt:

```text
Use the using-git-worktrees skill.
Create an isolated worktree for this feature before making changes.
Keep the main working directory clean.
```

A worktree makes agent work easier to inspect and easier to throw away if the direction is wrong.

## `executing-plans`: keep the agent tied to the plan

After a plan exists, use `executing-plans` to keep the agent from drifting.

Agents often start with a plan, then make extra changes, skip steps, or solve a nearby problem instead of the requested one.

Practical prompt:

```text
Use the executing-plans skill.
Work through the approved plan step by step.
After each step, report what changed, what was verified, and whether the plan needs adjustment.
Do not expand scope without asking.
```

This is useful for multi-file changes. The point is controlled progress, not paperwork.

## `requesting-code-review` and `receiving-code-review`: add a review pass

For serious work, the agent should not be the only reviewer of its own changes.

Use `requesting-code-review` after a meaningful chunk of work is complete.

Practical prompt:

```text
Use the requesting-code-review skill.
Review the current changes for correctness, test coverage, security, maintainability, and unnecessary complexity.
Focus on real issues, not style nitpicks.
```

When feedback comes back, use `receiving-code-review`:

```text
Use the receiving-code-review skill.
Address the review comments one by one.
Explain what you changed, what you intentionally did not change, and why.
Re-run the relevant verification after the fixes.
```

This makes the agent behave more like a developer working through review instead of a chatbot trying to finish in one pass.

## `finishing-a-development-branch`: close the loop

Use `finishing-a-development-branch` when the work is ready to wrap up.

This is the final cleanup stage:

- check git status
- review the diff
- run tests and builds
- remove temporary files
- update docs if needed
- prepare a commit or PR summary
- confirm that unrelated files are not included

Practical prompt:

```text
Use the finishing-a-development-branch skill.
Review the full diff, run the required checks, remove temporary artifacts, and prepare a concise branch summary.
Do not commit or push unless I explicitly approve.
```

This matters most when the agent has touched many files. Accidental changes usually show up near the end.

## Advanced path: using Superpowers as an agent workflow system

Advanced users can use Superpowers as more than a list of individual skills.

These skills become useful when one long agent thread is hard to control:

- `subagent-driven-development`
- `dispatching-parallel-agents`
- `writing-skills`

They are powerful, but they are not default moves. Use them when the task is large enough to justify the coordination cost.

## `subagent-driven-development`: split serious work into focused agents

Use `subagent-driven-development` when the project has independent parts.

Examples:

- one agent researches the codebase
- one agent implements backend changes
- one agent implements frontend changes
- one agent writes tests
- one agent reviews the final diff

Practical prompt:

```text
Use subagent-driven-development.
Break this project into independent workstreams.
Assign each subagent a focused task with clear inputs and expected outputs.
After they finish, synthesize the results and verify the integrated change.
```

This keeps context smaller and responsibilities clearer.

Still, subagents can be wrong. Treat their output as input, not proof. The integrated result still needs verification.

## `dispatching-parallel-agents`: use parallelism only with clean boundaries

Parallel agents help when the tasks are truly independent.

Good use cases:

- inspect three possible libraries
- compare two implementation approaches
- review different parts of a codebase
- generate separate test strategies
- research docs while another agent inspects local code

Bad use cases:

- several agents editing the same file
- unclear ownership
- no merge plan
- no final verification step

Practical prompt:

```text
Use dispatching-parallel-agents only for independent tasks.
Give each agent a separate scope.
After they return, compare their outputs, resolve conflicts, and verify the final decision.
```

Parallelism saves time only when the boundaries are clean. Otherwise it creates cleanup work.

## `writing-skills`: turn repeated workflows into reusable skills

Use `writing-skills` when you keep giving the agent the same instructions.

Examples:

- your project has a release checklist
- your team has a preferred testing workflow
- your frontend app has a fixed QA process
- your backend service has a migration procedure
- your blog has a multilingual publishing workflow
- your agent setup has a repeatable debugging process

Practical prompt:

```text
Use the writing-skills skill.
Turn this repeated workflow into a reusable skill.
Include when to use it, exact steps, common pitfalls, and verification checks.
```

This is where Superpowers becomes project-specific. You are not only using the skills from the package. You are teaching the agent how work should happen in your own environment.

## A practical skill map

| Situation | Use this skill |
|---|---|
| The task is vague | `brainstorming` |
| The direction is chosen | `writing-plans` |
| The behavior needs proof | `test-driven-development` |
| Something is broken | `systematic-debugging` |
| The agent says it is done | `verification-before-completion` |
| The change is risky | `using-git-worktrees` |
| The plan is ready | `executing-plans` |
| The work needs review | `requesting-code-review` |
| Review feedback exists | `receiving-code-review` |
| The branch is almost done | `finishing-a-development-branch` |
| The project is large | `subagent-driven-development` |
| Tasks are independent | `dispatching-parallel-agents` |
| The workflow repeats often | `writing-skills` |

## How to choose the right amount of process

Use Superpowers like a ladder.

Start with the beginner loop:

```text
brainstorm → plan → test → debug → verify
```

Add branch discipline when the change becomes more serious:

```text
worktree → execute plan → review → finish branch
```

Use agent orchestration only when the task is large enough:

```text
split work → run subagents → compare results → integrate → verify
```

Small changes do not need the full workflow. Risky changes should not run on vibes.

Match the skill to the risk of the task.

## What to remember

Superpowers is useful because it gives coding agents a process.

For beginners, it reduces the obvious failure modes: vague requirements, rushed implementation, missing tests, random debugging, and early completion reports.

For intermediate users, it turns agent work into a cleaner development branch with planning, review, and finish steps.

For advanced users, it supports repeatable workflows with subagents, parallel work, and custom skills.

It does not replace engineering judgment. It makes the agent more likely to follow it.

## References

1. Jesse Vincent / obra, *Superpowers* README  
   https://github.com/obra/superpowers
2. Jesse Vincent / obra, *Superpowers skills directory*  
   https://github.com/obra/superpowers/tree/main/skills
3. Jesse Vincent / obra, *Superpowers Contributor Guidelines*  
   https://github.com/obra/superpowers/blob/main/CLAUDE.md
