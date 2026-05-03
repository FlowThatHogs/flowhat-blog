---
title: "What Is Superpowers?"
description: "Superpowers is a software-development methodology and skills framework for coding agents, available as an official Claude Code skill and usable across Codex, Cursor, OpenCode, Copilot CLI, and Gemini CLI."
pubDate: 2026-05-03
updatedDate: 2026-05-03
lang: en
translationGroup: what-is-superpowers
baseSlug: 2026-05-03-what-is-superpowers
tags:
  - superpowers
  - claude-code
  - codex
  - agents
  - workflows
  - ai-engineering
heroImage: ../../assets/blog-placeholder-1.jpg
---

**Superpowers** is a software-development methodology and skills framework for coding agents.

The short version is simple: it gives an AI coding agent a set of reusable skills for planning, testing, debugging, reviewing, and finishing software work. But the more important part is not the skill files by themselves. Superpowers also includes the operating discipline that tells the agent to check and use those skills before it rushes into implementation.[1]

That is why it should not be understood as just another prompt pack.

A prompt pack gives the model better instructions. Superpowers tries to give the agent a development process: ask before building, design before implementing, plan before changing files, test before trusting code, review before merging, and verify before claiming the work is done.

At the time of writing, GitHub's API showed `obra/superpowers` with roughly **176,900 stars**, **15,600 forks**, and an MIT license.[2] Those numbers are not proof that the methodology is right for every project. They do show that developers are paying attention to a real problem: coding agents can produce a lot of output, but output needs process if it is going to become reliable software.

## What Superpowers gives a coding agent

Superpowers gives the agent named skills for the parts of software work that often get skipped in a raw chat session.

The current skills include:[1][3]

- `brainstorming`
- `using-git-worktrees`
- `writing-plans`
- `subagent-driven-development`
- `executing-plans`
- `test-driven-development`
- `systematic-debugging`
- `requesting-code-review`
- `receiving-code-review`
- `verification-before-completion`
- `finishing-a-development-branch`
- `writing-skills`

Individually, these skills are understandable. `brainstorming` helps the agent clarify intent before building. `writing-plans` turns an approved design into small implementation tasks. `test-driven-development` pushes the agent toward red-green-refactor instead of writing code first and testing later. `systematic-debugging` slows the agent down when it hits a bug, so it investigates the cause instead of guessing. `verification-before-completion` blocks the familiar failure mode where an agent says something is fixed without actually proving it.

Together, those skills form a workflow.

That workflow is the point of Superpowers. It is not only trying to make the model smarter. It is trying to make the model work inside a repeatable software-development loop.

## The basic idea: process before output

Most coding-agent failures do not start with syntax errors. They start earlier.

The user asks for a feature. The agent assumes the requirement. It chooses an architecture without making the tradeoff visible. It edits files before there is a plan. It writes tests after the fact, or skips them. It finishes by checking a narrow happy path and then confidently reports success.

Superpowers pushes against that behavior.

The README describes a basic workflow that starts with `brainstorming`, moves through design approval, creates a concrete implementation plan, uses subagents or execution sessions for tasks, applies TDD during implementation, requests code review between tasks, and finishes the branch only after verification.[1]

The shape is straightforward:

```text
understand → design → plan → implement with tests → review → verify → finish
```

There is nothing mystical here. It is ordinary engineering discipline, packaged so a coding agent is more likely to follow it.

## Why the skill trigger matters

A folder full of good instructions is not enough.

The hard part is getting the agent to use the right instruction at the right moment. If the human has to remember every time to say "please brainstorm first" or "please verify before claiming completion," the workflow still depends too much on manual supervision.

Superpowers treats this as a core problem. Its README says the agent checks for relevant skills before any task and that the workflows are mandatory, not suggestions.[1] The project contributor guidelines make the same point from another angle: skills are behavior-shaping artifacts, not casual prose. Changes to skills require evaluation, and new host integrations must prove that the bootstrap loads automatically and triggers the right behavior before code is written.[4]

That is one of the most important ideas in the project.

Superpowers is not just a library of instructions. It is a system for making those instructions part of the agent's default operating behavior.

## Official Claude Code support

Superpowers is available through Claude Code's official plugin marketplace.[1]

That matters because it makes the project feel less like a private configuration and more like a first-class skills package for Claude Code users. The repository includes Claude plugin metadata under `.claude-plugin/plugin.json`, where the package is named `superpowers` and described as a core skills library for Claude Code covering TDD, debugging, collaboration patterns, and proven techniques.[7]

So if someone sees Superpowers inside Claude Code, they are not looking at a random prompt copied into a local folder. They are looking at the Claude-facing package of the same Superpowers project.

But Claude Code is only one host.

## It is not Claude-only

Superpowers is designed to work beyond Claude Code.

The README lists installation paths for Claude Code, OpenAI Codex CLI, the Codex app, Cursor, OpenCode, GitHub Copilot CLI, and Gemini CLI.[1] The repository also includes Codex plugin metadata under `.codex-plugin/plugin.json`, where Superpowers is described as an agentic skills framework and software-development methodology for planning, TDD, debugging, and collaboration workflows.[8]

That cross-host support is important.

It means Superpowers is not mainly a Claude feature. It is a portable workflow layer that can sit above different coding-agent environments. The host may be Claude Code, Codex, Cursor, OpenCode, Copilot CLI, or Gemini CLI. The underlying claim is the same: when an agent is doing software work, it needs process, not just model capability.

This is why Superpowers is worth watching. The useful unit is not only the model and not only the editor. The useful unit is the development loop around the agent.

## What kind of work is it for?

Superpowers is most relevant when the task is large enough that agent drift becomes expensive.

For a one-line typo fix, the full process can be too much. But for multi-file features, risky refactors, debugging sessions, or work that needs review and tests, the value is easier to see. The agent needs to preserve intent, avoid silent assumptions, make changes in a controlled order, and prove the result.

Superpowers gives names to those checkpoints.

That does not make the agent autonomous in a magical sense. It gives the human a more inspectable process. Instead of watching one long stream of code generation, the human can see the agent move through more familiar stages: design, plan, test, review, verify.

That is a better shape for serious software work.

## The bigger takeaway

Superpowers is best understood as a process layer for coding agents.

It packages software-development habits that experienced engineers already care about: clarify the goal, keep work isolated, plan in small steps, write tests, debug systematically, request review, and verify completion.

The important move is that Superpowers tries to make those habits automatic enough that the agent follows them without the human repeating the same process instructions in every session.

That is why Superpowers is more than a Claude plugin and more than a prompt pack.

It is a sign of where coding-agent tooling is going: from clever prompts toward reusable skills, and from reusable skills toward repeatable development methods.

Not one giant prompt.

A process the agent is expected to follow.

## References

1. Jesse Vincent / obra, *Superpowers* README  
   https://github.com/obra/superpowers
2. GitHub API, `obra/superpowers` repository metadata, checked 2026-05-03  
   https://api.github.com/repos/obra/superpowers
3. Jesse Vincent / obra, *Superpowers skills directory*  
   https://github.com/obra/superpowers/tree/main/skills
4. Jesse Vincent / obra, *Superpowers Contributor Guidelines*  
   https://github.com/obra/superpowers/blob/main/CLAUDE.md
5. Jesse Vincent / obra, *Superpowers Claude plugin metadata*  
   https://github.com/obra/superpowers/blob/main/.claude-plugin/plugin.json
6. Jesse Vincent / obra, *Superpowers Codex installation notes*  
   https://github.com/obra/superpowers/blob/main/.codex/INSTALL.md
7. Jesse Vincent / obra, *Superpowers Claude plugin metadata*  
   https://github.com/obra/superpowers/blob/main/.claude-plugin/plugin.json
8. Jesse Vincent / obra, *Superpowers Codex plugin metadata*  
   https://github.com/obra/superpowers/blob/main/.codex-plugin/plugin.json
