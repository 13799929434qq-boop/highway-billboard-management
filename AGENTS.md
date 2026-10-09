# Project agent instructions

Read `CONTEXT.md` and relevant `docs/adr/` decisions before changing domain behavior.

## Workflow

Use the Matt Pocock engineering skills as the default project workflow.

- Treat TAPD stories and `docs/需求基线_TAPD对齐版_V1.0.md` as the authoritative source of scope and priority.
- For a clear, ready requirement, use the implementation flow with TDD and code review.
- Use the Matt Skills routing and supporting flows when requirements need clarification, decomposition, diagnosis, prototyping, or triage.
- Do not require new OpenSpec artifacts before implementation.

OpenSpec is currently paused. Preserve `openspec/config.yaml` and all existing artifacts under `openspec/`, but do not initialize, update, apply, verify, sync, or archive OpenSpec changes unless the user explicitly asks to resume the OpenSpec workflow. Existing OpenSpec artifacts may be consulted as historical design input, but they are not the active task tracker or mandatory implementation gate.

## Agent skills

### Issue tracker

Project work is tracked in TAPD workspace 「魔幻陀螺组」(ID `64099159`). The authoritative scope, 54 story IDs and priorities live in `docs/需求基线_TAPD对齐版_V1.0.md`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Priorities

Use TAPD priority labels High / Middle / Low per the baseline; in-page numbering (01, 02, …) gives the build order within each page.

### Domain docs

Use the single-context layout: root `CONTEXT.md` for the ubiquitous language and `docs/adr/` for architecture decisions. See `docs/agents/domain.md`.
