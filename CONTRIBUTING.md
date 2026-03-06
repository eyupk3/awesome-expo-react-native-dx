# Contributing

Thanks for helping improve this list.

## What to Submit

- New resources that clearly improve Expo or React Native developer experience.
- Fixes for broken links, outdated descriptions, or stale verification dates.
- Category improvements that keep navigation practical.

## Resource Requirements

Each submitted entry must include:

- A valid HTTPS URL.
- A one-line description (140 chars max).
- `last_verified` in `YYYY-MM-DD` format.
- Up to 4 relevant tags.
- A short statement in the PR body explaining why this is valuable.
- Schema reference: `data/resources.schema.json`.

## Quality Rules

- Keep scope limited to Expo, React Native, or direct DX dependencies.
- Prefer official docs and actively maintained projects.
- Do not add duplicate domain + same product entries.
- Do not add tracking URLs, referral links, or paywalled-only content.

## Local Checks

```bash
npm ci
npm run validate
npm run stale
npm run build:readme
npm run link:check
npm run lint:md
```

## Quality Checklist

- [ ] I explained why this change is valuable.
- [ ] I verified links and dates.
- [ ] I ran local checks (`validate`, `stale`, `build:readme`, `link:check`, `lint:md`).
- [ ] I did not add duplicate resources.
