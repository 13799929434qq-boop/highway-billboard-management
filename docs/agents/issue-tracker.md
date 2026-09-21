# Issue tracker: GitHub

Project issues and implementation specifications will live in this repository's GitHub Issues. The local Git repository does not yet have a remote, so GitHub issue operations start only after the remote is connected and `gh` is authenticated. Do not create local shadow issues in the meantime.

## Conventions

- Create: `gh issue create --title "..." --body-file <file>` for multiline content.
- Read: `gh issue view <number> --comments`.
- List: `gh issue list --state open --json number,title,body,labels,comments`.
- Comment: `gh issue comment <number> --body-file <file>`.
- Label: `gh issue edit <number> --add-label <label>` or `--remove-label <label>`.
- Close: `gh issue close <number>`.

Infer the repository from the Git remote after it is connected. An issue number alone refers to GitHub Issues in that repository.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## Skill operations

When a skill says to publish an issue, create a GitHub issue. When it says to fetch a ticket, read that GitHub issue and its comments. Use the role names in `docs/agents/triage-labels.md` for triage. If no remote exists yet, report that the operation is pending GitHub setup instead of silently switching trackers.
