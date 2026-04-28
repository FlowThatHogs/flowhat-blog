---
title: "GSD(get-shit-done)는 무엇인가?"
description: "GSD(get-shit-done)는 또 하나의 Claude Code 프롬프트 팩이 아니다. 계획, 실행, 검증, 그리고 지속되는 프로젝트 상태를 중심에 둔 코딩 에이전트용 워크플로우 시스템에 가깝다."
pubDate: 2026-04-28
updatedDate: 2026-04-28
translationGroup: what-is-gsd
baseSlug: 2026-04-28-what-is-gsd
heroImage: ../../assets/blog-placeholder-1.jpg
lang: ko
tags:
  - claude-code
  - agents
  - workflows
  - context-engineering
  - spec-driven-development
  - gsd
---

**GSD(get-shit-done)**, 즉 **Get Shit Done**은 처음 보면 오해하기 쉽다.

이름만 보면 밈 같다. 얼핏 보면 Claude Code용 프롬프트 팩 하나가 이름만 세게 잘 붙여서 뜬 것처럼 보이기도 한다. 그런데 문서를 조금만 읽어보면, 실제로는 그런 종류의 프로젝트가 아니다.

GSD는 더 정확히 말하면 **코딩 에이전트를 위한 워크플로우 시스템**에 가깝다.[1][2] Claude Code, Codex, Gemini CLI, Copilot, Cursor 같은 도구 위에 올라가서, 그 주변에 일정한 구조를 더해 더 큰 소프트웨어 작업도 중간에 흐트러지지 않고 처리하게 만들려는 쪽이다.[1]

이 점 때문에 이 프로젝트는 볼 가치가 있다.

이 글을 쓰는 시점 기준으로 `gsd-build/get-shit-done`은 GitHub에서 **5.8만 개가 넘는 star**를 모았고, npm 패키지는 최근 한 달 동안 **약 19.6만 다운로드**를 기록했다.[1][6] 이 숫자만으로 시스템의 우열이 결정되는 것은 아니지만, 최소한 “이 프로젝트가 도대체 뭔가?”를 물어볼 정도의 존재감은 충분하다.

그래서 출발점은 “왜 이 repo가 인기인가?”가 아니다.

더 먼저 물어야 할 질문은 오히려 이것이다.

**GSD는 실제로 무엇이 되려고 하는가?**

## GSD는 프롬프트 팩보다 워크플로우 운영체제에 더 가깝다

이 저장소는 자신을 **meta-prompting, context engineering, spec-driven development system**이라고 소개한다.[1] 추상적으로 들리지만, 아키텍처 문서를 보면 꽤 구체적이다.

거기서 GSD는 사용자와 AI 코딩 에이전트 사이에 놓이는 시스템이며, 네 가지를 제공한다고 설명한다.[2]

1. context engineering  
2. multi-agent orchestration  
3. spec-driven development  
4. state management  

이건 “프롬프트를 더 잘 쓴다”는 이야기보다 훨씬 큰 목표다.

기본 루프도 단순하다.[3][4]

- 프로젝트를 시작한다
- 한 phase의 선호와 제약을 먼저 정한다
- 작업을 조사하고 계획한다
- 실행한다
- 검증한다
- 통과하면 배포나 PR 단계로 넘긴다

GSD는 이 상태를 `.planning/` 디렉터리에 Markdown과 JSON 형태로 저장한다. 그래서 컨텍스트가 초기화돼도 프로젝트 메모리가 남고, 사람과 에이전트가 모두 그 상태를 볼 수 있다.[2]

여기가 핵심이다. 하나의 긴 채팅창이 프로젝트 전체를 붙들고 있기를 기대하는 대신, GSD는 기억과 워크플로우를 파일, phase, 명령어 바깥 구조로 밀어낸다.

그래서 이걸 단순 프롬프트 팩이라고 부르면 너무 작게 보는 셈이다. 프롬프트 팩은 모델을 꾸민다. GSD는 **모델 주변의 일을 굴리려는 시스템**이다.

## GSD는 무슨 문제를 풀려고 하나?

README는 이 부분에서 꽤 직접적이다.

핵심 주장은 Claude Code 같은 도구가 혼자서는 쓸모없다는 게 아니다. 진짜 주장은, 아무 구조 없이 하는 vibecoding이 작업이 조금만 커져도 쉽게 일관성을 잃고, 약해지고, 관리하기 어려워진다는 쪽이다.[1]

이건 코딩 에이전트를 장난감 수준이 아니라 실제 작업에 써본 사람이라면 익숙한 문제다.

- 모델이 앞에서 정한 제약을 잊어버린다
- 긴 세션에서 맥락이 흐려진다
- 구현이 원래 목표에서 조금씩 벗어난다
- 테스트는 자꾸 뒤로 밀린다
- “거의 맞는 코드”가 쌓여서 결국 큰 지저분함이 된다

GSD는 이걸 **모델 문제**라기보다 **워크플로우 문제**로 본다.

그래서 답도 “다음 모델 업데이트를 기다리자”가 아니다. 오히려 에이전트 바깥에 프로세스를 덧댄다.

- 요구사항을 아티팩트로 남기고
- 작업을 phase로 쪼개고
- 더 좁고 선명한 컨텍스트를 가진 에이전트를 따로 띄우고
- 실행 전에 계획을 검증하고
- 실행 후 결과를 다시 검증한다[2][3][4]

이게 핵심 아이디어다. GSD는 코딩 에이전트를 덜 즉흥적으로 만들고, 더 반복 가능하게 만들려 한다.

## GSD 안에는 무엇이 들어 있나?

이 저장소는 생각보다 작지 않다. 현재 공개 문서 기준으로 보면:

- **86개 commands**
- **33개 agents**
- 상태와 아티팩트를 담는 `.planning/` 디렉터리
- 계획과 실행을 phase 단위로 나누는 워크플로우[1][5]

내부는 대략 이런 구성요소를 중심으로 돌아간다.

- 요구사항, roadmap, state, phase 파일 같은 **프로젝트 아티팩트**
- 작업을 다음 단계로 넘기는 **명령어들**
- planning, research, execution, verification, debugging을 맡는 **전문화된 agent들**
- 채팅창 바깥에 보존되는 **persistent state**[2][3][5]

바로 이 점 때문에 GSD는 일반적인 프롬프트 라이브러리보다 경량 워크플로우 운영체제처럼 느껴진다.

중요한 설계 감각은 단순하다. **복잡도는 사용자의 반복 설명이 아니라 시스템 안에 있어야 한다**는 것이다.[1] 사용자가 같은 맥락을 매번 다시 말하게 하는 대신, GSD는 그 맥락을 파일, 계획, 워크플로우 단계 안에 붙잡아두려 한다.

다르게 말하면, GSD는 **엔터프라이즈 흉내는 싫어하지만 spec-driven development의 장점은 가져가고 싶은 사람들**을 위한 버전이라고 볼 수 있다.

## 왜 사람들이 이걸 주목하나?

일단 눈에 띄는 이유는 분명하다. repo가 크고, 활동적이고, 설치가 쉽다.[1][6]

하지만 더 깊은 이유는 따로 있다. 이 프로젝트는 이미 많은 코딩 에이전트 사용자가 느끼고 있는 불편을 꽤 정확한 말로 정리해준다. 더 강한 베이스 모델은 분명 도움이 되지만, 그것만으로 자동 해결되지 않는 문제들이 있다.

- context drift
- planning drift
- sloppy execution
- weak verification
- long-session fatigue

GSD의 인기는 이제 많은 사용자가 모델 자체보다, **모델 주변의 워크플로우 레이어**를 원하기 시작했다는 신호처럼 보인다.

프로젝트의 말투가 먹히는 이유도 여기에 있다. 이건 엔터프라이즈식 의식을 팔지 않는다. 대신 솔로 개발자나 작은 팀이 에이전트 작업이 흐물흐물해지는 걸 막을 방법을 판다.

다만 **사람들이 실제로 GSD를 어떻게 쓰는가**라는 질문은 또 따로 중요하다. 그건 소개글 한 편 안에 우겨 넣기보다, 다음 글에서 별도로 다루는 편이 더 낫다.

## GSD의 tradeoff는 무엇인가?

GSD는 공짜 구조가 아니다.

프로젝트 문서도 이를 숨기지 않는다. README에 따르면 full install은 **86 skills와 33 subagents**를 포함하고, 많은 런타임이 매 턴마다 이 설명을 프롬프트에 넣기 때문에 **약 1.2만 토큰 정도의 고정 오버헤드**가 생길 수 있다.[1]

이건 중요하다. GSD는 사실상 이렇게 말하는 셈이다. orchestration은 분명 에이전트를 더 강하게 만들 수 있지만, 동시에 **context tax**도 만든다.

그래서 tradeoff는 꽤 명확하다.

- 더 많은 구조는 일관성을 올릴 수 있다
- 하지만 더 많은 구조는 시스템을 느리게, 무겁게, 비싸게 만들 수도 있다

프로젝트의 답은 `--minimal` 설치 모드다. 이 모드는 여섯 개 핵심 skill만 남기고, 문서 기준 cold-start 오버헤드를 **약 700토큰 수준**까지 줄인다.[1]

이 점은 꽤 중요하다. 유지보수자도 진짜 긴장이 어디에 있는지 알고 있다는 뜻이기 때문이다. 워크플로우 레이어는 분명 도움이 되지만, 그 레이어 자체도 또 하나의 제품 문제가 될 수 있다.

## 왜 GSD는 한 repo 이상의 의미가 있나?

더 큰 그림에서 보면 GSD는 혼자 튀는 프로젝트가 아니다. 오히려 **skill layer, tool layer, workflow layer**로 수렴하는 흐름의 한 사례에 가깝다.

구글은 이미 이와 비슷한 생각을 더 공식적인 언어로 설명하고 있다. 4월에 공개한 **Gemini API Docs MCP and Agent Skills** 글에서 구글은 에이전트가 학습 시점의 한계 때문에 낡은 코드를 생성할 수 있다고 인정하고, Docs MCP와 developer skills를 결합해 에이전트를 최신 API 패턴에 맞춰 두겠다고 설명했다.[7]

OpenAI도 다른 방향이지만 인접한 흐름을 보여준다. **workspace agents**는 팀이 공유하는 클라우드 실행형 에이전트로, 여러 도구에서 컨텍스트를 모으고, 팀 프로세스를 따르고, 필요한 순간 승인 요청을 하고, 오래 걸리는 워크플로우를 이어가는 방식으로 설명된다.[8]

이 제품들이 GSD와 완전히 같은 것은 아니다. 하지만 전략 방향은 비슷하다.

여기에 **GSD2**라는 인접 흐름도 짧게는 언급할 만하다. 현재 GSD 문서 안에는 GSD2의 `.gsd/` 프로젝트를 현재 `.planning/` 형식으로 바꾸는 `/gsd-from-gsd2` 역마이그레이션 경로가 있다.[4][9][10] importer 코드 기준으로 보면 GSD2는 **Milestone → Slice → Task** 구조를 썼던 것으로 보이며, 비슷한 종류의 프로젝트 구조화와 상태 관리 문제를 다른 레이아웃으로 풀려 했던 시도로 읽힌다.[9] 다만 현재 공개적으로 확인되는 신호만 놓고 보면 GSD2는 메인 `get-shit-done` repo보다 문서도 훨씬 얇고 채택 흔적도 작다. 그래서 지금 단계에서는 본류보다는 인접 시도로 짧게 언급하는 정도가 적절해 보인다.

## 더 큰 포인트

GSD가 중요한 이유는 AI 코딩 사용자가 점점 더 많이 던지게 되는 질문에 꽤 구체적인 답을 주기 때문이다.

“어느 모델이 제일 똑똑한가?”가 아니라,

**“어떤 시스템이 모델이 중간에 맥락을 잃지 않고 실제로 일을 끝내게 도와주는가?”**

바로 이 질문이다.

그래서 GSD는 이름보다 훨씬 흥미롭다. 이건 단지 이름 센 Claude Code 애드온이 아니다. AI 코딩이 모델 감탄 단계에서 워크플로우 설계 단계로 이동하고 있다는 걸 보여주는 좋은 사례다.

## 참고 자료

1. GSD Build, *GET SHIT DONE* README  
   https://github.com/gsd-build/get-shit-done
2. GSD Build, *GSD Architecture*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/ARCHITECTURE.md
3. GSD Build, *GSD User Guide*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/USER-GUIDE.md
4. GSD Build, *GSD Command Reference*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/COMMANDS.md
5. GSD Build, *GSD Shipped Surface Inventory*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/INVENTORY.md
6. npm, *get-shit-done-cc download stats / package metadata*  
   https://www.npmjs.com/package/get-shit-done-cc
   https://api.npmjs.org/downloads/point/last-month/get-shit-done-cc
7. Google, *Improve coding agents’ performance with Gemini API Docs MCP and Agent Skills*  
   https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-docsmcp-agent-skills/
8. OpenAI, *Introducing workspace agents in ChatGPT*  
   https://openai.com/index/introducing-workspace-agents-in-chatgpt/
9. GSD Build, *`/gsd-from-gsd2` command*  
   https://github.com/gsd-build/get-shit-done/blob/main/commands/gsd/from-gsd2.md
10. GSD Build, *CLI Tools / GSD2 import references*  
   https://github.com/gsd-build/get-shit-done/blob/main/docs/CLI-TOOLS.md
