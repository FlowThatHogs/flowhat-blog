---
title: "사용자들은 Claude Opus가 나빠졌다고 말한다. Anthropic은 너프가 아니라 버그라고 말한다."
description: "Claude Opus와 Claude Code에 대한 불만은 단순 성능 논란을 넘어 모델 일관성, 버전 신뢰, 프로덕션 안정성 문제로 번지고 있다."
pubDate: 2026-04-14
updatedDate: 2026-04-14
lang: ko
translationGroup: users-say-claude-opus-got-worse
baseSlug: 2026-04-14-users-say-claude-opus-got-worse
tags:
  - anthropic
  - claude-opus
  - claude-code
  - model-reliability
  - ai-infrastructure
  - ai-agents
heroImage: ../../assets/blog-placeholder-1.jpg
---

최근 몇 주 동안 Claude가 예전보다 나빠졌다는 불만이 계속 나오고 있다. 그리고 그 불만의 대상은 Claude 전반이 아니라, 특히 Claude Opus와 Claude Code에 집중되는 경우가 많다.

이제 반복적으로 나오는 주장은 익숙하다. instruction following이 약해졌고, reasoning은 얕아졌으며, 긴 멀티스텝 작업이 예전보다 덜 믿을 만해졌다는 것이다. 일부 사용자는 이를 "AI shrinkflation"이라고까지 부른다. 같은 모델 이름과 같은 가격 아래에서 더 약한 제품을 받는다는 뜻이다.

그게 사용자 쪽 이야기다.

Anthropic의 설명은 다르다. 회사는 수요, 서버 부하, 시간대 때문에 의도적으로 모델 품질을 낮추지 않는다고 말한다. 최근 공개한 postmortem에서는 품질 저하의 원인을 의도적 다운그레이드가 아니라 인프라 버그로 돌렸다.

그래서 이 이야기는 Anthropic이 몰래 Claude를 너프했느냐를 따지는 문제로만 보면 안 된다. 그건 아직 입증되지 않았다. 더 중요한 문제는 hosted model이 이제 다른 모든 프로덕션 의존성과 같은 신뢰 문제를 겪기 시작했다는 점이다. 사용자는 자신이 돈을 내고 쓰는 것이 시간이 지나도 안정적이고 예측 가능하며, 실질적으로 같은 것인지 알고 싶어 한다.

## 사용자들이 실제로 보고한 것

이제 불만은 더 이상 막연하지 않다.

가장 분명한 공개 사례 중 하나는 **"Opus 4.6 quality regression: production automations broken by apparent model downgrade"** 라는 GitHub 이슈다. 이 보고서는 2주 이상 안정적으로 돌아가던 일일 자동화 파이프라인이, 프롬프트나 코드나 설정 변경 없이 갑자기 incoherent한 출력을 내기 시작했다고 설명한다.

이 이슈에 따르면 모델은 다음과 같은 문제를 보이기 시작했다.

- 이전에는 따르던 top-level rule을 무시했고,
- 참조해야 할 스타일 파일을 건너뛰었으며,
- 구조화된 출력 품질이 떨어졌고,
- 전반적으로 Opus보다 더 작은 모델처럼 행동했다.

이 보고 하나만으로 플랫폼 전체의 회귀를 증명할 수는 없다. 하지만 이 사례는 프로덕션 사용자에게 가장 중요한 실패 형태를 정확히 보여준다. 단순히 답변이 약간 나빠진 정도가 아니다. 같은 모델 이름을 쓰고 있는데도, 멀쩡히 돌던 자동화가 갑자기 믿을 수 없게 된다는 점이 문제다.

이건 완전히 다른 종류의 complaint다.

비슷한 주장은 다른 곳에서도 반복됐다. sustained reasoning 저하, instruction adherence 약화, 작업 포기, Claude Code 세션에서의 token 낭비 증가 같은 패턴이다. 이 중 일부는 주관적일 수 있다. 긴 컨텍스트, 달라진 프롬프트, 사용자 기대 변화 같은 요인이 섞였을 수도 있다. 하지만 complaint의 양과 패턴의 유사성이 이 문제를 단순한 모델 논쟁 이상으로 키웠다.

## Anthropic이 실제로 말한 것

Anthropic은 Claude Opus가 의도적으로 downgraded되었다고 인정하지 않았다.

대신 공개한 것은 세 가지 인프라 버그가 Claude의 응답 품질을 간헐적으로 떨어뜨렸다는 공식 engineering postmortem이다. 그 글에서 회사는 분명히 다음과 같이 말한다.

- 수요나 시간대 때문에 모델 품질을 낮추지 않으며,
- 사용자가 겪은 품질 저하는 인프라 버그 때문이었고,
- 그 버그는 일부 요청에서 품질 일관성에 실제 영향을 주었다.

이 차이는 중요하다.

이 postmortem은 "모든 사용자 complaint가 그들이 말한 그대로 맞았다"는 뜻은 아니다. 그렇다고 "실제 품질 문제는 없었다"는 뜻도 아니다. 오히려 반대다. 적어도 일부 사용자에게는 출력 품질 저하가 실제로 있었고, 그 정도가 공식 설명이 필요할 만큼 컸다는 점을 확인해준다.

또한 2차 보도들에서는 Anthropic이 일부 Claude 모델에 영향을 준 버그는 수정했고, Opus 관련 품질 문제는 여전히 조사 중이라고 전한다. 이것만으로 deliberate nerf를 입증할 수는 없지만, 최소한 사용자들이 더 큰 문제를 완전히 상상한 것만은 아니라는 점을 강화해준다.

## 왜 이게 Claude 하나의 논란 이상인가

진짜 문제는 Claude만의 문제가 아니라는 점이다.

Hosted AI model은 이제 가벼운 채팅을 넘어서 실제 워크플로 안에 들어가고 있다. 팀들은 이를 코딩 루프, 콘텐츠 파이프라인, 고객 지원 흐름, 내부 자동화에 사용한다. 그렇게 되는 순간 신뢰성의 기준도 달라진다.

챗봇은 일관성이 조금 부족해도 흥미로운 도구일 수 있다.  
프로덕션 의존성은 그렇지 않다.

그래서 설령 "nerf"라는 단어가 잘못된 표현이더라도, 이 complaint들은 여전히 중요하다.

사용자가 어떤 모델을 하나의 이름으로 부를 때 — 예를 들어 `claude-opus-4-6` — 그 이름은 어느 정도 안정적인 무언가를 가리킨다고 기대한다. 같은 프롬프트, 같은 자동화, 같은 모델 식별자를 쓰고 있는데도, 숨겨진 routing 변경이나 인프라 버그, serving 차이 때문에 갑자기 의미 있게 나빠질 것이라고는 생각하지 않는다.

이 지점에서 AI 플랫폼 신뢰는 전통적인 소프트웨어 신뢰 문제와 닮아간다.

사용자에게는 최소한 세 가지가 필요하다.

1. **Version stability** — 하나의 모델 이름으로 불리는 것은 예측 불가능하게 흔들리지 않아야 한다.
2. **Transparency** — 인프라나 routing 때문에 동작이 바뀌면 사용자에게 알려야 한다.
3. **Version pinning 또는 snapshot** — 프로덕션 사용자는 자신이 검증한 동작을 붙잡고 있다가, 원할 때 업그레이드할 수 있어야 한다.

이건 과한 요구가 아니다. 프로덕션 시스템 안에 들어가는 모든 의존성에 대해 보통 기대하는 수준이다.

## 이 신뢰 문제는 벤치마크보다 크다

그래서 이 문제를 단순한 소셜미디어 소음으로 치부할 수 없다.

공개 벤치마크 순위도 중요하지만, 프로덕션 신뢰는 더 중요하다. 모델이 벤치마크에서 여전히 좋아 보여도, 실제 동작이 덜 예측 가능해지면 훨씬 덜 유용해질 수 있다. 많은 진지한 사용자에게 reliability는 capability의 일부다.

코딩 모델에서는 특히 그렇다.

제약을 따르고, 긴 작업 상태를 유지하고, 구조화된 일을 끝내는 능력이 흔들리면 피해는 추상적이지 않다. 깨진 자동화, 낭비된 검토 시간, 그리고 모델에 대한 신뢰 하락으로 바로 이어진다.

즉 질문은 단순히 이것이 아니다.

**"Claude Opus는 아직 똑똑한가?"**

질문은 이것이기도 하다.

**"이 엔드포인트 뒤에 있는 모델을 실제 작업에 충분히 일관적으로 쓸 수 있을 만큼 신뢰할 수 있는가?"**

이건 더 어렵고, 더 중요한 질문이다.

## Our take

지금 시점에서 가장 방어 가능한 결론은 Anthropic이 Claude Opus를 몰래 너프했다는 것이 아니다.

더 강한 결론은, 사용자들이 실제로 체감할 정도의 품질 일관성 문제를 겪었고, Anthropic의 공식 postmortem 역시 이 문제를 단순한 착각으로 치부하기 어렵게 만든다는 점이다.

이게 중요한 이유는 AI 벤더들이 이제 데모 단계에서 벗어나고 있기 때문이다. 사람들이 hosted model 위에 실제 워크플로를 만들기 시작하면, 조용한 품질 드리프트는 단순 커뮤니티 complaint가 아니라 제품 문제가 된다.

그래서 이 이야기를 읽는 가장 유용한 방식은, Claude가 "들켰다"는 식의 드라마로 보는 것이 아니다. 오히려 모델 제공자가 안정성, 투명성, 버전 제어에 대해 더 강한 보장을 내놓아야 한다는 초기 신호로 보는 것이 맞다.

이 문제는 이번 Claude 논란이 지나간 뒤에도 오래 남을 것이다.

## References

- Anthropic, *A postmortem of three recent issues*  
  https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues
- GitHub issue, *Opus 4.6 quality regression: production automations broken by apparent model downgrade*  
  https://github.com/anthropics/claude-code/issues/31480
- VentureBeat, *Is Anthropic 'nerfing' Claude? Users increasingly report performance degradation as leaders push back*  
  https://venturebeat.com/technology/is-anthropic-nerfing-claude-users-increasingly-report-performance
- The Decoder, *Anthropic confirms technical bugs after weeks of complaints about declining Claude code quality*  
  https://the-decoder.com/anthropic-confirms-technical-bugs-after-weeks-of-complaints-about-declining-claude-code-quality/
