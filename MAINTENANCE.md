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

## Schema Ownership

The **Zod** schema in `scripts/resource-schema.mjs` is the **source of truth** for resource validation.
`data/resources.schema.json` is **auto-generated** from `scripts/constants.mjs` via `npm run build:schema`.
When changing resource fields, update `scripts/constants.mjs` first — both schemas derive from it.

## Deprecated Resources

Resources marked with `status: deprecated` in `data/resources.yaml` are:

- Excluded from `README.md` generation.
- Retained in the YAML file for historical reference.
- Permanently removed after 6 months from the deprecation date.

## Ownership

Single-maintainer model for v1. Community co-maintainers can be added after stable contribution flow.
