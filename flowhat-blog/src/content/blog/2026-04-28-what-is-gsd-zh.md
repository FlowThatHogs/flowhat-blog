---
title: "什么是 GSD（Get Shit Done）？"
description: "GSD（Get Shit Done）不只是另一个 Claude Code 提示词包。它更像是一个围绕规划、执行、验证与持久项目状态构建的编码代理工作流系统。"
pubDate: 2026-04-28
updatedDate: 2026-04-29
lang: zh
translationGroup: what-is-gsd
baseSlug: 2026-04-28-what-is-gsd
tags:
  - claude-code
  - agents
  - workflows
  - context-engineering
  - spec-driven-development
  - gsd
heroImage: ../../assets/blog-placeholder-1.jpg
---

**GSD**，也就是 **Get Shit Done**，这个名字其实很容易让人误会。

乍一看，它像是一个语气很猛、包装很强的 Claude Code 提示词包。但如果你真的去看文档，就会发现它根本不只是那种东西。

更准确地说，`gsd-build/get-shit-done` 更像是一个**面向编码代理的工作流系统**。[1][2] 它建立在 Claude Code、Codex、Gemini CLI、Copilot、Cursor 等工具之上，试图在这些模型和工具外围补上一层结构，让它们在处理更大的软件任务时不至于中途失控。[1]

截至本文写作时，`gsd-build/get-shit-done` 在 GitHub 上已经拿到了 **5.8 万以上 star**，npm 包最近一个月的下载量也大约有 **19.6 万次**。[1][6] 这些数字当然不能直接证明它就是正确答案，但至少足够说明：这个项目值得认真理解。

所以真正该问的问题，不是“这个 repo 为什么这么火？”

而是更基础的一句：

**GSD 到底想成为什么？**

## GSD 更像工作流操作系统，而不是提示词包

仓库把自己描述为一个 **meta-prompting、context engineering、spec-driven development system**。[1] 这句话单看有点抽象，但看过架构文档之后，意思会清楚很多。

GSD 说自己位于用户和 AI 编码代理之间，主要提供四件事：[2]

1. context engineering  
2. multi-agent orchestration  
3. spec-driven development  
4. state management  

这显然比“更好的提示词”要大得多。

它的基本循环其实不复杂。[3][4]

- 启动一个项目
- 先确定某个阶段的偏好和约束
- 调研并规划工作
- 执行
- 验证
- 通过后再进入交付或发布

GSD 会把这些状态保存在 `.planning/` 目录中，格式是 Markdown 和 JSON。这样一来，即便上下文窗口被重置，项目记忆也不会跟着消失，人和代理都还能继续读取同一套状态。[2]

这就是它最关键的设计动作。它不再把整个项目寄托在一条超长聊天线程里，而是把记忆和工作流拆到文件、阶段和命令里。

因此，如果把它叫做“提示词包”，就看得太小了。提示词包只是给模型加装饰，而 GSD 想做的是**把模型周围的工作真正跑起来**。

## GSD 想解决什么问题？

README 在这一点上其实说得很直接。

它的意思并不是 Claude Code 这类工具单独使用就完全没价值，而是说：当任务不再只是小玩具时，纯粹的 vibecoding 往往会变得不稳定、脆弱，而且越来越难管理。[1]

如果你拿编码代理做过稍微大一点的事情，这些问题并不陌生：

- 模型会忘掉前面定下的约束
- 长会话会越来越混乱
- 实现会一点点偏离原始目标
- 测试很容易被拖延
- “差不多对”的代码会慢慢堆成真正的大问题

GSD 把这些看成是**工作流问题**，而不只是模型问题。

所以它的回答也不是“等下一代模型发布吧”。它的回答是：给代理外围加流程。

- 把需求写进工件里
- 把工作拆成阶段
- 给更聚焦的代理更干净的上下文
- 在执行前验证计划
- 在执行后再次验证结果[2][3][4]

这就是它的核心思路。GSD 想让编码代理少一点即兴发挥，多一点可重复性。

## GSD 里面到底有什么？

这个仓库并不小。根据当前公开文档，它包含：

- **86 个 commands**
- **33 个 agents**
- 用于保存状态和工件的 `.planning/` 目录
- 以 phase 为单位组织计划和执行的工作流[1][5]

整个系统大致围绕这些反复出现的组件运转：

- 需求、roadmap、state、phase 文件等**项目工件**
- 把工作推进到下一阶段的**命令**
- 负责 planning、research、execution、verification、debugging 的**专用 agents**
- 保存在聊天窗口之外的**持久状态**[2][3][5]

也正因为这样，GSD 与其说像一个普通提示词库，不如说更像一个轻量级工作流操作系统。

它背后的设计直觉很简单：**复杂度应该留在系统里，而不是留在用户一遍遍重复说明的成本里**。[1] 与其让用户不断重讲相同背景，不如把这些背景留在文件、计划和结构化流程步骤中。

换句话说，GSD 有点像是**给那些不想要企业式表演、但又想要 spec-driven development 好处的人准备的版本**。

## 为什么大家会关注它？

最表层的原因当然很明显：repo 很大、很活跃、安装也不难。[1][6]

但更深一层的原因在于，它把很多编码代理用户已经感受到的不适讲清楚了。更强的基础模型当然有帮助，但它不会自动解决这些问题：

- context drift
- planning drift
- sloppy execution
- weak verification
- long-session fatigue

GSD 的流行说明，越来越多用户真正想要的，已经不只是模型本身，而是**模型外面那层工作流结构**。

它的语气之所以打动一部分人，也和这个有关。它卖的不是企业流程仪式感，而是一种让独立开发者和小团队不至于把代理工作做成一团浆糊的方法。

不过，**日常到底该怎么使用 GSD** 是另一个实际问题。我在后续文章 [如何真正使用 GSD：Get Shit Done 背后的工作流](/blog/2026-04-29-how-to-use-gsd/zh/) 里单独讨论了这个部分。

## GSD 的代价是什么？

GSD 的结构并不是免费的。

项目文档自己也承认这一点。README 提到，full install 包含 **86 个 skills 和 33 个 subagents**，很多运行时会在每一轮都把这些描述塞进提示里，因此可能带来 **大约 1.2 万 token 的固定开销**。[1]

这一点很重要。GSD 实际上是在说：编排当然可能让代理更强，但编排也会带来一笔真实存在的 **context tax**。

所以它的 tradeoff 很直接：

- 更多结构，可能提高一致性
- 更多结构，也可能让系统更慢、更重、更贵

项目给出的答案是 `--minimal` 安装模式。这个模式只保留六个核心 skill，并把文档中提到的冷启动固定开销压到 **约 700 token**。[1]

这点值得注意，因为它说明维护者其实非常清楚真正的张力在哪里：工作流层能帮忙，但工作流层本身也可能变成另一个产品问题。

## 为什么 GSD 的意义不只在一个 repo 里？

从更大的角度看，GSD 并不是一个孤立的怪项目。它更像是围绕 **skill layer、tool layer、workflow layer** 收敛的大趋势中的一个代表。

Google 已经用更正式的语言表达了相似方向。在 4 月发布的 **Gemini API Docs MCP and Agent Skills** 文章里，Google 直接承认代理会因为模型知识过时而生成落后代码，并提出用 Docs MCP 加 developer skills 的组合，让编码代理持续贴近最新 API 和实践。[7]

OpenAI 也在另一个相邻方向推进类似思路。**workspace agents** 被描述成团队共享、在云端执行、能从工具里拉取上下文、能遵循团队流程、并在敏感节点请求批准的代理。[8]

这些产品和 GSD 并不完全一样，但它们的战略方向其实相当接近。

这里还有一条值得顺带提到的支线：**GSD2**。在当前 GSD 文档里，项目提供了 `/gsd-from-gsd2` 的反向迁移路径，可以把 GSD2 的 `.gsd/` 项目转换成当前的 `.planning/` 格式。[4][9][10] 从 importer 代码来看，GSD2 使用的是 **Milestone → Slice → Task** 的层级结构，这说明它也在尝试解决相似的项目结构化和状态管理问题，只是采用了不同布局。[9] 不过从公开信号来看，GSD2 的文档和实际可见采用度都远低于主仓库 `get-shit-done`。所以现阶段更适合把它当成相邻尝试，而不是主线故事。

## 更大的结论

GSD 之所以重要，是因为它对越来越多 AI 编码用户开始提出的一个问题，给出了很具体的答案。

不是“哪个模型最聪明？”

而是：**“什么样的系统，能帮助模型在不丢掉上下文的情况下，真正把工作做完？”**

这才是关键。

所以 GSD 比它的名字有意思得多。它不是一个名字很猛的 Claude Code 插件，而是一个很好的例子，说明 AI 编码正在从“迷恋模型本身”转向“设计工作流系统”。

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
