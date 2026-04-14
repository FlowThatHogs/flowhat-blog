---
title: "用户说 Claude Opus 变差了。Anthropic 说这是 Bug，不是 Nerf。"
description: "围绕 Claude Opus 和 Claude Code 的抱怨，正在从单纯的性能争议，演变成关于模型一致性、版本信任和生产可靠性的问题。"
pubDate: 2026-04-14
updatedDate: 2026-04-14
lang: zh
translationGroup: users-say-claude-opus-got-worse
baseSlug: 2026-04-14-users-say-claude-opus-got-worse
tags:
  - anthropic
  - claude-opus
  - claude-code
  - model-reliability
  - ai-infrastructure
  - ai-agents
heroImage: ../../assets/blog-placeholder-1.jpg
---

过去几周里，越来越多 Claude 用户开始抱怨：这个模型似乎没有以前那么好了。而且，抱怨的对象往往不只是 Claude 笼统意义上的表现，而是更具体地指向 Claude Opus 和 Claude Code。

核心指控如今已经很熟悉了：instruction following 变弱了，reasoning 变浅了，长时间、多步骤任务的可靠性也不如以前。一些用户甚至把它称作 "AI shrinkflation" —— 在同样的模型名和同样的价格下，实际得到的是一个更弱的产品。

这是用户一侧的叙事。

Anthropic 的说法则不同。该公司表示，它不会因为需求、服务器负载或一天中的不同时间而故意降低模型质量。在最近的一份 postmortem 中，Anthropic 将输出质量下降归因于基础设施 bug，而不是有意降级。

所以，这件事真正值得关注的，并不只是 Anthropic 是否偷偷把 Claude "nerf" 了并被发现。那一点目前仍然没有被证明。更重要的问题是：hosted model 正在面对和任何生产依赖项一样的信任问题。用户需要知道，自己付费使用的东西，是否在时间上保持稳定、可预测，并且在实质上还是同一个东西。

## 用户到底在报告什么

这些抱怨已经不再模糊。

最清晰的公开案例之一，是一个标题为 **"Opus 4.6 quality regression: production automations broken by apparent model downgrade"** 的 GitHub issue。该报告描述了一个已经稳定运行两周多的日常自动化流程，在没有任何 prompt、代码或配置改动的情况下，突然开始输出 incoherent 的结果。

根据这个 issue，模型开始出现以下问题：

- 忽略此前一直遵守的顶层规则，
- 跳过应当读取的样式文件，
- 输出的结构化质量下降，
- 整体表现更像一个比 Opus 更小的模型。

即便这一个报告还不足以证明整个平台范围内的回归，它也抓住了生产用户最在意的失败形式。问题不只是回答“差了一点”，而是一个原本可用的自动化流程，突然在相同模型名下变得不再可靠。

这是一种完全不同性质的 complaint。

类似的主题还反复出现在别处：持续推理能力变弱、instruction adherence 下降、任务半途放弃，以及 Claude Code 会话中 token 浪费增加。这里面有些报告可能是主观的，有些也可能受到长上下文、prompt 改动或用户预期变化的影响。但正是这些 complaint 的数量和相似性，让这件事不再只是普通的模型争论。

## Anthropic 实际上说了什么

Anthropic 并没有确认 Claude Opus 被故意降级。

它公开的是一份官方 engineering postmortem，解释了三个基础设施 bug 如何间歇性地降低了 Claude 的输出质量。在那篇文章里，Anthropic 明确表示：

- 它不会因为需求或时间段而降低模型质量，
- 用户经历到的质量下降是由基础设施 bug 引起的，
- 这些 bug 的确影响了某些请求的质量一致性。

这个区分非常重要。

这份 postmortem 并不等于说“所有用户 complaint 都完全按他们描述的那样成立”。但它也绝不等于“根本没有真实的质量问题”。恰恰相反，它确认了：至少对一部分用户来说，输出质量确实发生了下降，而且这些基础设施问题严重到需要官方给出正式解释。

此外，一些二级报道还引用了 Anthropic 的说法：部分 Claude 模型受影响的 bug 已经修复，而关于 Opus 的质量问题仍在调查之中。这依然不足以证明 deliberate nerf，但它强化了一个基本事实：用户并不是凭空想象出了整个问题。

## 为什么这件事不只是 Claude 的一次争议

真正的问题并不只是 Claude。

Hosted AI model 正在越来越多地进入真实工作流，而不仅仅是闲聊场景。团队会把它们放进 coding loop、内容流水线、客服流程和内部自动化系统里。一旦发生这种转变，对可靠性的要求就完全不同了。

一个聊天机器人即使有些不一致，依然可以很有趣。  
一个生产依赖项则不行。

这就是为什么，即便 "nerf" 这个词最后被证明并不准确，这些抱怨依然重要。

如果用户用一个固定的模型名来调用模型 —— 比如 `claude-opus-4-6` —— 他们自然会认为这个名字对应的是某种相对稳定的东西。他们不会期待：在相同 prompt、相同自动化和相同模型标识符下，仅仅因为隐藏的 routing 变化、基础设施 bug 或 serving 差异，模型行为就突然明显变差。

这也是 AI 平台信任开始变得更像传统软件可靠性问题的地方。

用户至少希望得到三样东西：

1. **Version stability** —— 同一个模型名不应该不可预测地漂移。
2. **Transparency** —— 如果行为因为基础设施或 routing 而变化，用户应该被告知。
3. **Version pinning 或 snapshot** —— 生产用户需要能锁定一个已知可靠的行为版本，并在自己愿意时再升级。

这些要求并不过分。对于任何会进入生产系统的依赖项来说，这都是正常预期。

## 这个信任问题比 benchmark 更大

这也是为什么，这个问题不能被简单归类为社交媒体噪音。

公开 benchmark 排名当然重要，但生产信任更重要。一个模型即便 benchmark 看起来还不错，如果真实世界中的行为变得不够可预测，它依然会变得明显更难用。对很多严肃用户来说，reliability 本身就是 capability 的一部分。

对 coding model 来说尤其如此。

如果一个 coding model 在遵守约束、维持长任务状态、完成结构化工作方面变得不可靠，那么伤害就不是抽象的。它会立刻表现为自动化失效、审查时间浪费，以及信心流失。

换句话说，问题不只是：

**“Claude Opus 还聪明吗？”**

问题还包括：

**“我能否信任这个 endpoint 背后的模型，在真实工作里保持足够一致的行为？”**

这是一个更难、也更重要的问题。

## Our take

到目前为止，最稳妥的结论并不是 Anthropic 秘密 nerf 了 Claude Opus。

更强的结论是：用户确实经历到了足够明显的质量不一致，这已经演变成一个信任问题，而 Anthropic 自己的 postmortem 也让人很难把整个问题归结为纯粹的想象。

这件事重要，是因为 AI 厂商正在走出 demo 阶段。一旦人们开始把真实工作流建立在 hosted model 之上，静默的质量漂移就不再只是社区抱怨，而会变成一个产品问题。

因此，理解这个事件最有价值的方式，不是把它当作一场关于 Claude 是否“作弊被抓”的戏剧，而是把它看作一个早期信号：模型提供商必须在稳定性、透明度和版本控制上提供更强的保证。

即便这一次的 Claude 风波过去了，这个问题仍然会留下来。

## References

- Anthropic, *A postmortem of three recent issues*  
  https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues
- GitHub issue, *Opus 4.6 quality regression: production automations broken by apparent model downgrade*  
  https://github.com/anthropics/claude-code/issues/31480
- VentureBeat, *Is Anthropic 'nerfing' Claude? Users increasingly report performance degradation as leaders push back*  
  https://venturebeat.com/technology/is-anthropic-nerfing-claude-users-increasingly-report-performance
- The Decoder, *Anthropic confirms technical bugs after weeks of complaints about declining Claude code quality*  
  https://the-decoder.com/anthropic-confirms-technical-bugs-after-weeks-of-complaints-about-declining-claude-code-quality/
