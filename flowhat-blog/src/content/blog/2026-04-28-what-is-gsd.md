---
title: "What Is GSD (get-shit-done)?"
description: "GSD (get-shit-done) is not just another Claude Code prompt pack. It is a workflow system for coding agents built around planning, execution, verification, and persistent project state."
pubDate: 2026-04-28
updatedDate: 2026-04-29
translationGroup: what-is-gsd
baseSlug: 2026-04-28-what-is-gsd
heroImage: ../../assets/blog-placeholder-1.jpg
lang: en
tags:
  - claude-code
  - agents
  - workflows
  - context-engineering
  - spec-driven-development
  - gsd
---

**GSD (get-shit-done)**, short for **Get Shit Done**, is easy to misread.

The name sounds like a joke. At a glance, the repo can look like one more Claude Code prompt pack with aggressive branding. But if you read past the name, that is not really what it is.

GSD is better understood as a **workflow system for coding agents**.[1][2] It sits on top of tools like Claude Code, Codex, Gemini CLI, Copilot, Cursor, and others, and tries to add enough structure around them that they can handle bigger software tasks without falling apart halfway through.[1]

That is why the project matters.

At the time of writing, `gsd-build/get-shit-done` has more than **58,000 GitHub stars**, and the npm package reports roughly **196,000 downloads over the last month**.[1][6] Those numbers do not prove the workflow is right for everyone. But they do make it worth asking a simple question:

**What is GSD actually trying to be?**

## GSD is closer to a workflow operating system than a prompt pack

The repo describes itself as a **meta-prompting, context engineering, and spec-driven development system**.[1] That can sound vague until you look at the architecture docs.

There, GSD says it sits **between the user and AI coding agents** and provides four things:[2]

1. context engineering  
2. multi-agent orchestration  
3. spec-driven development  
4. state management  

That is a much bigger ambition than “better prompts.”

The basic loop is straightforward:[3][4]

- start a project
- lock in preferences for a phase
- research and plan the work
- execute it
- verify it
- ship it if it passes

GSD stores that state in a `.planning/` directory made of Markdown and JSON, so the project memory survives context resets and stays visible to both the human and the agent.[2]

That is the key move. Instead of trusting one long chat thread to hold the whole project together, GSD pushes memory and workflow out into files, phases, and commands.

That is why calling it a prompt pack is too small. A prompt pack decorates a model. GSD tries to **run the work around the model**.

## What problem is GSD trying to solve?

The README is unusually direct here.

The claim is not that Claude Code or similar tools are useless on their own. The claim is that raw vibecoding often becomes inconsistent, fragile, and hard to manage once the task stops being trivial.[1]

That is a familiar failure mode if you have used coding agents for anything larger than a one-file demo:

- the model forgets earlier constraints
- long sessions get muddy
- implementation drifts away from the original goal
- testing is easy to postpone
- “almost right” code piles up into a real mess

GSD treats those as **workflow problems**, not just model problems.

Its answer is not “wait for the next model release.” Its answer is to add process around the agent:

- move requirements into artifacts
- split work into phases
- give fresh context to focused agents
- verify plans before execution
- verify results after execution[2][3][4]

That is the core idea. GSD is trying to make coding agents less improvisational and more repeatable.

## What is inside GSD?

The repo is not small. The current public docs describe:

- **86 commands**
- **33 agents**
- a `.planning/` directory for state and artifacts
- a phase-based workflow for planning and execution[1][5]

Under the hood, the system revolves around a few recurring components:

- **project artifacts** like requirements, roadmap, state, and phase files
- **commands** that move work from one stage to the next
- **specialized agents** that do planning, research, execution, verification, and debugging
- **persistent state** stored outside the chat window[2][3][5]

This is what makes the system interesting. GSD is not mainly trying to make the model sound smarter. It is trying to make the whole workflow hold together.

The design instinct is simple: **the complexity should live in the system, not in the user’s repeated effort**.[1] Instead of making the user restate the same context over and over, GSD tries to keep that context in files, plans, and structured workflow steps.

Another way to put it: GSD is a version of **spec-driven development for people who do not want enterprise theater**.

## Why do people pay attention to it?

Part of it is obvious: the repo is large, active, and easy to install.[1][6]

But the deeper reason is that it gives a name and a shape to a pain many coding-agent users already feel. A stronger base model helps, but it does not automatically solve:

- context drift
- planning drift
- sloppy execution
- weak verification
- long-session fatigue

GSD’s popularity suggests that many users now want a workflow layer around the model, not just the model by itself.

That is also why the project’s tone lands with some people. It is not selling enterprise ceremony. It is selling a way for solo developers or small teams to keep agent work from turning into mush.

The practical question of **how people actually use GSD day to day** is important too. I handle that separately in the follow-up: [How to Actually Use GSD: The Workflow Behind Get Shit Done](/blog/2026-04-29-how-to-use-gsd/).

## What are the tradeoffs?

GSD is not free structure.

The project’s own docs admit that the full install is heavy. The README says the full system ships with **86 skills and 33 subagents**, which can create about **~12k tokens of fixed overhead per turn** because runtimes enumerate skill and agent descriptions into the prompt.[1]

That matters. GSD is basically saying: yes, orchestration can make the agent stronger, but orchestration also creates a **context tax**.

So the tradeoff is straightforward:

- more structure can improve consistency
- more structure can also make the system slower, heavier, and more expensive

The project’s answer is a `--minimal` install mode that keeps only six core skills and cuts the documented cold-start overhead to about **~700 tokens**.[1]

That is useful because it shows the maintainers understand the real tension here. The workflow layer helps, but the workflow layer can also become a product problem of its own.

## Why GSD matters beyond one repo

The larger story is that GSD is not an isolated eccentric project. It is part of a broader convergence around **skill layers, tool layers, and workflow layers**.

Google is already framing a similar idea in more official language. Its April post on **Gemini API Docs MCP and Agent Skills** says agents generate outdated code because model knowledge goes stale, and proposes a combination of Docs MCP plus baked-in developer skills to keep coding agents aligned with current APIs and patterns.[7]

OpenAI is pushing in another adjacent direction with **workspace agents** in ChatGPT: shared, cloud-running agents that gather context from tools, follow team processes, ask for approval, and continue long-running workflows.[8]

Those products are not identical to GSD. But they point in the same strategic direction.

There is also a smaller nearby thread worth mentioning: **GSD2**. In the current GSD docs, the project ships a `/gsd-from-gsd2` reverse-migration path that converts a GSD2 `.gsd/` project into the current `.planning/` format.[4][9][10] The importer code describes GSD2 as using a **Milestone → Slice → Task** hierarchy, which suggests it was trying to solve similar project-structure and state-management problems through a different layout.[9] But based on the public signals I could verify, GSD2 still has much less public documentation and much less visible adoption than the main `get-shit-done` repo. So for now it makes sense to mention it as an adjacent attempt, not as the main story.

## The bigger takeaway

GSD matters because it gives a concrete answer to a question more AI coding users are starting to ask.

Not “which model is smartest?”

But: **what system helps the model actually finish work without losing the plot halfway through?**

That is why GSD is more interesting than its name suggests. It is not just a colorful Claude Code add-on. It is a good example of how AI coding is shifting from model fascination toward workflow design.

## References

1. GSD Build, *GET SHIT DONE* README  
   https://github.com/gsd-build/get-shit-done
2. GSD Build, *GSD Architecture*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/ARCHITECTURE.md
3. GSD Build, *GSD User Guide*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/USER-GUIDE.md
4. GSD Build, *GSD Command Reference*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/COMMANDS.md
5. GSD Build, *GSD Shipped Surface Inventory*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/INVENTORY.md
6. npm, *get-shit-done-cc download stats / package metadata*  
   https://www.npmjs.com/package/get-shit-done-cc
   https://api.npmjs.org/downloads/point/last-month/get-shit-done-cc
7. Google, *Improve coding agents’ performance with Gemini API Docs MCP and Agent Skills*  
   https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-docsmcp-agent-skills/
8. OpenAI, *Introducing workspace agents in ChatGPT*  
   https://openai.com/index/introducing-workspace-agents-in-chatgpt/
9. GSD Build, *`/gsd-from-gsd2` command*  
   https://github.com/gsd-build/get-shit-done/blob/main/commands/gsd/from-gsd2.md
10. GSD Build, *CLI Tools / GSD2 import references*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/CLI-TOOLS.md
