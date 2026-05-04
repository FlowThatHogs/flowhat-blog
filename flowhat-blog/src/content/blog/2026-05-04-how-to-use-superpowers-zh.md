---
title: "如何使用 Superpowers：给编程代理的实用技能路径"
description: "一份 Superpowers 实用指南：先从 brainstorming、planning、TDD、debugging、verification 开始，任务变大后再加入 worktree、review、subagent、parallel agent 和 custom skill。"
pubDate: 2026-05-04
updatedDate: 2026-05-04
lang: zh
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

Superpowers 给编程代理加上一套工作流程。

如果你想先了解概念，可以从 [Superpowers 是什么？](/blog/2026-05-03-what-is-superpowers/zh/) 开始。这篇文章是后续的实用指南：先用哪些技能，什么时候加入更重的流程，以及怎样避免把工作流变成多余的仪式。

可以把 Superpowers 理解成一组给软件开发步骤命名的技能。raw chat session 里经常被跳过的 brainstorming、planning、testing、debugging、review、verification、finishing，都被拆成了代理可以调用的技能。[1][2]

第一天不需要把所有技能都用上。

先从小的开始。任务变大、风险变高、审查变难时，再增加更多流程。

## 基本循环

编程代理常见的失败流程是这样：

```text
提需求 → 代理猜测 → 修改文件 → 报告完成
```

这对修 typo 可能够用。对功能开发、重构、bug 调查，或者任何涉及多个文件的任务，就不够了。

Superpowers 会把工作推向更稳的循环：

```text
理解 → 计划 → 实现 → 测试 → 审查 → 验证 → 收尾
```

记住这个形状就够了。目的不是让每个任务都变慢，而是根据任务风险给代理加上合适的流程。

## 初学者路径：先用这些技能

刚开始用 Superpowers，可以先用这五个技能：

- `brainstorming`
- `writing-plans`
- `test-driven-development`
- `systematic-debugging`
- `verification-before-completion`

它们覆盖了 AI 编程里最常见的问题：需求不清、太快实现、测试不足、靠猜调试、过早报告完成。

## `brainstorming`：改代码之前先用

当需求还比较松散时，用 `brainstorming`。

常见例子：

- “Add user authentication”
- “Improve the dashboard”
- “Make the app faster”
- “Refactor this module”
- “Add an AI assistant feature”

这些请求背后都有很多隐藏决定。Authentication 可能涉及 password、OAuth、session、role、admin screen、migration、email flow、security rule。"Make it faster" 也可能是 database index、frontend rendering、caching、API shape 或 background job。

在代理改文件之前，先让它把这些决定摊开。

实用 prompt：

```text
Use the brainstorming skill before implementation.
Clarify the feature, list the tradeoffs, and propose a practical direction.
Do not edit files yet.
```

你不需要一份很长的设计文档。你需要的是在代码开始变化前，把隐藏假设摆到台面上。

## `writing-plans`：方向明确后使用

方向定下来之后，用 `writing-plans`。

这个技能会把想法拆成小的实现步骤。一份有用的计划通常包括：

- 可能要修改的文件
- 工作顺序
- 需要新增或更新的测试
- 预期行为
- 需要注意的风险或 edge case

实用 prompt：

```text
Use the writing-plans skill.
Create a short implementation plan with small tasks.
Include likely files, test strategy, and verification steps.
Wait for approval before editing code.
```

计划不需要很长。小改动可能五个 bullet 就够。多文件任务则要具体到你能在代码库变化前判断方向对不对。

## `test-driven-development`：行为需要证明时使用

当改动会影响可能出错的行为时，用 `test-driven-development`。

包括：

- business logic
- API behavior
- data transformation
- UI state logic
- auth rules
- billing logic
- agent workflows
- 有明确复现步骤的 bug fix

这里不是把 TDD 当宗教。重点是让代理证明行为，而不是只写出看起来合理的代码。

实用 prompt：

```text
Use the test-driven-development skill.
First write or update a failing test that captures the expected behavior.
Then implement the smallest change needed to pass.
Refactor only if needed after the test passes.
```

如果项目没有测试环境，不要让代理假装有。让它给出当前最可靠的验证路径：script、build、manual browser flow、reproduction command，或者一个用完可以删掉的小检查。

## `systematic-debugging`：代理开始乱猜时使用

当某个东西失败，而代理开始随机 patch，就该用 `systematic-debugging`。

糟糕的调试通常是这样：

```text
试一个改动 → 还是坏 → 再试一个改动 → 还是坏 → 继续猜
```

更好的循环是：

```text
复现 → 看证据 → 提出假设 → 测试假设 → 修原因 → 验证
```

实用 prompt：

```text
Use the systematic-debugging skill.
Do not guess. First reproduce the issue, gather evidence, identify likely causes, and test one hypothesis at a time.
```

它特别适合 flaky test、build error、dependency problem、race condition、frontend state bug、API integration failure 和 agent tool-call failure。

不要让代理闭着眼睛 patch。让它说明自己知道什么、怀疑什么、哪些证据支持这个修复方向。

## `verification-before-completion`：接受完成前使用

这个应该变成默认习惯。

编程代理经常太早说完成。它可能改了文件，但没跑 build。可能修了一个测试，但没检查相关路径。可能改了代码，但没验证用户真正会走的流程。

实用 prompt：

```text
Use verification-before-completion before you report this as done.
Run the relevant tests or checks, inspect the result, and summarize exactly what was verified.
If something was not verified, say so clearly.
```

代理不应该只说改了什么。它还要说自己凭什么判断这个改动有效。

## 初学者的简单工作流

多数第一次使用，只需要这个循环：

```text
brainstorm → plan → implement with tests → debug systematically → verify
```

可以直接这样要求：

```text
Use Superpowers for this task.

First, use brainstorming to clarify the approach.
Then write a short plan.
After I approve the plan, implement with test-driven-development where possible.
If anything fails, use systematic-debugging.
Before saying done, use verification-before-completion and tell me exactly what passed.
```

这样能给代理一个清楚的工作形状，又不会把完整的 Superpowers 流程硬套到每个任务上。

## 中级路径：任务变大时

基本循环熟悉后，再加入这些技能：

- `using-git-worktrees`
- `executing-plans`
- `requesting-code-review`
- `receiving-code-review`
- `finishing-a-development-branch`

当任务更像一个真正的开发分支，而不是单次编辑时，它们会更有用。

## `using-git-worktrees`：隔离有风险的工作

当代理要做 feature、refactor 或 experiment，而且不应该弄乱当前工作目录时，用 `using-git-worktrees`。

它适合这些情况：

- 多个代理可能并行工作
- main branch 需要保持干净
- 改动有风险
- 任务可能需要多轮
- 实验失败后想直接丢掉

实用 prompt：

```text
Use the using-git-worktrees skill.
Create an isolated worktree for this feature before making changes.
Keep the main working directory clean.
```

worktree 让代理产物更容易检查，方向错了也更容易丢弃。

## `executing-plans`：让代理跟着计划走

计划已经存在后，用 `executing-plans` 防止代理跑偏。

代理经常从计划开始，但中途加范围、跳步骤，或者解决了一个相邻但不是你要求的问题。

实用 prompt：

```text
Use the executing-plans skill.
Work through the approved plan step by step.
After each step, report what changed, what was verified, and whether the plan needs adjustment.
Do not expand scope without asking.
```

这对多文件改动很有用。目标是可控推进，不是写更多文档。

## `requesting-code-review` 和 `receiving-code-review`：加一轮审查

严肃任务里，不能只让代理自己审查自己的改动。

完成一个有意义的工作块后，用 `requesting-code-review`。

实用 prompt：

```text
Use the requesting-code-review skill.
Review the current changes for correctness, test coverage, security, maintainability, and unnecessary complexity.
Focus on real issues, not style nitpicks.
```

有反馈后，用 `receiving-code-review`：

```text
Use the receiving-code-review skill.
Address the review comments one by one.
Explain what you changed, what you intentionally did not change, and why.
Re-run the relevant verification after the fixes.
```

这样代理更像在 code review 流程里工作的开发者，而不是想一次性结束的 chatbot。

## `finishing-a-development-branch`：把收尾做完

工作准备收尾时，用 `finishing-a-development-branch`。

这是最后清理阶段：

- check git status
- review the diff
- run tests and builds
- remove temporary files
- update docs if needed
- prepare a commit or PR summary
- confirm unrelated files are not included

实用 prompt：

```text
Use the finishing-a-development-branch skill.
Review the full diff, run the required checks, remove temporary artifacts, and prepare a concise branch summary.
Do not commit or push unless I explicitly approve.
```

当代理改了很多文件时，这一步尤其重要。意外改动通常会在最后露出来。

## 高级路径：把 Superpowers 当成代理工作流系统

高级用户可以把 Superpowers 当成一套代理工作流系统，而不只是单个技能列表。

当一个长线程已经难以控制时，这些技能会有用：

- `subagent-driven-development`
- `dispatching-parallel-agents`
- `writing-skills`

它们很强，但不应该成为默认动作。只有任务足够大，值得承担协调成本时再用。

## `subagent-driven-development`：把大任务拆给专注的代理

当项目能拆成独立部分时，用 `subagent-driven-development`。

例如：

- 一个代理研究代码库
- 一个代理实现 backend 改动
- 一个代理实现 frontend 改动
- 一个代理写测试
- 一个代理审查最终 diff

实用 prompt：

```text
Use subagent-driven-development.
Break this project into independent workstreams.
Assign each subagent a focused task with clear inputs and expected outputs.
After they finish, synthesize the results and verify the integrated change.
```

这样 context 更小，责任也更清楚。

但 subagent 也会错。把它们的输出当输入，不要当证明。整合后的结果仍然要验证。

## `dispatching-parallel-agents`：边界清楚时才并行

并行代理只有在任务真正独立时才有帮助。

好的用法：

- 调查三个候选库
- 比较两种实现方案
- 审查代码库的不同区域
- 生成不同测试策略
- 一个代理查 docs，另一个代理检查 local code

不好的用法：

- 多个代理编辑同一个文件
- 所有权不清楚
- 没有 merge plan
- 没有最终验证步骤

实用 prompt：

```text
Use dispatching-parallel-agents only for independent tasks.
Give each agent a separate scope.
After they return, compare their outputs, resolve conflicts, and verify the final decision.
```

并行只有在边界干净时才省时间。否则只会增加清理成本。

## `writing-skills`：把重复流程变成可复用技能

当你反复给代理同样的指令时，用 `writing-skills`。

例如：

- 项目有 release checklist
- 团队有偏好的 testing workflow
- frontend app 有固定 QA process
- backend service 有 migration procedure
- blog 有 multilingual publishing workflow
- agent setup 有重复的 debugging process

实用 prompt：

```text
Use the writing-skills skill.
Turn this repeated workflow into a reusable skill.
Include when to use it, exact steps, common pitfalls, and verification checks.
```

到这一步，Superpowers 会变得更贴合你的项目。你不只是使用包里的技能，而是在告诉代理你的环境里应该怎样工作。

## 实用技能地图

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

## 怎样选择流程强度

把 Superpowers 当梯子用。

先从初学者循环开始：

```text
brainstorm → plan → test → debug → verify
```

改动更严肃时，加入分支纪律：

```text
worktree → execute plan → review → finish branch
```

只有任务足够大时，才使用代理编排：

```text
split work → run subagents → compare results → integrate → verify
```

小改动不需要完整流程。有风险的改动也不应该只靠感觉推进。

根据任务风险选择技能就好。

## 需要记住的事

Superpowers 有用，是因为它给编程代理提供了流程。

对初学者来说，它能减少明显的失败模式：需求含糊、实现太快、测试缺失、随机调试、过早报告完成。

对中级用户来说，它能把代理工作变成更干净的开发分支，有计划、审查和收尾。

对高级用户来说，它支持 subagent、并行工作和 custom skill，方便形成可重复的工作流。

Superpowers 不会替代工程判断。它只是让代理更有机会跟上这种判断。

## 参考资料

1. Jesse Vincent / obra, *Superpowers* README  
   https://github.com/obra/superpowers
2. Jesse Vincent / obra, *Superpowers skills directory*  
   https://github.com/obra/superpowers/tree/main/skills
3. Jesse Vincent / obra, *Superpowers Contributor Guidelines*  
   https://github.com/obra/superpowers/blob/main/CLAUDE.md
