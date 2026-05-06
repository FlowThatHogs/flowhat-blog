---
title: "如何使用 Karpathy Guidelines：让 AI 编程代理更安全的五个例子"
description: "Karpathy Guidelines 更像是一份编程代理的行为契约：先说明假设，保持实现简单，只做必要修改，并在结束前验证结果。"
pubDate: 2026-05-06
updatedDate: 2026-05-06
lang: zh
translationGroup: how-to-use-karpathy-guidelines
baseSlug: 2026-05-06-how-to-use-karpathy-guidelines
tags:
  - claude-code
  - codex
  - agents
  - skills
  - ai-engineering
  - workflows
heroImage: ../../assets/blog-placeholder-1.jpg
---

Karpathy Guidelines 最有用的方式，不是把它当成神奇提示词，而是把它当成编程代理的工作规则。

上一篇文章里，我们解释了 [Andrej Karpathy Skills 是什么](/blog/2026-05-05-what-is-andrej-karpathy-skills/zh/)。更准确地说，这是 Forrest Chang 把 Karpathy 对 LLM 编程失败模式的公开观察，整理成 `CLAUDE.md`、Claude Code 插件、可复用的 `karpathy-guidelines` skill 和相关指令文件的社区项目。[1][2]

这篇文章更偏实践：如果你加载了这个 skill，应该让代理具体做出什么改变？

简短地说，就是让代理不要像一个匆忙的初级开发者那样行动。

这套规则有四个核心习惯：

1. **Think Before Coding** — 写代码前先说明假设。
2. **Simplicity First** — 用最小实现解决请求的问题。
3. **Surgical Changes** — 只改必须修改的代码。
4. **Goal-Driven Execution** — 定义成功标准，并在结束前验证。[2]

这些话听起来很简单。真正的价值在于把它们放进实际任务里。

## 基础提示词

不需要复杂流程。对于非琐碎任务，可以这样开始：

```text
这个任务请使用 `karpathy-guidelines` skill。
修改文件之前，先列出你的假设和不清楚的地方。
优先选择能解决请求的最小实现。
只做必要范围内的 surgical change。
结束前先说明你会如何验证成功，并在可以执行时运行这些验证。
```

对于很小的修改，这可能太重。修一个错别字不需要完整计划。但对于功能、重构、bug 修复、多文件改动，这会改变整个会话的形状。

较弱的代理循环通常是：

```text
请求 → 猜测 → 修改 → 自信地说完成
```

更好的循环是：

```text
澄清 → 选择最小路径 → 小范围修改 → 测试或检查 → 报告改动
```

下面的例子说明这种差异。

## 例子 1：模糊的功能请求

不好的请求：

```text
请添加一个用户 export 功能。
```

编程代理很容易直接开始做。它可能假设要导出所有用户，格式是 CSV，入口在管理员页面，包含全部字段，不处理权限和隐私问题。这些选择有些可能是错的。

使用 Karpathy Guidelines 后，代理应该先停下来：

```text
这个请求里有几个隐藏决定：
- 导出所有用户，还是当前筛选结果？
- 格式是 CSV、JSON 还是 XLSX？
- 哪些字段允许离开系统？
- 这是管理员专用功能吗？
- 数据量是否适合直接下载，还是需要后台任务？

如果没有修正，我的默认假设是：管理员专用 CSV 导出，导出当前筛选用户列表，只包含非敏感字段。
```

这不是官僚流程。它是在防止最昂贵的错误：快速构建错误的东西。

假设被确认后，实现可以保持很小：添加 route，连接按钮，只包含允许的字段，并用相关测试或手动检查验证。

当请求里隐藏产品、安全、数据或 UX 决策时，这个模式很有用。

## 例子 2：阻止过度设计

不好的请求：

```text
请为 invoice 添加 CSV export 功能。
```

不好的代理输出：

```text
ExportService
ExportProviderInterface
CsvExportAdapter
JsonExportAdapter
ExportJobQueue
ExportRegistry
export.config.ts
```

也许未来会需要这套架构，也许不会。用户请求的是 CSV invoice export，不是一个导出平台。

Karpathy Guidelines 应该把代理推向最小可用实现：

```text
我只会为当前请求的页面实现 CSV invoice export。
除非代码库里已经有通用 export 模式，否则不会新增 export framework。
验证：运行现有 invoice 测试，并手动检查一行生成的 CSV。
```

重点不是为了少写代码而少写代码，而是让维护成本和实际问题大小匹配。

AI 代理能很快生成复杂代码，所以复杂性看起来很便宜。但 review、debug 和长期维护仍然由人承担。

## 例子 3：避免连带修改

不好的请求：

```text
请把 checkout 按钮文案从 “Continue” 改成 “Pay now”。
```

不好的代理行为：

- 重新格式化整个组件；
- 重命名局部变量；
- 改变 import 顺序；
- 重写附近的条件渲染；
- 修改无关 CSS class。

最终 UI 可能仍然能运行，但 diff 变得很吵。reviewer 需要判断那些无关改动是否有意为之。

加载 guidelines 后，代理应该更窄地行动：

```text
这是一个 surgical text change。
我只会修改按钮文案，以及直接依赖旧文案的测试或 snapshot。
我不会 reformat 或 refactor 附近代码。
```

对于编程代理来说，reviewability 是 correctness 的一部分。能运行但藏在混乱 diff 里的改动，很难信任。

文案修改、样式小改、一行 bug fix、定向配置修改，都适合这个模式。

## 例子 4：不要靠猜测修 bug

不好的请求：

```text
date filter 坏了，请修复。
```

匆忙的代理可能看一个文件，猜是 timezone 问题，改一个 helper，然后宣布完成。有时这会成功，更多时候只是把 bug 移到别处。

Karpathy Guidelines 应该把任务变成可验证循环：

```text
我会先复现 bug 或找到失败场景。
然后为这个场景新增或更新测试。
接着只做让测试通过所需的最小代码改动。
验证：运行 date-filter 测试和相关 query 测试。
```

更好的代理回答可以这样开始：

```text
我需要一个具体失败场景。我会检查 inclusive end date、local timezone conversion 和 empty date 处理。如果已有相关测试，我会把失败场景加到现有测试里，而不是创建新的测试结构。
```

这里最重要的是 **Goal-Driven Execution**。代理不应该因为说得像完成了而得分，而应该因为复现失败并通过验证而得分。

## 例子 5：让重构不要跑偏

不好的请求：

```text
请 refactor 这个 module。
```

这个请求太开放。为了什么重构？

- 更小的函数？
- 更少重复？
- 更好的类型边界？
- 更快运行速度？
- 更容易测试？
- 更简单的 public API？

没有目标时，编程代理可能会生成一个看起来很厉害但任意的 rewrite。这可能比不改更糟。

Karpathy-guided agent 应该先缩小目标：

```text
重构前我需要目标。
可能的目标：
1. 在保持 public API 不变的情况下减少重复；
2. 拆分 parsing 和 validation，便于测试；
3. 在不改变行为的情况下提升性能；
4. 拆成更小 helper，提高可读性。

应该优化哪个目标？
```

目标确定后，验证也更清楚：

```text
成功标准：
- public API 不变；
- 修改前后现有测试通过；
- 重复 validation branch 被合并；
- 没有修改无关文件。
```

这就是“凭感觉重构”和受控工程工作的区别。

## 在 Claude Code、Codex 或 Hermes 中怎么用

具体安装方式因客户端而异，但操作模型相同。

在 Claude Code 中，仓库提供了 `CLAUDE.md` 和插件式包装。在支持 skills 的客户端里，`skills/karpathy-guidelines/SKILL.md` 可以作为可复用 skill。其他代理也可以把同样四条原则放进 project instructions 或 repo-level agent file。[1][2]

日常工作里，最适合放在四类任务中：

- **功能开发**：写代码前说明假设和 scope。
- **Bug 修复**：要求复现和验证。
- **重构**：改变结构前先定义重构目标。
- **Review**：检查过度设计、无关修改、缺失测试和隐藏假设。

对于一行修改这类低风险任务，它的收益较小。原始 `SKILL.md` 也提到这个 tradeoff：guidelines 偏向谨慎，所以琐碎任务不一定需要完整流程。[2]

## 基于 guidelines 的 review checklist

代理说完成后，可以用四个问题检查：

1. **Assumptions**：它是否先说明了不清楚的决定？
2. **Simplicity**：它是否添加了未被请求的架构？
3. **Diff discipline**：每一行改动都和任务直接相关吗？
4. **Verification**：它是否运行或定义了有意义的成功检查？

如果答案是否定的，可以这样要求它重做：

```text
请重新应用 `karpathy-guidelines`。
把修改范围收缩到这次请求本身。
移除基于猜测添加的 abstraction。
明确列出你实际运行过的验证，以及没能运行的验证。
```

这通常足以把一个发散的 agent patch 收缩成可 review 的改动。

## 这个 skill 不能做什么

Karpathy Guidelines 不会让生成代码默认正确。它不能替代测试、CI、code review、type checking、安全审查或领域知识。

它也不会移除人的判断。有时代理应该提问。有时可以带着明确假设继续。有时更大的 abstraction 是合理的，因为代码库里已经有这种模式。

目标不是让每次编程会话都更慢。目标是阻止代理静默选择危险默认值。

## 实用结论

Karpathy Guidelines 有用的地方不是名人名字，也不是 star count。核心是行为契约。

写代码前，代理要说明假设。实现时，要保持方案小。修改现有代码时，要避免连带损伤。结束前，要验证结果。

这是一个朴素想法，但很符合当前 AI 编程现实。现代编程代理已经足够强，可以快速改变大量软件。因此它们的失败模式更重要，而不是更不重要。

一个小 guideline 文件不会让代理完美。它可以让代理更容易被监督。对真实项目来说，这已经有价值。

## References

[1] `forrestchang/andrej-karpathy-skills` GitHub repository, checked May 6, 2026: https://github.com/forrestchang/andrej-karpathy-skills

[2] `karpathy-guidelines` skill file, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/skills/karpathy-guidelines/SKILL.md

[3] Andrej Karpathy on X, post about Claude/Codex-style coding-agent workflow and pitfalls: https://x.com/karpathy/status/2015883857489522876
