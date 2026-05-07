---
title: "GSD, Karpathy Skills, Superpowers, gstack: 코딩 에이전트를 더 잘 쓰기 위한 네 가지 레이어"
description: "GSD, Karpathy Skills, Superpowers, gstack은 각각 코딩 에이전트의 행동, 프로젝트 상태, 개발 프로세스, 역할 기반 리뷰 문제를 다르게 다룬다."
pubDate: 2026-05-07
updatedDate: 2026-05-07
lang: ko
translationGroup: four-layers-for-better-coding-agents
baseSlug: 2026-05-07-four-layers-for-better-coding-agents
tags:
  - gsd
  - karpathy-skills
  - superpowers
  - gstack
  - agents
  - workflows
  - ai-engineering
heroImage: ../../assets/blog-placeholder-1.jpg
---

코딩 에이전트는 점점 좋아지고 있다. 하지만 실전에서 중요한 질문은 이제 “어떤 모델이 코드를 더 잘 쓰는가”만이 아니다.

더 어려운 질문은 이것이다. 에이전트가 안정적인 작업 형태 안에서 움직이게 하려면 무엇이 필요한가?

그래서 **GSD**, **Karpathy Skills**, **Superpowers**, **gstack**을 함께 비교해볼 만하다. 이 프로젝트들은 보통 Claude Code workflow, prompt pack, skill library, agent framework 같은 이름으로 소개된다. 틀린 설명은 아니지만, 더 중요한 패턴이 있다.

각각은 서로 다른 실패 모드를 다룬다.

- Karpathy Skills는 에이전트의 나쁜 행동 습관을 좁힌다.
- GSD는 긴 작업에서 프로젝트 상태가 사라지는 문제를 줄인다.
- Superpowers는 소프트웨어 개발 습관을 reusable skill로 만든다.
- gstack은 역할 기반 리뷰와 제품팀 구조를 넣는다.

이들은 같은 도구가 아니다. 코딩 에이전트 주변에 놓이는 네 가지 레이어에 가깝다.

## 공통 문제: agent output은 싸지만 control은 싸지 않다

요즘 코딩 에이전트는 코드를 빠르게 많이 만든다. 이건 분명 유용하다. 동시에 위험하다.

문제는 단순 syntax error만이 아니다. 에이전트가 요구사항을 추측하고 그대로 달린다. 필요 이상으로 구조를 만든다. 관련 없는 파일을 건드린다. 프로젝트 초반에 정한 결정을 잊어버린다. 실제 검증을 하지 않고 완료했다고 말한다.

Andrej Karpathy도 LLM coding에 대해 이런 문제를 지적했다. 잘못된 가정, 숨겨진 혼란, 부족한 clarification, 과하게 복잡한 API, 부풀린 abstraction, dead code, collateral edit 같은 문제다.[1]

이 관찰이 왜 이런 workflow 프로젝트들이 생기는지 설명해준다. 모델은 코드를 쓸 수 있다. 주변 시스템은 그 작업을 inspectable, bounded, verifiable하게 만들어야 한다.

## Karpathy Skills: behavior patch

**Karpathy Skills**는 이 네 가지 중 가장 가벼운 레이어다.

`forrestchang/andrej-karpathy-skills` 저장소는 Karpathy의 관찰을 `CLAUDE.md`, Claude Code plugin, Cursor rule, reusable `karpathy-guidelines` skill 형태로 패키징한다.[2][3] 핵심 규칙은 짧다.

1. Think before coding.
2. Simplicity first.
3. Surgical changes.
4. Goal-driven execution.[3]

그래서 Karpathy Skills는 프로젝트 관리 시스템보다 코딩 에이전트용 behavior patch에 가깝다.

가장 잘 맞는 상황은 에이전트가 너무 빨리 행동하는 경우다. 요구사항을 추측하거나, speculative abstraction을 만들거나, 관련 없는 파일까지 수정하거나, 성공 기준 없이 끝냈다고 말하는 작업이다. 작은 기능, bug fix, refactor, 위험한 multi-file edit에서는 이 규칙이 diff를 작게 만들고 reasoning을 더 잘 보이게 한다.

한계도 분명하다. Karpathy Skills는 durable project state를 만들지 않는다. phased roadmap도 없다. 제품팀 역할을 시뮬레이션하지도 않는다. 지금 앞에 있는 task를 수행할 때 에이전트가 어떤 태도로 움직여야 하는지 정해준다.

많은 실패가 바로 그 레벨에서 시작하기 때문에, 이 작은 레이어가 의미 있다.

더 자세한 설명은 [안드레 카파시 스킬이란?](/blog/2026-05-05-what-is-andrej-karpathy-skills/ko/)을 먼저 보고, 실제 코딩 예시는 [Karpathy Guidelines 사용법](/blog/2026-05-06-how-to-use-karpathy-guidelines/ko/)으로 이어서 보면 된다.

## GSD: project-state layer

**GSD**, 즉 `get-shit-done`은 더 무거운 레이어에서 작동한다.

공식 GSD 문서는 context engineering, spec-driven development, fresh-context agents, `.planning/` filesystem state를 중심으로 설명한다.[4][5] command surface에는 project creation, codebase mapping, discussion, planning, execution, verification, shipping, progress, resume command가 있다.[5]

중요한 변화는 긴 작업을 취약한 chat transcript 하나에 맡기지 않는다는 점이다.

GSD식 흐름은 보통 이런 파일들을 만든다.

```text
.planning/
  PROJECT.md
  REQUIREMENTS.md
  ROADMAP.md
  STATE.md
  phases/
```

그 다음 에이전트는 phase를 discuss하고, plan하고, bounded task로 execute하고, 결과를 verify하고, 나중에 resume할 수 있다. 모든 상태를 대화 기록에만 의존하지 않는 구조다.

GSD는 context rot이 실제 문제가 되는 작업에 잘 맞는다. 기존 codebase, 며칠짜리 feature, 큰 refactor, 요구사항과 구현 결정이 여러 session을 지나도 살아 있어야 하는 프로젝트가 그렇다.

대신 무게가 있다. GSD는 ceremony, files, commands, workflow를 추가한다. 간단한 수정에는 과할 수 있다. 하지만 긴 작업에서는 그 구조 자체가 핵심 기능이다. 에이전트에게 memory보다 오래가고, “조심해서 만들어줘”보다 구체적인 작업 기반을 준다.

GSD를 더 깊게 보려면 [GSD란 무엇인가?](/blog/2026-04-28-what-is-gsd/ko/)에서 개념을 잡고, [GSD 실제 사용법](/blog/2026-04-29-how-to-use-gsd/ko/)에서 workflow를 보면 된다.

## Superpowers: development-methodology layer

**Superpowers**는 다른 위치에 있다.

`obra/superpowers` 저장소는 자신을 agentic skills framework이자 software-development methodology라고 설명한다.[6] skill surface에는 brainstorming, writing plans, test-driven development, systematic debugging, subagent-driven development, code review, verification before completion, finishing a development branch 등이 있다.[6]

핵심은 process discipline이다.

날것의 코딩 에이전트 session은 흔히 이렇게 흐른다.

```text
request → edit → explain → maybe test
```

Superpowers는 이 흐름을 일반적인 engineering practice에 더 가깝게 만든다.

```text
understand → design → plan → test → implement → review → verify → finish
```

또 하나 중요한 점은 automatic skill use다. README는 agent가 task 전에 relevant skill을 확인한다고 설명하고, contributor guidance는 skill을 casual prose가 아니라 behavior-shaping artifact로 다룬다.[6][7]

이건 중요하다. human이 매번 어떤 skill을 불러야 하는지 기억해야 한다면 skill library의 힘은 약해진다. Superpowers는 개발 방법론이 agent의 default operating behavior에 들어가도록 만드는 쪽에 가깝다.

그래서 AI coding 주변에 반복 가능한 개발 습관을 두고 싶은 팀이나 solo builder에게 잘 맞는다. 필요한 때 TDD를 쓰고, 모르는 bug에서는 guessing 대신 systematic debugging을 하고, 완료 전 review와 verification을 거치게 하는 식이다.

위험은 methodology overhead다. 모든 task가 full development loop를 필요로 하지는 않는다. Superpowers는 process를 생략했을 때 생기는 비용이 process를 따르는 비용보다 큰 작업에서 가장 잘 맞는다.

Superpowers 자체가 궁금하다면 [Superpowers란 무엇인가?](/blog/2026-05-03-what-is-superpowers/ko/)를 보고, skill을 어떤 순서로 쓰는지는 [Superpowers 사용법](/blog/2026-05-04-how-to-use-superpowers/ko/)에서 이어서 볼 수 있다.

## gstack: role and review layer

**gstack**은 또 다른 방식이다. 작업을 virtual engineering team처럼 모델링한다.

Garry Tan의 `gstack` 저장소는 CEO, engineering manager, designer, reviewer, QA, security, release, documentation 같은 역할을 중심으로 setup을 구성한다.[8][9] 흥미로운 점은 prompt가 길다는 사실이 아니다. 서로 다른 review perspective가 reusable role이 된다는 점이다.

코딩 작업은 보통 coding만으로 끝나지 않는다.

하나의 feature에도 product judgment, design review, engineering review, security check, QA, release note, documentation이 필요할 수 있다. 하나의 에이전트가 이 모든 관점을 다루려고 하면, 종종 generic answer 하나로 뭉개진다.

gstack의 role framing은 에이전트가 작업을 여러 관점에서 보게 만든다.

그래서 product-facing change, release work, QA-heavy task, multi-agent 또는 multi-role system과 연결되는 workflow에 잘 맞는다. OpenClaw나 Hermes식 role, team, reusable agent session 논의와도 자연스럽게 이어진다.

주의할 점도 있다. 역할 이름이 품질을 보장하지는 않는다. “security reviewer” 역할도 실제 위험을 제대로 봐야 의미가 있다. “QA” 역할도 유용한 check를 해야 한다. 생산성이나 LOC 기반 주장은 self-reported이거나 논쟁적일 수 있으므로 조심해서 다뤄야 한다.[10]

gstack의 가치는 역할 이름 자체가 아니다. role separation 덕분에 빠진 관점을 더 쉽게 발견할 수 있다는 점이다.

gstack 쪽은 [gstack이 AI 에이전트에서 잘 짚은 것: 역할이 프롬프트보다 중요하다](/blog/2026-04-30-gstack-roles-beat-prompts/ko/)와 후속 글 [gstack 사용법](/blog/2026-05-02-how-to-use-gstack/ko/)을 함께 보면 좋다.

## 비교표

실전 관점에서는 이렇게 볼 수 있다.

| 레이어 | Karpathy Skills | GSD | Superpowers | gstack |
|---|---|---|---|---|
| 주된 단위 | Rule file / skill | Project workflow | Skill library / methodology | Role-based team structure |
| 주된 문제 | 나쁜 agent 습관 | Context rot과 plan 손실 | 즉흥적 개발 프로세스 | Product/review 관점 부족 |
| 잘 맞는 작업 | 작은~중간 coding task | 긴 feature와 기존 codebase | 반복 engineering workflow | Product, QA, review, release work |
| 핵심 가치 | 더 작고 안전한 agent behavior | Durable state와 phased execution | Process discipline | 여러 review lens |
| 무게감 | 가벼움 | 중간~무거움 | 중간 | 중간~무거움 |
| 주요 위험 | 큰 프로젝트에는 부족함 | 작은 작업에는 과함 | 방법론 overhead | 검증 없는 role-play |

이 표를 보면 “누가 이기냐”는 질문이 별로 유용하지 않다.

각각 agent-control 문제의 다른 부분을 해결한다.

## 실전에서는 어떻게 조합할까

실전 stack은 단순하게 생각하면 된다.

작은 bug fix라면 Karpathy-style rule부터 시작한다.

```text
가정을 먼저 말하고, 가장 작은 변경을 하고, 관련 없는 edit를 피하고, fix를 검증한다.
```

기존 codebase의 큰 feature라면 GSD-style project state를 추가한다.

```text
Codebase를 map하고, requirements를 남기고, decision을 discuss하고, phase를 plan하고, bounded task를 execute하고, ship 전에 verify한다.
```

반복적인 개발 작업이라면 Superpowers-style process를 더한다.

```text
Design 전 brainstorming, execution 전 writing-plans, 테스트 가능한 behavior에는 TDD, 원인 모를 failure에는 systematic debugging, 완료 전 verification을 쓴다.
```

제품에 노출되는 작업이라면 gstack-style role을 넣는다.

```text
Product, engineering, design, QA, security, release documentation 관점에서 plan과 diff를 검토한다.
```

모든 task에 모든 레이어가 필요한 것은 아니다. 레이어는 risk에 맞춰야 한다.

한 줄짜리 copy change에 virtual engineering team은 필요 없다. 반대로 며칠짜리 feature를 chat transcript 하나와 낙관적인 완료 보고에 맡기는 것도 좋은 구조가 아니다.

## 더 큰 결론

이 프로젝트들이 가리키는 방향은 같다. 코딩 에이전트의 reliability는 workflow design 문제가 되고 있다.

모델은 중요하다. 더 좋은 모델은 일부 실수를 줄인다. 하지만 model choice만으로 agent가 scope를 지키는지, decision을 기억하는지, test를 쓰는지, unrelated edit를 피하는지, 필요한 review perspective를 가져오는지가 결정되지는 않는다.

Karpathy Skills는 behavior level의 답이다. GSD는 project-state level의 답이다. Superpowers는 development-process level의 답이다. gstack은 role and review level의 답이다.

이렇게 비교하는 편이 가장 유용하다.

코딩 에이전트의 미래는 모든 문제를 해결하는 giant prompt 하나가 아닐 가능성이 높다. 규칙, 상태, skill, review, test, role 같은 작은 control layer들이 쌓이는 쪽에 가깝다. task structure가 좋아질수록 agent도 더 쓸모 있어진다.

## References

1. Andrej Karpathy, X post on LLM coding workflow and failure modes  
   https://x.com/karpathy/status/2015883857489522876
2. Forrest Chang, `andrej-karpathy-skills` repository  
   https://github.com/forrestchang/andrej-karpathy-skills
3. Forrest Chang, `karpathy-guidelines` skill file  
   https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/skills/karpathy-guidelines/SKILL.md
4. GSD / get-shit-done repository  
   https://github.com/gsd-build/get-shit-done
5. GSD User Guide and command reference  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/USER-GUIDE.md  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/COMMANDS.md
6. Jesse Vincent / obra, Superpowers repository  
   https://github.com/obra/superpowers
7. Jesse Vincent / obra, Superpowers contributor guidance  
   https://github.com/obra/superpowers/blob/main/CLAUDE.md
8. Garry Tan, `gstack` repository  
   https://github.com/garrytan/gstack
9. Garry Tan, gstack skill deep dives  
   https://github.com/garrytan/gstack/blob/main/docs/skills.md
10. Garry Tan, gstack note on the LOC controversy  
   https://github.com/garrytan/gstack/blob/main/docs/ON_THE_LOC_CONTROVERSY.md
