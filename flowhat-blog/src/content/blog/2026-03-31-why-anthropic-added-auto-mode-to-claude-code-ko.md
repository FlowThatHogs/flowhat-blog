---
title: "Anthropic은 왜 Claude Code에 Auto Mode를 넣었나"
description: "Anthropic의 Auto Mode는 단순한 편의 기능이 아니다. 코딩 에이전트 경쟁이 모델 성능뿐 아니라 자율성 제어, 승인 설계, 하네스 품질로 이동하고 있다는 신호다."
pubDate: 2026-03-31
updatedDate: 2026-04-13
lang: ko
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

Anthropic은 Claude Code의 Auto Mode를, 반복되는 승인 요청을 줄이면서도 안전 레이어를 완전히 없애지 않는 방향으로 도입했다.

겉으로 보면 작은 사용성 개선처럼 보일 수 있다. 하지만 그보다 의미가 크다.

이제 코딩 에이전트 제품은 단순히 모델 성능만으로 경쟁하지 않는다. 에이전트가 어디까지 자율적으로 일할 수 있는지, 승인 경계를 어디에 둘지, 그리고 제품이 얼마나 많은 마찰을 줄이면서도 신뢰를 잃지 않을지가 함께 경쟁 요소가 되고 있다.

그래서 이 업데이트를 눈여겨볼 만하다.

## Background

Anthropic에 따르면 Claude Code 사용자는 permission prompt의 대부분을 결국 승인한다. 공식 글에서는 사용자가 93%의 승인 요청을 받아들인다고 설명한다. 이 말은 수동 승인 레이어는 남아 있어도, 실제 검토 품질은 이미 약해지고 있다는 뜻이다.

Auto Mode는 이 문제에 대한 Anthropic의 답이다.

이 기능은 두 가지 기존 선택지 사이에 놓여 있다.

- 하나씩 직접 승인하는 방식
- `--dangerously-skip-permissions`처럼 권한 요청을 넓게 건너뛰는 방식

Anthropic 설명에 따르면 Auto Mode는 두 단계의 모델 기반 체크를 추가한다.

첫째, 파일 내용, 셸 출력, 웹 fetch 결과, 외부 도구 응답 같은 입력을 prompt injection 위험 관점에서 먼저 스캔한다.

둘째, 명령 실행, 도구 사용, subagent 실행, 프로젝트 바깥 접근처럼 에이전트가 하려는 행동을 평가한다.

즉 핵심은 단순하다. 반복적인 승인 요청은 줄이되, 위험도가 높은 행동 주위에는 스크리닝 레이어를 남겨두겠다는 것이다.

### Links

- Anthropic, *Claude Code auto mode: a safer way to skip permissions*: https://www.anthropic.com/engineering/claude-code-auto-mode
- Anthropic, *Making Claude Code more secure and autonomous with sandboxing*: https://www.anthropic.com/engineering/claude-code-sandboxing
- Anthropic, *Enabling Claude Code to work more autonomously*: https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously

## Market context

Claude Code만 이런 문제를 푸는 것은 아니다.

OpenAI의 Codex는 **sandbox mode**와 **approval policy**를 명시적으로 분리한다. 기본적으로는 네트워크 접근을 제한하고 샌드박스를 사용한 뒤, 그 경계를 넘는 행동에 대해서만 승인을 요구한다.

Cline은 더 세분화된 permission 모델로 같은 문제를 다룬다. 어떤 종류의 행동은 자동 승인하고, 어떤 행동은 계속 사용자 검토를 거치게 할지를 사용자가 나눌 수 있다.

Cursor는 표현 방식이 조금 다르지만 방향은 비슷하다. Agent 제품을 긴 작업 흐름, 여러 파일 수정, 명령 실행, subagent, 중단, 롤백 중심으로 설계하고 있다.

제품마다 포장 방식은 다르지만, 결국 모두 같은 질문으로 모이고 있다.

**에이전트가 어디까지 자동으로 일할 수 있어야, 신뢰가 무너지지 않는가?**

### Links

- OpenAI, *Agent approvals & security – Codex*: https://developers.openai.com/codex/agent-approvals-security
- OpenAI Codex sandbox docs: https://github.com/openai/codex/blob/main/docs/sandbox.md
- Cline, *Auto Approve & YOLO Mode*: https://docs.cline.bot/features/auto-approve
- Cursor, *Agent mode*: https://cursor.com/help/ai-features/agent
- Cursor, *Automations*: https://cursor.com/docs/cloud-agent/automations

## Why Anthropic added it now

문제는 분명하다.

코딩 에이전트가 실제 멀티스텝 작업에 쓸 만해질수록, 반복되는 승인 요청이 워크플로를 느리게 만든다. 사용자는 계속 통제권을 쥐고 있지만, 제품은 점점 시끄럽고 쓰기 불편해진다.

강한 샌드박스는 도움이 되지만 실제 워크플로를 제약한다. 반대로 완전히 열린 모드는 마찰은 줄여주지만 신뢰 경계를 너무 넓힌다.

Auto Mode는 Anthropic이 그 두 극단 사이의 중간 지대를 차지하려는 시도다.

이건 Anthropic의 최근 엔지니어링 방향과도 맞닿아 있다. 이 회사는 하네스 설계, 장시간 작업 구조, eval, subagent, 모델 바깥의 시스템 설계를 계속 강조해왔다. Auto Mode 역시 그 연장선에 있다.

## Pros and cons

### Pros

- 가치 낮은 승인 팝업을 줄일 수 있다
- 긴 에이전트 워크플로에 더 잘 맞는다
- 완전한 마찰과 완전한 무방비 사이의 현실적인 선택지다
- 하네스 품질이 실제 경쟁력이 되고 있다는 신호를 준다

### Cons

- false positive가 많으면 approval fatigue 대신 classifier frustration이 생길 수 있다
- false negative가 나면 사용자가 안전 레이어를 믿고 있었던 만큼 더 크게 느껴질 수 있다
- 내부 실험 결과가 실제 복잡한 개발 환경에서 그대로 통할지는 별개 문제다

## Is it useful?

유용하다. 다만 혁신적인 새 능력이라기보다는 워크플로 개선에 가깝다.

Auto Mode가 Claude Code를 완전히 다른 등급의 코딩 에이전트로 바꾸는 것은 아니다. 대신 실제 병목 하나를 건드린다. 에이전트가 유용한 멀티스텝 작업을 하기 시작할수록, 인간 감독이 너무 많이 들어가는 문제다.

그래서 이 업데이트는 겉보기보다 더 중요하다.

단순히 클릭 수를 줄이는 기능이 아니라, 코딩 에이전트 제품이 모델 성능 경쟁에서 자율성 설계, 신뢰 경계, 실행 구조 경쟁으로 옮겨가고 있다는 증거이기 때문이다.

## Takeaway

이제 중요한 질문은 단순히 모델이 코드를 잘 짜는가가 아니다.

제품이 신뢰를 무너뜨리지 않으면서도, 모델이 더 적은 감독 아래 행동하게 만들 수 있는가가 더 중요해지고 있다.

Anthropic은 Auto Mode로 바로 그 문제를 풀려는 중이다. 그래서 이 발표는 Claude Code 하나의 기능 업데이트 이상으로 의미가 있다.

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
