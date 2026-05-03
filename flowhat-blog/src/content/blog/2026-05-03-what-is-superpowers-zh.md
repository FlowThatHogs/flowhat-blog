---
title: "Superpowers 是什么？"
description: "Superpowers 是面向编程代理的软件开发方法论和技能框架。它作为 Claude Code 官方技能提供，也可用于 Codex、Cursor、OpenCode、Copilot CLI 和 Gemini CLI。"
pubDate: 2026-05-03
updatedDate: 2026-05-03
lang: zh
translationGroup: what-is-superpowers
baseSlug: 2026-05-03-what-is-superpowers
tags:
  - superpowers
  - claude-code
  - codex
  - agents
  - workflows
  - ai-engineering
heroImage: ../../assets/blog-placeholder-1.jpg
---

**Superpowers** 是面向编程代理的软件开发方法论和技能框架。

简短地说，它给 AI 编程代理一组可复用技能，用于计划、测试、调试、评审和完成软件工作。但更重要的不是技能文件本身。Superpowers 还包含一种操作纪律，让代理在急着实现之前先检查并使用这些技能。[1]

所以，它不应该被理解成又一个提示词包。

提示词包给模型更好的指令。Superpowers 试图给代理一套开发流程：构建前先提问，实现前先设计，改文件前先计划，相信代码前先测试，合并前先评审，声称完成前先验证。

截至写作时，GitHub API 显示 `obra/superpowers` 约有 **176,900 stars**、**15,600 forks**，采用 MIT 许可证。[2] 这些数字不能证明这套方法适合每个项目。但它们说明开发者正在关注一个真实问题：编程代理可以产生大量输出，但如果输出要变成可靠软件，就需要流程。

## Superpowers 给编程代理什么？

Superpowers 给代理提供一组命名技能，覆盖原始聊天会话中经常被跳过的软件工作环节。

当前技能包括：[1][3]

- `brainstorming`
- `using-git-worktrees`
- `writing-plans`
- `subagent-driven-development`
- `executing-plans`
- `test-driven-development`
- `systematic-debugging`
- `requesting-code-review`
- `receiving-code-review`
- `verification-before-completion`
- `finishing-a-development-branch`
- `writing-skills`

单独看，这些技能都不难理解。`brainstorming` 帮助代理在构建前澄清意图。`writing-plans` 把已确认的设计拆成小的实现任务。`test-driven-development` 让代理更接近 red-green-refactor，而不是先写代码再补测试。`systematic-debugging` 在遇到 bug 时让代理放慢速度，调查原因，而不是猜测。`verification-before-completion` 阻止一个常见失败：代理没有真正证明结果，却说已经修好。

合在一起，它们形成一个工作流。

这个工作流才是 Superpowers 的重点。它不只是想让模型看起来更聪明，而是想让模型在可重复的软件开发循环中工作。

## 基本思想：流程先于输出

大多数编程代理失败并不是从语法错误开始的，而是更早。

用户请求一个功能。代理开始假设需求。它选择架构，却不展示取舍。它没有计划就改文件。它事后补测试，或者干脆跳过测试。最后只检查一个狭窄的 happy path，就自信地报告成功。

Superpowers 正是在反推这种行为。

README 描述的基本工作流从 `brainstorming` 开始，然后进入设计确认、具体实现计划、通过 subagent 或 execution session 执行任务、实现中使用 TDD、任务之间请求 code review，最后通过 verification 和 branch finishing 收尾。[1]

结构很直接：

```text
understand → design → plan → implement with tests → review → verify → finish
```

这里没有神秘之处。它是把普通工程纪律打包起来，让编程代理更可能遵守。

## 为什么技能触发很重要

只有一文件夹好指令是不够的。

难点在于让代理在正确时刻使用正确指令。如果人类每次都必须记得说“请先 brainstorm”或“声称完成前请先验证”，那工作流仍然过度依赖人工监督。

Superpowers 把这看成核心问题。README 说代理会在任何任务前检查相关技能，而且这些工作流是 mandatory workflows，不是建议。[1] 项目的 contributor guidelines 也从另一个角度说明这一点：技能是塑造代理行为的材料，不是普通说明文字。技能变更需要评估，新的 host 集成必须证明 bootstrap 会自动加载，并在写代码前触发正确行为。[4]

这是项目最重要的想法之一。

Superpowers 不只是一个指令库。它是一个系统，试图让这些指令成为代理默认运行方式的一部分。

## Claude Code 官方支持

Superpowers 可以通过 Claude Code 的官方插件市场使用。[1]

这很重要，因为它让这个项目不再像私人配置，而更像 Claude Code 用户的一等技能包。仓库中有 `.claude-plugin/plugin.json`，包名是 `superpowers`，描述为 Claude Code 的核心技能库，覆盖 TDD、debugging、collaboration patterns 和 proven techniques。[7]

因此，如果你在 Claude Code 里看到 Superpowers，你看到的不是某个本地文件夹里的随机提示词，而是同一个 Superpowers 项目的 Claude-facing package。

但 Claude Code 只是一个 host。

## 它不是 Claude 专用

Superpowers 的设计不局限于 Claude Code。

README 列出了 Claude Code、OpenAI Codex CLI、Codex app、Cursor、OpenCode、GitHub Copilot CLI 和 Gemini CLI 的安装路径。[1] 仓库还包含 `.codex-plugin/plugin.json`，其中 Superpowers 被描述为用于 planning、TDD、debugging 和 collaboration workflows 的 agentic skills framework and software-development methodology。[8]

这种跨 host 支持很重要。

它说明 Superpowers 不是某个 Claude 功能，而更像一个可移植工作流层，可以放在不同的编程代理环境之上。host 可以是 Claude Code、Codex、Cursor、OpenCode、Copilot CLI 或 Gemini CLI。底层主张相同：当代理在做软件工作时，它需要的不只是模型能力，还需要流程。

这就是 Superpowers 值得关注的地方。有用的单位不只是模型，也不只是编辑器，而是围绕代理的开发循环。

## 它适合什么工作？

当任务大到 agent drift 的代价变高时，Superpowers 最相关。

对于一行 typo 修复，完整流程可能太重。但对于多文件功能、有风险的重构、调试会话，或者需要评审和测试的工作，它的价值更明显。代理需要保留意图，避免沉默假设，按受控顺序修改，并证明结果。

Superpowers 给这些 checkpoint 命名。

这不会让代理魔法般自治。它给人类一个更容易检查的流程。人类不必只看一长串代码生成，而是可以看到代理经过更熟悉的阶段：design、plan、test、review、verify。

对于严肃软件工作，这是更好的形状。

## 更大的意义

最准确地说，Superpowers 是编程代理的 process layer。

它打包了有经验工程师已经重视的软件开发习惯：澄清目标、隔离工作、分小步计划、写测试、系统调试、请求评审、验证完成。

关键动作是让这些习惯足够自动化，让代理不需要人类在每次会话中重复同样的流程指令也能遵守。

所以 Superpowers 不只是 Claude 插件，也不只是提示词包。

它说明了编程代理工具正在走向哪里：从 clever prompts 到 reusable skills，再从 reusable skills 到 repeatable development methods。

不是一个巨大的提示词。

而是一套代理应该遵循的流程。

## References

1. Jesse Vincent / obra, *Superpowers* README  
   https://github.com/obra/superpowers
2. GitHub API, `obra/superpowers` repository metadata, checked 2026-05-03  
   https://api.github.com/repos/obra/superpowers
3. Jesse Vincent / obra, *Superpowers skills directory*  
   https://github.com/obra/superpowers/tree/main/skills
4. Jesse Vincent / obra, *Superpowers Contributor Guidelines*  
   https://github.com/obra/superpowers/blob/main/CLAUDE.md
5. Jesse Vincent / obra, *Superpowers Claude plugin metadata*  
   https://github.com/obra/superpowers/blob/main/.claude-plugin/plugin.json
6. Jesse Vincent / obra, *Superpowers Codex installation notes*  
   https://github.com/obra/superpowers/blob/main/.codex/INSTALL.md
7. Jesse Vincent / obra, *Superpowers Claude plugin metadata*  
   https://github.com/obra/superpowers/blob/main/.claude-plugin/plugin.json
8. Jesse Vincent / obra, *Superpowers Codex plugin metadata*  
   https://github.com/obra/superpowers/blob/main/.codex-plugin/plugin.json
