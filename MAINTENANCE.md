# Maintenance Plan

## Weekly

- Run stale and link checks via scheduled workflow.
- Triage open issues and label actionable items.
- Prioritize broken-link fixes.

## Monthly

- Remove or deprecate unmaintained resources.
- Review category balance and discoverability.
- Publish a patch release note in `CHANGELOG.md`.

## Quality Gates

- `npm run validate` must pass.
- `npm run stale` warns >120 days, fails >180 days.
- `npm run link:check` blocks broken links (timeouts are warned after retries).
- `README.md` must be generated from `data/resources.yaml`.

## Ownership

Single-maintainer model for v1. Community co-maintainers can be added after stable contribution flow.

