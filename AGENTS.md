# Project agent instructions

Read `docs/domain-领域模型/CONTEXT-领域上下文.md` and `docs/adr-架构决策/架构决策总表-现行规则.md` before changing domain behavior.

## Workflow

Use the Matt Pocock engineering skills as the default project workflow.

- Treat TAPD stories and `docs/requirements-需求文档/需求基线_TAPD对齐版_V1.0.md` as the authoritative source of scope and priority.
- For a clear, ready requirement, use the implementation flow with TDD and code review.
- Use the Matt Skills routing and supporting flows when requirements need clarification, decomposition, diagnosis, prototyping, or triage.
- Do not require new OpenSpec artifacts before implementation.

OpenSpec is optional and follows the same opt-in rule as other skills. Preserve `openspec/config.yaml` and all existing artifacts under `openspec/`, but do not initialize OpenSpec or invoke any OpenSpec workflow based only on semantic keywords such as “新需求”, “探索需求”, “继续变更”, “开始开发”, “验证实现”, “同步规范”, or “归档变更”. Use an OpenSpec skill only when the user explicitly names an `$openspec-*` skill or explicitly asks to use/resume OpenSpec. Existing OpenSpec artifacts may be consulted as historical design input, but they are not the active task tracker or mandatory implementation gate.

## Agent skills

### Issue tracker

Project work is tracked in TAPD workspace 「魔幻陀螺组」(ID `64099159`). The authoritative scope, 47 feature story IDs, 9 category IDs, and priorities live in `docs/requirements-需求文档/需求基线_TAPD对齐版_V1.0.md`. See `docs/project-management-项目管理/项目协作规则-现行版.md`.

### Triage labels

Use the default triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/project-management-项目管理/项目协作规则-现行版.md`.

### Priorities

Use TAPD priority labels High / Middle / Low per the baseline; in-page numbering (01, 02, …) gives the build order within each page.

### Domain docs

Use the single-context layout: `docs/domain-领域模型/CONTEXT-领域上下文.md` for the ubiquitous language and `docs/adr-架构决策/架构决策总表-现行规则.md` for architecture decisions. See `docs/project-management-项目管理/项目协作规则-现行版.md`.

## File organization and Chinese labels

- Do not create a Chinese index mechanically for every folder. Add or update `00-中文索引.md` only when a folder contains many English names, has a complex structure, or its current/reference status is otherwise difficult to understand.
- When folder and file names are already clear Chinese and the structure is self-explanatory, prefer meaningful Chinese names and avoid a redundant index.
- When an index is genuinely needed, write it in plain Chinese, explain retained English names, and identify which important files are current, reference-only, generated, or historical records.
- Keep only one current version of the same business page, diagram, specification, or deliverable in the working tree. Use Git history to recover superseded versions instead of keeping V1/V2 copies side by side.
- Name the retained current artifact with the Chinese suffix `-现行版` when its status would otherwise be unclear.
- Keep generated screenshots, validation evidence, caches, temporary scripts, comparison pages, and tool snapshots out of the formal documentation tree unless they are the sole approved deliverable.
- Preserve useful design and decision documents, but place non-current material under a clearly marked `references-设计参考` or `decisions-设计决策` folder so agents do not treat it as the active baseline.
- After moving or deleting documentation, update all references, verify that no stale path remains, and update an existing index only when that index is still needed.
- Root-level `README.md` and `AGENTS.md` are discovery and control files and are exempt from the `00-中文索引.md` naming rule.
