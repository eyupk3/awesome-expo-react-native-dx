function toGitHubAnchor(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\- ]/g, "")
    .replace(/ /g, "-");
}

function buildCategoryToc(categories) {
  return categories
    .map((category) => {
      const anchor = toGitHubAnchor(category);
      return `- [${category}](#${anchor})`;
    })
    .join("\n");
}

export function buildReadmeDocument({
  categories,
  categoryCounts,
  generatedBody,
}) {
  const categoryToc = buildCategoryToc(categories);

  const overviewRows = categories
    .map((category) => {
      const anchor = toGitHubAnchor(category);
      const count = categoryCounts.get(category) ?? 0;
      return `| [${category}](#${anchor}) | ${count} |`;
    })
    .join("\n");

  return `# Awesome Expo + React Native DX [![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![CI](https://github.com/eyupk3/awesome-expo-react-native-dx/actions/workflows/ci.yml/badge.svg)](https://github.com/eyupk3/awesome-expo-react-native-dx/actions/workflows/ci.yml)

Curated, actively maintained resources for building high-quality Expo and React Native applications.

This repository prioritizes clear grouping, practical DX value, and verified links.

## Categories

${categoryToc}

## Category Overview

| Category | Active resources |
| --- | ---: |
${overviewRows}

## Classification

Badges use \`source_kind\` from the data file directly:

- \`source: official\` — maintainer-authored docs and repos
- \`source: community\` — public OSS and community resources
- \`source: commercial\` — vendor services and docs

## Contribution Rules

- Explain why the resource is valuable for Expo/React Native DX.
- Keep description to 140 characters or less.
- Do not submit duplicate domain + same product entries.
- \`last_verified\` cannot be in the future.

Generated from \`data/resources.yaml\` via \`npm run build:readme\`.

${generatedBody}

## Maintenance

- Weekly health check: stale + link validation
- Monthly cleanup: prune outdated or unmaintained entries
- Release cadence: monthly patch updates or faster when needed

## License

Data and curation are released under [CC0-1.0](./LICENSE).
`;
}
