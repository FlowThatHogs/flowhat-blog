---
title: "Codex 现在连图片都能生成了。这件事比看上去更重要。"
description: "OpenAI 最新的 Codex 更新说明，这个产品正在从 coding assistant 扩展成一个更大的 agent surface，覆盖 browser work、computer use、memory、automation 和 visuals。"
pubDate: 2026-04-18
updatedDate: 2026-04-18
lang: zh
translationGroup: codex-image-generation-and-the-broader-agent-shift
baseSlug: 2026-04-18-codex-image-generation-and-the-broader-agent-shift
tags:
  - openai
  - codex
  - image-generation
  - computer-use
  - agents
  - workflow
heroImage: ../../assets/blog-placeholder-1.jpg
---

OpenAI 最新的 Codex 更新里，有一个一开始听起来像次要功能的变化：图片生成。

但这并不是一个小小的附加项。

按照 OpenAI 的官方说法，Codex 现在可以在同一个工作流中使用 `gpt-image-1.5` 来生成和迭代修改图片，而这个工作流本身已经包括浏览器、桌面应用、终端、插件、记忆和定时自动化。表面上看，这可能像是 feature creep。但在实际意义上，它更像是在表明：OpenAI 已经不想让大家只把 Codex 理解成一个 coding assistant。

它想让 Codex 看起来更像一个更广义的 work agent。

## What changed in Codex

OpenAI 自己的 framing 很有代表性。

在最新的产品文章里，公司表示 Codex 现在可以：

- 在你身边操作你的电脑，
- 在内置浏览器里工作，
- 使用超过 90 个插件，
- 记住你的偏好和过去的上下文，
- 把工作安排到以后执行，
- 自动唤醒并继续长时间任务，
- 以及使用 `gpt-image-1.5` 生成图片。

这份列表之所以重要，是因为图片生成并不是孤立加入的功能。它是作为更大 agent surface 中的一个组成部分出现的，而这个 surface 已经覆盖了 coding、browsing、desktop control、plugins、memory 和 recurring automation。

所以真正的故事并不是“Codex 有了图片生成”。

真正的故事是，OpenAI 正在把 Codex 从一个 coding-focused agent 扩展成某种更像 work environment for agents 的东西。

## Why image generation is strategically interesting

图片生成在这里之所以重要，并不是因为开发者突然需要 Codex 变成一个 art tool。

重要的是，视觉内容本来就是现实中软件和产品工作的一部分。

如果你正在用 agent 来帮助处理 frontend design、product concepts、game assets、placeholder graphics、slides、mockups 或 UI 实验，那么图片生成就不是工作流之外的功能，而是工作流内部的一环。

这才是关键转变。

一旦一个 coding agent 也能生成视觉内容、查看截图、使用浏览器、在网页上评论、跨桌面应用工作并保留记忆，这个产品看起来就不再像一个狭义的 coding tool。它开始更像一个面向数字工作的 general-purpose execution surface。

OpenAI 的措辞也正好朝着这个方向推进。这篇文章的标题就是 **"Codex for (almost) everything."** 这并不是隐晦的品牌表达。

## Are other companies doing something similar?

是的，但并不是完全相同的方式。

### Anthropic

Anthropic 也一直在把 Claude 推向文本交互之外，但它的模式不同。

它在 **computer use** 上的研究展示了一个模型如何直接和日常软件环境交互，而不是只能等待专门设计好的工具。Claude Code 也把 coding-agent 的故事扩展到了 tool use、long-running workflow 和更自主的 task execution 上。而在 Anthropic 更广的产品层面，你还能看到像 **Claude in Chrome** 和 **Claude Desktop Extensions** 这样的相邻扩展。

但它的强调重点依然不同。

Anthropic 的产品和研究 framing 更倾向于关注：

- tool use，
- long-running agent structure，
- harness design，
- permissions 和 safety，
- 以及如何在不失去控制的前提下让 agent 更自主。

这当然也是 broader agent direction，但它仍然不同于 OpenAI 当前对 Codex 的动作。后者正在试图把 coding、browser work、desktop control、memory、automations、plugins 和 image generation 展示成一个 increasingly unified agent surface 的组成部分。

### Cursor 以及类似的 coding 产品

其他 coding 工具也在扩展自己的边界。比如 Cursor，就更积极地推动了 multi-file workflow、agent behavior 和以 IDE 为中心的执行方式。从更大的市场来看，coding 工具整体也在朝着 browser access、更长的 task loop 和更自主的执行方向发展。

但 OpenAI 的 Codex 之所以仍然显得突出，在于这些能力的组合。

新意不在于某一个单独功能在别处不存在。新意在于 OpenAI 正在把这一整组能力一次性地整合进同一个 agent product story 中。

## What makes Codex different right now

最明显的区别在于产品的形状。

很多 coding-agent 产品仍然让人感觉像是逐渐加大触达范围的专业工具。而 Codex 已经开始看起来更像一个 unified workspace：多种不同类型的工作可以通过同一个 agent surface 来完成。

其中包括：

- 写代码，
- 处理 GitHub review comments，
- 使用终端，
- 通过 SSH 连接远程 devbox，
- 操作桌面应用，
- 浏览网页，
- 记住先前上下文，
- 安排未来任务，
- 以及现在的图片生成。

重要的不是某一个功能，而是这个组合本身。

一个具备 code + browser + computer use + memory + automations + image generation 的产品，不只是想赢下 coding assistant 这个类别。它更像是在试图成为工作被委托出去时所依赖的 operating surface。

## Why this matters for the market

这是 coding-agent 这个类别正在变宽的最清晰信号之一。

旧的心智模型很简单：coding assistant 帮你更快地写代码。

新的模型则更有野心：一个 agent 可以跨越产品和工程工作实际依赖的各种工具，在时间中保持上下文，并在不被每次重置的情况下完成 multi-step work。

图片生成自然地嵌进了这个故事里。

它也暗示了更大的产品方向。一旦一个 agent 能在同一条工作循环里同时处理代码、视觉内容、浏览器动作和持续自动化，coding assistant 和 work agent 的边界就开始模糊。

这也许才是这次发布真正想表达的东西。

## Our take

这次 Codex 更新最重要的地方，不在于 OpenAI 又加了一个功能。

更重要的是，现在这套功能组合已经宽到足以重新定义 Codex 到底应该是什么。

如果 Anthropic 一直更强调 harness design、安全层和结构化工作流中的 agent autonomy，那么 OpenAI 现在看起来更强调另外一种东西：把 Codex 做成一个可以直接接触更大数字工作空间的 agent surface。

这是两种不同的下注方式。

Anthropic 的方向更像是围绕 agent behavior 做受控的能力扩张。  
而 OpenAI 的方向，至少在这次发布中，看起来更像是围绕 agent reach 扩大整个 product surface。

这就是为什么图片生成在这里重要。不是因为它最 flashy，而是因为它暴露了 Codex 正在去往哪里。

## References

- OpenAI, *Codex for (almost) everything*  
  https://openai.com/index/codex-for-almost-everything/
- Anthropic, *Developing a computer use model*  
  https://www.anthropic.com/research/developing-computer-use
- Anthropic, *Claude Code*  
  https://www.anthropic.com/product/claude-code
- Anthropic, *Desktop Extensions: One-click MCP server installation for Claude Desktop*  
  https://www.anthropic.com/engineering/desktop-extensions
- Anthropic, *Introducing Anthropic Labs*  
  https://www.anthropic.com/news/introducing-anthropic-labs
