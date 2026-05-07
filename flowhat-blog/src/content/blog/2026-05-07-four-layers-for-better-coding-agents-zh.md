---
title: "GSD、Karpathy Skills、Superpowers 与 gstack：让编码智能体更可靠的四个层次"
description: "GSD、Karpathy Skills、Superpowers 和 gstack 分别处理编码智能体的行为、项目状态、开发流程和角色化评审问题。"
pubDate: 2026-05-07
updatedDate: 2026-05-07
lang: zh
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

编码智能体正在变强。但在真实项目里，关键问题已经不只是“哪个模型更会写代码”。

更难的问题是：怎样让智能体待在一个可靠的工作结构里？

这就是为什么 **GSD**、**Karpathy Skills**、**Superpowers** 和 **gstack** 值得放在一起比较。它们常被称为 Claude Code 工作流、prompt pack、skill library 或 agent framework。这些说法没有错，但更有用的观察是：它们处理的是不同层次的控制问题。

每个项目都在压住一种不同的失败模式：

- Karpathy Skills 约束智能体的坏习惯。
- GSD 防止长任务丢失项目状态。
- Superpowers 把软件开发习惯变成可复用 skills。
- gstack 引入角色化评审和产品团队结构。

它们不是同一种东西。它们更像是围绕编码智能体的四个控制层。

## 共同问题：输出很便宜，控制不便宜

现代编码智能体可以快速生成大量代码。这很有用，也很危险。

常见失败已经不只是语法错误。智能体会猜测需求并直接执行。它会过度设计。它会修改无关文件。它会忘记项目早期做过的决定。它会在没有真正验证的情况下宣布完成。

Andrej Karpathy 在公开评论 LLM coding 时提到过很多类似问题：错误假设、隐藏困惑、缺少 clarification、过度复杂的 API、膨胀的 abstraction、dead code，以及 collateral edits。[1]

这个观察解释了这些 workflow 项目为什么出现。模型可以写代码。周围的系统需要让这份工作变得可检查、有边界、可验证。

## Karpathy Skills：行为补丁

**Karpathy Skills** 是这里最轻的一层。

流行的 `forrestchang/andrej-karpathy-skills` 仓库把 Karpathy 的观察打包成 `CLAUDE.md`、Claude Code plugin、Cursor rule，以及可复用的 `karpathy-guidelines` skill。[2][3] 核心规则很短：

1. Think before coding.
2. Simplicity first.
3. Surgical changes.
4. Goal-driven execution.[3]

所以 Karpathy Skills 更像是给编码智能体用的 behavior patch，而不是完整的项目管理系统。

它最适合智能体行动过快的场景：猜测需求、创建 speculative abstraction、修改无关文件、没有成功标准就结束任务。对于小功能、bug fix、refactor 或有风险的 multi-file edit，这些规则能让 diff 更小，也让 reasoning 更可见。

它的边界也很清楚。Karpathy Skills 不会创建 durable project state。它没有 phased roadmap。它也不会模拟产品团队。它只是规定智能体在当前 task 中应该怎样行动。

很多失败正是从这个层次开始的，所以这个轻量层很有价值。

如果想继续读，可以先看 [什么是 Andrej Karpathy Skills？](/blog/2026-05-05-what-is-andrej-karpathy-skills/zh/)，再看 [如何使用 Karpathy Guidelines](/blog/2026-05-06-how-to-use-karpathy-guidelines/zh/) 中的具体编码例子。

## GSD：项目状态层

**GSD**，也就是 `get-shit-done`，工作在更重的一层。

GSD 官方文档围绕 context engineering、spec-driven development、fresh-context agents 和 `.planning/` filesystem state 展开。[4][5] 它的命令覆盖 project creation、codebase mapping、discussion、planning、execution、verification、shipping、progress 和 resume。[5]

关键变化是：长任务不再完全依赖一段脆弱的聊天记录。

一个 GSD 风格的流程通常会创建这样的文件：

```text
.planning/
  PROJECT.md
  REQUIREMENTS.md
  ROADMAP.md
  STATE.md
  phases/
```

之后，智能体可以讨论某个 phase，制定计划，执行有边界的任务，验证结果，并在之后继续恢复工作，而不是把所有状态都压在 conversation history 里。

GSD 最适合 context rot 真的会造成损失的任务：已有代码库、跨多天的 feature、较大的 refactor，或者需要让需求和实现决策跨 session 保留下来的项目。

代价是重量。GSD 增加了 ceremony、文件、命令和 workflow。对于简单修改，这可能太重。但对于较长的工作，这个结构本身就是主要价值。它给智能体提供了比 memory 更持久、比“请小心实现”更具体的工作基础。

如果想系统了解 GSD，可以先读 [什么是 GSD？](/blog/2026-04-28-what-is-gsd/zh/)，再读 [如何实际使用 GSD](/blog/2026-04-29-how-to-use-gsd/zh/)。

## Superpowers：开发方法论层

**Superpowers** 处在另一个位置。

`obra/superpowers` 仓库把自己描述为 agentic skills framework 和 software-development methodology。[6] 它的 skill surface 包括 brainstorming、writing plans、test-driven development、systematic debugging、subagent-driven development、code review、verification before completion、finishing a development branch 等。[6]

核心是 process discipline。

原始的编码智能体 session 往往像这样：

```text
request → edit → explain → maybe test
```

Superpowers 试图把循环拉近普通工程实践：

```text
understand → design → plan → test → implement → review → verify → finish
```

它还重视 automatic skill use。README 说明 agent 会在任务前检查相关 skills，contributor guidance 也把 skills 当作 behavior-shaping artifacts，而不是随便写的说明文本。[6][7]

这点很重要。如果每次都要人类记得加载哪个 skill，skill library 的作用就会变弱。Superpowers 想把开发方法变成智能体的 default operating behavior。

因此，它适合希望在 AI coding 周围建立可重复开发习惯的团队或 solo builder：合适时使用 TDD，面对未知 bug 时系统化 debugging，完成前进行 review 和 verification。

风险是 methodology overhead。不是每个 task 都需要完整开发循环。Superpowers 最适合那些跳过流程的代价高于执行流程成本的任务。

关于 Superpowers 的概念介绍，可以看 [什么是 Superpowers？](/blog/2026-05-03-what-is-superpowers/zh/)。如果想看实际 skill 路径，可以继续读 [如何使用 Superpowers](/blog/2026-05-04-how-to-use-superpowers/zh/)。

## gstack：角色与评审层

**gstack** 采取另一种方式：把工作建模成 virtual engineering team。

Garry Tan 的 `gstack` 仓库围绕 CEO、engineering manager、designer、reviewer、QA、security、release、documentation 等角色组织 setup。[8][9] 有意思的地方不在于 prompt 更长，而在于不同的 review perspective 变成了可复用角色。

编码工作通常不只是 coding。

一个 feature 可能需要 product judgment、design review、engineering review、security check、QA、release notes 和 documentation。一个智能体可以试图覆盖所有内容，但这些视角经常会被压成一个泛泛的回答。

gstack 的 role framing 让智能体从多个角度看任务。

这对 product-facing changes、release work、QA-heavy tasks，以及 multi-agent 或 multi-role system 相关 workflow 很有用。它也自然连接到 OpenClaw 或 Hermes 这类关于 roles、teams、reusable agent sessions 的讨论。

需要谨慎的是，角色名称不等于质量保证。一个 “security reviewer” 角色仍然必须检查正确的风险。一个 “QA” 角色也必须提出有用的检查。生产力或 LOC 相关主张如果来自 self-reported 或有争议的来源，需要谨慎处理。[10]

gstack 的价值不在角色名称本身，而在 role separation 让缺失的视角更容易被发现。

关于 gstack，可以先读 [gstack 对 AI 智能体抓住的重点：角色胜过提示词](/blog/2026-04-30-gstack-roles-beat-prompts/zh/)，再读后续的 [如何使用 gstack](/blog/2026-05-02-how-to-use-gstack/zh/)。

## 对比表

从实践角度，可以这样理解：

| 层次 | Karpathy Skills | GSD | Superpowers | gstack |
|---|---|---|---|---|
| 主要单位 | Rule file / skill | Project workflow | Skill library / methodology | Role-based team structure |
| 主要问题 | 智能体坏习惯 | Context rot 和计划丢失 | 即兴式开发流程 | 缺少 product/review 视角 |
| 适合任务 | 小到中等 coding task | 长 feature 和已有 codebase | 可重复 engineering workflow | Product、QA、review、release work |
| 核心价值 | 更小、更安全的 agent behavior | Durable state 和 phased execution | Process discipline | 多个 review lens |
| 重量 | 轻 | 中到重 | 中 | 中到重 |
| 主要风险 | 对大项目不够 | 对小任务太重 | 方法论 overhead | 没有验证的 role-play |

这个表也说明，“谁赢了”不是一个好问题。

它们解决的是 agent-control 问题的不同部分。

## 实战中怎样组合

实战 stack 可以很简单。

小 bug fix 可以从 Karpathy-style rules 开始：

```text
先说明假设，做最小修改，避免无关 edit，并验证修复。
```

已有 codebase 里的较大 feature，可以加入 GSD-style project state：

```text
Map codebase，记录 requirements，讨论 decisions，规划 phase，执行 bounded tasks，shipping 前验证。
```

重复性的开发工作，可以加入 Superpowers-style process：

```text
Design 前 brainstorming，execution 前 writing-plans，可测试行为使用 TDD，未知 failure 使用 systematic debugging，完成前 verification。
```

面向产品发布的工作，可以加入 gstack-style roles：

```text
从 product、engineering、design、QA、security、release documentation 角度检查 plan 和 diff。
```

每个 task 不需要所有层。层次应该匹配风险。

一行 copy change 不需要 virtual engineering team。跨多天的 feature 也不应该只依赖一段聊天记录和一个乐观的完成报告。

## 更大的结论

这些项目指向同一个方向：编码智能体的可靠性正在变成 workflow design 问题。

模型很重要。更好的模型会减少一部分错误。但只选对模型，并不能保证智能体会保持 scope、记住 decisions、使用 tests、避免 unrelated edits，或者把正确的 review perspective 带进任务。

Karpathy Skills 是 behavior level 的答案。GSD 是 project-state level 的答案。Superpowers 是 development-process level 的答案。gstack 是 role and review level 的答案。

这样比较它们更有用。

编码智能体的未来很可能不是一个解决所有问题的 giant prompt。更现实的方向是一组小的 control layers：rules、state、skills、reviews、tests 和 roles。task structure 越好，agent 就越有用。

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
