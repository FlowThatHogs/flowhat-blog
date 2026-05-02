---
title: "gstack 사용법: Claude Code를 과하게 복잡하게 만들지 않는 방법"
description: "gstack을 Claude Code의 가벼운 워크플로 레이어로 쓰는 방법. 언제 계획하고, 리뷰하고, QA하고, ship해야 하는지 실전 중심으로 정리한다."
pubDate: 2026-05-02
updatedDate: 2026-05-02
lang: ko
translationGroup: how-to-use-gstack
baseSlug: 2026-05-02-how-to-use-gstack
tags:
  - gstack
  - claude-code
  - ai-engineering
  - workflows
heroImage: ../../assets/blog-placeholder-1.jpg
---

gstack은 터미널 안에 들어온 마법의 AI 회사가 아니다. Claude Code를 더 체계적으로 쓰게 해주는 스킬 모음에 가깝다.

핵심 가치는 단순하다.

코딩하기 전에 생각하고, 믿기 전에 리뷰하고, 배포하기 전에 테스트하게 만든다.

AI 코딩 실패는 보통 코드에서 시작하지 않는다. 그보다 앞에서 시작한다. 기능 정의가 흐릿하고, 범위가 너무 크고, 아키텍처가 정리되기 전에 에이전트가 구현을 시작한다. 결과물은 완성된 것처럼 보이지만 실제 사용자 흐름은 테스트되지 않는다.

gstack은 Claude Code에 이런 흐름을 넣어준다.

```text
생각하기 → 계획하기 → 만들기 → 리뷰하기 → 테스트하기 → 배포하기
```

모든 명령을 매번 쓸 필요는 없다. 중요한 건 어떤 작업에 어떤 역할을 쓸지 아는 것이다.

## gstack이 제공하는 것

gstack은 Claude Code에서 쓸 수 있는 slash command들을 설치한다.

대표적으로 이런 명령들이 있다.

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

각 명령은 Claude Code에게 다른 작업 자세를 준다. 어떤 것은 제품 사고용이고, 어떤 것은 아키텍처 검토용이다. 어떤 것은 코드 리뷰, QA, 보안, 릴리즈에 가깝다.

목적은 역할놀이가 아니다. AI 코딩을 하나의 거대한 프롬프트로 끝내지 않게 만드는 것이다.

## 기본 설치

공식 설치 방식은 이미 Claude Code를 쓰고 있다는 전제를 둔다.

필요한 것은 다음과 같다.

- Claude Code
- Git
- Bun
- Windows에서는 Node.js

설치 명령은 이렇다.

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack
./setup
```

설치가 끝나면 Claude Code 안에서 gstack 명령들을 사용할 수 있다.

처음 테스트할 때는 단순하게 시작하는 게 좋다.

```text
/office-hours
/plan-ceo-review
/review
/qa
```

처음부터 전체 워크플로를 다 돌리지 말고, 실제 기능 하나에만 적용해보면 된다.

## 실전 사용법

### 아이디어가 흐릿하면 `/office-hours`

제품 아이디어가 아직 명확하지 않을 때는 `/office-hours`로 시작한다.

예를 들어 “daily briefing 앱을 만들자”는 말만으로는 부족하다. 진짜 문제는 캘린더 준비인가? 회의 맥락 부족인가? 우선순위 정리인가? 고객 메모가 빠지는 것인가?

`/office-hours`는 느슨한 요청을 더 선명한 기능으로 바꾸는 데 도움을 준다.

단순 수정에는 필요 없다.

### 범위를 줄이고 싶으면 `/plan-ceo-review`

AI는 너무 쉽게 많은 것을 만든다.

작은 기능 하나가 설정 페이지, 대시보드, 온보딩, 추상화 계층까지 커질 수 있다. 아무도 요청하지 않았는데도 그렇다.

`/plan-ceo-review`는 이런 질문을 하게 해준다.

- 가장 작지만 유용한 버전은 무엇인가?
- v1에서 빼야 할 것은 무엇인가?
- 이 기능이 실제로 가치 있으려면 무엇이 필요한가?

에이전트가 많은 코드를 쓰기 전에 쓰면 좋다.

### 구현 위험이 크면 `/plan-eng-review`

아키텍처, 데이터 흐름, API, 인증, 백그라운드 작업, 마이그레이션, 상태 관리가 걸린 작업이라면 `/plan-eng-review`를 쓰는 게 좋다.

목표는 단순하다.

코드 변경이 프로젝트 전체로 퍼지기 전에 숨은 가정을 드러내는 것이다.

작은 수정에는 과하다. 하지만 여러 파일에 걸친 작업이라면 보통 쓸 가치가 있다.

### UI 품질이 중요할 때만 디자인 리뷰

gstack에는 `/plan-design-review`, `/design-review`, `/design-shotgun` 같은 디자인 명령도 있다.

랜딩 페이지, 대시보드, 온보딩, 폼, 사용자-facing polish에는 유용하다.

하지만 백엔드 작업에 억지로 디자인 리뷰를 넣을 필요는 없다. 그건 그냥 의식이 된다.

### 브랜치를 믿기 전에 `/review`

Claude Code가 구현을 끝냈다면 `/review`를 돌리는 습관이 좋다.

이건 gstack에서 가장 실용적인 사용법 중 하나다. 코드를 작성한 에이전트는 자기 결과물에 대해 너무 낙관적일 수 있다. 별도 리뷰 패스가 필요하다.

`/review`는 이런 것을 잡는 데 도움이 된다.

- 빠진 edge case
- 약한 에러 처리
- 덜 끝난 구현
- 테스트 구멍
- 보안상 위험한 가정
- 계획과 코드의 불일치

AI가 쓴 코드를 받아들이기 전에 기본 단계로 넣을 만하다.

### 실제 사용자 흐름이 있으면 `/qa`

staging URL이나 브라우저 플로우가 있으면 `/qa`를 쓴다.

AI가 만든 변경은 테스트는 통과하지만 실제 제품에서는 깨지는 경우가 많다. 버튼이 상태와 연결되지 않거나, 빈 화면이 깨지거나, 인증 redirect가 실패하거나, 모달이 전체 플로우 안에서 망가질 수 있다.

`/qa`는 컴파일러처럼 보는 게 아니라 사용자처럼 써보는 단계다.

### `/ship`은 마지막에

`/ship`은 릴리즈 준비용이다. 계획, 구현, 리뷰, QA가 끝난 뒤에 쓰는 게 맞다.

엉킨 작업을 `/ship`이 구해주지는 못한다. 이미 준비된 작업을 포장해줄 뿐이다.

## 처음 써볼 흐름

처음에는 이렇게 써보면 된다.

```text
1. 실제로 만들 기능 하나를 고른다.
2. /office-hours로 사용자 문제를 정리한다.
3. /plan-ceo-review로 범위를 줄인다.
4. 구현 위험이 크면 /plan-eng-review를 쓴다.
5. 더 작은 버전을 Claude Code가 만들게 한다.
6. /review를 실행한다.
7. 브라우저 흐름이 있으면 /qa를 실행한다.
8. 준비됐을 때만 /ship을 실행한다.
```

가장 중요한 건 구현 전에 범위를 줄이는 것이다.

gstack은 너무 일찍 너무 많이 만들지 않게 막아줄 때 가장 유용하다.

## gstack을 쓰지 않아도 되는 경우

모든 작업에 gstack 전체 루프를 돌릴 필요는 없다.

이런 작업에는 과하다.

- 오타 수정
- 한 줄짜리 버그
- 단순 dependency 업데이트
- 작은 리팩터링
- 수정 방법이 뻔한 작업
- 이미 실패하는 테스트가 있는 작업

이럴 때는 Claude Code에게 정확히 무엇을 바꾸라고 하고, 테스트를 돌리고, 끝내면 된다.

규칙은 간단하다.

> 위험을 줄이면 쓰고, 의식만 늘어나면 건너뛴다.

## 결론

gstack은 Claude Code를 위한 워크플로 레이어로 보는 게 가장 정확하다.

혼자 개발하는 사람이 제품 사고, 아키텍처 검토, 코드 리뷰, QA, 릴리즈 규율을 AI 코딩 과정에 넣을 수 있게 해준다.

처음에는 가볍게 쓰면 된다.

- 문제가 불명확하면 `/office-hours`
- 범위가 틀렸을 수 있으면 `/plan-ceo-review`
- 아키텍처가 중요하면 `/plan-eng-review`
- 코드를 믿기 전에 `/review`
- 실제 사용자 흐름이 있으면 `/qa`
- 준비됐을 때만 `/ship`

목표는 Claude Code 안에 가짜 회사를 만드는 것이 아니다.

AI 코딩을 단일 프롬프트가 아니라 더 나은 작업 루프로 다루는 것이다.

## 출처

- [garrytan/gstack GitHub repository](https://github.com/garrytan/gstack)
- [gstack README](https://github.com/garrytan/gstack/blob/main/README.md)
- [gstack: On the LOC controversy](https://github.com/garrytan/gstack/blob/main/docs/ON_THE_LOC_CONTROVERSY.md)
