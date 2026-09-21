# Issue tracker: GitHub

Project issues and implementation specifications live in the private GitHub repository `13799929434qq-boop/highway-billboard-management`. The local `main` branch tracks `origin/main`. Use the authenticated `gh` CLI for issue operations; do not create local shadow issues.

## Conventions

- Create: `gh issue create --title "..." --body-file <file>` for multiline content.
- Read: `gh issue view <number> --comments`.
- List: `gh issue list --state open --json number,title,body,labels,comments`.
- Comment: `gh issue comment <number> --body-file <file>`.
- Label: `gh issue edit <number> --add-label <label>` or `--remove-label <label>`.
- Close: `gh issue close <number>`.

Infer the repository from the Git remote. An issue number alone refers to GitHub Issues in that repository.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## Skill operations

When a skill says to publish an issue, create a GitHub issue. When it says to fetch a ticket, read that GitHub issue and its comments. Use the role names in `docs/agents/triage-labels.md` for triage.
