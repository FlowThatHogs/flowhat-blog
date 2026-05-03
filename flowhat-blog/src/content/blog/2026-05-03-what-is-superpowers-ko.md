---
title: "Superpowers란 무엇인가?"
description: "Superpowers는 코딩 에이전트용 소프트웨어 개발 방법론이자 스킬 프레임워크다. Claude Code 공식 스킬로 제공되며 Codex, Cursor, OpenCode, Copilot CLI, Gemini CLI에서도 사용할 수 있다."
pubDate: 2026-05-03
updatedDate: 2026-05-03
lang: ko
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

**Superpowers**는 코딩 에이전트용 소프트웨어 개발 방법론이자 스킬 프레임워크다.

짧게 말하면, AI 코딩 에이전트에게 계획, 테스트, 디버깅, 리뷰, 마무리 작업을 위한 재사용 가능한 스킬 묶음을 제공한다. 하지만 더 중요한 부분은 스킬 파일 자체가 아니다. Superpowers는 에이전트가 구현으로 바로 뛰어들기 전에 그 스킬들을 확인하고 사용하게 만드는 작업 discipline까지 포함한다.[1]

그래서 이것을 단순한 프롬프트 팩으로 보면 부족하다.

프롬프트 팩은 모델에게 더 나은 지시를 준다. Superpowers는 에이전트에게 개발 프로세스를 주려 한다. 만들기 전에 묻고, 구현 전에 설계하고, 파일을 바꾸기 전에 계획하고, 코드를 믿기 전에 테스트하고, 합치기 전에 리뷰하고, 끝났다고 말하기 전에 검증하는 흐름이다.

작성 시점에 GitHub API 기준 `obra/superpowers`는 약 **176,900 stars**, **15,600 forks**, MIT 라이선스를 가진 프로젝트였다.[2] 이 숫자가 모든 프로젝트에 맞는 방법론이라는 증거는 아니다. 다만 개발자들이 실제 문제에 주목하고 있다는 신호다. 코딩 에이전트는 많은 결과물을 만들 수 있지만, 그 결과물이 신뢰할 수 있는 소프트웨어가 되려면 프로세스가 필요하다.

## Superpowers가 코딩 에이전트에게 주는 것

Superpowers는 일반적인 채팅 세션에서 자주 생략되는 소프트웨어 작업 단계에 이름 붙은 스킬을 제공한다.

현재 스킬에는 이런 것들이 있다.[1][3]

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

각각의 스킬은 이해하기 쉽다. `brainstorming`은 만들기 전에 의도를 명확히 하게 한다. `writing-plans`는 승인된 설계를 작은 구현 태스크로 바꾼다. `test-driven-development`는 코드를 먼저 쓰고 나중에 테스트하는 대신 red-green-refactor에 가깝게 움직이게 한다. `systematic-debugging`은 버그를 만났을 때 추측하지 말고 원인을 조사하게 만든다. `verification-before-completion`은 에이전트가 실제로 증명하지 않고 "고쳤다"고 말하는 익숙한 실패를 막는다.

함께 놓으면 이것은 워크플로우가 된다.

그 워크플로우가 Superpowers의 핵심이다. 모델을 더 똑똑해 보이게 만드는 것이 아니라, 모델이 반복 가능한 소프트웨어 개발 루프 안에서 일하게 만드는 것이다.

## 기본 아이디어: output보다 process가 먼저다

대부분의 코딩 에이전트 실패는 문법 오류에서 시작하지 않는다. 더 앞에서 시작한다.

사용자가 기능을 요청한다. 에이전트는 요구사항을 추정한다. tradeoff를 드러내지 않고 아키텍처를 고른다. 계획 없이 파일을 수정한다. 테스트를 나중에 쓰거나 생략한다. 좁은 happy path만 확인하고 자신 있게 성공을 보고한다.

Superpowers는 이 행동을 막으려 한다.

README의 기본 workflow는 `brainstorming`으로 시작한다. 그다음 설계 승인, 구체적인 구현 계획, subagent 또는 execution session을 통한 태스크 실행, 구현 중 TDD, 태스크 사이 code review, 마지막 verification과 branch finishing으로 이어진다.[1]

모양은 단순하다.

```text
understand → design → plan → implement with tests → review → verify → finish
```

신비한 구조는 아니다. 평범한 엔지니어링 discipline을 코딩 에이전트가 따르기 쉽게 패키징한 것이다.

## 스킬 트리거가 중요한 이유

좋은 지시문이 들어 있는 폴더만으로는 부족하다.

어려운 부분은 에이전트가 적절한 순간에 적절한 지시문을 쓰게 만드는 것이다. 사람이 매번 "먼저 브레인스토밍해줘" 또는 "완료라고 말하기 전에 검증해줘"라고 기억해서 말해야 한다면, 그 워크플로우는 아직 수동 감독에 너무 의존한다.

Superpowers는 이것을 핵심 문제로 다룬다. README는 에이전트가 모든 작업 전에 관련 스킬을 확인하고, 이 워크플로우가 제안이 아니라 mandatory workflow라고 말한다.[1] contributor guideline도 같은 방향이다. 스킬은 단순한 설명문이 아니라 에이전트 행동을 형성하는 산물이며, 스킬 변경에는 평가가 필요하고, 새로운 host 통합은 bootstrap이 자동으로 로드되어 코드 작성 전에 올바른 행동을 트리거한다는 증거를 요구한다.[4]

이 지점이 Superpowers를 단순한 스킬 모음과 갈라놓는다.

Superpowers는 지시문 라이브러리만이 아니다. 그 지시문을 에이전트의 기본 작동 방식에 포함시키려는 시스템이다.

## Claude Code 공식 지원

Superpowers는 Claude Code의 공식 플러그인 마켓플레이스를 통해 제공된다.[1]

이 점이 중요하다. 개인 설정을 로컬에 복사해 쓰는 수준이 아니라, Claude Code 사용자에게 first-class skills package처럼 제공되기 때문이다. 저장소에는 `.claude-plugin/plugin.json`이 있고, 여기서 패키지 이름은 `superpowers`이며 Claude Code용 core skills library로 설명된다. 범위는 TDD, debugging, collaboration patterns, proven techniques다.[7]

따라서 Claude Code 안에서 Superpowers를 본다면, 그것은 로컬 폴더에 복사된 임의의 프롬프트가 아니다. 같은 Superpowers 프로젝트의 Claude-facing package를 보고 있는 것이다.

하지만 Claude Code는 하나의 host일 뿐이다.

## Claude 전용이 아니다

Superpowers는 Claude Code 밖에서도 사용할 수 있게 설계되어 있다.

README는 Claude Code, OpenAI Codex CLI, Codex app, Cursor, OpenCode, GitHub Copilot CLI, Gemini CLI 설치 경로를 나열한다.[1] 저장소에는 `.codex-plugin/plugin.json`도 있으며, 여기서는 Superpowers를 planning, TDD, debugging, collaboration workflows를 위한 agentic skills framework and software-development methodology로 설명한다.[8]

이 cross-host 지원 때문에 Superpowers를 Claude 전용 기능으로만 보기는 어렵다.

Superpowers가 특정 Claude 기능만은 아니라는 뜻이기 때문이다. 서로 다른 코딩 에이전트 환경 위에 얹을 수 있는 portable workflow layer에 가깝다. host는 Claude Code, Codex, Cursor, OpenCode, Copilot CLI, Gemini CLI가 될 수 있다. 핵심 주장은 같다. 에이전트가 소프트웨어 작업을 할 때는 모델 능력만이 아니라 프로세스가 필요하다는 것이다.

그래서 Superpowers는 지켜볼 만하다. 유용한 단위는 모델만도 아니고 에디터만도 아니다. 에이전트 주변의 개발 루프다.

## 어떤 작업에 적합한가?

Superpowers는 agent drift의 비용이 커지는 작업에서 특히 관련성이 높다.

한 줄 오타 수정에는 전체 프로세스가 과할 수 있다. 하지만 여러 파일을 바꾸는 기능, 위험한 리팩터링, 디버깅 세션, 리뷰와 테스트가 필요한 작업에서는 가치가 더 잘 보인다. 에이전트는 의도를 보존하고, 조용한 가정을 피하고, 통제된 순서로 변경하고, 결과를 증명해야 한다.

Superpowers는 그 checkpoint들에 이름을 붙인다.

그렇다고 에이전트가 마법처럼 자율적이 되는 것은 아니다. 대신 사람이 inspect할 수 있는 프로세스가 생긴다. 하나의 긴 코드 생성 흐름을 지켜보는 대신, 사람은 에이전트가 익숙한 단계로 이동하는 것을 볼 수 있다. design, plan, test, review, verify.

진지한 소프트웨어 작업에는 이쪽이 더 나은 형태다.

## 더 큰 의미

Superpowers는 코딩 에이전트용 process layer로 보는 것이 가장 정확하다.

이 프로젝트는 경험 있는 엔지니어들이 이미 중요하게 여기는 개발 습관을 패키징한다. 목표를 명확히 하고, 작업을 분리하고, 작은 단계로 계획하고, 테스트를 쓰고, 체계적으로 디버깅하고, 리뷰를 요청하고, 완료를 검증하는 습관이다.

중요한 move는 이 습관들을 충분히 자동화해서, 사람이 매 세션마다 같은 프로세스 지시를 반복하지 않아도 에이전트가 따르게 만들려는 것이다.

그래서 Superpowers는 Claude 플러그인 이상이고, 프롬프트 팩 이상이다.

Superpowers가 흥미로운 이유는 여기에 있다. 코딩 에이전트 도구는 clever prompt에서 reusable skills로, 그리고 reusable skills에서 repeatable development methods로 이동하고 있다.

하나의 거대한 프롬프트가 아니다.

에이전트가 따라야 하는 프로세스다.

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
