---
title: "Hermes Agent 是什么？它和 OpenClaw、Claude Code、Codex 有什么不同？"
description: "Hermes Agent 不只是另一个 coding copilot。它把自己定位成一个 persistent、self-improving、multi-surface personal agent runtime，而这正是它与 OpenClaw、Claude Code、Codex 的差异所在。"
pubDate: 2026-04-19
updatedDate: 2026-04-19
lang: zh
translationGroup: what-is-hermes-agent-and-how-it-differs-from-openclaw-claude-code-and-codex
baseSlug: 2026-04-19-what-is-hermes-agent-and-how-it-differs-from-openclaw-claude-code-and-codex
tags:
  - hermes-agent
  - nous-research
  - openclaw
  - claude-code
  - codex
  - ai-agents
heroImage: ../../assets/blog-placeholder-1.jpg
---

Hermes Agent 最近之所以值得注意，是因为它并不想把自己包装成一个普通的 coding copilot。

从官方表述来看，更准确的理解方式是：它是一个运行在你自己基础设施上的 persistent、self-improving personal agent，能够跨 messaging platform 和 terminal 工作，记住自己学到的东西，从经验里生成技能，并随着时间变得对你更有用。

这和 Claude Code 或 Codex 的出发点很不一样。

那些产品通常首先被理解为 coding agent。而 Hermes 更容易被理解成一个 **内建 learning loop 的 always-on agent runtime**。

这个区别很重要。

## Hermes Agent 实际上是什么

按照官方材料，Hermes Agent 把自己呈现为：

- 一个由 Nous Research 构建的 open-source agent，
- 能跨 session 持续存在，
- 可以运行在你自己的基础设施上，
- 能使用多个 model provider，
- 同时连接 terminal 与 messaging platform，
- 并围绕一个 closed learning loop 来构建。

这个 learning loop 才是它最重要的卖点。

Hermes 说它可以从经验中创建 skills，在使用过程中改进这些 skills，不断提醒自己保留有用知识，搜索过去的对话，并随着时间建立对用户更深的理解模型。

换句话说，Hermes 不只是说：“我能完成任务。”

它是在说：“我运行得越久，就能变得越适合你。”

这比大多数 coding-agent 产品通常提出的主张要宽得多。

## Hermes 为什么会让人感觉不同

有几个点一眼就能看出来。

### 1. 它不绑定单一界面

Hermes 被设计成同时生活在 CLI 和 messaging channel 中。它在 GitHub 材料里明确提到 Telegram、Discord、Slack、WhatsApp、Signal 和 terminal 都通过同一个 gateway process 连接起来。

这让它更像一个你可以从任何工作入口触达的 long-lived agent process，而不是一个“打开就用的应用”。

### 2. 它不绑定单一模型提供商

Hermes 说它可以运行在 Nous Portal、OpenRouter、NVIDIA NIM、Xiaomi MiMo、z.ai/GLM、Kimi、MiniMax、Hugging Face、OpenAI、Anthropic 甚至你自己的 endpoint 上。

这意味着 Hermes 并不真正试图在 model layer 获胜。它更像是在 model 之上的 **agent layer** 竞争。

### 3. 它非常认真地对待 memory 和 skill 累积

很多 agent 都在谈 memory，但 Hermes 把 memory 放到了身份核心里。

项目明确强调的包括：

- agent-curated memory，
- 复杂任务之后的 skill creation，
- skill self-improvement，
- cross-session recall，
- 以及 scheduled automations。

这让它更像一个 personal agent operating system，而不是单任务 assistant。

### 4. 它被设计成离开笔记本也能运行

Hermes 一直在强调它可以运行在便宜的 VPS、cloud VM、Docker、SSH、Modal 等远程 backend 上，也强调 hibernation 和 wake-on-demand 这样的低 idle cost 模式。

这让它比很多仍然主要作为 desktop-side assistant 被感知的工具，更具有一种 "agent infrastructure" 的味道。

## 早期人气和社区响应

Hermes 看起来也已经有了真实的早期 momentum。

即便只保守地看官方 repo 和 release note 中能够确认的信号，这个项目的推进速度也很不寻常。仅 v0.9.0 的 release note 就写到：自上一个 major release 以来，它已经有了 487 commits、269 个 merged pull requests、167 个 resolved issues、493 个文件变更以及 24 位 contributors。几天之后，v0.10.0 又发布了，继续扩展 gateway 和 tool system。

这种 release cadence 本身就很重要。

它说明 Hermes 并不是一个只是停留在 repo 里的有趣想法。它已经有足够多的 maintainer 和 community energy，使自己开始像一个 fast-moving platform 那样运转。对于一个依赖 integration、tooling breadth 和 operational polish 的 agent 项目来说，这种速度本身就是产品故事的一部分。

## 它和 OpenClaw 有什么不同

OpenClaw 和 Hermes 的重叠度很高，这也是为什么比较是成立的。

它们都关心 long-running agent、messaging surface、skills、多种 runtime 和 persistent workflow。Hermes 甚至带有一个 `hermes claw migrate` 命令，这已经是非常直接的信号：它的作者预期会有一些用户从 OpenClaw 这类环境迁移过来。

但两者的重心不同。

### OpenClaw

OpenClaw 更像一个 **general agent orchestration and multi-surface runtime**。

它的强项在于：

- 跨 provider 和 surface 的 routing，
- session management，
- agent skills，
- ACP harness integration，
- messaging-based operation，
- 以及让多种 agent workflow 可以被组合起来。

它擅长充当一个 control layer，让许多不同 agent interaction 可以在同一个系统中发生。

### Hermes

Hermes 更像一个 **带有鲜明 learning loop 理念的 persistent personal agent**。

它最强的身份感并不只是 orchestration，而是：

- 随时间积累的 memory，
- 从经验中长出来的 skills，
- 长期的 user modeling，
- 以及“agent 本身应该越跑越好”的假设。

所以，如果说 OpenClaw 更像灵活的 agent runtime 和 control plane，那么 Hermes 更像是在尝试构建一个 continuously learning personal agent layer。

这是一个重要的差别。

## 它和 Claude Code 有什么不同

Claude Code 更窄，但也更锋利。

它的工作更容易理解：读代码库、修改文件、运行命令、使用工具，并在强烈 coding-first 的 workflow 中帮助完成软件任务。

即便 Anthropic 把 Claude 扩展到纯聊天之外 —— 通过 Claude Code、computer use、Chrome integration 或 desktop extensions —— 它的产品逻辑仍然被以下几点强烈塑造：

- coding workflows，
- tool use，
- harness design，
- 以及 safety/control boundaries。

Hermes 比 Claude Code 更分散，但也更宽。

Claude Code 更容易被理解成一个 specialized coding agent。Hermes 更容易被理解成一个 personal agent shell，只不过它刚好也支持 coding。

这意味着，对于 focused software work，Claude Code 通常会显得更强；而如果你的目标是一个 persistent、cross-channel agent，能够随着时间不断积累上下文和行为模式，那么 Hermes 可能会更有吸引力。

## 它和 Codex 有什么不同

OpenAI 新版 Codex 也在快速变宽。

随着 browser use、desktop control、memory、plugins、scheduled automations、terminal 和 image generation 被加入，Codex 显然已经超出了狭义 coding assistant 的身份。

但 Codex 的产品形状和 Hermes 仍然不同。

Codex 看起来更像 OpenAI 试图围绕自己的模型和产品生态，构建一个 **broader work agent surface**。

而 Hermes 看起来更像一个 **open personal agent runtime**，它位于 model layer 之上，并把 provider 当作可互换的组件。

这就带来了不同的权衡：

- Codex 作为 product surface 可能显得更 polished。
- Hermes 作为 agent system 可能显得更 flexible，也更像“属于你自己的东西”。

## Hermes 的优点

Hermes 在以下几个方面看起来最强：

### 1. Persistence
它被设计成可以跨 session、channel 和时间持续存在。

### 2. Learning loop
它的 self-improvement 叙事比大多数 agent 产品都更居中。

### 3. Multi-provider flexibility
它不锁定在某一个 model vendor 上。

### 4. Multi-surface operation
CLI + messaging + remote runtime + scheduled automation 这个组合很强。

### 5. Infrastructure realism
可以运行在 VPS、cloud backend、SSH 以及低 idle cost 环境中，让它比很多 hobbyist agent 更像是可以部署的系统。

## Hermes 的缺点

让 Hermes 显得雄心勃勃的同样也是它的风险来源。

### 1. Product sprawl
一个想同时成为 messaging agent、coding agent、memory layer、scheduler 和 personal runtime 的系统，很容易变得难以理解。

### 2. Reliability burden
persistent memory 和 self-improving skills 听起来很强，但同时也抬高了可靠性的门槛。如果 learning loop 很脏，用户得到的就可能不是累计的价值，而是累计的混乱。

### 3. Harder evaluation
coding agent 可以用 coding task 来 benchmark。persistent personal agent 则更难被干净地衡量。

### 4. Operational complexity
更多 provider、更多 backend、更多 integration、更多 channel，通常意味着更多 setup 以及更多 failure mode。

## Hermes 能和 OpenClaw、Claude Code 或 Codex 一起用吗？

原则上可以，尤其是和 OpenClaw 一起。

### Hermes + OpenClaw

这个组合在概念上最说得通。

OpenClaw 可以充当 routing/orchestration layer，而 Hermes 充当 persistent personal-agent layer。它们确实有重叠，所以必须小心避免形成冗余复杂度。但如果你想同时要 OpenClaw 的 workflow/surface flexibility 和 Hermes 的 learning-loop 哲学，这种组合在概念上是成立的。

### Hermes + Claude Code

也可以，但方式会更专门化。

Claude Code 可以继续做 focused coding tool，而 Hermes 负责围绕 messaging、memory 和 automation 的 broader long-lived personal-agent behavior。在这种结构里，Claude Code 是 specialist，Hermes 是包在外层的 persistent shell。

### Hermes + Codex

同样也是可以的。

Codex 正在变得越来越宽，但它归根到底仍然是 OpenAI 的产品 surface。Hermes 可以坐在它上面，作为一个 provider-agnostic persistent agent；或者反过来，Codex 只是 Hermes 调用的一个 tool/model。

这三种组合里，真正的问题都不是概念上的兼容性，而是复杂度。一旦你开始叠加 agent runtime，风险就会变成 duplicated surfaces、duplicated memory、duplicated skills，以及 responsibility boundary 变得模糊。

## Our take

Hermes Agent 之所以有意思，不是因为它想成为一个更好的 coding agent。

它想定义的是另一种类别：一个 persistent、self-improving、multi-surface 的 agent，而且它更属于用户，而不是属于某一家模型供应商。

这是一个强而且很有野心的想法。

它最终能不能成立，不取决于这个承诺听起来多么激动人心，而取决于它的 learning loop 是否真的能随着时间保持有用、稳定，而且可理解。

如果可以，Hermes 就有机会成为那些更 polished、但也更带有 vendor 形状的 agent 工具之外，一个有意义的替代方案。如果做不到，它也有可能变成另一个理论上很强、但在日常使用里不够稳定的 ambitious agent shell。

这正是为什么它值得继续观察。

## References

- Hermes Agent official site  
  https://hermes-agent.nousresearch.com/
- NousResearch/hermes-agent GitHub  
  https://github.com/NousResearch/hermes-agent
- Hermes Agent releases  
  https://github.com/NousResearch/hermes-agent/releases
