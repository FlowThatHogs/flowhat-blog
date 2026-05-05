# Research packet: Andrej Karpathy Skills / Karpathy-inspired Claude Code Guidelines

Collected: 2026-05-05

## Working topic

Introduce the GitHub repository `forrestchang/andrej-karpathy-skills` and the broader idea behind it: small, reusable agent-behavior rules that turn Karpathy's critique of LLM coding agents into a practical `CLAUDE.md` / Claude Code plugin / Cursor rule.

## Bottom line

This should not be framed as “Andrej Karpathy created a skill.” The safer and more accurate framing is:

> A developer packaged Andrej Karpathy's public observations about LLM coding failures into a small Claude Code guideline file and plugin. The interesting story is not the repo's size, but the shift from prompting agents ad hoc to encoding expert workflow preferences as reusable project instructions.

## Primary sources

### 1. GitHub repository

- URL: https://github.com/forrestchang/andrej-karpathy-skills
- Repo: `forrestchang/andrej-karpathy-skills`
- GitHub API metadata checked 2026-05-05:
  - Created: 2026-01-27T03:53:13Z
  - Pushed: 2026-04-20T10:05:04Z
  - Stars: 111,962
  - Forks: 11,178
  - Open issues: 84
  - Default branch: `main`
  - License field in GitHub API: `null`, but README and plugin files state MIT.
- Repo description: “A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Karpathy's observations on LLM coding pitfalls.”
- First commit found: 2026-01-27T03:53:00Z, message: “Add Karpathy-inspired Claude Code guidelines” (`8462496b`).
- Recent commits:
  - 2026-04-20: Sync Chinese README with English version / add Cursor section
  - 2026-04-18: add Cursor support
  - 2026-04-18: Add Chinese translation for README

### 2. README.md

- URL: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/README.md
- Core claim: a single `CLAUDE.md` derived from Karpathy's observations.
- Four principles:
  1. Think Before Coding
  2. Simplicity First
  3. Surgical Changes
  4. Goal-Driven Execution
- README quotes Karpathy's complaints:
  - Models make wrong assumptions and run with them.
  - They do not manage confusion, seek clarification, surface inconsistencies, present tradeoffs, or push back enough.
  - They overcomplicate code/APIs, bloat abstractions, fail to clean dead code.
  - They sometimes change/remove comments and code they do not understand as side effects.
- Installation paths:
  - Claude Code plugin marketplace:
    - `/plugin marketplace add forrestchang/andrej-karpathy-skills`
    - `/plugin install andrej-karpathy-skills@karpathy-skills`
  - Per-project `CLAUDE.md` via curl.
- README includes Cursor support via `.cursor/rules/karpathy-guidelines.mdc` and `CURSOR.md`.

### 3. CLAUDE.md / Skill file

- URL: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
- URL: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/skills/karpathy-guidelines/SKILL.md
- Important exact phrasing:
  - “Behavioral guidelines to reduce common LLM coding mistakes.”
  - “Tradeoff: These guidelines bias toward caution over speed. For trivial tasks, use judgment.”
  - “Don’t assume. Don’t hide confusion. Surface tradeoffs.”
  - “Minimum code that solves the problem. Nothing speculative.”
  - “Touch only what you must. Clean up only your own mess.”
  - “Define success criteria. Loop until verified.”
- Practical examples in `EXAMPLES.md` show hidden assumptions, over-abstraction, drive-by refactors, and weak success criteria.

### 4. Claude plugin metadata

- URL: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/.claude-plugin/plugin.json
- Name: `andrej-karpathy-skills`
- Description: “Behavioral guidelines to reduce common LLM coding mistakes, derived from Andrej Karpathy's observations on LLM coding pitfalls”
- Version: 1.0.0
- License: MIT
- Skills: `./skills/karpathy-guidelines`

### 5. Cursor support

- URL: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CURSOR.md
- Cursor does not read `.claude-plugin/` or `CLAUDE.md` by default.
- Recommended Cursor path: copy `.cursor/rules/karpathy-guidelines.mdc` into another project's `.cursor/rules/` directory.

## Karpathy X source

### X post

- URL: https://x.com/karpathy/status/2015883857489522876
- Text extraction source used: https://r.jina.ai/http://x.com/karpathy/status/2015883857489522876
- Note: direct `x.com` returned JS-only page in this environment; `r.jina.ai` text extraction returned the post text.

Key points from Karpathy's post:

1. Coding workflow shift:
   - He says he went from about 80% manual/autocomplete coding and 20% agents in November to 80% agent coding and 20% edits/touchups in December.
   - He describes this as the biggest change to his coding workflow in ~2 decades.
2. Agent-swarm/IDE hype caution:
   - He says “no need for IDE anymore” and “agent swarm” hype is too much for now.
   - He still watches models “like a hawk” in an IDE.
3. Failure modes:
   - Errors are no longer mostly syntax errors; they are subtle conceptual errors like a sloppy/hasty junior developer might make.
   - The most common category: models make wrong assumptions and run with them without checking.
   - They do not manage confusion, seek clarifications, surface inconsistencies, present tradeoffs, push back, and are too sycophantic.
   - They overcomplicate code/APIs, bloat abstractions, and fail to clean dead code.
   - They sometimes change/remove comments and code they do not understand, even if orthogonal to the task.
   - Karpathy says this happens despite attempts to fix it via instructions in `CLAUDE.md`.
4. Agent leverage:
   - “LLMs are exceptionally good at looping until they meet specific goals.”
   - “Don’t tell it what to do, give it success criteria and watch it go.”
   - He recommends tests first, browser MCP loops, naive-correct algorithm first then optimization preserving correctness, and shifting from imperative to declarative instructions.
5. Big-picture claim:
   - He says Claude and Codex-like LLM agent capabilities crossed a threshold around December 2025 and 2026 will be high-energy as the industry metabolizes the capability.

Interpretation for FlowHat:

- The repo is a concrete answer to the failure modes Karpathy named.
- It is not a new model, not a coding benchmark, and not a full methodology.
- It is a compact instruction layer aimed at reducing agent failure modes.

## Secondary sources / other blogs

### DeepWiki

- URL: https://deepwiki.com/forrestchang/andrej-karpathy-skills
- Useful because it indexes repo structure and restates architecture.
- Description: “structured framework designed to improve LLM-assisted development by addressing specific behavioral pitfalls identified by Andrej Karpathy.”
- It identifies categories: silent assumptions, over-engineering, orthogonal modifications.
- Treat as repo-derived documentation, not independent reporting.

### self.md

- URL: https://self.md/tools/andrej-karpathy-skills/
- Angle: “karpathy as executable claude config” and expert tacit knowledge packaged as an agent primitive.
- Useful editorial idea: a thinker’s style becoming config, not just content to read.
- Fact-risk warning: this page appears to add claims not visible in the repo, e.g. tokenization gotchas, training-loop instincts, “how Karpathy reads code,” etc. These are not in the checked `CLAUDE.md` / `SKILL.md`. Use only as a signal of commentary angle, not as factual description of the repo contents unless independently verified.

### kdjingpai / AI Productivity Tools

- URL: https://www.kdjingpai.com/en/andrej-karpathy-skills/
- Angle: a “profile” that standardizes and optimizes AI code generation behavior.
- Claims it translates Karpathy's observations into four directives to curb over-engineering and mindless refactoring.
- Useful as secondary framing, but likely AI-tool-directory style; do not rely on it for precise repo facts.

### João Queirós / JQ AI Systems Library

- URL: https://ai.joaoqueiros.com/blog/andrej-karpathy-skills
- Title: “The Karpathy CLAUDE.md: One File That Fixes How AI Agents Work”
- Date shown: 17 April 2026
- Angle: Karpathy viral tweet → Forrest Chang turns observations into `CLAUDE.md`; why it works; how to install.
- Contains claims like “43,000+ GitHub stars in one week” and “~8M views on original tweet.” These were not independently verified here. Current GitHub API shows 111,962 stars on 2026-05-05.
- Useful for showing how other blogs are pitching it, but the title overstates it (“fixes” agents).

### AIToolly

- URL: https://aitoolly.com/ai-news/article/2026-04-16-andrej-karpathy-inspired-guidelines-for-claude-code-optimizing-llm-performance-via-claudemd
- Title: “Karpathy-Inspired Claude Code Guidelines: CLAUDE.md Analysis”
- Date shown: 2026-04-16
- Angle: open-source initiative, Claude Code optimization via `CLAUDE.md`, common LLM coding pitfalls.
- Useful as a generic news-summary example. Avoid copying its inflated claims about “dramatically” improving reliability unless backed by evidence.

### sloppr.ai

- URL: https://sloppr.ai/content/trending-github-andrej-karpathy-inspired-claude-code-guideli-v9nfqf
- Date shown: Apr 16, 2026
- Mentions 42.7k stars at the time.
- Short trend blurb. Useful only as timestamped popularity evidence / example of GitHub trend coverage.

## Recommended FlowHat angle

Possible thesis:

> Karpathy-inspired skills are not about making Claude Code magically smarter. They are about reducing the predictable ways coding agents fail: silent assumptions, bloated abstractions, drive-by edits, and vague goals. The bigger lesson is that agent performance increasingly depends on explicit workflow rules, not just model choice.

Possible structure:

1. What the repo is
   - `CLAUDE.md`, Claude Code plugin, Cursor rule, skill file.
2. What triggered it
   - Karpathy's X post on agent coding workflow and failure modes.
3. The four rules
   - Think before coding, simplicity first, surgical changes, goal-driven execution.
4. Why this matters
   - Agents need behavioral constraints; otherwise they “helpfully” over-edit and overbuild.
5. What to be careful about
   - Not official Karpathy product.
   - Not a benchmarked guarantee.
   - Star count is attention, not proof of effectiveness.
6. Practical take
   - Add small instruction files, but keep project-specific rules and tests.
   - Best used for non-trivial coding tasks where wrong assumptions and diff pollution are costly.

## Suggested titles

English:

- What Is Andrej Karpathy Skills? A Small CLAUDE.md for Better Coding Agents
- Karpathy-Inspired Claude Code Skills: Why Better Agent Behavior Starts With Better Rules
- Andrej Karpathy Skills Explained: Simpler Code, Smaller Diffs, Clearer Agent Loops

Korean:

- 안드레 카파시 스킬이란? Claude Code를 덜 망치게 만드는 작은 규칙 파일
- 코딩 에이전트가 과하게 똑똑한 척할 때: Karpathy Skills가 겨냥한 문제
- LLM 코딩의 진짜 문제는 모델이 아니라 작업 방식일 수 있다

## Fact-risk notes

- Do not say Andrej Karpathy created the GitHub repo unless a primary source proves it. Current evidence says the repo is by `forrestchang` and derived from Karpathy's observations.
- Do not say the skill objectively improves performance unless we phrase it as an intended effect or anecdotal/community adoption.
- Do not use self.md's added claims about tokenizers/training loops as repo contents; those are not visible in the checked files.
- Treat secondary blogs as commentary/examples of coverage, not authority.
- Direct X access is JS-only here; cite the X URL but mention text was retrieved through `r.jina.ai` if documenting source collection.

## Candidate citations for final post

- GitHub repo: https://github.com/forrestchang/andrej-karpathy-skills
- README raw: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/README.md
- CLAUDE.md raw: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
- Skill file: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/skills/karpathy-guidelines/SKILL.md
- Cursor instructions: https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CURSOR.md
- Karpathy X post: https://x.com/karpathy/status/2015883857489522876
- DeepWiki repo docs: https://deepwiki.com/forrestchang/andrej-karpathy-skills
- self.md commentary: https://self.md/tools/andrej-karpathy-skills/
- JQ AI Systems commentary: https://ai.joaoqueiros.com/blog/andrej-karpathy-skills
- AIToolly commentary: https://aitoolly.com/ai-news/article/2026-04-16-andrej-karpathy-inspired-guidelines-for-claude-code-optimizing-llm-performance-via-claudemd
- sloppr trend blurb: https://sloppr.ai/content/trending-github-andrej-karpathy-inspired-claude-code-guideli-v9nfqf
