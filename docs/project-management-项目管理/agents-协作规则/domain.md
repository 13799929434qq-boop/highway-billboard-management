# Domain Docs

How engineering skills should consume this repository's domain documentation when exploring or changing the codebase.

## Before exploring or changing domain behavior

- Read `docs/domain-领域模型/CONTEXT-领域上下文.md` for the ubiquitous language and current domain baseline.
- Read `docs/adr-架构决策/架构决策总表-现行规则.md` before changing related behavior.
- Treat `docs/requirements-需求文档/需求基线_TAPD对齐版_V1.0.md` and confirmed stakeholder records as authoritative when they differ from terminology notes.

If one of these files is absent, proceed silently. Create or extend domain documentation only when a real term or architectural decision has been resolved.

## Layout

This is a single-context repository:

```text
/
├── AGENTS.md
├── docs/
│   ├── domain-领域模型/
│   │   └── CONTEXT-领域上下文.md
│   └── adr-架构决策/
└── frontend/ · backend/
```

## Use the glossary's vocabulary

When an issue title, proposal, test, implementation, or explanation names a domain concept, use the term defined in `docs/domain-领域模型/CONTEXT-领域上下文.md`. Avoid synonyms that the glossary explicitly rejects.

If a required concept is missing, first reconsider whether the term belongs to the project. If it represents a genuine domain gap, record it for domain-modeling work.

## Flag ADR conflicts

If proposed work conflicts with an existing ADR, identify the relevant ADR and explain the conflict explicitly rather than silently overriding the decision.
