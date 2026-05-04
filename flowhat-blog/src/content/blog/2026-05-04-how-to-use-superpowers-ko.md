---
title: "Superpowers 사용법: 코딩 에이전트를 위한 실전 스킬 경로"
description: "Superpowers 스킬을 단계별로 쓰는 방법. brainstorming, planning, TDD, debugging, verification부터 시작하고, 작업이 커질 때 worktree, review, subagent, parallel agent, custom skill을 추가하는 실전 가이드."
pubDate: 2026-05-04
updatedDate: 2026-05-04
lang: ko
translationGroup: how-to-use-superpowers
baseSlug: 2026-05-04-how-to-use-superpowers
tags:
  - superpowers
  - claude-code
  - codex
  - agents
  - workflows
  - ai-engineering
heroImage: ../../assets/blog-placeholder-1.jpg
---

Superpowers는 코딩 에이전트에게 작업 절차를 붙여준다.

먼저 개념 설명이 필요하다면 [Superpowers란 무엇인가?](/blog/2026-05-03-what-is-superpowers/ko/)를 보면 된다. 이 글은 그 다음 편이다. 어떤 스킬부터 쓰면 되는지, 언제 무거운 스킬을 추가하면 되는지, 어떻게 해야 워크플로가 쓸데없는 의식처럼 변하지 않는지 정리한다.

Superpowers는 raw chat 세션에서 자주 빠지는 소프트웨어 작업 단계를 이름 붙은 스킬로 제공한다. brainstorming, planning, testing, debugging, review, verification, finishing 같은 것들이다.[1][2]

첫날부터 모든 스킬을 다 쓸 필요는 없다.

작게 시작하면 된다. 작업이 커지거나, 위험해지거나, 리뷰하기 어려워질 때 절차를 추가하면 된다.

## 기본 루프

코딩 에이전트가 자주 실패하는 흐름은 이렇다.

```text
요청 → 추측 → 파일 수정 → 완료 보고
```

오타 수정에는 괜찮을 수 있다. 하지만 기능 개발, 리팩터링, 버그 조사, 여러 파일이 걸린 작업에는 부족하다.

Superpowers는 작업을 이런 흐름으로 밀어준다.

```text
이해 → 계획 → 구현 → 테스트 → 리뷰 → 검증 → 마무리
```

이 형태만 기억하면 된다. 모든 작업을 느리게 만들자는 뜻은 아니다. 작업의 위험도에 맞는 만큼만 절차를 붙이자는 쪽에 가깝다.

## 초급자 경로: 처음 사용할 스킬

Superpowers를 처음 쓴다면 이 다섯 개부터 시작하면 된다.

- `brainstorming`
- `writing-plans`
- `test-driven-development`
- `systematic-debugging`
- `verification-before-completion`

이 다섯 개는 AI 코딩에서 가장 흔한 문제를 막아준다. 요구사항이 흐릿한 문제, 구현을 너무 빨리 시작하는 문제, 테스트가 약한 문제, 디버깅을 찍어서 하는 문제, 검증 전에 완료됐다고 말하는 문제다.

## `brainstorming`: 코드 변경 전에 사용하기

`brainstorming`은 요청이 아직 느슨할 때 쓴다.

예를 들면 이런 요청이다.

- "사용자 인증 추가해줘"
- "대시보드 개선해줘"
- "앱을 더 빠르게 만들어줘"
- "이 모듈 리팩터링해줘"
- "AI 어시스턴트 기능 추가해줘"

이런 요청에는 결정해야 할 것들이 숨어 있다. 인증은 password, OAuth, session, role, admin screen, migration, email flow, security rule을 모두 뜻할 수 있다. "더 빠르게"도 database index, frontend rendering, caching, API 구조, background job 중 무엇인지 먼저 봐야 한다.

파일을 바꾸기 전에 그 결정들을 밖으로 꺼내게 만들면 된다.

실전 프롬프트:

```text
구현하기 전에 brainstorming 스킬을 사용해줘.
기능을 명확히 정리하고, 트레이드오프를 나열하고, 실용적인 방향을 제안해줘.
아직 파일은 수정하지 마.
```

거대한 설계 문서가 필요한 건 아니다. 코드가 움직이기 전에 숨어 있던 가정만 밖으로 꺼내면 된다.

## `writing-plans`: 방향이 잡힌 뒤 사용하기

방향이 정해졌다면 `writing-plans`를 쓴다.

이 스킬은 아이디어를 작은 구현 단계로 바꿔준다. 쓸만한 계획에는 보통 이런 내용이 들어간다.

- 바뀔 가능성이 있는 파일
- 작업 순서
- 추가하거나 수정할 테스트
- 기대 동작
- 주의할 위험이나 edge case

실전 프롬프트:

```text
writing-plans 스킬을 사용해줘.
작은 작업 단위로 짧은 구현 계획을 만들어줘.
예상 수정 파일, 테스트 전략, 검증 절차를 포함해줘.
코드를 수정하기 전에 내 승인을 기다려줘.
```

계획이 길 필요는 없다. 작은 변경이면 다섯 줄이면 충분할 때도 있다. 여러 파일을 건드리는 작업이라면, 저장소가 바뀌기 전에 방향을 거절할 수 있을 만큼은 구체적이어야 한다.

## `test-driven-development`: 동작 검증이 필요할 때 사용하기

`test-driven-development`는 변경된 동작이 깨질 수 있을 때 쓴다.

예를 들면 이런 작업이다.

- 비즈니스 로직
- API 동작
- 데이터 변환
- UI 상태 로직
- 인증 규칙
- 결제 로직
- 에이전트 워크플로
- 재현 가능한 버그 수정

TDD를 종교처럼 따르자는 얘기가 아니다. 그럴듯한 코드를 만드는 데서 끝내지 말고, 동작을 증명하게 만들자는 얘기다.

실전 프롬프트:

```text
test-driven-development 스킬을 사용해줘.
먼저 기대 동작을 포착하는 실패 테스트를 작성하거나 수정해줘.
그 다음 테스트를 통과시키는 가장 작은 변경을 구현해줘.
테스트가 통과한 뒤에 필요할 때만 리팩터링해줘.
```

프로젝트에 테스트 환경이 없다면 테스트가 있는 척하게 두면 안 된다. 대신 가능한 검증 방법을 요구하면 된다. script, build, manual browser flow, reproduction command, 잠깐 만들었다가 지울 수 있는 작은 check 같은 것들이다.

## `systematic-debugging`: 에이전트가 찍기 시작할 때 사용하기

무언가 실패했는데 에이전트가 랜덤하게 패치하기 시작하면 `systematic-debugging`을 써야 한다.

나쁜 디버깅은 보통 이렇다.

```text
수정해봄 → 여전히 안 됨 → 또 수정함 → 여전히 안 됨 → 다시 추측함
```

더 나은 루프는 이렇다.

```text
재현 → 증거 확인 → 가설 설정 → 가설 테스트 → 원인 수정 → 검증
```

실전 프롬프트:

```text
systematic-debugging 스킬을 사용해줘.
추측하지 마. 먼저 문제를 재현하고, 증거를 모으고, 가능한 원인을 정리하고, 한 번에 하나의 가설만 테스트해줘.
```

flaky test, build error, dependency problem, race condition, frontend state bug, API integration failure, agent tool-call failure에서 특히 유용하다.

에이전트가 눈감고 패치하게 두면 안 된다. 무엇을 알고 있는지, 무엇을 의심하는지, 어떤 증거가 수정 방향을 뒷받침하는지 말하게 해야 한다.

## `verification-before-completion`: 완료를 받아들이기 전에 사용하기

이건 기본 습관으로 두는 게 좋다.

코딩 에이전트는 너무 빨리 완료됐다고 말할 때가 많다. 파일은 수정했지만 build를 안 돌렸을 수 있다. 테스트 하나는 고쳤지만 관련 경로는 확인하지 않았을 수 있다. 코드는 바꿨지만 실제 사용자 동작은 검증하지 않았을 수 있다.

실전 프롬프트:

```text
완료됐다고 말하기 전에 verification-before-completion을 사용해줘.
관련 테스트나 체크를 실행하고, 결과를 확인하고, 정확히 무엇을 검증했는지 요약해줘.
검증하지 못한 것이 있으면 명확히 말해줘.
```

에이전트는 무엇을 바꿨는지만 말하면 안 된다. 왜 그 변경이 작동한다고 판단하는지도 말해야 한다.

## 초급자를 위한 간단한 워크플로

처음에는 이 루프만으로 충분한 경우가 많다.

```text
brainstorm → plan → implement with tests → debug systematically → verify
```

그냥 이렇게 요청하면 된다.

```text
이 작업에는 Superpowers를 사용해줘.

먼저 brainstorming으로 접근 방식을 명확히 해줘.
그 다음 짧은 계획을 작성해줘.
내가 계획을 승인하면 가능한 곳에서는 test-driven-development 방식으로 구현해줘.
문제가 생기면 systematic-debugging을 사용해줘.
완료됐다고 말하기 전에 verification-before-completion을 사용하고, 정확히 무엇이 통과했는지 알려줘.
```

이 정도면 모든 작업에 전체 Superpowers 절차를 억지로 붙이지 않으면서도 에이전트에게 분명한 작업 형태를 줄 수 있다.

## 중급자 경로: 작업이 커질 때

기본 루프가 익숙해졌다면 다음 스킬을 추가하면 된다.

- `using-git-worktrees`
- `executing-plans`
- `requesting-code-review`
- `receiving-code-review`
- `finishing-a-development-branch`

이 스킬들은 단일 수정이 아니라 실제 개발 브랜치에 가까운 작업에서 유용하다.

## `using-git-worktrees`: 위험한 작업을 격리하기

`using-git-worktrees`는 기능 개발, 리팩터링, 실험적인 변경이 현재 작업 디렉터리를 어지럽히지 않아야 할 때 쓴다.

이런 경우에 도움이 된다.

- 여러 에이전트가 병렬로 작업할 수 있음
- main branch를 깨끗하게 유지해야 함
- 변경이 위험함
- 작업이 여러 라운드에 걸칠 수 있음
- 실험이 틀리면 쉽게 버리고 싶음

실전 프롬프트:

```text
using-git-worktrees 스킬을 사용해줘.
변경하기 전에 이 기능을 위한 격리된 worktree를 만들어줘.
메인 작업 디렉터리는 깨끗하게 유지해줘.
```

worktree를 쓰면 에이전트 작업을 검토하기 쉽고, 방향이 틀렸을 때 버리기도 쉽다.

## `executing-plans`: 에이전트를 계획에 묶어두기

계획이 생겼다면 `executing-plans`로 에이전트가 옆길로 새지 않게 만든다.

에이전트는 계획으로 시작해놓고 중간에 추가 변경을 하거나, 단계를 건너뛰거나, 요청한 문제 옆에 있는 다른 문제를 풀 때가 있다.

실전 프롬프트:

```text
executing-plans 스킬을 사용해줘.
승인된 계획을 단계별로 진행해줘.
각 단계가 끝날 때마다 무엇이 바뀌었는지, 무엇을 검증했는지, 계획 조정이 필요한지 보고해줘.
범위를 넓히기 전에 먼저 물어봐줘.
```

여러 파일을 건드리는 작업에 특히 좋다. 목표는 서류 작업이 아니라 통제된 진행이다.

## `requesting-code-review`와 `receiving-code-review`: 리뷰 패스 추가하기

중요한 작업에서는 에이전트가 자기 변경을 혼자 검토하게 두면 부족하다.

의미 있는 작업 단위가 끝났다면 `requesting-code-review`를 쓴다.

실전 프롬프트:

```text
requesting-code-review 스킬을 사용해줘.
현재 변경사항을 정확성, 테스트 커버리지, 보안, 유지보수성, 불필요한 복잡성 관점에서 리뷰해줘.
스타일 지적보다 실제 문제에 집중해줘.
```

피드백이 오면 `receiving-code-review`를 쓴다.

```text
receiving-code-review 스킬을 사용해줘.
리뷰 코멘트를 하나씩 처리해줘.
무엇을 바꿨는지, 의도적으로 바꾸지 않은 것은 무엇인지, 그 이유는 무엇인지 설명해줘.
수정 후 관련 검증을 다시 실행해줘.
```

이렇게 하면 에이전트가 한 번에 끝내려는 챗봇이 아니라 리뷰 프로세스 안에서 일하는 개발자처럼 움직인다.

## `finishing-a-development-branch`: 마무리 루프 닫기

작업을 마무리할 준비가 됐다면 `finishing-a-development-branch`를 쓴다.

이건 마지막 정리 단계다.

- git status 확인
- diff 검토
- test와 build 실행
- 임시 파일 제거
- 필요하면 docs 업데이트
- commit 또는 PR 요약 준비
- 관련 없는 파일이 섞이지 않았는지 확인

실전 프롬프트:

```text
finishing-a-development-branch 스킬을 사용해줘.
전체 diff를 검토하고, 필요한 체크를 실행하고, 임시 산출물을 제거하고, 브랜치 요약을 간결하게 준비해줘.
내가 명시적으로 승인하기 전에는 commit이나 push를 하지 마.
```

에이전트가 많은 파일을 건드렸을 때 특히 중요하다. 실수로 들어간 변경은 보통 마지막에 보인다.

## 고급자 경로: Superpowers를 에이전트 워크플로 시스템으로 쓰기

고급 사용자는 Superpowers를 개별 스킬 목록 이상으로 쓸 수 있다.

하나의 긴 에이전트 스레드로 통제하기 어려운 작업에서는 이런 스킬이 유용해진다.

- `subagent-driven-development`
- `dispatching-parallel-agents`
- `writing-skills`

강력하지만 기본값은 아니다. 조율 비용을 감당할 만큼 작업이 클 때 쓰면 된다.

## `subagent-driven-development`: 큰 작업을 집중된 에이전트로 나누기

`subagent-driven-development`는 프로젝트가 독립적인 부분으로 나뉠 때 쓴다.

예를 들면 이렇다.

- 한 에이전트는 코드베이스를 조사함
- 한 에이전트는 backend 변경을 구현함
- 한 에이전트는 frontend 변경을 구현함
- 한 에이전트는 테스트를 작성함
- 한 에이전트는 최종 diff를 리뷰함

실전 프롬프트:

```text
subagent-driven-development를 사용해줘.
이 프로젝트를 독립적인 작업 흐름으로 나눠줘.
각 subagent에게 명확한 입력과 기대 결과가 있는 집중된 작업을 배정해줘.
완료 후 결과를 종합하고, 통합된 변경을 검증해줘.
```

이렇게 하면 context가 작아지고 책임이 더 선명해진다.

그래도 subagent는 틀릴 수 있다. 결과를 증거가 아니라 입력으로 봐야 한다. 통합 결과는 다시 검증해야 한다.

## `dispatching-parallel-agents`: 경계가 깨끗할 때만 병렬화하기

병렬 에이전트는 작업이 정말 독립적일 때 도움이 된다.

좋은 사용 사례는 이런 것이다.

- 세 가지 라이브러리 후보 조사
- 두 가지 구현 방식 비교
- 코드베이스의 서로 다른 영역 리뷰
- 별도 테스트 전략 생성
- 한 에이전트는 docs를 조사하고 다른 에이전트는 local code를 검사

나쁜 사용 사례는 이런 것이다.

- 여러 에이전트가 같은 파일을 수정함
- 소유 범위가 불명확함
- merge plan이 없음
- 최종 검증 단계가 없음

실전 프롬프트:

```text
dispatching-parallel-agents는 독립적인 작업에만 사용해줘.
각 에이전트의 범위를 분리해줘.
결과가 돌아오면 출력물을 비교하고, 충돌을 해결하고, 최종 결정을 검증해줘.
```

병렬화는 경계가 깨끗할 때만 시간을 아껴준다. 그렇지 않으면 정리할 일만 늘어난다.

## `writing-skills`: 반복되는 워크플로를 재사용 가능한 스킬로 만들기

`writing-skills`는 에이전트에게 같은 지시를 계속 반복하고 있을 때 쓴다.

예를 들면 이런 경우다.

- 프로젝트에 release checklist가 있음
- 팀이 선호하는 testing workflow가 있음
- frontend app에 고정 QA process가 있음
- backend service에 migration procedure가 있음
- blog에 multilingual publishing workflow가 있음
- agent setup에 반복적인 debugging process가 있음

실전 프롬프트:

```text
writing-skills 스킬을 사용해줘.
이 반복되는 워크플로를 재사용 가능한 스킬로 만들어줘.
언제 사용하는지, 정확한 단계, 흔한 실수, 검증 체크를 포함해줘.
```

여기서 Superpowers는 프로젝트에 맞춰진다. 패키지에 들어 있는 스킬만 쓰는 게 아니라, 자기 환경에서 일이 어떻게 돌아가야 하는지 에이전트에게 가르치는 쪽이다.

## 실전 스킬 맵

| 상황 | 사용할 스킬 |
|---|---|
| 작업이 애매함 | `brainstorming` |
| 방향이 정해짐 | `writing-plans` |
| 동작을 증명해야 함 | `test-driven-development` |
| 무언가 고장남 | `systematic-debugging` |
| 에이전트가 완료됐다고 말함 | `verification-before-completion` |
| 변경이 위험함 | `using-git-worktrees` |
| 계획이 준비됨 | `executing-plans` |
| 작업에 리뷰가 필요함 | `requesting-code-review` |
| 리뷰 피드백이 있음 | `receiving-code-review` |
| 브랜치가 거의 끝남 | `finishing-a-development-branch` |
| 프로젝트가 큼 | `subagent-driven-development` |
| 작업들이 서로 독립적임 | `dispatching-parallel-agents` |
| 워크플로가 자주 반복됨 | `writing-skills` |

## 절차를 얼마나 붙일지 고르는 법

Superpowers는 사다리처럼 쓰면 된다.

처음에는 초급 루프부터 시작한다.

```text
brainstorm → plan → test → debug → verify
```

변경이 더 진지해지면 브랜치 규율을 추가한다.

```text
worktree → execute plan → review → finish branch
```

작업이 충분히 클 때만 에이전트 오케스트레이션을 쓴다.

```text
split work → run subagents → compare results → integrate → verify
```

작은 변경에는 전체 워크플로가 필요 없다. 위험한 변경을 감으로 밀어붙이는 것도 좋지 않다.

작업의 위험도에 맞는 스킬을 고르면 된다.

## 기억할 것

Superpowers가 유용한 이유는 코딩 에이전트에게 프로세스를 주기 때문이다.

초급자에게는 흔한 실패를 줄여준다. 흐릿한 요구사항, 성급한 구현, 빠진 테스트, 랜덤 디버깅, 너무 이른 완료 보고 같은 것들이다.

중급자에게는 에이전트 작업을 더 깨끗한 개발 브랜치로 바꿔준다. 계획, 리뷰, 마무리 단계가 생긴다.

고급자에게는 subagent, 병렬 작업, custom skill을 활용해 반복 가능한 워크플로를 만들 수 있게 해준다.

Superpowers가 개발자의 판단을 대체하지는 않는다. 다만 에이전트가 그 판단을 더 잘 따라가게 만든다.

## 참고 자료

1. Jesse Vincent / obra, *Superpowers* README  
   https://github.com/obra/superpowers
2. Jesse Vincent / obra, *Superpowers skills directory*  
   https://github.com/obra/superpowers/tree/main/skills
3. Jesse Vincent / obra, *Superpowers Contributor Guidelines*  
   https://github.com/obra/superpowers/blob/main/CLAUDE.md
