---
title: "Hermes Agent는 무엇이고, OpenClaw · Claude Code · Codex와는 무엇이 다른가?"
description: "Hermes Agent는 단순한 coding copilot이 아니다. 이 프로젝트는 persistent하고 self-improving한 multi-surface personal agent runtime을 지향하며, 그 점이 OpenClaw, Claude Code, Codex와의 차이를 만든다."
pubDate: 2026-04-19
updatedDate: 2026-04-19
lang: ko
translationGroup: what-is-hermes-agent-and-how-it-differs-from-openclaw-claude-code-and-codex
baseSlug: 2026-04-19-what-is-hermes-agent-and-how-it-differs-from-openclaw-claude-code-and-codex
tags:
  - hermes-agent
  - nous-research
  - openclaw
  - claude-code
  - codex
  - ai-agents
heroImage: ../../assets/blog-placeholder-1.jpg
---

Hermes Agent가 최근 눈에 띄는 이유는, 이 프로젝트가 전형적인 coding copilot처럼 보이려고 하지 않기 때문이다.

공식 설명을 보면 오히려 이렇게 이해하는 편이 더 맞다. 자신의 인프라 위에서 돌아가고, 메시징 플랫폼과 터미널을 넘나들며, 배운 것을 기억하고, 경험으로부터 skill을 만들고, 시간이 갈수록 더 유용해지는 persistent하고 self-improving한 personal agent라는 것이다.

이건 Claude Code나 Codex와는 꽤 다른 출발점이다.

그런 제품들은 보통 먼저 coding agent로 이야기된다. 반면 Hermes는 **built-in learning loop를 가진 항상 켜져 있는 agent runtime**으로 이해하는 편이 더 자연스럽다.

이 차이는 중요하다.

## Hermes Agent는 실제로 무엇인가

공식 자료 기준으로 Hermes Agent는 자신을 다음과 같이 제시한다.

- Nous Research가 만든 open-source agent
- 세션을 넘어 지속되는 agent
- 사용자의 인프라 위에서 실행 가능
- 여러 모델 provider를 사용할 수 있음
- 터미널과 메시징 플랫폼에 연결됨
- closed learning loop를 중심에 둔 설계

여기서 learning loop가 가장 중요한 부분이다.

Hermes는 경험으로부터 skill을 만들고, 사용하는 동안 그 skill을 개선하고, 유용한 지식을 계속 보존하도록 스스로를 밀어주며, 과거 대화를 검색하고, 시간이 갈수록 사용자에 대한 더 깊은 모델을 쌓는다고 말한다.

즉 Hermes는 단순히 “나는 task를 할 수 있다”라고 말하는 것이 아니다.

오히려 “나는 오래 실행될수록 너에게 더 유용해질 수 있다”라고 주장하는 쪽에 가깝다.

이건 대부분의 coding-agent 제품이 보통 하는 주장보다 훨씬 넓다.

## Hermes가 다르게 느껴지는 이유

몇 가지가 바로 눈에 띈다.

### 1. 하나의 인터페이스에 묶여 있지 않다

Hermes는 CLI와 메시징 채널을 동시에 살아가는 구조를 전제로 한다. GitHub 자료를 보면 Telegram, Discord, Slack, WhatsApp, Signal, 그리고 터미널을 하나의 gateway process로 연결하는 식으로 설명한다.

그래서 Hermes는 “열어서 쓰는 앱”이라기보다, 이미 일하는 곳 어디에서든 접근할 수 있는 long-lived agent process처럼 느껴진다.

### 2. 하나의 모델 provider에 묶여 있지 않다

Hermes는 Nous Portal, OpenRouter, NVIDIA NIM, Xiaomi MiMo, z.ai/GLM, Kimi, MiniMax, Hugging Face, OpenAI, Anthropic, 혹은 사용자의 자체 endpoint 위에서 돌아갈 수 있다고 말한다.

즉 Hermes는 모델 레이어에서 이기려는 프로젝트가 아니다. 모델 위의 **agent layer**에서 이기려는 프로젝트에 더 가깝다.

### 3. memory와 skill 축적을 훨씬 진지하게 다룬다

많은 agent가 memory를 말한다. Hermes는 memory를 정체성 일부로 삼는다.

프로젝트가 직접 강조하는 항목은 이런 것들이다.

- agent-curated memory
- 복잡한 작업 이후의 skill 생성
- skill self-improvement
- cross-session recall
- scheduled automation

이건 Hermes를 단일 task assistant보다는 personal agent operating system에 더 가깝게 만든다.

### 4. 노트북 밖에서 돌도록 설계되었다

Hermes는 저렴한 VPS, cloud VM, Docker, SSH, Modal 같은 remote backend 위에서 실행하는 시나리오를 전면에 둔다. idle cost를 낮추기 위한 hibernation과 wake-on-demand 패턴도 강조한다.

그래서 Hermes는 여전히 desktop-side assistant로 경험되는 많은 도구보다 더 강한 “agent infrastructure” 냄새를 풍긴다.

## 초기 인기와 커뮤니티 반응

Hermes는 초기 traction도 꽤 있는 편으로 보인다.

보수적으로, 공식 repo와 release note에서 직접 확인 가능한 신호만 봐도 속도가 유난히 빠르다. v0.9.0 release note만 해도 이전 major release 이후 487 commits, 269 merged pull requests, 167 resolved issues, 493 files changed, 24 contributors를 적고 있다. 그리고 며칠 뒤 v0.10.0이 나오면서 gateway와 tool system 쪽 기능이 또 크게 확장되었다.

이런 release cadence는 중요하다.

즉 Hermes는 단순히 repo 안에 흥미로운 아이디어로 놓여 있는 프로젝트가 아니라, 이미 충분한 maintainer와 community energy를 받아 fast-moving platform처럼 움직이고 있다는 뜻이다. integration, tool breadth, operational polish가 중요한 agent 프로젝트라면, 이 속도 자체가 product story의 일부가 된다.

## OpenClaw와는 무엇이 다른가

OpenClaw와 Hermes는 실제로 비교할 만할 정도로 겹치는 부분이 있다.

둘 다 long-running agent, messaging surface, skills, multiple runtime, persistent workflow에 관심이 있다. Hermes에는 `hermes claw migrate` 명령까지 있는데, 이것 자체가 저자들이 OpenClaw 같은 환경에서 넘어오는 사용자를 의식하고 있다는 꽤 직접적인 신호다.

다만 중심축은 달라 보인다.

### OpenClaw

OpenClaw는 더 **general agent orchestration and multi-surface runtime**에 가깝다.

강점은 다음과 같다.

- provider와 surface를 넘나드는 routing
- session management
- agent skills
- ACP harness integration
- messaging-based operation
- 여러 agent workflow를 조합하는 능력

즉 하나의 시스템 안에서 여러 agent interaction이 일어나게 만드는 control layer 역할에 강하다.

### Hermes

Hermes는 더 **personal persistent agent with an opinionated learning loop**에 가깝다.

정체성의 중심도 orchestration 그 자체보다는 다음에 놓여 있다.

- 시간이 지나며 쌓이는 memory
- 경험에서 생겨나는 skills
- 장기적인 user modeling
- 오래 돌릴수록 agent 자신이 더 나아져야 한다는 생각

그래서 OpenClaw가 flexible agent runtime과 control plane처럼 느껴진다면, Hermes는 continuously learning personal agent layer를 만들려는 시도처럼 보인다.

이건 중요한 차이다.

## Claude Code와는 무엇이 다른가

Claude Code는 훨씬 더 좁고, 더 날카롭다.

역할도 더 분명하다. 코드베이스를 읽고, 파일을 수정하고, 명령을 실행하고, tool을 쓰고, coding-first workflow 안에서 소프트웨어 작업을 완료하게 돕는 것이다.

Anthropic이 Claude를 plain chat 너머로 확장할 때도—Claude Code, computer use, Chrome integration, desktop extension 등—제품 논리는 여전히 다음 축에 강하게 묶여 있다.

- coding workflow
- tool use
- harness design
- safety/control boundary

Hermes는 Claude Code보다 덜 집중되어 있지만, 동시에 더 넓다.

Claude Code는 specialized coding agent로 이해하기 쉽다. 반면 Hermes는 coding을 포함한 여러 작업을 다룰 수 있는 personal agent shell로 이해하는 편이 더 자연스럽다.

그래서 focused software work에는 Claude Code가 더 강하게 느껴질 가능성이 높고, 반대로 messaging, memory, automation을 포함한 broader long-lived personal-agent behavior가 목적이라면 Hermes가 더 흥미롭게 느껴질 수 있다.

## Codex와는 무엇이 다른가

OpenAI의 새로운 Codex도 빠르게 넓어지고 있다.

browser use, desktop control, memory, plugins, scheduled automations, terminal, image generation이 붙으면서, Codex 역시 더 이상 좁은 coding assistant identity에 머물지 않는다.

하지만 제품의 모양은 여전히 Hermes와 다르다.

Codex는 OpenAI가 자기 모델과 product ecosystem을 중심으로 **broader work agent surface**를 구축하려는 움직임처럼 보인다.

반면 Hermes는 provider를 interchangeable하게 다루면서 모델 레이어 위에 올라가는 **open personal agent runtime**처럼 보인다.

그래서 tradeoff도 달라진다.

- Codex는 product surface로서 더 polished하게 느껴질 수 있다.
- Hermes는 더 flexible하고, 더 "내 것 같은" agent system처럼 느껴질 수 있다.

## Hermes의 장점

Hermes는 특히 다음 영역에서 강해 보인다.

### 1. Persistence
세션, 채널, 시간을 넘어 살아남도록 설계되어 있다.

### 2. Learning loop
self-improvement 스토리가 대부분의 agent 제품보다 훨씬 중심에 있다.

### 3. Multi-provider flexibility
특정 모델 vendor에 잠겨 있지 않다.

### 4. Multi-surface operation
CLI + messaging + remote runtime + scheduled automation의 조합이 강하다.

### 5. Infrastructure realism
VPS, cloud backend, SSH, low-idle 환경에서 돌리는 시나리오를 전제로 하기 때문에, 많은 hobbyist agent보다 더 deployable하게 보인다.

## Hermes의 약점

Hermes를 야심차게 만드는 것들이 동시에 리스크이기도 하다.

### 1. Product sprawl
메시징 agent, coding agent, memory layer, scheduler, personal runtime을 한 번에 다 하려는 시스템은 복잡도가 빠르게 높아질 수 있다.

### 2. Reliability burden
persistent memory와 self-improving skills는 매력적이지만, 동시에 훨씬 높은 reliability 기준을 만든다. learning loop가 지저분해지면 누적되는 가치 대신 누적되는 혼란을 줄 수도 있다.

### 3. Harder evaluation
coding agent는 coding task로 benchmark하기 쉽다. 하지만 persistent personal agent는 깔끔하게 측정하기가 훨씬 어렵다.

### 4. Operational complexity
provider, backend, integration, channel이 많아질수록 setup과 failure mode도 같이 늘어난다.

## Hermes를 OpenClaw, Claude Code, Codex와 같이 쓸 수 있나?

원칙적으로는 가능하다. 특히 OpenClaw와는 더 그렇다.

### Hermes + OpenClaw

이 조합이 개념적으로는 가장 자연스럽다.

OpenClaw가 routing/orchestration layer 역할을 하고, Hermes가 persistent personal-agent layer 역할을 맡는 식이다. 물론 둘이 겹치는 부분도 많기 때문에, 잘못 쌓으면 불필요한 중복 복잡도가 생길 수 있다. 그래도 OpenClaw의 workflow/surface flexibility와 Hermes의 learning-loop 철학을 함께 원한다면 생각해볼 만한 조합이다.

### Hermes + Claude Code

이것도 가능하다. 다만 훨씬 더 specialist 구조에 가깝다.

Claude Code는 focused coding tool로 남기고, Hermes가 messaging, memory, automation 같은 더 넓은 personal-agent behavior를 맡는 식이다. 이 경우 Claude Code는 specialist고, Hermes는 그 밖을 감싸는 persistent shell이 된다.

### Hermes + Codex

같은 이유로 이것도 가능하다.

Codex는 점점 더 넓어지고 있지만, 여전히 OpenAI의 product surface다. Hermes는 그 위에 provider-agnostic persistent agent로 놓일 수도 있고, 반대로 Codex를 Hermes가 호출하는 tool/model 중 하나로 취급할 수도 있다.

다만 세 경우 모두 진짜 문제는 개념적 호환성이 아니다. **복잡도**다. agent runtime을 여러 겹 쌓기 시작하면, duplicated surface, duplicated memory, duplicated skills, unclear responsibility boundary가 생길 위험이 커진다.

## 우리의 해석

Hermes Agent가 흥미로운 이유는, 이 프로젝트가 단순히 더 나은 coding agent를 만들려는 게 아니기 때문이다.

Hermes는 다른 범주를 만들려는 것처럼 보인다. 특정 모델 vendor의 도구라기보다, 사용자에게 속하는 persistent하고 self-improving한 multi-surface agent 말이다.

이건 강하고도 야심찬 아이디어다.

실제로 이게 성공할지는 약속이 얼마나 그럴듯하냐보다, 그 learning loop가 시간이 지나도 유용하고 안정적이며 해석 가능한 상태를 유지할 수 있느냐에 달려 있다.

그게 가능하다면, Hermes는 더 polished하지만 vendor 색이 강한 agent tool에 대한 의미 있는 대안이 될 수 있다. 반대로 그러지 못하면, 이론상으론 멋지지만 일상적으로 쓰기엔 애매한 또 하나의 ambitious agent shell이 될 위험도 있다.

그래서 Hermes는 계속 지켜볼 가치가 있다.

## References

- Hermes Agent official site  
  https://hermes-agent.nousresearch.com/
- NousResearch/hermes-agent GitHub  
  https://github.com/NousResearch/hermes-agent
- Hermes Agent releases  
  https://github.com/NousResearch/hermes-agent/releases
