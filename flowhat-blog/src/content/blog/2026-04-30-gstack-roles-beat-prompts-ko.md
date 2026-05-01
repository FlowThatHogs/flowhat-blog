---
title: "gstack이 AI 에이전트에 대해 제대로 짚은 것: 프롬프트보다 역할이 중요하다"
description: "gstack은 단순한 Garry Tan의 Claude Code 설정이 아니다. AI 코딩 워크플로가 프롬프트 요령에서 역할 기반 운영 규율로 넘어가고 있다는 좋은 사례다."
pubDate: 2026-04-30
updatedDate: 2026-04-30
translationGroup: gstack-roles-beat-prompts
baseSlug: 2026-04-30-gstack-roles-beat-prompts
heroImage: ../../assets/blog-placeholder-1.jpg
lang: ko
tags:
  - gstack
  - claude-code
  - agents
  - workflows
  - openclaw
  - ai-engineering
---

gstack은 오해하기 쉽다.

짧게 말하면 Garry Tan의 Claude Code 설정이다. 틀린 말은 아니다. 하지만 그렇게만 설명하면 이 프로젝트가 너무 작아 보인다. 더 정확히 말하면, gstack은 Claude Code를 챗봇처럼 쓰는 대신 작은 소프트웨어 팀처럼 운영하기 위한 오픈소스 워크플로다.

gstack은 Claude Code 주변에 재사용 가능한 skill, slash command, 브라우저 도구, 리뷰 루프, 운영 규칙을 붙인다. 하나의 코딩 에이전트에게 기획, 설계, 구현, 리뷰, 테스트, 보안, 문서화, 릴리스까지 긴 대화 하나에서 모두 맡기지 않는다. 대신 일을 이름 붙일 수 있는 책임 단위로 나눈다. founder review, engineering review, design review, staff-engineer review, QA, security, release, documentation, browser testing, learning 같은 식이다.[1][3]

주목할 지점은 여기다. gstack이 중요한 이유는 모두가 Garry Tan의 설정을 그대로 복사해야 해서가 아니다. 진지한 AI 코딩 워크플로가 어디로 가고 있는지 보여주기 때문이다. 마법 같은 프롬프트보다, 운영 규율에 가깝다.

## Garry Tan은 누구인가

Garry Tan은 Y Combinator의 President 겸 CEO이고, YC의 General Partner다. Initialized Capital과 Posterous를 공동창업했고, 그 전에는 Palantir에서 초기 디자이너이자 engineering manager로 일했다.[9]

이 배경은 중요하다. Y Combinator의 CEO가 자기 개인 AI 코딩 워크플로를 공개하면 창업자와 기술 운영자들이 볼 수밖에 없다. 하지만 더 중요한 건 그가 문제를 바라보는 방식이다.

이건 단순히 Claude에게 코드를 더 많이 쓰게 하는 이야기가 아니다. 모델이 이미 많은 코드를 만들어낼 수 있다면, 그 다음 문제가 생긴다. 제품 아이디어가 만들 가치가 있는지는 누가 판단하는가? 아키텍처는 누가 확인하는가? 디자인이 엉성해지는 건 누가 잡는가? 실제 브라우저 경로는 누가 테스트하는가? 보안과 릴리스는 누가 챙기는가?

이 founder/operator 관점이 gstack을 평범한 Claude Code 설정과 다르게 만든다.

## gstack은 무엇인가

`garrytan/gstack` 저장소는 자신을 Claude Code skill, slash command, 브라우저 도구, 워크플로 패턴의 모음으로 설명한다. README는 gstack이 Claude Code를 가상의 엔지니어링 팀으로 바꾼다고 말한다. 제품을 다시 생각하는 CEO, 아키텍처를 잠그는 engineering manager, AI slop을 잡는 designer, 프로덕션 버그를 찾는 reviewer, 실제 브라우저를 쓰는 QA lead, OWASP와 STRIDE 감사를 수행하는 security officer, PR을 배송하는 release engineer라는 식이다.[1]

작성 시점에 GitHub API 기준 이 저장소는 약 87,400개 스타와 12,800개 포크를 가지고 있었고, MIT 라이선스였다.[2] 스타가 품질을 증명하지는 않는다. 다만 관심을 보여준다. 그리고 이 경우에는 왜 관심을 받는지 이해할 만하다. gstack은 많은 빌더들이 이미 부딪히고 있는 문제를 하나의 패키지로 묶었다.

빈 채팅창에서 시작하는 AI 코딩은 잘 확장되지 않는다. 모델은 많은 산출물을 만들 수 있지만, 산출물이 곧 진척은 아니다. 리뷰 게이트가 없으면 더 많은 생성 코드는 모델이 조용히 내려버린 더 많은 결정이 될 수 있다.

gstack의 빠른 시작 흐름도 이 점을 보여준다. 하나의 거대한 프롬프트로 시작하라고 하지 않는다. 시스템을 설치하고, `/office-hours`, `/plan-ceo-review`, `/review`, `/qa`를 실행해본 뒤, 이 워크플로가 자신에게 맞는지 판단하라고 한다.[1]

이건 프롬프트 라이브러리가 아니다. 힘이 있는 체크리스트다.

## 왜 사람들이 주목했나

일부 이유는 분명하다. Garry Tan은 영향력이 있다. YC 창업자, 인디 해커, AI 도구 업계 사람들은 그가 실제로 무엇을 써서 제품을 만드는지 궁금해한다.

하지만 영향력만으로는 반응을 설명하기 어렵다. gstack은 타이밍이 맞았다. 개발자들은 이미 같은 교훈을 힘들게 배우고 있었다. 병목은 더 이상 항상 코드 생성이 아니다. 오히려 범위 조절, 리뷰, 테스트, 제품 판단, 메모리인 경우가 많다.

gstack은 이 요소들에 이름을 붙인다. `/office-hours`는 제품 압박이다. `/plan-ceo-review`는 founder review다. `/plan-eng-review`는 아키텍처 리뷰다. `/review`는 staff-engineer review다. `/qa`는 앱을 테스트한다. `/cso`는 보안을 본다. `/ship`은 릴리스를 맡는다. `/document-release`는 문서를 갱신한다.[3]

아이디어는 단순하다. 하나의 에이전트에게 모두가 되라고 하지 말라는 것이다.

역할을 줘라. 단계를 줘라. 완료 기준을 줘라.

## 유용한 추상화: 가상의 엔지니어링 팀

일반적인 AI 코딩 세션은 이런 모호한 요청으로 시작할 때가 많다.

```text
이 기능 만들어줘.
```

그러면 모델은 제품 판단, 아키텍처 판단, 디자인 판단, 테스트 판단, 릴리스 판단을 알아서 해버린다. 가끔은 잘 된다. 하지만 종종 겉으로는 끝난 것처럼 보이는데, 밑에 깔린 가정이 틀린 결과물이 나온다.

gstack은 그 숨은 결정을 밖으로 끌어내려 한다.

skills 문서는 명령을 전문가 역할에 연결한다. `/office-hours`는 YC 스타일의 제품 질문, `/plan-ceo-review`는 founder review, `/plan-eng-review`는 아키텍처 리뷰, `/plan-design-review`는 디자인 리뷰, `/review`는 staff-engineer review, `/qa`는 QA, `/cso`는 보안, `/ship`은 릴리스 엔지니어링, `/document-release`는 기술 문서 작성이다.[3]

신비로운 건 없다. 관리 구조를 명령으로 적어둔 것이다.

"자율 에이전트"라는 말보다 덜 화려하게 들릴 수 있다. 하지만 더 쓸모 있다. 실제 소프트웨어 작업에는 이미 역할이 있다. 제품 감각, 아키텍처, 구현, QA, 보안, 문서화, 릴리스는 서로 다른 판단을 요구한다. 하나의 assistant 응답이 이 모든 것을 떠안으면 검토하기 어려워진다.

역할을 나누면 사람이 잡을 수 있는 손잡이가 생긴다.

- product review는 이 기능이 만들 가치가 있는지 묻는다
- engineering review는 계획이 시스템에 맞는지 확인한다
- design review는 인터페이스와 감각의 문제를 본다
- QA는 실제 브라우저에서 테스트한다
- security는 피할 수 있는 위험을 본다
- release는 변경사항을 안전하게 내보낼 수 있는지 확인한다

하나의 프롬프트도 이 모든 항목을 언급할 수는 있다. 하지만 워크플로는 그 단계들이 실제로 일어나게 만든다.

## 왜 에이전트에서 이게 중요한가

AI 코딩의 실패 모드는 나쁜 코드만이 아니다. 더 자주 빠지는 것은 책임의 소유권이다.

에이전트는 코드를 쓸 수 있다. 그런데 제품 프레이밍은 누가 책임지는가? 범위는 누가 줄이는가? 실제 사용자 경로는 누가 테스트하는가? README가 오래됐다는 건 누가 발견하는가? 이 브랜치를 머지해도 되는지는 누가 판단하는가?

전통적인 팀에서는 이런 책임이 사람과 프로세스 사이에 나뉘어 있다. 혼자 AI를 쓰는 워크플로에서는, 워크플로가 다시 끌어오지 않으면 이 책임들이 사라진다.

gstack은 이런 책임을 부가 기능이 아니라 작업의 일부로 다룬다. "virtual engineering team"이라는 표현은 브랜딩처럼 들릴 수 있지만, 그 아래의 패턴은 실용적이다. 시작할 때 더 큰 프롬프트를 주는 대신, 알맞은 단계에서 더 좁은 일을 맡긴다.[1][3]

이 지점에서 gstack은 prompt engineering에서 context engineering과 agent operations로 넘어가는 흐름과 연결된다. 질문은 더 이상 "어떤 지시문이 모델을 잘 움직이게 하는가?"만이 아니다. "어떤 구조가 작업이 흐트러지지 않게 잡아주는가?"다.

이전 글에서 다룬 GSD도 같은 문제를 다른 쪽에서 다룬다. GSD는 `.planning/`, phase, command, verification gate에 지속되는 프로젝트 상태를 둔다. gstack은 specialist role과 review discipline에 더 무게를 둔다. 서로 다른 시스템이지만 방향은 같다. 진지한 에이전트 작업에는 채팅창보다 더 많은 구조가 필요하다.[7][8]

## OpenClaw 관점

gstack의 OpenClaw 문서는 gstack을 포팅된 런타임이 아니라 방법론으로 다룬다는 점에서 유용하다.[4]

OpenClaw는 ACP를 통해 Claude Code 세션을 띄울 수 있다. gstack은 그 세션에 planning discipline과 specialist review를 제공할 수 있다. 통합은 의도적으로 가볍다. daemon도 없고, JSON-RPC도 없고, compatibility matrix도 없다. 프롬프트가 다리 역할을 한다.[4]

이건 에이전트 시스템에서 중요하다. 모든 워크플로가 강하게 결합된 플랫폼 통합이 될 필요는 없다. 때로 유용한 레이어는 이동 가능한 텍스트다. 체크리스트, 리뷰 역할, planning discipline, 코딩 에이전트에게 어떤 판단을 적용해야 하는지 알려주는 명령 같은 것들이다.

OpenClaw, Hermes, Codex, Claude Code 혹은 다른 에이전트 런타임을 쓰는 빌더라면 이 부분을 가져갈 가치가 있다. 미래는 하나의 완벽한 에이전트 환경이라기보다, orchestrator, coding agent, skill, memory, browser tool, review loop가 쌓이는 구조에 가까울 가능성이 높다. 워크플로 레이어는 호스트를 넘어 이동할 수 있어야 한다.

gstack의 OpenClaw 문서는 간단한 라우팅 규칙을 제시한다.

- 단순 수정은 gstack 컨텍스트가 필요 없다
- 여러 파일을 건드리는 기능은 가벼운 planning이 필요할 수 있다
- review, QA, security 요청은 관련 specialist를 호출해야 한다
- 더 큰 objective는 더 완전한 planning과 implementation pipeline이 필요하다[4]

좋은 감각이다. 한 줄 오타 수정이 의식이 되어서는 안 된다. 하지만 진지한 기능 작업을 오타 수정처럼 다뤄서도 안 된다.

## LOC 논쟁은 경고이지 핵심이 아니다

README에는 강한 생산성 주장이 있다. Garry Tan이 2013년 baseline보다 2026년에 훨씬 더 많은 logical code를 shipping하고 있다는 주장이고, LOC controversy에 대한 별도 방법론 문서도 링크되어 있다.[1][5]

이 부분은 조심해야 한다.

라인 수는 품질 지표가 아니다. 논쟁 문서도 이 점을 직접 말하고, AI verbosity를 인정하며, logical SLOC와 deflation assumption으로 비교를 보정하려 한다.[5] 단순한 "AI가 나를 800배 빠르게 만들었다" 식의 주장보다는 신중하다. 그래도 주의점은 남는다. shipped code volume은 shipped product value와 같지 않다.

더 오래 남는 포인트는 워크플로다.

한 사람이 훨씬 더 많은 AI 생성 작업을 감독한다면, 리뷰 구조는 덜 중요해지는 게 아니라 더 중요해진다. 산출량이 늘수록 병목은 무엇을 만들지 결정하고, 범위를 줄이고, 나쁜 가정을 잡고, 실제 동작을 테스트하고, 시스템을 안전하게 만들고, 조심스럽게 릴리스하는 쪽으로 이동한다.

그 역할들에 gstack은 이름을 붙인다.

## 무엇을 가져갈 것인가

잘못된 교훈은 인기가 있으니 전체 스택을 그대로 복사하는 것이다.

더 나은 교훈은 운영 원칙이다.

```text
하나의 에이전트에게 모두가 되라고 하지 말 것.
에이전트에게 역할, 단계, 완료 기준을 줄 것.
```

작은 팀이나 솔로 빌더라면 이렇게 바꿔볼 수 있다.

1. 기능을 계획하기 전에 product review를 한다
2. 구현 전에 architecture review를 한다
3. 머지 전에 별도 code review를 돌린다
4. 사용자-facing 변경에는 browser QA를 쓴다
5. auth, payment, upload, permission 관련 작업에는 security review를 돌린다
6. 문서 업데이트를 릴리스의 일부로 넣는다

이 모든 것에 gstack이 꼭 필요한 것은 아니다. Claude Code, Codex, OpenClaw, Hermes skill, repo의 `AGENTS.md`, 작은 체크리스트로도 같은 패턴을 만들 수 있다. gstack이 유용한 이유는 그 패턴을 구체적으로 보여주기 때문이다.

비용은 있다. 역할 기반 워크플로는 시간, 토큰, 주의를 쓴다. 작은 작업에서는 절차가 문제보다 커질 수 있다. 하지만 진지한 작업에서는 절차가 아니다. 생성된 코드가 자신감 있는 drift로 변하는 걸 막는 방법이다.

## 운영 모델

gstack을 보는 가장 좋은 방식은 이렇다.

```text
coding agent + explicit roles + review gates + browser/tool feedback + controlled memory
```

domain-skills 문서도 이 방향을 강화한다. gstack에는 agent가 나중에 다시 쓸 수 있는 사이트별 노트를 저장하는 메커니즘이 있고, quarantine, activation, promotion, rollback, deletion 상태를 둔다.[6] 이건 중요하다. 에이전트 워크플로는 운영 디테일을 기억할 때 좋아지지만, 메모리에는 통제가 필요하다. 배운 모든 노트를 매번 주입하면 유용한 컨텍스트가 컨텍스트 오염이 된다.

gstack의 더 큰 교훈은 agent productivity가 운영 문제가 되고 있다는 것이다.

모델에는 컨텍스트가 필요하다. 작업에는 단계가 필요하다. 단계에는 소유자가 필요하다. 소유자에게는 체크가 필요하다. 체크에는 도구가 필요하다. 결과는 조심스럽게 기억되어야 한다.

그래서 gstack은 살펴볼 가치가 있다.

특정 slash command 하나 때문이 아니다. 코딩 에이전트 주변에 다음으로 필요해질 레이어의 형태를 보여주기 때문이다. product review, engineering review, design review, QA, security, release, documentation, memory.

하나의 거대한 프롬프트가 아니다.

팀 모양의 워크플로다.

## References

1. Garry Tan, *gstack* README  
   https://github.com/garrytan/gstack
2. GitHub API, `garrytan/gstack` repository metadata, checked 2026-04-30  
   https://api.github.com/repos/garrytan/gstack
3. Garry Tan, *gstack Skill Deep Dives*  
   https://github.com/garrytan/gstack/blob/main/docs/skills.md
4. Garry Tan, *gstack x OpenClaw Integration*  
   https://github.com/garrytan/gstack/blob/main/docs/OPENCLAW.md
5. Garry Tan, *On the LOC controversy*  
   https://github.com/garrytan/gstack/blob/main/docs/ON_THE_LOC_CONTROVERSY.md
6. Garry Tan, *Domain Skills*  
   https://github.com/garrytan/gstack/blob/main/docs/domain-skills.md
7. FlowHat, *What Is GSD (get-shit-done)?*  
   /blog/2026-04-28-what-is-gsd/
8. FlowHat, *How to Actually Use GSD: The Workflow Behind Get Shit Done*  
   /blog/2026-04-29-how-to-use-gsd/
9. Y Combinator, *Garry Tan: YC Partner*  
   https://www.ycombinator.com/people/garry-tan
