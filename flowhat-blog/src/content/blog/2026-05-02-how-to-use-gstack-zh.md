---
title: "如何使用 gstack：不要把 Claude Code 变得过度复杂"
description: "一篇实用指南：把 gstack 当作 Claude Code 的轻量工作流层，在合适的时候规划、审查、QA 和发布，而不是把每个任务都变成仪式。"
pubDate: 2026-05-02
updatedDate: 2026-05-02
lang: zh
translationGroup: how-to-use-gstack
baseSlug: 2026-05-02-how-to-use-gstack
tags:
  - gstack
  - claude-code
  - ai-engineering
  - workflows
heroImage: ../../assets/blog-placeholder-1.jpg
---

gstack 不是藏在终端里的魔法 AI 公司。它更像是一组给 Claude Code 使用的结构化技能，帮助你在写代码前先想清楚，在信任代码前先审查，在发布前先测试。

这就是它的主要价值。

大多数 AI 编程失败并不是从代码开始的，而是更早。功能定义不清，范围太大，架构还没想明白，agent 就已经开始实现。结果看起来完成了，但真实用户流程没人测过。

gstack 给 Claude Code 加上一条更有纪律的工作流：

```text
思考 → 规划 → 构建 → 审查 → 测试 → 发布
```

你不需要每次都运行所有命令。关键是知道什么任务该用什么角色。

## gstack 提供什么

gstack 会安装一组 Claude Code slash command，例如：

- `/office-hours`
- `/plan-ceo-review`
- `/plan-eng-review`
- `/plan-design-review`
- `/autoplan`
- `/review`
- `/qa`
- `/ship`
- `/investigate`
- `/cso`

每个命令都会让 Claude Code 进入不同的工作姿态。有些用于产品思考，有些用于架构，有些用于代码审查、QA、安全或发布。

重点不是角色扮演。重点是不要把 AI 编程当成一个巨大的提示词。

## 基本安装

官方安装路径默认你已经在使用 Claude Code。

需要：

- Claude Code
- Git
- Bun
- Windows 上需要 Node.js

安装：

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack
./setup
```

安装后，gstack 命令就可以在 Claude Code 中使用。

第一次测试时保持简单：

```text
/office-hours
/plan-ceo-review
/review
/qa
```

不要一开始就跑完整工作流。先在一个真实功能上试一次。

## 实际怎么用

### 想法不清楚时用 `/office-hours`

当你只有一个模糊的产品想法时，从这里开始。

比如，“做一个 daily briefing app”还不够清楚。真正的问题是日历准备太麻烦？会议上下文缺失？优先级混乱？客户备注过期？

`/office-hours` 可以把松散请求变成更清楚的功能。

小修小改可以跳过。

### 用 `/plan-ceo-review` 控制范围

AI 很容易让你做太多。

一个小功能很快就会膨胀成设置页、仪表盘、引导流程和没人要求的抽象层。

用 `/plan-ceo-review` 问这些问题：

- 最小但有用的版本是什么？
- v1 里应该删掉什么？
- 这个功能要真正有价值，需要什么？

在让 agent 写大量代码之前用它比较合适。

### 高风险实现前用 `/plan-eng-review`

如果变更涉及架构、数据流、API、认证、后台任务、迁移或状态管理，就值得使用 `/plan-eng-review`。

目标很简单：在代码改动扩散到整个项目之前，把隐藏假设暴露出来。

小修复可以跳过。多文件工作通常值得做一次。

### 只有 UI 质量重要时才做设计审查

gstack 有 `/plan-design-review`、`/design-review`、`/design-shotgun` 等设计命令。

它们适合落地页、仪表盘、引导流程、表单和面向用户的打磨。

不要把设计审查硬塞进后端工作。那只是增加仪式感。

### 信任分支前先用 `/review`

Claude Code 实现完之后，运行 `/review`。

这是 gstack 最实用的习惯之一。刚写完代码的 agent 往往会对自己的结果过于乐观。单独的审查步骤可以帮助发现：

- 漏掉的边界情况
- 薄弱的错误处理
- 未完成的实现
- 测试缺口
- 安全假设
- 计划和代码不一致

在接受 AI 写的代码之前，这应该成为常规步骤。

### 有真实用户流程时用 `/qa`

如果功能有 staging URL 或浏览器流程，就用 `/qa`。

很多 AI 生成的改动能通过测试，但会在真实产品里失败。按钮没有连到正确状态，空状态坏掉，认证跳转失败，弹窗单独可用但放进完整流程就出问题。

`/qa` 的意义是像用户一样测试产品，而不是像编译器一样看代码。

### `/ship` 放在最后

`/ship` 用于发布准备。应该在规划、实现、审查和 QA 之后使用。

它救不了混乱的工作。它只能打包已经准备好的工作。

## 第一次可以这样试

可以从这个流程开始：

```text
1. 选一个真实要做的功能。
2. 用 /office-hours 梳理用户问题。
3. 用 /plan-ceo-review 缩小范围。
4. 如果实现有风险，再用 /plan-eng-review。
5. 让 Claude Code 构建更小的版本。
6. 运行 /review。
7. 如果有浏览器流程，运行 /qa。
8. 只有准备好之后才运行 /ship。
```

最重要的是在实现前缩小范围。

gstack 最有用的时候，是它阻止你太早做太多东西的时候。

## 什么时候不该用 gstack

不要给所有任务都跑完整 gstack 流程。

这些情况通常过度了：

- 修 typo
- 一行 bug
- 简单依赖更新
- 小型重构
- 修法很明显的任务
- 已经有失败测试覆盖的改动

这种时候，直接告诉 Claude Code 要改什么，跑测试，然后结束。

规则很简单：

> 如果命令能降低风险，就用。只是在增加仪式，就跳过。

## 结论

gstack 最适合被理解为 Claude Code 的工作流层。

它帮助 solo builder 把产品思考、架构审查、代码审查、QA 和发布纪律加入 AI 辅助开发过程。

一开始轻量使用就好：

- 问题不清楚时用 `/office-hours`
- 范围可能错时用 `/plan-ceo-review`
- 架构重要时用 `/plan-eng-review`
- 信任代码前用 `/review`
- 真实用户流程重要时用 `/qa`
- 工作准备好后再用 `/ship`

目标不是在 Claude Code 里假装有一家公司。

目标是停止用单个提示词写代码，开始通过更好的工作循环来构建软件。

## 来源

- [garrytan/gstack GitHub repository](https://github.com/garrytan/gstack)
- [gstack README](https://github.com/garrytan/gstack/blob/main/README.md)
- [gstack: On the LOC controversy](https://github.com/garrytan/gstack/blob/main/docs/ON_THE_LOC_CONTROVERSY.md)
