---
title: "ChatGPT 的 Workspace Agents 是什么？"
description: "Workspace agents 不是 ChatGPT 里又多了一个小功能。OpenAI 更像是在把 ChatGPT 推向一个面向团队、可共享、可治理的工作流代理层。"
pubDate: 2026-04-27
updatedDate: 2026-04-27
lang: zh
translationGroup: what-are-workspace-agents-in-chatgpt
baseSlug: 2026-04-27-what-are-workspace-agents-in-chatgpt
tags:
  - openai
  - chatgpt
  - workspace-agents
  - agents
  - workflows
  - codex
  - enterprise-ai
heroImage: ../../assets/workspace-agents/workspace-agents-1.svg
---

**Workspace agents** 这个名字，其实很容易让人想小了。

第一眼看上去，它像是 ChatGPT 又加了一个功能：比 GPT 再高级一点，连上几个工具，再多一点自动化，大概就是这个意思。

但 OpenAI 这次想做的，明显不止这些。

更准确地说，它推出的是一个**放在 ChatGPT 里的、面向团队的共享型工作流代理层**。[1] 这类 agent 可以在云端持续运行，能连接工具和系统，遇到敏感步骤时会停下来请求批准，而且在你离开之后还可以继续把事情往前推。[1]

所以，把它理解成“ChatGPT 新增了一个功能”，其实会错过重点。

## 最短的理解方式

OpenAI 把 workspace agents 描述成 GPT 的进化版。[1]

这个说法没错，但还是有点轻了。

自定义 GPT 更像是给个人准备的助手，带一点规则、带一点定制。workspace agent 则更像是团队可以一起使用的东西：建一次，大家共用，边用边改，慢慢变成一个稳定的工作流工具。OpenAI 自己反复强调的也是这几件事：[1][2]

- 可以在团队里共享
- 可以在云端运行
- 可以接入工具和系统
- 可以带着审批和管理控制一起工作

合起来看，这已经不是“更会回答问题的 ChatGPT”了，而是在把 ChatGPT 往**重复性工作**的方向推。

如果一个团队想把周报、线索筛选、供应商风险审查、产品反馈分流这类事情交给一个可复用的 agent，这就是 OpenAI 想做的产品形态。[1]

## 最好理解它的方式是 trigger + process + tools

发布文章讲的是产品本身，OpenAI Academy 的说明则更像是在讲这套东西背后的结构。

按照那份指南，agent 大致由三部分组成：[2]

1. **Trigger** —— 什么触发这项工作  
2. **Process and skills** —— 它按什么流程来做  
3. **Tools and systems** —— 它可以连接哪些应用、文档和数据来源

这个框架比“高级 prompt”更接近真相。

OpenAI 想象中的 workspace agent，更像是一个**中间放着模型的工作流系统**。它可以按计划启动，从 Slack 和 CRM 拉信息，整理变化，生成草稿，然后在涉及敏感动作之前先停下来问人要不要继续。[1][2]

这跟在聊天窗口里问 ChatGPT 一个一次性问题，已经不是同一种产品体验了。

## 它更适合什么工作

OpenAI 对这一点说得算比较直白。[2]

它认为 agent 最适合的工作，一般有几个特征：

- 会重复出现
- 输出有相对清晰的结构
- 可以按时间或事件触发
- 需要读写团队正在使用的工具或系统

这个判断其实挺实用，因为它顺手也把很多过热的想象排除掉了。

Workspace agents 并不是给所有模糊的思考任务准备的。它更适合那种模式反复出现、结果也能被大致检查的工作。

OpenAI 举的例子基本都落在这类场景里：[1][2]

- briefing 和报告
- triage 和 routing
- 分析与建议
- 内容草稿生成
- 计划与协调

所以这里的重点不是纯粹的创意，而是**带着真实输入、交接关系和流程约束的重复性工作**。

## 它和普通 ChatGPT、GPT 到底差在哪

这一点最值得讲清楚。

普通 ChatGPT 对话，本质上还是“一个人现在需要一点帮助”。自定义 GPT 虽然能加规则、加一点工具，但整体感觉仍然是一个面向用户的助手。

Workspace agents 的方向不太一样。

按 OpenAI 的说法，它可以在云端跑更长的流程，跨多个工具继续工作，在敏感环节请求批准，并且在管理员控制下被组织内部共享。[1]

这会改变产品边界。

OpenAI 还说，GPT 不会马上消失；在团队测试 workspace agents 的同时，GPT 还会继续存在，之后也会让 GPT 转成 workspace agents 更容易。[1]

这几乎已经把产品分层说出来了：

- **GPT** 更像轻量原型层
- **workspace agents** 更像可治理、可长期使用的运营层

这不是侧边栏里多了一个按钮那么简单，而是 ChatGPT 想成为什么样的产品，开始变得更清楚了。

## OpenAI 真正想解决的是什么

OpenAI 的核心判断其实很简单：公司里的重要工作，通常不是靠一个 prompt 就能完成的。[1]

它往往依赖分散的上下文、既定流程、多个系统、审批节点，以及不同人之间的 handoff。真正麻烦的地方，常常不在最后那段文字，而在周围那一圈琐碎又必要的流程里。

比如：

- 从不同地方把信息拼起来
- 确认流程有没有按要求走
- 判断什么时候该升级处理
- 在危险动作之前先停下
- 把结果整理成下一个人可以直接接手的形式

Workspace agents 更像是 OpenAI 试图把这一整层工作搬进 ChatGPT 里。

## 真正的产品重点其实是治理

最容易被看到的点，是它能在云端持续运行。

这当然重要，但更深的产品故事其实是治理。

OpenAI 把**审批、权限、共享、分析、合规可见性**放进了 agent 产品的核心，而不是留给企业自己事后补。[1]

按官方说法，团队可以决定 agent 能访问哪些工具和数据、能做哪些动作、哪些步骤必须先获得批准。[1] 管理员也可以控制谁能创建、使用、分享 agent，并通过 Compliance API 查看 agent 的配置和运行情况。[1]

这和“给你一个聪明助手，剩下自己想办法”完全不是一种产品态度。

这更像是在说：OpenAI 认为 workplace agent 最终不是只靠模型好不好来竞争，而是要看它能不能在组织内部**稳定、可控、可审计**地运作。

## 这不代表所有流程都应该变成 agent

这一点倒是 OpenAI 自己比外面的 hype 更克制。[2]

Academy 指南明确说，开放式头脑风暴、探索式写作、一次性的思考任务，往往还是普通聊天更合适。[2]

这个边界很重要。

不是所有工作塞进 LLM 之后都会变好。有些任务还是规则型自动化更稳，有些风险太高，有些表面上看是重复流程，真正做起来却全是例外。

所以，更准确的理解不是“workspace agents 会替代普通软件流程”。

更接近事实的说法是：**OpenAI 把它看成聊天和硬编码自动化之间的中间地带**——比聊天更有结构，又没有传统自动化那么死板。

## 为什么这件事值得看

Workspace agents 值得关注，不是因为它又给 ChatGPT 多了几个能力点，而是因为它把 ChatGPT 的下一步方向说得更清楚了。

很长一段时间里，ChatGPT 的重心都还是个人助手：提问、回答、上传文件、偶尔用一下自定义 GPT。

Workspace agents 指向的是更大的东西。

OpenAI 想把 ChatGPT 变成一个团队可以定义重复工作、接入工具、设定规则与审批，然后让云端 agent 持续推进事情的地方。[1][2]

这已经不是“新功能上线”那么简单了。

它是在把 ChatGPT 往一个**共享工作流运行层**的方向推。

至于团队会不会真的大规模接受这种模式，现在还不能下结论。但方向已经很明显了。

## 我们的看法

如果要用最短的话来概括，workspace agents 可以理解成：

**面向重复性团队工作、建立在 ChatGPT 上的组织型 agent。**

如果说 GPT 主要是给个人一个可定制的助手，那么 workspace agents 更像是给组织一个可以复用的执行者：它能跨系统工作，必要时停下来要批准，也能在原始提问的人离开之后继续推进流程。

这就是为什么它值得认真看一眼。

具体功能当然重要，但更值得注意的是背后的产品方向。OpenAI 不再只是想卖一个“偶尔会用工具的聊天机器人”，而是想把 **ChatGPT 卖成 workplace agent layer**。

真正更大的信号在这里。

## 参考资料

[1] OpenAI, *Introducing workspace agents in ChatGPT*  
https://openai.com/index/introducing-workspace-agents-in-chatgpt/

[2] OpenAI, *Workspace agents*  
https://openai.com/academy/workspace-agents/
