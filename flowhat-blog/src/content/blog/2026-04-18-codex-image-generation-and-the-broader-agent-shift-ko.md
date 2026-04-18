---
title: "이제 Codex는 이미지도 만든다. 생각보다 더 중요한 변화다"
description: "OpenAI의 최신 Codex 업데이트는 이 제품이 coding assistant를 넘어 browser work, computer use, memory, automation, visuals까지 포괄하는 더 넓은 agent surface로 확장되고 있음을 보여준다."
pubDate: 2026-04-18
updatedDate: 2026-04-18
lang: ko
translationGroup: codex-image-generation-and-the-broader-agent-shift
baseSlug: 2026-04-18-codex-image-generation-and-the-broader-agent-shift
tags:
  - openai
  - codex
  - image-generation
  - computer-use
  - agents
  - workflow
heroImage: ../../assets/blog-placeholder-1.jpg
---

OpenAI의 최신 Codex 업데이트에는 처음 보면 부가 기능처럼 보이는 항목이 하나 들어 있다. 바로 이미지 생성이다.

하지만 이건 단순한 작은 추가 기능이 아니다.

OpenAI의 공식 발표에 따르면, 이제 Codex는 브라우저, 데스크톱 앱, 터미널, 플러그인, 메모리, 예약 자동화와 같은 흐름 안에서 `gpt-image-1.5`를 써서 이미지를 생성하고 반복 수정할 수 있다. 겉으로 보면 기능이 너무 많아진 것처럼 보일 수도 있다. 하지만 실제로는 OpenAI가 Codex를 더 이상 단순한 코딩 어시스턴트로 보길 원하지 않는다는 신호에 가깝다.

OpenAI는 Codex를 더 넓은 work agent로 보이게 하려는 것처럼 보인다.

## What changed in Codex

OpenAI의 framing 자체가 꽤 노골적이다.

새 제품 글에서 OpenAI는 이제 Codex가 다음과 같은 일을 할 수 있다고 말한다.

- 컴퓨터를 옆에서 함께 조작하고,
- 인앱 브라우저 안에서 작업하고,
- 90개가 넘는 플러그인을 사용하고,
- 사용자 선호와 이전 컨텍스트를 기억하고,
- 작업을 나중으로 예약하고,
- 자동으로 다시 깨어나 장기 작업을 이어가고,
- `gpt-image-1.5`로 이미지를 생성할 수 있다.

이 목록이 중요한 이유는 이미지 생성이 혼자 들어온 기능이 아니기 때문이다. 이미지 생성은 이미 코딩, 브라우징, 데스크톱 제어, 플러그인, 메모리, 반복 자동화까지 포함한 더 큰 agent surface 안에 들어왔다.

그래서 진짜 이야기는 “Codex가 이미지 생성도 하게 됐다”가 아니다.

진짜 이야기는 OpenAI가 Codex를 코딩 중심 에이전트에서 더 넓은 작업 환경(work environment for agents) 같은 것으로 확장하고 있다는 점이다.

## Why image generation is strategically interesting

여기서 이미지 생성이 중요한 이유는, 개발자들이 갑자기 Codex를 아트 툴로 쓰고 싶어졌기 때문이 아니다.

중요한 건 이미지와 시각물이 실제 소프트웨어와 제품 작업의 일부라는 점이다.

프론트엔드 디자인, 제품 콘셉트, 게임 에셋, placeholder 그래픽, 슬라이드, 목업, UI 실험 같은 작업에서 에이전트를 활용한다면, 이미지 생성은 워크플로 바깥에 있는 기능이 아니다. 이미 워크플로 안에 있다.

여기서 중요한 변화가 보인다.

코딩 에이전트가 시각물을 만들고, 스크린샷을 보고, 브라우저를 쓰고, 페이지에 코멘트를 달고, 데스크톱 앱을 넘나들고, 메모리까지 유지하게 되면, 제품은 더 이상 좁은 의미의 coding tool처럼 보이지 않는다. 오히려 디지털 작업을 위한 범용 실행 표면(general-purpose execution surface)에 가까워진다.

OpenAI의 표현도 정확히 그 방향이다. 글 제목부터 **"Codex for (almost) everything"** 이다. 이건 꽤 노골적인 브랜딩이다.

## Are other companies doing something similar?

그렇다. 하지만 정확히 같은 방식은 아니다.

### Anthropic

Anthropic도 Claude를 텍스트 전용 상호작용 너머로 확장해왔다. **computer use** 연구는 모델이 특별히 설계된 도구만 기다리는 것이 아니라, 사람들이 실제로 쓰는 소프트웨어 환경에 직접 상호작용할 수 있음을 보여줬다. Claude Code 역시 tool use, long-running workflow, 더 자율적인 task execution 방향으로 coding-agent 스토리를 넓혔다. 그리고 Anthropic의 broader product surface를 보면 **Claude in Chrome**이나 **Claude Desktop Extensions** 같은 인접 확장도 보인다.

하지만 강조점은 여전히 다르다.

Anthropic의 제품/연구 framing은 대체로 다음에 더 집중한다.

- tool use
- long-running agent structure
- harness design
- permissions와 safety
- 통제를 잃지 않으면서 에이전트를 더 자율적으로 만드는 것

즉 분명 broader agent direction이긴 하지만, 그래도 OpenAI의 이번 Codex move처럼 코딩, 브라우저 작업, 데스크톱 제어, 메모리, 자동화, 플러그인, 이미지 생성을 하나의 increasingly unified agent surface로 보여주려는 방식과는 다르다.

### Cursor와 비슷한 코딩 제품들

다른 코딩 툴들도 범위를 넓혀가고 있다. 예를 들어 Cursor는 multi-file workflow, agent behavior, IDE 중심 실행 쪽을 더 밀어왔다. 시장 전체적으로 봐도 코딩 툴은 브라우저 접근, 더 긴 task loop, 더 자율적인 실행 쪽으로 넓어지고 있다.

하지만 OpenAI의 Codex 움직임이 여전히 눈에 띄는 이유는 **조합** 때문이다.

어떤 개별 기능 하나가 다른 곳에 없어서가 아니다. OpenAI가 이 모든 기능을 한 번에 하나의 agent product story 안으로 묶고 있다는 점이 더 새롭다.

## What makes Codex different right now

가장 분명한 차이는 제품의 모양 자체다.

많은 coding-agent 제품은 여전히 전문화된 도구처럼 느껴진다. 점점 reach를 넓혀가고는 있지만, 기본적으로는 특정한 목적의 툴에 가깝다. 반면 Codex는 여러 종류의 작업이 같은 agent surface 안에서 일어날 수 있는 unified workspace처럼 보이기 시작했다.

여기에는 다음이 포함된다.

- 코드 작성,
- GitHub 리뷰 코멘트 처리,
- 터미널 사용,
- SSH를 통한 remote devbox 연결,
- 데스크톱 앱 조작,
- 웹 브라우징,
- 이전 컨텍스트 기억,
- 미래 작업 예약,
- 그리고 이제 이미지 생성까지.

중요한 건 어떤 한 기능이 아니라, **이 조합 전체**다.

코드 + 브라우저 + 컴퓨터 사용 + 메모리 + 자동화 + 이미지 생성을 갖춘 제품은 단순히 coding assistant 카테고리를 이기려는 게 아니다. 오히려 **일이 위임되는 operating surface**가 되려는 것에 가깝다.

## Why this matters for the market

이건 coding-agent 카테고리가 넓어지고 있다는 가장 분명한 신호 중 하나다.

예전의 단순한 정신모델은 이랬다. 코딩 어시스턴트는 코드를 더 빨리 쓰게 도와주는 도구다.

지금의 더 새로운 모델은 훨씬 야심 차다. 에이전트가 제품과 엔지니어링 작업이 실제로 의존하는 도구들을 넘나들고, 시간에 걸쳐 컨텍스트를 유지하고, 매번 리셋되지 않은 채 멀티스텝 작업을 수행하는 것이다.

이미지 생성은 이 이야기 안에 자연스럽게 들어간다.

그리고 더 큰 제품 방향도 암시한다. 에이전트가 코드, 시각물, 브라우저 동작, 지속되는 자동화를 한 루프 안에서 만들 수 있게 되면, coding assistant와 work agent의 경계는 점점 흐려진다.

아마 이번 업데이트의 진짜 의미가 바로 여기에 있을 것이다.

## Our take

이번 Codex 업데이트에서 가장 중요한 부분은 OpenAI가 기능 하나를 더 넣었다는 사실 자체가 아니다.

더 중요한 건, 지금 기능 집합이 의도적으로 넓어져서 **Codex가 무엇이어야 하는지 자체를 다시 정의하려는 것처럼 보인다는 점**이다.

Anthropic이 structured workflow 안에서 harness design, safety layer, agent autonomy를 더 강조해왔다면, OpenAI는 지금 조금 다른 방향을 강조하는 것처럼 보인다. Codex를 디지털 워크스페이스의 더 많은 부분에 닿을 수 있는 넓은 agent surface로 만드는 것이다.

이건 서로 다른 베팅이다.

Anthropic의 방향은 agent behavior 주변에서 능력을 통제된 방식으로 확장하는 쪽에 더 가깝다.
반면 OpenAI의 방향은, לפחות 이번 릴리스 기준으로, agent reach를 중심으로 product surface를 확장하는 쪽에 더 가깝다.

그래서 여기서 이미지 생성이 중요하다. 가장 flashy한 기능이라서가 아니라, **Codex가 어디로 가고 있는지를 보여주기 때문**이다.

## References

- OpenAI, *Codex for (almost) everything*  
  https://openai.com/index/codex-for-almost-everything/
- Anthropic, *Developing a computer use model*  
  https://www.anthropic.com/research/developing-computer-use
- Anthropic, *Claude Code*  
  https://www.anthropic.com/product/claude-code
- Anthropic, *Desktop Extensions: One-click MCP server installation for Claude Desktop*  
  https://www.anthropic.com/engineering/desktop-extensions
- Anthropic, *Introducing Anthropic Labs*  
  https://www.anthropic.com/news/introducing-anthropic-labs
