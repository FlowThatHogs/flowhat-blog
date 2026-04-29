---
title: "如何真正使用 GSD：Get Shit Done 背后的工作流"
description: "GSD 不是提示词包。它更适合作为项目循环来使用：创建持久上下文，按阶段规划，在有限任务中执行，并验证结果。"
pubDate: 2026-04-29
updatedDate: 2026-04-29
translationGroup: how-to-use-gsd
baseSlug: 2026-04-29-how-to-use-gsd
heroImage: ../../assets/blog-placeholder-1.jpg
lang: zh
tags:
  - gsd
  - claude-code
  - agents
  - workflows
  - spec-driven-development
  - context-engineering
---

上一篇文章讨论了 [**GSD（get-shit-done）** 是什么](/blog/2026-04-28-what-is-gsd/zh/)。这个名字听起来像一个很猛的 Claude Code 提示词包，但更准确的理解是：它是一个面向编码代理的工作流系统。

更实际的问题是：

**日常到底该怎么用它？**

简短答案：你不需要把每个 GSD 命令都像仪式一样严格跑一遍。大多数人可以安装之后，直接使用当下需要的命令，然后继续推进工作。

但当任务超过一次性提示词的范围时，GSD 的价值会变大。小修小补可能 quick mode 就够了。更大的功能、已有代码库、多文件修改，则更适合先创建项目状态，明确决策，规划工作，把执行拆成有限的小块，再验证结果。

## 从项目状态开始

常见的 GSD 流程从这个命令开始：

```bash
/gsd-new-project
```

官方用户指南说，这个命令会询问项目问题，运行研究代理，提取需求，并在写代码之前创建路线图。[2]

关键输出不是聊天回复，而是 `.planning/` 目录：

```text
.planning/
  PROJECT.md
  REQUIREMENTS.md
  ROADMAP.md
  STATE.md
  config.json
  research/
```

这是第一个重要转变。很多编码代理会话把太多状态留在对话历史里。小修复时这没问题，但工作一长就会变脆弱。早先的决定被埋掉，上下文窗口变吵，代理开始猜。

GSD 把项目记忆移动到人和代理之后都能读取的文件里。[3]

如果是已有代码库，更好的起点通常是：

```bash
/gsd-map-codebase
/gsd-new-project
```

这很重要，因为真实 repo 已经有结构、测试、惯例、类似功能和架构约束。没有这些上下文，代理很容易写出看起来合理、但放不进项目的代码。

## 规划之前先讨论

项目和路线图建立之后，下一步不是执行，而是讨论：

```bash
/gsd-discuss-phase 1
```

这个步骤会在规划前捕获实现偏好。例如错误应该怎么处理、使用哪个库、某个行为应该是全局还是按路由设置。[2]

结果通常会保存为阶段上下文文件：

```text
.planning/phases/01-core-middleware/CONTEXT.md
```

这比看起来更重要。很多代理失败并不是从写代码开始，而是更早开始：模型默默猜了一个决策，然后这个猜测进入实现和测试。

GSD 的 discuss 步骤就是为了降低这个风险。

它还有 assumptions mode。在这个模式里，GSD 会先读取代码库，再提出结构化假设：“我理解这个 repo 是这样工作的。在我开始构建之前，请先纠正我。”[2] 对已有项目来说，这通常比开放式问答更快、更有用。

## 主要价值在规划阶段

下一个命令是：

```bash
/gsd-plan-phase 1
```

文档描述了一个多代理规划过程。phase researcher 会研究技术栈、功能、架构和风险。planner 会把上下文变成计划。plan-checker 会在执行前检查这些计划能否达成阶段目标。[2][4]

输出通常是一组这样的文件：

```text
.planning/phases/01-core-middleware/
  RESEARCH.md
  01-01-PLAN.md
  01-02-PLAN.md
  VALIDATION.md
```

这就是 GSD 和普通 “vibe coding” 的区别。

弱的代理会话会说：

> 把这个功能做出来。

GSD 式会话会说：

> 需求是这些。决策是这些。研究是这些。工作被拆成小计划，每个计划都有要先读的文件，也有验证结果的方式。

这种结构不是装饰。它是在昂贵的执行阶段开始前减少模糊性。

GSD 还记录了一个 “Nyquist” 验证层：在写代码前，它会尝试把需求连接到测试命令或自动检查。[2] 这很重要，因为 AI 生成的代码很容易看起来对，但实际上不对。真正有用的问题是：它能不能通过正确的反馈循环。

## 在小而干净的上下文中执行

规划之后执行：

```bash
/gsd-execute-phase 1
```

GSD 说它会把计划按依赖关系分成 wave，并行运行独立任务，并给每个计划一个新的 executor 上下文。[2]

这是设计核心。长时间运行的代理会话会变乱。日志、错误、修正、废弃想法不断堆积，最后模型失去焦点。

GSD 的答案是：每个任务使用更干净的上下文，同时把项目状态保存在 `.planning/` 里。[3]

一个好的执行阶段应该有点无聊：

- 每个计划都很小
- 每个 executor 知道先读什么
- 每个任务有验收标准
- 每个 commit 能对应回计划
- 验证会根据阶段目标检查结果

如果计划太大，执行可能失败或产出 stub。文档建议遇到这种情况时，把范围重新规划得更小。[2]

## 验证不是可选项

执行之后是验证：

```bash
/gsd-verify-work 1
```

用户指南把它描述为 manual UAT。GSD 会从阶段目标中提取可测试项目，并带用户逐项确认。如果某项失败，它可以诊断问题并创建后续修复计划。[2]

这正是很多 AI 编码工作流最弱的地方。人们常常把“代理说完成了”当成任务结束。

对编码代理来说，完成应该有更严格的含义：工作通过了基于原始需求的独立检查。

问题都很实际：

- 功能真的能运行吗？
- 预期用户路径能走通吗？
- 实现是否保留了 `CONTEXT.md` 里的决策？
- 需要的测试加了吗？
- 代理有没有偷偷缩小范围？

GSD 有用，是因为它不要求人监督每一行代码，但会在关键 gate 把人带回来。

## 小任务用 quick mode

不是每个任务都需要完整循环。小 bug 修复可以用：

```bash
/gsd-quick
> "Fix the login button not responding on mobile Safari"
```

但 quick mode 不应该成为严肃工作的默认方式。完整循环存在的目的，是保护更大的任务不被上下文漂移、缺失决策和薄弱验证拖垮。

一个实用规则：

- 小修复用 **`/gsd-quick`**
- 新功能或多文件修改用 **`/gsd-new-project` → discuss → plan → execute → verify**
- 在已有 repo 里开始严肃工作前，用 **`/gsd-map-codebase`**
- 之后回来继续时，用 **`/gsd-progress`** 或 **`/gsd-resume-work`**
- 上下文变吵时，在主要步骤之间用 **`/clear`**[2]

最后一点很重要。GSD 能承受清空上下文，是因为它的持久状态存在 `.planning/` 里。

## 创作者演示说明了什么

创作者的长 walkthrough，*I Created GSD For Claude Code. This Is How I Use It.*，也很有参考价值。[8]

直播 transcript 比较乱，但操作模型很清楚。创作者把自己定位得更像 Claude Code 的 high-level project manager，而不是传统 coder。他不再直接读写每一行，而是重点让 Claude 理解代码、规划工作、验证结果。[8]

这解释了 GSD 的真实用户画像。它不只是给专家开发者节省键盘输入的工具，也面向那些越来越多监督 AI 编码工作、而不是亲手实现每一行的 builder。

这会让工作流纪律更重要，而不是更不重要。如果人不深入阅读每个 diff，那么代理周围的系统就必须更严格地处理上下文、规划、测试和验证。

## 真正的操作模型

所以实际答案不是“永远跑完整顺序”。更好的心智模型是：

```text
小修复：
  安装 GSD -> 使用 /gsd-quick -> 验证结果

已有 repo：
  映射代码库 -> 创建项目状态 -> 需要时按阶段推进

较大的功能：
  讨论决策 -> 规划 -> 执行 -> 验证 -> ship
```

GSD 有用，不是因为它强迫所有人进入同一套僵硬流程，而是因为当普通聊天会话开始崩掉时，它给你一个可重复的循环。

代价当然存在。完整系统比普通 Claude Code 会话更重，会增加流程、token 和等待时间。对小的一次性任务来说，可能太多了。

但真实软件工作本来就有流程。问题是这个流程放在哪里：放在你的脑子里，放在脆弱的聊天记录里，还是放在代理能真正遵循的文件和 gate 里。

GSD 的答案很明确：把流程放进文件、阶段、命令和验证 gate。

它真正的目的不是让 Claude 写更多代码。

而是帮助 Claude 在不迷路的情况下把工作做完。

## References

1. GSD Build, *GET SHIT DONE* README  
   https://github.com/gsd-build/get-shit-done
2. GSD Build, *GSD User Guide*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/USER-GUIDE.md
3. GSD Build, *GSD Architecture*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/ARCHITECTURE.md
4. GSD Build, *GSD Command Reference*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/COMMANDS.md
5. GSD Build, *GSD Shipped Surface Inventory*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/INVENTORY.md
6. npm, *get-shit-done-cc package metadata and download stats*  
   https://www.npmjs.com/package/get-shit-done-cc  
   https://api.npmjs.org/downloads/point/last-month/get-shit-done-cc
7. GSD documentation site, *Get Shit Done documentation index*  
   https://gsd-build-get-shit-done.mintlify.app/  
   https://mintlify.com/gsd-build/get-shit-done/llms.txt
8. TÂCHES, *I Created GSD For Claude Code. This Is How I Use It.*  
   https://www.youtube.com/watch?v=5L3dm7KBCmY
