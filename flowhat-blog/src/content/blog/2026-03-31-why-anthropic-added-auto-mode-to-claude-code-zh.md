---
title: "Anthropic 为什么要给 Claude Code 加入 Auto Mode？"
description: "Anthropic 的 Auto Mode 不只是一个便利功能。它说明编码代理的竞争，正在从模型能力扩展到自治控制、审批设计和 harness 质量。"
pubDate: 2026-03-31
updatedDate: 2026-04-13
lang: zh
translationGroup: why-anthropic-added-auto-mode-to-claude-code
baseSlug: 2026-03-31-why-anthropic-added-auto-mode-to-claude-code
tags:
  - anthropic
  - claude-code
  - coding-agents
  - ai-agents
  - codex
  - cursor
  - cline
heroImage: ../../assets/blog-placeholder-1.jpg
---

Anthropic 推出 Claude Code 的 Auto Mode，是为了减少重复的审批提示，同时又不把安全层彻底拿掉。

表面上看，这像是一个小的可用性更新。但它的意义不止于此。

现在，编码代理产品的竞争已经不只是模型能力本身。它们还在比：代理可以自主完成多少工作、审批边界放在哪里、以及产品能在不削弱信任的前提下消除多少摩擦。

这也是为什么这个更新值得关注。

## Background

Anthropic 表示，Claude Code 用户最终会批准大多数权限提示。在官方文章中，他们提到用户批准了 93% 的提示。这意味着手动审批层虽然还在，但在实际使用中，它的价值已经被削弱了。

Auto Mode 是 Anthropic 对这个问题的回应。

它位于两种现有选择之间：

- 每一步都手动审批
- 像 `--dangerously-skip-permissions` 那样大范围跳过权限提示

按照 Anthropic 的说明，Auto Mode 增加了两层基于模型的检查。

第一层是输入侧检查。像文件内容、shell 输出、网页抓取结果以及外部工具响应这类输入，会先被扫描是否存在 prompt injection 风险。

第二层是动作侧检查。系统会评估代理即将执行的行为，包括命令执行、工具调用、subagent 执行，以及超出项目边界的访问。

核心思路很简单：减少重复的审批，同时在高风险动作周围保留一层筛查机制。

### Links

- Anthropic, *Claude Code auto mode: a safer way to skip permissions*: https://www.anthropic.com/engineering/claude-code-auto-mode
- Anthropic, *Making Claude Code more secure and autonomous with sandboxing*: https://www.anthropic.com/engineering/claude-code-sandboxing
- Anthropic, *Enabling Claude Code to work more autonomously*: https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously

## Market context

并不是只有 Claude Code 在解决这个问题。

OpenAI 的 Codex 明确把 **sandbox mode** 和 **approval policy** 分开。默认情况下，它会限制网络访问、使用 sandbox，并且只在动作越过这些边界时才请求审批。

Cline 则通过更细粒度的权限模型来处理同样的问题。用户可以决定哪些类别的动作自动批准，哪些仍然需要人工审查。

Cursor 的公开表述方式略有不同，但方向类似。它的 Agent 产品围绕长任务流程、多文件修改、命令执行、subagent、中断和回滚来构建。

不同产品的包装方式不一样，但它们最终都在回答同一个问题：

**代理到底可以自动工作到什么程度，而不会让信任崩塌？**

### Links

- OpenAI, *Agent approvals & security – Codex*: https://developers.openai.com/codex/agent-approvals-security
- OpenAI Codex sandbox docs: https://github.com/openai/codex/blob/main/docs/sandbox.md
- Cline, *Auto Approve & YOLO Mode*: https://docs.cline.bot/features/auto-approve
- Cursor, *Agent mode*: https://cursor.com/help/ai-features/agent
- Cursor, *Automations*: https://cursor.com/docs/cloud-agent/automations

## Why Anthropic added it now

问题其实很明确。

当编码代理开始真正适合多步骤工作时，反复出现的审批提示就会拖慢整个流程。用户依然掌握控制权，但产品会变得越来越吵、越来越难用。

严格的 sandbox 有帮助，但会限制真实工作流。完全开放的模式则减少了摩擦，却把信任边界放得太宽。

Auto Mode 是 Anthropic 试图占据这两个极端之间的中间地带。

这也符合 Anthropic 最近一系列工程方向。它一直在强调 harness 设计、长任务结构、eval、subagent，以及模型之外的系统设计。Auto Mode 正是这一思路的延伸。

## Pros and cons

### Pros

- 可以减少低价值的审批弹窗
- 更适合长流程的代理工作
- 比“完全摩擦”或“完全放开”更现实
- 说明 harness 质量正在成为真正的竞争层

### Cons

- false positive 太多时，approval fatigue 会变成 classifier frustration
- false negative 出现时，问题可能更严重，因为用户原本相信安全层会把它拦住
- 内部实验结果并不能保证在复杂真实的开发环境中同样可靠

## Is it useful?

有用，但更像是工作流改进，而不是能力上的突破。

Auto Mode 并没有把 Claude Code 变成完全不同等级的编码代理。它真正解决的是一个现实瓶颈：一旦代理开始处理有价值的多步骤工作，人类监督就会变得过多。

这也是为什么这个更新比表面上看起来更重要。

它不只是一个“减少点击”的功能，也说明编码代理产品正在从单纯的模型竞争，转向自治设计、信任边界和执行结构的竞争。

## Takeaway

现在真正重要的问题，已经不只是模型会不会写代码。

更重要的是，产品能不能在不让信任崩塌的前提下，让模型在更少监督下行动。

这正是 Anthropic 想通过 Auto Mode 解决的问题。这也是为什么这次更新的意义，不只局限于 Claude Code 本身。

## Sources

- Anthropic, *Claude Code auto mode: a safer way to skip permissions*  
  https://www.anthropic.com/engineering/claude-code-auto-mode
- Anthropic, *Making Claude Code more secure and autonomous with sandboxing*  
  https://www.anthropic.com/engineering/claude-code-sandboxing
- Anthropic, *Enabling Claude Code to work more autonomously*  
  https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously
- OpenAI, *Agent approvals & security – Codex*  
  https://developers.openai.com/codex/agent-approvals-security
- OpenAI Codex sandbox docs  
  https://github.com/openai/codex/blob/main/docs/sandbox.md
- Cline, *Auto Approve & YOLO Mode*  
  https://docs.cline.bot/features/auto-approve
- Cursor, *Agent mode*  
  https://cursor.com/help/ai-features/agent
- Cursor, *Automations*  
  https://cursor.com/docs/cloud-agent/automations
