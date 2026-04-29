---
title: "GSD 실제 사용법: Get Shit Done의 핵심 워크플로우"
description: "GSD는 프롬프트 팩이 아니다. 프로젝트 컨텍스트를 만들고, 단계별로 계획하고, 작은 단위로 실행하고, 결과를 검증하는 작업 루프에 가깝다."
pubDate: 2026-04-29
updatedDate: 2026-04-29
translationGroup: how-to-use-gsd
baseSlug: 2026-04-29-how-to-use-gsd
heroImage: ../../assets/blog-placeholder-1.jpg
lang: ko
tags:
  - gsd
  - claude-code
  - agents
  - workflows
  - spec-driven-development
  - context-engineering
---

이전 글에서는 [**GSD(get-shit-done)**가 무엇인지](/blog/2026-04-28-what-is-gsd/ko/) 살펴봤다. 이름만 보면 Claude Code용 과격한 프롬프트 팩처럼 보이지만, 실제로는 코딩 에이전트를 위한 워크플로우 시스템에 가깝다.

실용적인 질문은 더 간단하다.

**GSD는 실제로 어떻게 써야 할까?**

짧게 말하면, GSD의 모든 명령을 엄격한 의식처럼 순서대로 돌릴 필요는 없다. 대부분의 사람은 설치한 뒤 필요한 명령을 골라 쓰면서 바로 작업을 진행할 수 있다.

다만 작업이 단발성 프롬프트를 넘어서는 순간 GSD의 가치가 커진다. 작은 수정은 quick mode로 충분할 수 있다. 하지만 새 기능, 여러 파일 변경, 기존 코드베이스 작업처럼 일이 커지면 프로젝트 상태를 만들고, 결정을 명확히 하고, 작업을 계획하고, 작은 단위로 실행하고, 결과를 검증하는 흐름이 훨씬 안정적이다.

## 프로젝트 상태에서 시작한다

일반적인 GSD 흐름은 여기서 시작한다.

```bash
/gsd-new-project
```

공식 사용자 가이드에 따르면 이 명령은 프로젝트에 대해 질문하고, 리서치 에이전트를 실행하고, 요구사항을 추출하고, 코드 작성 전에 로드맵을 만든다.[2]

핵심 결과물은 채팅 답변이 아니다. `.planning/` 디렉터리다.

```text
.planning/
  PROJECT.md
  REQUIREMENTS.md
  ROADMAP.md
  STATE.md
  config.json
  research/
```

여기서 첫 번째 중요한 전환이 생긴다. 많은 코딩 에이전트 세션은 너무 많은 상태를 대화 기록 안에 보관한다. 작은 수정에는 괜찮지만, 작업이 길어지면 쉽게 약해진다. 이전 결정은 묻히고, 컨텍스트 창은 지저분해지고, 에이전트는 점점 추측하기 시작한다.

GSD는 프로젝트 기억을 사람과 에이전트가 나중에 다시 확인할 수 있는 파일로 옮긴다.[3]

기존 코드베이스라면 보통 이렇게 시작하는 편이 낫다.

```bash
/gsd-map-codebase
/gsd-new-project
```

실제 레포에는 이미 구조, 테스트, 코드 관습, 비슷한 기능, 아키텍처 제약이 있다. 이 컨텍스트가 없으면 에이전트는 그럴듯해 보이지만 프로젝트에는 맞지 않는 코드를 만들 수 있다.

## 계획하기 전에 논의한다

프로젝트와 로드맵이 생겼다면 다음 단계는 실행이 아니다. 논의다.

```bash
/gsd-discuss-phase 1
```

이 단계는 계획 전에 구현 선호사항을 잡는다. 예를 들어 에러를 어떻게 처리할지, 어떤 라이브러리를 쓸지, 특정 동작을 전역으로 둘지 라우트별로 둘지 같은 결정을 미리 정리한다.[2]

결과는 보통 단계별 컨텍스트 파일로 저장된다.

```text
.planning/phases/01-core-middleware/CONTEXT.md
```

이건 보기보다 중요하다. 많은 에이전트 실패는 코딩 중에 시작되지 않는다. 모델이 조용히 결정을 추측하고, 그 추측이 구현과 테스트에 들어가면서 문제가 생긴다.

GSD의 discuss 단계는 그 위험을 줄인다.

assumptions mode도 있다. 이 모드에서는 GSD가 먼저 코드베이스를 읽고, “내가 이 레포를 이렇게 이해했는데, 만들기 전에 고쳐달라”는 식의 구조화된 가정을 제시한다.[2] 기존 프로젝트에서는 열린 질문보다 이 방식이 더 빠르고 유용할 수 있다.

## 핵심 가치는 계획에 있다

다음 단계는 계획이다.

```bash
/gsd-plan-phase 1
```

문서에 따르면 이 단계에서는 여러 에이전트가 함께 움직인다. phase researcher가 스택, 기능, 아키텍처, 위험 요소를 조사한다. planner는 그 컨텍스트를 계획으로 바꾼다. plan-checker는 실행 전에 그 계획이 phase 목표를 달성할 수 있는지 확인한다.[2][4]

결과는 보통 이런 파일들이다.

```text
.planning/phases/01-core-middleware/
  RESEARCH.md
  01-01-PLAN.md
  01-02-PLAN.md
  VALIDATION.md
```

여기서 GSD는 일반적인 “바이브 코딩”과 달라진다.

약한 에이전트 세션은 이렇게 말한다.

> 기능 만들어줘.

GSD식 세션은 이렇게 말한다.

> 요구사항은 이것이고, 결정사항은 이것이며, 관련 리서치는 이것이다. 작업은 작은 계획으로 나뉘고, 각 계획에는 읽어야 할 파일과 검증 방법이 있다.

이 구조는 장식이 아니다. 비싼 실행 단계에 들어가기 전에 애매함을 줄이는 장치다.

GSD 문서에는 “Nyquist” 검증 레이어도 나온다. 코드 작성 전에 요구사항을 테스트 명령이나 자동화된 체크와 연결하려는 장치다.[2] AI가 만든 코드는 그럴듯해 보이기 쉽다. 중요한 질문은 올바른 피드백 루프를 통과하느냐다.

## 작고 깨끗한 컨텍스트로 실행한다

계획 후 실행은 이렇게 한다.

```bash
/gsd-execute-phase 1
```

GSD는 계획을 의존성 wave로 묶고, 독립적인 작업은 병렬로 실행하며, 각 계획마다 새로운 executor context를 준다고 설명한다.[2]

이건 설계의 핵심이다. 긴 에이전트 세션은 쉽게 지저분해진다. 로그, 실수, 수정, 버려진 아이디어가 쌓이면 모델의 집중도도 떨어진다.

GSD의 답은 각 작업에 더 깨끗한 컨텍스트를 주고, 프로젝트 상태는 `.planning/`에 남기는 것이다.[3]

좋은 실행 단계는 오히려 지루해야 한다.

- 각 계획은 작다
- 각 executor는 먼저 읽어야 할 것을 안다
- 각 작업에는 acceptance criteria가 있다
- 각 commit은 계획과 연결된다
- 검증은 결과를 phase 목표와 비교한다

계획이 너무 넓으면 실행이 실패하거나 stub을 만들 수 있다. 문서는 그런 경우 더 작은 범위로 다시 계획하라고 권한다.[2]

## 검증은 선택이 아니다

실행 후에는 검증이 온다.

```bash
/gsd-verify-work 1
```

사용자 가이드는 이것을 manual UAT로 설명한다. GSD는 phase 목표에서 검증 가능한 항목을 뽑고, 사용자가 하나씩 확인하게 한다. 실패가 있으면 원인을 찾고 후속 fix plan을 만들 수 있다.[2]

많은 AI 코딩 워크플로우는 여기서 약하다. “에이전트가 완료했다고 말함”을 작업의 끝으로 보기 때문이다.

코딩 에이전트에서 완료는 더 엄격해야 한다. 원래 요구사항 기준의 독립적인 체크를 통과했다는 뜻이어야 한다.

질문은 실용적이다.

- 기능이 실제로 실행되는가?
- 기대한 사용자 경로가 동작하는가?
- `CONTEXT.md`의 결정이 구현에 보존됐는가?
- 필요한 테스트가 추가됐는가?
- 에이전트가 조용히 범위를 줄이지 않았는가?

GSD가 유용한 이유는 사람이 모든 줄을 감시하게 만들지는 않지만, 중요한 gate에서는 다시 개입하게 만들기 때문이다.

## 작은 작업에는 quick mode를 쓴다

모든 작업에 전체 루프가 필요한 것은 아니다. 작은 버그 수정은 이렇게 처리할 수 있다.

```bash
/gsd-quick
> "Fix the login button not responding on mobile Safari"
```

하지만 quick mode가 진지한 작업의 기본값이 되면 안 된다. 전체 루프는 큰 작업을 context drift, 누락된 결정, 약한 검증으로부터 보호하기 위해 존재한다.

실전 기준은 이렇다.

- 작은 수정은 **`/gsd-quick`**
- 새 기능이나 여러 파일 작업은 **`/gsd-new-project` → discuss → plan → execute → verify`**
- 기존 레포에서 본격적으로 시작할 때는 **`/gsd-map-codebase`**
- 나중에 돌아올 때는 **`/gsd-progress`** 또는 **`/gsd-resume-work`**
- 컨텍스트가 지저분해지면 주요 단계 사이에 **`/clear`**[2]

마지막이 중요하다. GSD는 지속 상태를 `.planning/`에 저장하기 때문에 컨텍스트를 지워도 다시 이어갈 수 있다.

## 제작자 데모가 보여주는 것

제작자의 긴 walkthrough 영상인 *I Created GSD For Claude Code. This Is How I Use It.*도 참고할 만하다.[8]

라이브 transcript는 정돈되어 있지 않지만, 운영 모델은 분명하다. 제작자는 자신을 코더라기보다 Claude Code를 관리하는 high-level project manager에 가깝게 설명한다. 모든 코드를 직접 읽고 쓰기보다, Claude가 코드를 이해하고, 계획하고, 검증하게 만드는 데 집중한다.[8]

이 관점은 GSD의 실제 사용자를 잘 보여준다. GSD는 숙련 개발자의 키 입력을 줄이는 도구만은 아니다. AI 코딩 작업을 직접 구현하기보다 감독하는 빌더를 위한 도구이기도 하다.

그럴수록 워크플로우 규율은 더 중요해진다. 사람이 모든 diff를 깊게 읽지 않는다면, 에이전트 주변 시스템은 컨텍스트, 계획, 테스트, 검증에 더 엄격해야 한다.

## 실제 운영 모델

그러니까 실전 답은 “항상 전체 순서를 다 돌려야 한다”가 아니다. 더 좋은 이해 방식은 이렇다.

```text
작은 수정:
  GSD 설치 -> /gsd-quick 사용 -> 결과 검증

기존 레포:
  코드베이스 매핑 -> 프로젝트 상태 생성 -> 필요하면 phase 단위로 작업

큰 기능:
  결정 논의 -> 계획 -> 실행 -> 검증 -> ship
```

GSD가 유용한 이유는 모두를 같은 고정 절차에 넣어서가 아니다. 일반 채팅 세션이 흔들리기 시작할 때, 반복 가능한 작업 루프를 제공하기 때문이다.

물론 tradeoff는 있다. 전체 시스템은 평범한 Claude Code 세션보다 무겁다. 프로세스, 토큰, 대기 시간이 늘 수 있다. 작은 일회성 작업에는 과할 수 있다.

하지만 실제 소프트웨어 작업에는 어차피 프로세스가 있다. 중요한 질문은 그 프로세스가 어디에 있느냐다. 사람 머릿속에 있는지, 깨지기 쉬운 채팅 기록 안에 있는지, 아니면 에이전트가 실제로 따라갈 수 있는 파일과 gate 안에 있는지.

GSD의 답은 분명하다. 프로세스를 파일, phase, command, verification gate에 넣자는 것이다.

GSD의 진짜 목적은 Claude가 코드를 더 많이 쓰게 만드는 것이 아니다.

Claude가 중간에 길을 잃지 않고 일을 끝내게 만드는 것이다.

## References

1. GSD Build, *GET SHIT DONE* README  
   https://github.com/gsd-build/get-shit-done
2. GSD Build, *GSD User Guide*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/USER-GUIDE.md
3. GSD Build, *GSD Architecture*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/ARCHITECTURE.md
4. GSD Build, *GSD Command Reference*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/COMMANDS.md
5. GSD Build, *GSD Shipped Surface Inventory*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/INVENTORY.md
6. npm, *get-shit-done-cc package metadata and download stats*  
   https://www.npmjs.com/package/get-shit-done-cc  
   https://api.npmjs.org/downloads/point/last-month/get-shit-done-cc
7. GSD documentation site, *Get Shit Done documentation index*  
   https://gsd-build-get-shit-done.mintlify.app/  
   https://mintlify.com/gsd-build/get-shit-done/llms.txt
8. TÂCHES, *I Created GSD For Claude Code. This Is How I Use It.*  
   https://www.youtube.com/watch?v=5L3dm7KBCmY
