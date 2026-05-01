---
title: "What gstack Gets Right About AI Agents: Roles Beat Prompts"
description: "gstack is not just Garry Tan's Claude Code setup. It is a useful example of how AI coding workflows are moving from prompt tricks to role-based operating discipline."
pubDate: 2026-04-30
updatedDate: 2026-04-30
translationGroup: gstack-roles-beat-prompts
baseSlug: 2026-04-30-gstack-roles-beat-prompts
heroImage: ../../assets/blog-placeholder-1.jpg
lang: en
tags:
  - gstack
  - claude-code
  - agents
  - workflows
  - openclaw
  - ai-engineering
---

gstack is easy to misread.

The short version is that it is Garry Tan's Claude Code setup. That is true, but it makes the project sound smaller than it is. A better description is this: gstack is an open-source workflow for running Claude Code less like a chatbot and more like a small software team.

It wraps Claude Code with reusable skills, slash commands, browser tools, review loops, and operating rules. Instead of asking one coding agent to plan, design, implement, review, test, secure, document, and ship in the same long thread, gstack gives each job a name: founder review, engineering review, design review, staff-engineer review, QA, security, release, documentation, browser testing, and learning.[1][3]

That is the part worth paying attention to. gstack is not important because everyone should copy Garry Tan's exact setup. It is useful because it shows where serious AI coding workflows are going: less magic prompt, more operating discipline.

## Who Garry Tan is

Garry Tan is the President and CEO of Y Combinator and a General Partner at YC. He co-founded Initialized Capital and Posterous, and earlier worked as a designer and engineering manager at Palantir.[9]

That background matters. When the CEO of Y Combinator publishes his personal AI coding workflow, founders and technical operators notice. But the more important point is how he frames the problem.

This is not only about making Claude write more code. It is about what happens after the model can produce a lot of code. Who decides whether the product idea is worth building? Who checks the architecture? Who notices design slop? Who tests the browser path? Who handles security and release?

That founder/operator lens is what separates gstack from an ordinary Claude Code config.

## What gstack is

The `garrytan/gstack` repository describes itself as a collection of Claude Code skills, slash commands, browser tools, and workflow patterns. The README says it turns Claude Code into a virtual engineering team: a CEO who rethinks the product, an engineering manager who locks architecture, a designer who catches AI slop, a reviewer who finds production bugs, a QA lead who uses a real browser, a security officer who runs OWASP and STRIDE audits, and a release engineer who ships the PR.[1]

At the time of writing, GitHub's API showed roughly 87,400 stars and 12,800 forks, under the MIT license.[2] Stars do not prove quality. They do show attention. And in this case the attention makes sense, because gstack packages a problem many builders are already running into.

Blank-chat AI coding does not scale well. A model can produce a lot of output, but output is not the same as progress. Without review gates, more generated code can simply mean more decisions made silently by the model.

gstack's quick-start flow makes the point. It does not tell you to begin with one giant prompt. It asks you to install the system, run `/office-hours`, run `/plan-ceo-review`, run `/review`, run `/qa`, and then decide whether the workflow fits.[1]

That is not a prompt library. It is a checklist with teeth.

## Why people noticed it

Part of the answer is obvious: Garry Tan has reach. YC founders, indie hackers, and AI tooling people are going to look at whatever he says he uses to ship.

But reach alone does not explain the reaction. gstack landed because the timing was right. Developers have been learning the same lesson the hard way: the limiting factor is no longer always code generation. Often it is scope control, review, testing, product judgment, and memory.

gstack gives those pieces names. `/office-hours` is product pressure. `/plan-ceo-review` is founder review. `/plan-eng-review` is architecture review. `/review` is staff-engineer review. `/qa` tests the app. `/cso` looks at security. `/ship` handles release work. `/document-release` updates the docs.[3]

The idea is simple: do not ask one agent to be everyone at once.

Give it a role. Give it a stage. Give it a definition of done.

## The useful abstraction: a virtual engineering team

A normal AI coding session often starts with a vague request:

```text
Build this feature.
```

The model then makes product decisions, architecture decisions, design decisions, testing decisions, and release decisions. Sometimes that works. Often it produces something that looks finished while the assumptions underneath are wrong.

gstack tries to pull those hidden decisions into the open.

The skills documentation maps commands to specialists: `/office-hours` for YC-style product questioning, `/plan-ceo-review` for founder review, `/plan-eng-review` for architecture review, `/plan-design-review` for design review, `/review` for staff-engineer review, `/qa` for QA, `/cso` for security, `/ship` for release engineering, and `/document-release` for technical writing.[3]

There is nothing mystical here. It is management structure written into commands.

That may sound less exciting than "autonomous agent," but it is more useful. Real software work already has roles because product taste, architecture, implementation, QA, security, documentation, and release all require different judgment. When one assistant response tries to own all of them, the work becomes hard to inspect.

Role separation gives the human better handles:

- product review asks whether the feature is worth building
- engineering review checks whether the plan fits the system
- design review looks for interface and taste problems
- QA tests the thing in a browser
- security looks for avoidable risk
- release checks whether the change can ship safely

A single prompt can mention all of those. A workflow can make them happen.

## Why this matters for agents

The failure mode of AI coding is not just bad code. It is missing ownership.

The agent can write code. But who owns the product framing? Who cuts scope? Who tests the real user path? Who notices the README is stale? Who decides whether the branch is safe to merge?

In a traditional team, those responsibilities are spread across people and process. In a solo AI-assisted workflow, they disappear unless the workflow brings them back.

gstack treats those responsibilities as part of the work, not as nice extras. The "virtual engineering team" language can sound like branding, but the pattern underneath is practical: give the agent a narrower job at the right stage instead of a bigger prompt at the start.[1][3]

This is also where gstack connects with the shift from prompt engineering to context engineering and agent operations. The question is no longer just, "What instruction makes the model behave?" It is, "What structure keeps the work from drifting?"

GSD, which we covered in the previous posts, attacks the same problem from a different side. GSD puts durable project state into `.planning/`, phases, commands, and verification gates. gstack puts more weight on specialist roles and review discipline. Different systems, same direction: serious agent work needs more structure than a chat window.[7][8]

## The OpenClaw angle

gstack's OpenClaw documentation is useful because it treats gstack as methodology, not as a ported runtime.[4]

OpenClaw can spawn Claude Code sessions through ACP. gstack can supply planning discipline and specialist review to those sessions. The integration is deliberately light: no daemon, no JSON-RPC, no compatibility matrix. The prompt is the bridge.[4]

That matters for agent systems. Not every workflow needs to become a tight platform integration. Sometimes the useful layer is portable text: a checklist, a review role, a planning discipline, a command that tells the coding agent what kind of judgment to apply.

For builders using OpenClaw, Hermes, Codex, Claude Code, or other agent runtimes, this is the part worth copying. The future is probably not one perfect agent environment. It is more likely a stack of orchestrators, coding agents, skills, memory, browser tools, and review loops. The workflow layer has to move across hosts.

gstack's OpenClaw doc gives a simple routing rule:

- simple edits need no gstack context
- multi-file features may need lightweight planning
- review, QA, or security requests should call the relevant specialist
- larger objectives need a fuller planning and implementation pipeline[4]

That is the right instinct. A one-line typo fix should not become ceremony. A serious feature should not be treated like a typo fix either.

## The LOC controversy is a warning, not the point

The README includes strong productivity claims. It says Garry Tan is shipping far more logical code in 2026 than in his 2013 baseline, and links to a separate methodology note on the LOC controversy.[1][5]

That part needs care.

Lines of code are not a quality metric. The controversy document says this directly, acknowledges AI verbosity, and tries to normalize the comparison with logical SLOC and deflation assumptions.[5] That is more careful than a raw "AI made me 800x faster" claim, but the caveat still stands: shipped code volume is not the same as shipped product value.

The more durable point is the workflow.

If one person is supervising much more AI-generated work, the review structure matters more, not less. As output volume rises, the bottleneck moves to deciding what to build, limiting scope, catching bad assumptions, testing real behavior, securing the system, and shipping safely.

Those are the roles gstack tries to name.

## What to copy

The wrong lesson is to copy the whole stack because it is popular.

The better lesson is the operating principle:

```text
Do not ask one agent to be everyone at once.
Give the agent a role, a stage, and a definition of done.
```

For a small team or solo builder, that could mean:

1. use product review before planning a feature
2. use architecture review before implementation
3. run a separate code review before merging
4. use browser QA for user-facing changes
5. run security review for auth, payments, uploads, or permissions
6. update docs as part of the release

You do not need gstack for all of this. You can implement the same pattern in Claude Code, Codex, OpenClaw, Hermes skills, a repo's `AGENTS.md`, or a small checklist. gstack is useful because it makes the pattern concrete.

The cost is overhead. Role-based workflows take time, tokens, and attention. For small tasks, the ceremony can be worse than the problem. For serious work, it is not ceremony. It is how you keep generated code from turning into confident drift.

## The operating model

The best mental model for gstack is:

```text
coding agent + explicit roles + review gates + browser/tool feedback + controlled memory
```

The domain-skills documentation reinforces this. gstack includes a mechanism for saving per-site notes that agents can reuse later, with quarantine, activation, promotion, rollback, and deletion states.[6] That matters because agent workflows improve when they remember operational details, but memory needs controls. Injecting every learned note into every future session is how useful context becomes context pollution.

gstack's broader lesson is that agent productivity is becoming an operations problem.

The model needs context. The work needs stages. The stages need owners. The owners need checks. The checks need tools. The results need to be remembered carefully.

That is why gstack is worth studying.

Not because of one slash command. Because it shows the shape of the next useful layer around coding agents: product review, engineering review, design review, QA, security, release, documentation, and memory.

Not one giant prompt.

A team-shaped workflow.

## References

1. Garry Tan, *gstack* README  
   https://github.com/garrytan/gstack
2. GitHub API, `garrytan/gstack` repository metadata, checked 2026-04-30  
   https://api.github.com/repos/garrytan/gstack
3. Garry Tan, *gstack Skill Deep Dives*  
   https://github.com/garrytan/gstack/blob/main/docs/skills.md
4. Garry Tan, *gstack x OpenClaw Integration*  
   https://github.com/garrytan/gstack/blob/main/docs/OPENCLAW.md
5. Garry Tan, *On the LOC controversy*  
   https://github.com/garrytan/gstack/blob/main/docs/ON_THE_LOC_CONTROVERSY.md
6. Garry Tan, *Domain Skills*  
   https://github.com/garrytan/gstack/blob/main/docs/domain-skills.md
7. FlowHat, *What Is GSD (get-shit-done)?*  
   /blog/2026-04-28-what-is-gsd/
8. FlowHat, *How to Actually Use GSD: The Workflow Behind Get Shit Done*  
   /blog/2026-04-29-how-to-use-gsd/
9. Y Combinator, *Garry Tan: YC Partner*  
   https://www.ycombinator.com/people/garry-tan
