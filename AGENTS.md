# Project agent instructions

The project already has `openspec/config.yaml`. Preserve its configuration and artifacts; do not initialize OpenSpec again. Read `CONTEXT.md` and relevant `docs/adr/` decisions before changing domain behavior.

## Agent skills

### Issue tracker

Project work is tracked in TAPD workspace 「魔幻陀螺组」(ID `64099159`). The authoritative scope, 54 story IDs and priorities live in `docs/需求基线_TAPD对齐版_V1.0.md`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Priorities

Use TAPD priority labels High / Middle / Low per the baseline; in-page numbering (01, 02, …) gives the build order within each page.

### Domain docs

Use the single-context layout: root `CONTEXT.md` for the ubiquitous language and `docs/adr/` for architecture decisions. See `docs/agents/domain.md`.
