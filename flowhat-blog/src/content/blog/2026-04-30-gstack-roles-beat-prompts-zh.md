---
title: "gstack 对 AI Agent 说对的一件事：角色比提示词更重要"
description: "gstack 不只是 Garry Tan 的 Claude Code 配置。它更像是一个例子，说明 AI 编程工作流正在从提示词技巧转向基于角色的运行纪律。"
pubDate: 2026-04-30
updatedDate: 2026-04-30
translationGroup: gstack-roles-beat-prompts
baseSlug: 2026-04-30-gstack-roles-beat-prompts
heroImage: ../../assets/blog-placeholder-1.jpg
lang: zh
tags:
  - gstack
  - claude-code
  - agents
  - workflows
  - openclaw
  - ai-engineering
---

gstack 很容易被误读。

最短的说法是：它是 Garry Tan 的 Claude Code 配置。这句话没错，但会把这个项目说得太小。更准确地说，gstack 是一个开源工作流。它让 Claude Code 不再只是一个聊天机器人，而更像一支小型软件团队。

gstack 在 Claude Code 周围加上了可复用的 skill、slash command、浏览器工具、审查循环和运行规则。它不把规划、设计、实现、审查、测试、安全、文档和发布全塞进一段长对话里交给同一个编码 agent。它把工作拆成可以命名的责任单元：founder review、engineering review、design review、staff-engineer review、QA、security、release、documentation、browser testing、learning。[1][3]

值得看的地方就在这里。gstack 重要，不是因为每个人都应该复制 Garry Tan 的配置。它有用，是因为它展示了严肃的 AI 编程工作流正在往哪里走：少一点魔法提示词，多一点运行纪律。

## Garry Tan 是谁

Garry Tan 是 Y Combinator 的 President 和 CEO，也是 YC 的 General Partner。他共同创办了 Initialized Capital 和 Posterous，更早之前曾在 Palantir 担任早期设计师和 engineering manager。[9]

这个背景很关键。Y Combinator 的 CEO 公开自己的 AI 编程工作流，创始人和技术操作者自然会看。但更重要的是他看问题的方式。

这不只是让 Claude 写更多代码。模型已经能产出大量代码之后，真正的问题会浮出来。产品想法值不值得做，谁判断？架构谁检查？设计变得粗糙，谁发现？真实浏览器路径谁测试？安全和发布谁负责？

这种 founder/operator 视角，让 gstack 和普通的 Claude Code 配置不一样。

## gstack 是什么

`garrytan/gstack` 仓库把自己描述为一组 Claude Code skills、slash commands、浏览器工具和工作流模式。README 说，gstack 可以把 Claude Code 变成一支虚拟工程团队：重新思考产品的 CEO，锁定架构的 engineering manager，抓 AI slop 的 designer，发现生产级 bug 的 reviewer，用真实浏览器测试的 QA lead，执行 OWASP 和 STRIDE 审计的 security officer，以及负责交付 PR 的 release engineer。[1]

截至写作时，GitHub API 显示这个仓库大约有 87,400 个 star 和 12,800 个 fork，许可证是 MIT。[2] star 不能证明质量。但它能说明注意力。而这个项目受到关注是有原因的：gstack 把很多 builder 已经遇到的问题打包成了一个具体工作流。

从空白聊天框开始的 AI 编程并不好扩展。模型可以产生很多输出，但输出不等于进展。没有审查关卡时，更多生成代码也可能只是意味着模型默默做了更多决定。

gstack 的 quick-start 流程也说明了这一点。它不是让你从一个巨大的提示词开始。它让你安装系统，运行 `/office-hours`，运行 `/plan-ceo-review`，运行 `/review`，运行 `/qa`，然后判断这个工作流是否适合你。[1]

这不是提示词库。它是一份有约束力的检查清单。

## 为什么人们会注意到它

一部分原因很明显：Garry Tan 有分发力。YC 创始人、indie hacker 和 AI 工具圈的人，都会想看看他到底用什么来 ship。

但仅靠影响力解释不了反应。gstack 出现的时间点刚好。开发者已经在用痛苦的方式学到同一个教训：瓶颈不总是代码生成。很多时候，瓶颈是范围控制、审查、测试、产品判断和记忆。

gstack 给这些部分起了名字。`/office-hours` 是产品压力测试。`/plan-ceo-review` 是 founder review。`/plan-eng-review` 是架构审查。`/review` 是 staff-engineer review。`/qa` 测试应用。`/cso` 看安全。`/ship` 处理发布。`/document-release` 更新文档。[3]

想法很简单：不要让一个 agent 同时扮演所有人。

给它一个角色。给它一个阶段。给它一个完成标准。

## 有用的抽象：虚拟工程团队

普通的 AI 编程会话经常从一个模糊请求开始：

```text
Build this feature.
```

然后模型会自己做产品决策、架构决策、设计决策、测试决策和发布决策。有时能行。但很多时候，结果看起来完成了，底下的假设却是错的。

gstack 试图把这些隐藏决策拉到台面上。

skills 文档把命令映射到专家角色：`/office-hours` 用来做 YC 风格的产品提问，`/plan-ceo-review` 做 founder review，`/plan-eng-review` 做架构审查，`/plan-design-review` 做设计审查，`/review` 做 staff-engineer review，`/qa` 做 QA，`/cso` 做安全，`/ship` 做发布工程，`/document-release` 做技术写作。[3]

这里没有什么神秘的东西。它只是把管理结构写进命令里。

这听起来可能不如“自主 agent”那么刺激，但更有用。真实的软件工作本来就有角色，因为产品品味、架构、实现、QA、安全、文档和发布需要不同判断。当一个 assistant 回复试图包办所有这些事，工作就很难检查。

角色拆开之后，人类有了更好的抓手：

- product review 问这个功能是否值得做
- engineering review 检查计划是否适合当前系统
- design review 看界面和产品感是否有问题
- QA 在真实浏览器里测试
- security 寻找可避免的风险
- release 检查这个变更能不能安全发布

一个提示词也可以提到所有这些事。但工作流能让这些步骤真的发生。

## 为什么这对 agent 重要

AI 编程的失败模式不只是坏代码。更常见的问题是责任消失。

agent 可以写代码。但产品 framing 谁负责？范围谁收？真实用户路径谁测试？README 过期了谁发现？这个分支能不能 merge，谁判断？

在传统团队里，这些责任分布在人和流程之间。一个人使用 AI 时，如果工作流不把这些责任带回来，它们就会消失。

gstack 把这些责任当成工作的一部分，而不是额外装饰。“virtual engineering team”这个说法可能听起来像品牌话术，但底下的模式很实用：不要一开始就给 agent 一个更大的提示词，而是在合适的阶段给它一个更窄的任务。[1][3]

这也是 gstack 和从 prompt engineering 转向 context engineering、agent operations 的趋势相连的地方。问题不再只是“什么指令能让模型表现更好？”而是“什么结构能防止工作跑偏？”

我们在前几篇文章里讨论过的 GSD，也从另一侧处理同一个问题。GSD 把持久项目状态放进 `.planning/`、phase、command 和 verification gate。gstack 更强调 specialist role 和 review discipline。系统不同，方向相同：严肃的 agent 工作需要比聊天窗口更多的结构。[7][8]

## OpenClaw 视角

gstack 的 OpenClaw 文档很有用，因为它把 gstack 当成方法论，而不是被移植的运行时。[4]

OpenClaw 可以通过 ACP 启动 Claude Code 会话。gstack 可以给这些会话提供 planning discipline 和 specialist review。这个集成故意很轻：没有 daemon，没有 JSON-RPC，没有 compatibility matrix。提示词就是桥。[4]

这对 agent 系统很重要。不是每个工作流都需要变成紧耦合的平台集成。有时有用的层只是可移动的文本：检查清单、审查角色、planning discipline，或者一个告诉 coding agent 应该应用哪种判断的命令。

对于使用 OpenClaw、Hermes、Codex、Claude Code 或其他 agent runtime 的 builder 来说，这部分最值得复制。未来可能不是一个完美的 agent 环境，而更像是一层层叠起来的 orchestrator、coding agent、skill、memory、browser tool 和 review loop。工作流层必须能跨 host 移动。

gstack 的 OpenClaw 文档给了一个简单的路由规则：

- 简单修改不需要 gstack context
- 多文件功能可能需要轻量 planning
- review、QA 或 security 请求应该调用对应 specialist
- 更大的 objective 需要更完整的 planning 和 implementation pipeline[4]

这个判断是对的。一行 typo 不应该变成仪式。但严肃的功能开发也不该被当成 typo 处理。

## LOC 争议是提醒，不是重点

README 里有很强的生产力主张。它说 Garry Tan 在 2026 年 ship 的 logical code 远多于他 2013 年的 baseline，并链接到一篇关于 LOC controversy 的方法说明。[1][5]

这部分需要谨慎。

代码行数不是质量指标。争议文档自己也直接承认这一点，承认 AI verbosity，并尝试用 logical SLOC 和 deflation assumption 来校正比较。[5] 这比一句粗糙的“AI 让我快了 800 倍”更谨慎。但提醒仍然成立：shipped code volume 不等于 shipped product value。

更值得留下的是工作流。

如果一个人要监督更多 AI 生成的工作，审查结构不是更不重要，而是更重要。输出量上升之后，瓶颈会转移到决定做什么、限制范围、抓错误假设、测试真实行为、保护系统安全、谨慎发布。

这些角色，gstack 给它们起了名字。

## 该复制什么

错误的教训是：因为它流行，所以把整套 stack 都复制过来。

更好的教训是运行原则：

```text
不要让一个 agent 同时扮演所有人。
给 agent 一个角色、一个阶段、一个完成标准。
```

对小团队或 solo builder 来说，可以这样做：

1. 在规划功能前做 product review
2. 在实现前做 architecture review
3. merge 前跑一次单独的 code review
4. 对用户可见的变更做 browser QA
5. 对 auth、payment、upload、permission 相关工作做 security review
6. 把文档更新放进 release，而不是事后再补

这些事不一定需要 gstack。你可以在 Claude Code、Codex、OpenClaw、Hermes skills、仓库的 `AGENTS.md`，或者一份小检查清单里实现同样的模式。gstack 有用，是因为它把这个模式具体化了。

代价是开销。基于角色的工作流会消耗时间、token 和注意力。小任务里，流程可能比问题本身更麻烦。但在严肃工作里，这不是仪式。这是防止生成代码变成自信漂移的方法。

## 运行模型

理解 gstack 的最好方式是：

```text
coding agent + explicit roles + review gates + browser/tool feedback + controlled memory
```

domain-skills 文档也强化了这个方向。gstack 有一套机制，可以保存 agent 后续可复用的站点级笔记，并给这些笔记设置 quarantine、activation、promotion、rollback、deletion 状态。[6] 这很重要。agent 工作流在记住运行细节时会变好，但记忆也需要控制。把每条学到的笔记都注入未来每个会话，原本有用的 context 就会变成 context pollution。

gstack 更大的教训是：agent productivity 正在变成一个 operations 问题。

模型需要 context。工作需要阶段。阶段需要 owner。owner 需要 check。check 需要工具。结果需要被谨慎记住。

所以 gstack 值得研究。

不是因为某一个 slash command。是因为它展示了 coding agent 周围下一层有用结构的形状：product review、engineering review、design review、QA、security、release、documentation、memory。

不是一个巨大的提示词。

而是一个像团队一样运作的工作流。

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
