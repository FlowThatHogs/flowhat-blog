---
title: "为什么 OpenAI 和 Cloudflare 正在汇合到 Agent Infrastructure 这一层"
description: "OpenAI 和 Cloudflare 的最新宣布，与其说是普通合作，不如说是在说明 agent runtime infrastructure 正在往哪里走。"
pubDate: 2026-04-16
updatedDate: 2026-04-16
lang: zh
translationGroup: openai-cloudflare-agent-cloud
baseSlug: 2026-04-16-openai-cloudflare-agent-cloud
tags:
  - openai
  - cloudflare
  - agents
  - codex
  - infrastructure
  - runtime
heroImage: ../../assets/blog-placeholder-1.jpg
---

本周，OpenAI 和 Cloudflare 宣布，企业现在可以在 Cloudflare Agent Cloud 中使用 OpenAI 的 frontier model 和 Codex harness。表面上看，这像是一条普通的合作更新。

但它不止于此。

更重要的信号是，agent 竞争正在向更底层移动。市场不再只是关于谁拥有最强的 frontier model，而是越来越关心 agent 在哪里运行、如何部署、继承什么样的安全边界、可以持续多久，以及能以多低的成本扩展。

这正是 OpenAI 的 Cloudflare Agent Cloud 动作值得关注的原因。

## What happened

OpenAI 表示，企业现在可以直接在 Cloudflare Agent Cloud 中访问 OpenAI 的 frontier model。更具体地说，它表示基于 Codex harness 构建的 agent 现在可以部署到 Cloudflare 上，而 Codex harness 也已经在 Cloudflare Sandboxes 中正式可用。OpenAI 还表示，这项支持很快也会扩展到 Workers AI。

Cloudflare 从基础设施角度讲的是同一个故事。它在新闻稿中把 Agent Cloud 定义为一个平台，用来把 agent 从笔记本上的 demo 推向真实的生产工作负载。公司正在推出一整套 runtime、安全、state 和 deployment primitive，专门面向长时间运行的 autonomous software agent。

所以，这次发布并不只是“Cloudflare 现在支持 OpenAI 模型”。

更准确地说，它是在表明：“OpenAI 模型和 Codex 风格 agent 正在被放进一个生产运行时栈里，而这个栈正试图成为企业 agent 的默认运行环境。”

## Why this matters

有一段时间，AI 市场可以假装 model access 本身就是产品。

但一旦 agent 开始真正做事，这种逻辑就不成立了。

Agent 不只是一次 model call。它需要 runtime，可能还需要工具、文件访问、网络控制、后台执行、隔离、可观测性、重试逻辑、state，以及超越单次 request-response 生命周期的能力。

这正是 agent hype 往往撞上现实的地方。一个系统可以在 benchmark 或 demo 里看起来很惊艳，但在生产环境中却非常难以操作。

这也是为什么基础设施正在变成产品的一部分。

OpenAI 看起来已经意识到这一点。Cloudflare 则更明显地在围绕这个方向构建。

## Why Cloudflare fits this moment

Cloudflare 很适合这个阶段的市场，因为它的定位和 agent 真正需要的东西高度重合。

它已经拥有越来越适合 agent 工作负载的组件：

- edge-distributed execution，
- sandboxed environments，
- long-running stateful patterns，
- 网络与安全控制，
- 全球部署能力，
- 以及一个希望自己成为可编程平台而不只是托管服务的 developer platform

Cloudflare 的 framing 也很说明问题。它谈论的不是玩具式的 agent，也不是聊天体验，而是需要默认安全、可扩展并且在运营上可落地的 autonomous, long-running workloads。

一旦 agent 不再只是 novelty feature，而开始更像 software worker，这正是你会期待出现的 framing。

## Why OpenAI needs this layer

OpenAI 这一侧的意义同样重要。

如果 OpenAI 只想卖 model endpoint，那么它根本不需要这种类型的分发信号。但一旦 Codex、Codex harness 和 enterprise agent 成为产品叙事的一部分，runtime layer 的重要性就会急剧上升。

一个无法被安全、可预测地部署的 coding agent，很难称得上企业产品。任何被期待在生产环境中执行多步骤工作的 agent 也是如此。

这就是为什么这次动作的意义超出了单纯的 model availability。它暗示 OpenAI 想要占据的不只是 model layer，还包括 agent 真正被构建、执行和管理的 operational layer。

这并不意味着 OpenAI 想自己拥有全部基础设施。恰恰相反，这次发布更像是在说明另一种选择：让 Cloudflare 这样的合作伙伴成为 runtime surface，而 OpenAI 自己继续占据 model 和 harness layer 的中心位置。

这是一个重要的战略区别。

## The bigger shift

市场现在开始分裂成至少三个层次：

1. **Model layer** —— frontier model 的能力与质量
2. **Harness layer** —— tool use、planning、permissions、evaluation、coding loops
3. **Runtime layer** —— deployment、isolation、scaling、persistence、networking、enterprise controls

下一阶段真正重要的公司，未必只是单独统治其中某一层的公司。更可能重要的是那些能够把这三层连接得足够顺畅、以至于可以真正部署起来的公司。

这也是为什么 OpenAI–Cloudflare 这次动作比普通合作消息更值得重视。

它是在说明，市场正在从单纯的 model access，转向更成熟的 agent operations。

## Our take

重点不在于 OpenAI 选中了 Cloudflare。

重点在于，agent infrastructure 正在作为一个独立战场变得清晰可见。

对开发者和企业来说，这大概是件好事。因为行业讨论正在慢慢从纯粹的模型炫技，转向那些在生产中真正重要的难题：agent 在哪里运行、继承什么边界、如何扩展，以及会带来多大的运营痛苦。

对整个市场来说，这意味着下一轮真正的竞争，也许不再是谁做出了最炫目的 demo，而是谁能提供最可信、最适合在现实世界中运行 agent 的完整栈。

这才是这次发布背后更大的故事。

## References

- OpenAI, *Enterprises power agentic workflows in Cloudflare Agent Cloud with OpenAI*  
  https://openai.com/index/cloudflare-openai-agent-cloud/
- Cloudflare, *Cloudflare Expands its Agent Cloud to Power the Next Generation of Agents*  
  https://www.cloudflare.com/press/press-releases/2026/cloudflare-expands-its-agent-cloud-to-power-the-next-generation-of-agents/
