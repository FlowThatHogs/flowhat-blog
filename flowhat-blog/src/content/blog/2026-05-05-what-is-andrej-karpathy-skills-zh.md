---
title: "什么是 Andrej Karpathy Skills？"
description: "Andrej Karpathy Skills 是一个受 Karpathy 关于 LLM 编程代理失败模式评论启发的社区 Claude Code 指南仓库，并非 Karpathy 官方项目。"
pubDate: 2026-05-05
updatedDate: 2026-05-05
lang: zh
translationGroup: what-is-andrej-karpathy-skills
baseSlug: 2026-05-05-what-is-andrej-karpathy-skills
tags:
  - claude-code
  - agents
  - skills
  - ai-engineering
  - workflows
heroImage: ../../assets/blog-placeholder-1.jpg
---

**Andrej Karpathy Skills** 最准确的理解，是一个给编程代理使用的小型 instruction layer。

更具体地说，GitHub 仓库 `forrestchang/andrej-karpathy-skills` 把 Andrej Karpathy 关于 LLM 编程失败模式的公开观察，整理成了 `CLAUDE.md`、Claude Code plugin、可复用 skill，以及 Cursor rule。根据本文核查到的公开资料，它并不是 Andrej Karpathy 官方发布的项目。仓库自己的描述也说，它是从 “Andrej Karpathy's observations on LLM coding pitfalls” 派生而来，而 GitHub 显示的 repository owner 是 `forrestchang`。[1]

因此，本文把这个仓库视为一个受 Karpathy 批评启发的社区项目，而不是 Karpathy 的官方工具。一套关于编程代理失败模式的高信号批评，被转化成了可以放进项目里的工作规则。

这个仓库想表达的很简单：更好的模型还不够。代理还需要知道什么时候提问、什么时候停下来、应该改多少、以及完成前要验证什么。

## 这个仓库里有什么

项目本身很小。核心文件是 `CLAUDE.md`。把它放进项目后，Claude Code 可以在工作前读取这些 guideline。仓库还包括 Claude Code plugin metadata、`skills/karpathy-guidelines/SKILL.md`、Cursor rule 支持，以及展示常见失败模式的 examples。[2][3][4]

四个原则是：

1. **Think Before Coding**
2. **Simplicity First**
3. **Surgical Changes**
4. **Goal-Driven Execution**

这些原则很简单。这反而是重点。这个仓库没有发明新的软件工程方法论；它做的是把人类工程师经常默认期待、但不一定每次都会写下来的 discipline，显式交给编程代理。

在 2026 年 5 月 5 日的研究时点，GitHub API 显示该仓库大约有 **111,962 stars** 和 **11,178 forks**。这不能证明这些 guideline 对所有编程任务都有效。但它说明很多开发者确实认出了这个仓库试图解决的问题。[1]

## 背后的 Karpathy X 帖子

背景是 Karpathy 关于 Claude、Codex 这类编程代理 workflow 的一篇长 X 帖子。[5]

在那篇帖子里，Karpathy 描述了自己的编程方式发生了明显变化：从主要依靠手写代码和 autocomplete，快速转向主要依靠 agent-driven coding，再加上人工修改和 touchup。他把这称为自己大约二十年编程工作流中最大的变化之一。

但那篇帖子并不是简单的 AI agent hype。

Karpathy 同时认为，“以后不需要 IDE 了”和“agent swarm 会解决一切”这类说法，在当前阶段都太夸张。如果代码真的重要，他仍然会在 IDE 旁边非常仔细地盯着模型。错误的形态也变了。现在的问题不再主要是语法错误，而更像一个匆忙的 junior developer 会犯的微妙概念错误。[5]

他指出的失败模式包括：

- 模型会做出错误假设，并且不检查就继续推进；
- 它们不善于管理自己的困惑；
- 它们不够主动地请求 clarification；
- 它们不会充分暴露 inconsistency 或 tradeoff；
- 它们在应该 push back 的时候没有 push back；
- 它们会把代码和 API 设计得过于复杂；
- 它们会制造臃肿的 abstraction；
- 它们有时会修改或删除自己并不理解的注释或代码，即使那些内容和当前任务无关。[5]

`andrej-karpathy-skills` 仓库可以看作是对这些失败模式的一组紧凑回应。

## 原则一：写代码前先思考

第一个原则关注 assumption。

编程代理常见的错误，往往在生成代码之前就开始了。它会默默选择一种任务解释，然后直接开始改文件。如果用户说“让搜索更快”，代理可能会直接加缓存、重写查询、引入 async，或者修改 UI，而没有先确认到底是哪一种“快”最重要。

这个 guideline 要求代理在实现前说明 assumption，给出可能的解释，在不确定时提问，并且暴露 tradeoff。[2]

这不是多余的 ceremony。它的作用是避免代理沿着错误方向跑太久。

对于小任务，太多问题会很烦。但对于 non-trivial 工作，隐藏 assumption 往往就是失败的起点。

## 原则二：优先保持简单

第二个原则是对抗 overengineering。

LLM 编程代理很擅长生成结构。这很有用，但也很容易变成负担。一个简单功能，可能会被扩展成 strategy interface、registry、plugin system，再加上几个没人要求的配置开关。

仓库里的表达很直接：用能解决问题的最少代码，不加 speculative 的东西，不为一次性代码做 abstraction，如果 200 行可以变成 50 行，就应该简化。[2]

这很重要，因为编程代理会让 complexity 看起来很便宜。多生成几个文件很快，所以成本不明显。但维护成本仍然会留给人类。之后还是有人要阅读、review、测试、debug，并长期承受这些代码。

## 原则三：像做手术一样修改

第三个原则针对 diff pollution。

当代理修改现有代码时，它可能会顺手“改进”旁边的代码，重新格式化无关部分，删除它不理解的注释，或者重构旁边的逻辑。有些改动看起来无害。但当真正的修改被噪声 diff 淹没时，review 就会变得更难。

Guideline 要求只触碰必要部分，匹配现有风格，避免 drive-by refactor，只清理当前改动自己造成的问题。[2]

在真实项目里，代理的价值也包括 reviewability。生成可运行代码只是其中一部分。人类还要能安全地检查这些改动，而更小的 diff 更容易被信任。

## 原则四：围绕目标执行

第四个原则和 agent leverage 最直接相关。

Karpathy 的 X 帖子说，LLM 非常擅长围绕 specific goal 不断 loop，直到满足目标。他的建议是少给模型逐步命令，多给它 success criteria，让它朝这些标准推进。[5]

这个仓库把这个想法翻译成编程习惯：把模糊任务变成可验证的 outcome。比如，处理 bug 时先写一个能复现 bug 的测试，再让它通过；添加 validation 时先定义 invalid input，再验证行为；重构时要求前后测试都通过。[2]

这样，代理 loop 会从：

```text
ask → assume → edit → claim done
```

变成更接近：

```text
define success → test or inspect → change → verify → report
```

这看起来只是措辞变化，但实际改变的是控制方式。

## 为什么它超过了普通 prompt pack

把 `CLAUDE.md` 看成“只是 prompt”很容易。但这样会错过更重要的模式。

编程代理越来越多地运行在 project-specific instruction layer 里：`CLAUDE.md`、Cursor rules、Codex instructions、reusable skills、MCP-connected workflows，以及 repository conventions。这些 layer 不会取代模型能力；它们决定模型能力被用在什么地方、以什么方式使用。

`andrej-karpathy-skills` 仓库是这个模式的一个很小的例子。它没有增加新的工具，也不会自己运行测试，更不保证 correctness。它告诉代理在软件工作之前和过程中应该如何行动。

这也是为什么它的想法不只停留在 Claude Code。仓库里同时有 Cursor 支持和 reusable skill 文件。[3][4]

有用的抽象是把 **agent behavior 当作 project artifact** 来管理，而不是某个 Claude-specific 功能。

## 需要小心的地方

这里有三点需要注意。

第一，这不是 Karpathy 的官方 release。本文核查的公开资料没有显示 Karpathy 直接 endorsement 或讨论过这个仓库。它是受他的观察启发，而不是由他本人创建。[1][5]

第二，popularity 不是 proof。star count 表示关注度，不等于经过测量的效果。guideline 本身是合理的，但团队仍然需要测试、代码 review、CI 和 project-specific rule。

第三，这些规则偏向 caution。仓库自己也说明，对 trivial task 要使用判断。[2] 修一个 typo 不应该变成 planning meeting。真正的价值出现在任务模糊、跨多个文件、有风险、或者难以 review 的时候。

## 实用 takeaway

更好的读法是：把 Andrej Karpathy Skills 看成编程代理 workflow 正在成熟的一个小案例，而不是 celebrity-branded tool。

早期使用 agent 时，常见方式是：

```text
please build this
```

更好的 agent 使用方式，正在变成一种 controlled loop：

```text
说明 assumption，保持小改动，避免无关修改，定义 success criteria，在说完成前验证
```

这才是这个仓库真正的教训。

随着编程代理变得更强，瓶颈会从 raw generation 转向 steering、reviewability 和 verification。一个小小的 `CLAUDE.md` 不能解决所有问题。但它可以让 failure mode 变得可见。而对于编程代理来说，可见的失败，比沉默的失败更容易管理。

## References

[1] `forrestchang/andrej-karpathy-skills` GitHub repository, checked May 5, 2026: https://github.com/forrestchang/andrej-karpathy-skills

[2] `CLAUDE.md`, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md

[3] Claude Code plugin metadata, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/.claude-plugin/plugin.json

[4] Cursor usage notes, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CURSOR.md

[5] Andrej Karpathy on X, post about Claude/Codex-style coding-agent workflow and pitfalls: https://x.com/karpathy/status/2015883857489522876
