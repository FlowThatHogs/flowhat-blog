---
title: "Andrej Karpathy Skills란 무엇인가?"
description: "Andrej Karpathy Skills는 Karpathy가 직접 만든 공식 프로젝트가 아니라, 그의 LLM 코딩 에이전트 비판에서 영감을 받은 Claude Code 가이드라인 레포다."
pubDate: 2026-05-05
updatedDate: 2026-05-05
lang: ko
translationGroup: what-is-andrej-karpathy-skills
baseSlug: 2026-05-05-what-is-andrej-karpathy-skills
tags:
  - claude-code
  - agents
  - skills
  - ai-engineering
  - workflows
heroImage: ../../assets/blog-placeholder-1.jpg
---

**Andrej Karpathy Skills**는 코딩 에이전트를 위한 작은 instruction layer로 보는 게 가장 정확하다.

더 구체적으로 말하면, GitHub 레포 `forrestchang/andrej-karpathy-skills`는 Andrej Karpathy가 공개적으로 말한 LLM 코딩 실패 패턴을 `CLAUDE.md`, Claude Code plugin, 재사용 가능한 skill, Cursor rule 형태로 정리한 프로젝트다. 현재 확인한 공개 자료 기준으로는 Karpathy가 직접 만든 공식 프로젝트가 아니다. 레포 설명도 “Andrej Karpathy's observations on LLM coding pitfalls에서 파생됐다”고 쓰고 있고, GitHub의 repository owner는 `forrestchang`다.[1]

그래서 이 글에서는 이 레포를 Karpathy의 공식 도구가 아니라, Karpathy의 문제의식을 옮긴 커뮤니티 프로젝트로 본다. 코딩 에이전트에 대한 유명한 비판이 실제로 사용할 수 있는 작업 규칙으로 바뀐 사례다.

이 레포가 말하는 건 단순하다. 좋은 모델만으로는 부족하다. 에이전트가 어디까지 추측하고, 언제 멈추고, 무엇을 검증해야 하는지도 정해줘야 한다.

## 이 레포에 들어있는 것

프로젝트는 의도적으로 작다. 중심 아티팩트는 `CLAUDE.md` 파일이다. 프로젝트에 넣으면 Claude Code가 작업 전에 읽을 수 있는 guideline이다. 여기에 Claude Code plugin metadata, `skills/karpathy-guidelines/SKILL.md`, Cursor rule 지원, 그리고 흔한 실패 패턴을 보여주는 예제가 포함된다.[2][3][4]

네 가지 원칙은 이렇다.

1. **Think Before Coding**
2. **Simplicity First**
3. **Surgical Changes**
4. **Goal-Driven Execution**

어려운 개념은 아니다. 오히려 그게 핵심이다. 이 레포는 새로운 소프트웨어 방법론을 발명하려고 하지 않는다. 인간 엔지니어라면 당연히 기대하지만 매번 명시하지는 않는 discipline을 코딩 에이전트가 기억하게 만드는 쪽에 가깝다.

2026년 5월 5일 리서치 시점에 GitHub API 기준 이 레포는 약 **111,962 stars**, **11,178 forks**를 가지고 있었다. 이 숫자가 모든 코딩 작업에서 효과를 증명하는 것은 아니다. 다만 많은 개발자가 이 레포가 겨냥한 문제를 알아보고 있다는 신호로 볼 수 있다.[1]

## 배경이 된 Karpathy의 X 글

배경은 Karpathy가 Claude와 Codex류 코딩 에이전트 워크플로에 대해 길게 쓴 X 글이다.[5]

그 글에서 Karpathy는 자신의 코딩 방식이 크게 바뀌었다고 설명한다. 수동 코딩과 autocomplete 중심에서, agent-driven coding과 수동 touchup 중심으로 빠르게 이동했다는 것이다. 그는 이것을 약 20년 코딩 경력에서 가장 큰 변화 중 하나로 표현했다.

하지만 그 글은 단순한 AI agent 찬양이 아니다.

Karpathy는 “이제 IDE가 필요 없다”거나 “agent swarm이 다 해결한다”는 식의 이야기는 현재 단계에서는 과하다고 본다. 중요한 코드라면 여전히 IDE 옆에서 모델을 “매처럼” 지켜봐야 한다고 말한다. 실수의 형태도 바뀌었다. 이제는 단순 문법 오류보다, 성급한 junior developer가 할 법한 미묘한 개념적 실수가 더 문제라는 것이다.[5]

그가 지적한 실패 패턴은 이렇다.

- 모델이 잘못된 가정을 하고 확인 없이 계속 진행한다.
- 헷갈림을 잘 관리하지 못한다.
- clarification을 충분히 요청하지 않는다.
- inconsistency나 tradeoff를 드러내지 않는다.
- 필요할 때 push back하지 않는다.
- 코드와 API를 과하게 복잡하게 만든다.
- 불필요한 abstraction을 만든다.
- 이해하지 못한 주석이나 코드를, 현재 작업과 무관한데도 바꾸거나 지운다.[5]

`andrej-karpathy-skills` 레포는 이 실패 패턴들에 대한 아주 작은 대응책이다.

## 원칙 1: 코딩하기 전에 생각하기

첫 번째 원칙은 assumption에 관한 것이다.

코딩 에이전트의 흔한 실수는 코드를 못 짜는 것이 아니다. 문제는 task의 의미를 조용히 하나로 정하고 바로 파일을 수정하기 시작한다는 데 있다. 사용자가 “검색을 빠르게 해줘”라고 말했을 때, 에이전트는 어떤 속도가 중요한지 묻지 않고 cache를 붙이거나 query를 바꾸거나 async 구조를 넣거나 UI를 손댈 수 있다.

이 guideline은 에이전트가 구현 전에 assumption을 말하고, 가능한 해석을 보여주고, 불확실하면 질문하고, tradeoff를 드러내게 만든다.[2]

이건 ceremony가 아니다. 비싼 wrong work를 막는 guardrail이다.

사소한 작업에서 질문이 너무 많으면 귀찮다. 하지만 non-trivial 작업에서는 숨은 assumption이 실패의 시작점인 경우가 많다.

## 원칙 2: 단순함을 먼저 두기

두 번째 원칙은 overengineering을 막는 것이다.

LLM 코딩 에이전트는 구조를 잘 만든다. 이 능력은 유용하지만, 곧 부담이 되기도 한다. 단순한 기능 하나가 strategy interface, registry, plugin system, configuration switch 다섯 개로 불어날 수 있다.

레포의 표현은 직설적이다. 문제를 해결하는 최소 코드만 쓰고, speculative한 것은 추가하지 말고, 한 번 쓸 코드에 abstraction을 만들지 말고, 200줄이 50줄이면 충분하다면 줄이라는 것이다.[2]

이게 중요한 이유는 코딩 에이전트가 complexity를 싸게 느끼게 만들기 때문이다. 파일 몇 개를 더 만드는 건 빠르다. 그래서 비용이 잘 안 보인다. 하지만 유지보수 비용은 그대로 인간에게 남는다. 누군가는 나중에 그 코드를 읽고, 리뷰하고, 테스트하고, 디버깅하고, 계속 안고 가야 한다.

## 원칙 3: 수술하듯 바꾸기

세 번째 원칙은 diff pollution을 겨냥한다.

에이전트가 기존 코드를 수정할 때, 주변 코드를 “개선”하거나, 관련 없는 섹션을 reformat하거나, 이해하지 못한 주석을 지우거나, 옆 로직을 refactor하려는 일이 생긴다. 가끔은 harmless해 보인다. 하지만 실제 변경이 noisy diff 안에 묻히면 리뷰가 어려워진다.

Guideline은 필요한 부분만 건드리고, 기존 스타일을 맞추고, drive-by refactor를 피하고, 현재 변경이 만든 문제만 정리하라고 말한다.[2]

이건 레포에서 가장 실용적인 부분 중 하나다. 실제 프로젝트에서 에이전트의 가치는 작동하는 코드를 만들 수 있느냐만으로 결정되지 않는다. 사람이 그 변경을 안전하게 리뷰할 수 있느냐도 중요하다. 작은 diff가 더 신뢰하기 쉽다.

## 원칙 4: 목표 중심으로 실행하기

네 번째 원칙은 agent leverage와 가장 직접적으로 연결된다.

Karpathy의 X 글은 LLM이 specific goal을 만족할 때까지 loop를 도는 데 아주 강하다고 말한다. 그의 조언은 모델에게 모든 절차를 지시하지 말라는 것이다. 대신 success criteria를 주고, 그 기준을 향해 움직이게 하라는 쪽에 가깝다.[5]

레포는 이것을 코딩 습관으로 번역한다. 모호한 task를 검증 가능한 outcome으로 바꾸라는 것이다. “버그를 고쳐”가 아니라, 그 버그를 재현하는 테스트를 먼저 만들고 통과시키는 식이다. “validation 추가해”가 아니라, invalid input을 정의하고 동작을 검증하는 식이다. “refactor해”가 아니라, 전후 테스트가 통과해야 한다는 기준을 두는 식이다.[2]

그러면 에이전트 loop가 이렇게 바뀐다.

```text
ask → assume → edit → claim done
```

여기서 이쪽에 가까워진다.

```text
define success → test or inspect → change → verify → report
```

작은 표현 차이처럼 보이지만, 실제로는 control 방식이 바뀐다.

## 왜 단순한 prompt pack이 아닌가

`CLAUDE.md`를 “그냥 prompt”라고 보는 건 쉽다. 하지만 그러면 더 흥미로운 패턴을 놓친다.

코딩 에이전트는 점점 project-specific instruction layer 안에서 작동한다. `CLAUDE.md`, Cursor rules, Codex instructions, reusable skills, MCP로 연결된 workflow, repository convention 같은 것들이다. 이런 layer는 모델 능력을 대체하는 장치라기보다, 모델 능력이 어디에 어떻게 쓰일지를 정하는 장치다.

`andrej-karpathy-skills` 레포는 이 패턴의 아주 작은 예다. 새로운 tool을 추가하지 않는다. 스스로 테스트를 실행하지도 않는다. correctness를 보장하지도 않는다. 대신 소프트웨어 작업 전과 작업 중에 에이전트가 어떻게 행동해야 하는지를 말한다.

그래서 이 레포의 아이디어는 Claude Code 밖으로도 확장된다. Cursor 지원과 reusable skill 파일이 같이 있는 것도 같은 이유다.[3][4]

중요한 abstraction은 Claude-specific 기능이 아니다. **Agent behavior를 project artifact로 다루는 것**이다.

## 조심해야 할 점

주의할 점은 세 가지다.

첫째, 이것은 Karpathy의 공식 릴리스가 아니다. 이 글을 위해 확인한 공개 자료 기준으로는 Karpathy가 이 레포를 직접 endorsement하거나 언급한 증거는 찾지 못했다. 이 레포는 그의 관찰에서 영감을 받은 것이지, 그가 만든 것은 아니다.[1][5]

둘째, popularity는 proof가 아니다. star count는 관심을 보여줄 뿐, 측정된 효과를 증명하지 않는다. guideline은 타당해 보이지만, 팀에는 여전히 테스트, 코드 리뷰, CI, project-specific rule이 필요하다.

셋째, 이 규칙들은 caution 쪽으로 bias되어 있다. 레포 자체도 사소한 task에는 판단해서 쓰라고 말한다.[2] 오타 수정이 planning meeting이 될 필요는 없다. 진짜 가치는 모호하고, 여러 파일을 건드리고, 위험하고, 리뷰가 어려운 작업에서 나온다.

## 실용적인 takeaway

Andrej Karpathy Skills를 celebrity-branded tool로 읽으면 곤란하다. 더 좋은 해석은 코딩 에이전트 workflow가 성숙해지는 작은 사례로 보는 것이다.

초기의 agent 사용은 보통 이런 식이었다.

```text
please build this
```

점점 더 나은 agent 사용은 이런 controlled loop에 가까워진다.

```text
assumption을 말하고, 변경을 작게 유지하고, 관련 없는 수정을 피하고, success criteria를 정하고, 끝났다고 말하기 전에 검증하라
```

그게 이 레포의 진짜 교훈이다.

코딩 에이전트가 더 강해질수록 병목은 raw generation에서 steering, reviewability, verification으로 이동한다. 작은 `CLAUDE.md` 하나가 이 문제를 전부 해결하지는 못한다. 하지만 failure mode를 보이게 만들 수는 있다. 그리고 코딩 에이전트에서는 보이는 실패가 조용한 실패보다 훨씬 다루기 쉽다.

## References

[1] `forrestchang/andrej-karpathy-skills` GitHub repository, checked May 5, 2026: https://github.com/forrestchang/andrej-karpathy-skills

[2] `CLAUDE.md`, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md

[3] Claude Code plugin metadata, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/.claude-plugin/plugin.json

[4] Cursor usage notes, `forrestchang/andrej-karpathy-skills`: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CURSOR.md

[5] Andrej Karpathy on X, post about Claude/Codex-style coding-agent workflow and pitfalls: https://x.com/karpathy/status/2015883857489522876
