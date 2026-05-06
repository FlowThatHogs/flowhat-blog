---
title: "Karpathy Guidelines 사용법: AI 코딩 에이전트를 덜 위험하게 쓰는 5가지 예제"
description: "Karpathy Guidelines는 마법 프롬프트가 아니라 코딩 에이전트의 행동 계약에 가깝다. 가정을 드러내고, 작게 구현하고, 필요한 부분만 고치고, 완료 전에 검증하게 만드는 방식이다."
pubDate: 2026-05-06
updatedDate: 2026-05-06
lang: ko
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

Karpathy Guidelines는 마법 프롬프트처럼 쓰기보다, 코딩 에이전트의 작업 규칙으로 쓸 때 더 유용하다.

이전 글에서는 [Andrej Karpathy Skills가 무엇인지](/blog/2026-05-05-what-is-andrej-karpathy-skills/ko/) 살펴봤다. 정확히는 Forrest Chang이 Karpathy의 LLM 코딩 실패 관찰을 `CLAUDE.md`, Claude Code 플러그인, 재사용 가능한 `karpathy-guidelines` skill 등으로 패키징한 커뮤니티 프로젝트다.[1][2]

이번 글은 더 실전적인 질문을 다룬다. 이 스킬을 로드했다면, 에이전트에게 실제로 무엇을 다르게 하라고 해야 할까?

짧게 말하면, 에이전트가 성급한 주니어 개발자처럼 움직이지 않게 만드는 것이다.

핵심 원칙은 네 가지다.

1. **Think Before Coding** — 코드 수정 전에 가정을 드러낸다.
2. **Simplicity First** — 요청된 문제를 가장 작은 구현으로 해결한다.
3. **Surgical Changes** — 필요한 코드만 건드린다.
4. **Goal-Driven Execution** — 성공 기준을 정하고 완료 전에 검증한다.[2]

말은 단순하다. 가치는 실제 작업에 적용할 때 나온다.

## 기본 프롬프트

복잡한 의식은 필요 없다. 사소하지 않은 작업이라면 이렇게 시작하면 된다.

```text
이 작업에는 `karpathy-guidelines` skill을 사용해줘.
파일을 수정하기 전에 가정과 불명확한 점을 먼저 정리해줘.
요청을 해결하는 가장 작은 구현을 우선해줘.
필요한 부분만 surgical change로 수정해줘.
완료 전에 어떤 방식으로 검증할지 정의하고, 가능하면 그 검증을 실행해줘.
```

아주 작은 수정에는 과하다. 오타 수정 하나에 계획 루프가 필요하지는 않다. 하지만 기능 추가, 리팩터링, 버그 수정, 여러 파일을 건드리는 작업에서는 세션의 모양이 달라진다.

나쁜 에이전트 루프는 보통 이렇다.

```text
요청 → 추측 → 수정 → 자신 있게 완료 보고
```

더 나은 루프는 이렇다.

```text
확인 → 가장 작은 방향 선택 → 좁게 수정 → 테스트 또는 점검 → 변경 내용 보고
```

아래 예제들이 그 차이를 보여준다.

## 예제 1: 애매한 기능 요청

나쁜 요청:

```text
유저 export 기능을 추가해줘.
```

코딩 에이전트는 이걸 보고 바로 달릴 수 있다. 전체 유저를 export한다고 가정할 수 있고, CSV라고 가정할 수 있고, 관리자 화면에서 실행한다고 가정할 수 있고, 모든 필드를 포함한다고 가정할 수도 있다. 권한이나 개인정보 필드를 놓칠 수도 있다.

Karpathy Guidelines가 적용되면, 에이전트는 구현 전에 멈춰야 한다.

```text
이 요청에는 몇 가지 결정이 숨어 있습니다.
- 전체 유저를 export하나요, 현재 필터 결과만 export하나요?
- 포맷은 CSV, JSON, XLSX 중 무엇인가요?
- 어떤 필드가 시스템 밖으로 나가도 되나요?
- 관리자 전용 기능인가요?
- 데이터가 직접 다운로드해도 될 만큼 작나요, 아니면 background job이 필요한가요?

수정이 없다면 기본 가정은 다음과 같습니다:
관리자 전용 CSV export, 현재 필터된 유저 목록, 민감하지 않은 필드만 포함.
```

이건 형식적인 절차가 아니다. 가장 비싼 실수, 즉 틀린 것을 빠르게 만드는 일을 막는다.

가정이 확인되면 구현은 작게 유지하면 된다. route를 추가하고, 버튼을 연결하고, 허용된 필드만 넣고, 관련 테스트나 수동 확인으로 검증한다.

제품, 보안, 데이터, UX 결정이 숨어 있는 요청에 이 패턴을 쓰면 좋다.

## 예제 2: 과설계 막기

나쁜 요청:

```text
invoice를 CSV로 export하는 기능을 추가해줘.
```

나쁜 에이전트 결과:

```text
ExportService
ExportProviderInterface
CsvExportAdapter
JsonExportAdapter
ExportJobQueue
ExportRegistry
export.config.ts
```

언젠가 이런 구조가 필요할 수도 있다. 아닐 수도 있다. 사용자가 요청한 것은 export 플랫폼이 아니라 CSV invoice export다.

Karpathy Guidelines는 가장 작은 유용한 구현으로 밀어야 한다.

```text
요청된 화면에 CSV invoice export만 구현하겠습니다.
코드베이스에 이미 generic export 패턴이 없다면 새 export framework는 만들지 않겠습니다.
검증: 기존 invoice 테스트를 실행하고, 생성된 CSV row 하나를 직접 확인하겠습니다.
```

중요한 건 무조건 줄 수를 줄이는 게 아니다. 실제 문제 크기에 맞는 유지보수 비용을 유지하는 것이다.

AI 에이전트는 복잡한 코드를 빠르게 생성한다. 그래서 복잡도가 싸 보인다. 하지만 리뷰, 디버깅, 소유 비용은 여전히 사람이 낸다.

## 예제 3: 관련 없는 수정 피하기

나쁜 요청:

```text
checkout 버튼 문구를 “Continue”에서 “Pay now”로 바꿔줘.
```

나쁜 에이전트 행동:

- 컴포넌트 전체 포맷팅
- 로컬 변수명 변경
- import 순서 변경
- 주변 조건부 렌더링 수정
- 관련 없는 CSS class 수정

결과 UI는 동작할 수 있다. 그래도 diff가 지저분해진다. 리뷰어는 이제 관련 없는 변경이 의도된 것인지까지 확인해야 한다.

Guidelines가 로드된 에이전트는 더 좁게 움직여야 한다.

```text
이 작업은 surgical text change입니다.
버튼 라벨과, 기존 라벨을 기대하는 테스트/snapshot만 수정하겠습니다.
주변 코드는 reformat하거나 refactor하지 않겠습니다.
```

코딩 에이전트에게 reviewability는 correctness의 일부다. 동작은 하지만 지저분한 diff 안에 숨어 있는 변경은 믿기 어렵다.

문구 변경, 스타일 수정, 한 줄 버그 수정, 특정 설정 변경에 이 패턴이 잘 맞는다.

## 예제 4: 추측으로 버그 고치지 않기

나쁜 요청:

```text
date filter가 깨졌어. 고쳐줘.
```

성급한 에이전트는 파일 하나를 보고 timezone 문제라고 추측한 뒤 helper를 고치고 완료했다고 말할 수 있다. 맞을 때도 있지만, 버그를 다른 곳으로 옮기는 경우도 많다.

Karpathy Guidelines는 이 작업을 검증 가능한 루프로 바꿔야 한다.

```text
먼저 버그를 재현하거나 실패 케이스를 찾겠습니다.
그 다음 해당 케이스에 대한 테스트를 작성하거나 수정하겠습니다.
테스트를 통과시키는 데 필요한 최소 코드만 바꾸겠습니다.
검증: date-filter 테스트와 관련 query 테스트를 실행하겠습니다.
```

더 나은 에이전트 응답은 이렇게 시작할 수 있다.

```text
구체적인 실패 케이스가 필요합니다.
inclusive end date, local timezone conversion, empty date 처리를 확인하겠습니다.
이미 관련 테스트가 있다면 새 구조를 만들지 않고 기존 테스트에 실패 케이스를 추가하겠습니다.
```

여기서 **Goal-Driven Execution**이 중요하다. 에이전트가 그럴듯하게 완료했다고 말하는 것보다, 실패를 재현하고 검증을 통과시키는 것이 중요하다.

## 예제 5: 리팩터링이 산으로 가지 않게 하기

나쁜 요청:

```text
이 module을 refactor해줘.
```

이 요청은 너무 열려 있다. 무엇을 위한 리팩터링인가?

- 함수 분리?
- 중복 제거?
- 타입 경계 개선?
- 런타임 성능?
- 테스트 용이성?
- public API 단순화?

목표가 없으면 코딩 에이전트는 그럴듯하지만 임의적인 rewrite를 만들 수 있다. 아무것도 하지 않는 것보다 나쁠 수도 있다.

Karpathy-guided agent는 먼저 목표를 좁혀야 한다.

```text
리팩터링 전에 목표가 필요합니다.
가능한 목표는 다음과 같습니다.
1. public API를 유지하면서 중복 제거
2. 테스트하기 쉽게 parsing과 validation 분리
3. 동작 변경 없이 성능 개선
4. 작은 helper로 나눠 가독성 개선

어떤 목표에 맞춰 최적화할까요?
```

목표가 정해지면 검증도 선명해진다.

```text
성공 기준:
- public API 변경 없음
- 수정 전후 기존 테스트 통과
- 중복 validation branch 통합
- 관련 없는 파일 변경 없음
```

이게 “느낌으로 하는 refactor”와 통제된 엔지니어링 작업의 차이다.

## Claude Code, Codex, Hermes에서 쓰는 방식

설치 방식은 클라이언트마다 다르지만 운영 방식은 같다.

Claude Code에서는 repo가 `CLAUDE.md`와 플러그인 패키징을 제공한다. skills-compatible client에서는 `skills/karpathy-guidelines/SKILL.md` 파일을 재사용 가능한 스킬로 쓸 수 있다. 다른 에이전트에서는 같은 네 원칙을 project instructions나 repo-level agent file에 넣으면 된다.[1][2]

일상 작업에서는 네 곳에 쓰기 좋다.

- **기능 개발**: 코드 작성 전에 가정과 scope를 드러내게 한다.
- **버그 수정**: 재현과 검증을 요구한다.
- **리팩터링**: 구조 변경 전에 리팩터링 목표를 정한다.
- **리뷰**: 과설계, 관련 없는 수정, 빠진 테스트, 숨은 가정을 찾는다.

한 줄 수정처럼 위험보다 절차 비용이 큰 작업에는 덜 유용하다. 원본 `SKILL.md`도 이 tradeoff를 적어둔다. 이 가이드라인은 속도보다 신중함에 치우쳐 있어서, 사소한 작업에는 전체 절차가 필요하지 않을 수 있다.[2]

## 리뷰 체크리스트

에이전트가 끝냈다고 하면 네 가지를 확인하면 된다.

1. **Assumptions**: 불명확한 결정을 먼저 드러냈는가?
2. **Simplicity**: 요청하지 않은 architecture를 추가했는가?
3. **Diff discipline**: 바뀐 모든 줄이 요청과 직접 연결되는가?
4. **Verification**: 의미 있는 성공 검증을 실행했거나 정의했는가?

답이 아니면 이렇게 다시 보낼 수 있다.

```text
`karpathy-guidelines`를 다시 적용해줘.
변경 범위를 요청한 작업에 맞게 줄여줘.
추측으로 추가한 abstraction은 제거해줘.
실제로 실행한 검증과 실행하지 못한 검증을 정확히 적어줘.
```

이 정도만 해도 산만한 agent patch가 리뷰 가능한 변경으로 줄어드는 경우가 많다.

## 이 스킬이 못 하는 것

Karpathy Guidelines는 생성된 코드가 자동으로 맞게 만들어주지 않는다. 테스트, CI, 코드 리뷰, type checking, 보안 리뷰, 도메인 지식을 대체하지 않는다.

인간 판단도 여전히 필요하다. 어떤 때는 에이전트가 질문해야 한다. 어떤 때는 명시적 가정을 두고 진행해도 된다. 어떤 때는 코드베이스에 이미 있는 패턴 때문에 큰 abstraction이 정당할 수도 있다.

목표는 모든 코딩 세션을 느리게 만드는 것이 아니다. 에이전트가 위험한 기본값을 조용히 선택하지 못하게 하는 것이다.

## 실전 요약

Karpathy Guidelines에서 유용한 것은 유명인 이름이나 star count가 아니다. 핵심은 행동 계약이다.

코딩 전에 가정을 드러낸다. 구현 중에는 작게 간다. 기존 코드를 수정할 때는 관련 없는 피해를 만들지 않는다. 끝나기 전에는 결과를 검증한다.

작은 아이디어지만, 지금 AI 코딩 현실에 잘 맞는다. 최신 코딩 에이전트는 많은 소프트웨어를 빠르게 바꿀 수 있다. 그래서 실패 모드가 덜 중요해지는 게 아니라 더 중요해진다.

작은 guideline 파일 하나가 에이전트를 완벽하게 만들지는 못한다. 그래도 감독하기 쉬운 에이전트로 만들 수는 있다. 실제 프로젝트에서는 그것만으로도 꽤 유용하다.

## References

[1] `forrestchang/andrej-karpathy-skills` GitHub repository, checked May 6, 2026: https://github.com/forrestchang/andrej-karpathy-skills

[2] `karpathy-guidelines` skill file, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/skills/karpathy-guidelines/SKILL.md

[3] Andrej Karpathy on X, post about Claude/Codex-style coding-agent workflow and pitfalls: https://x.com/karpathy/status/2015883857489522876
