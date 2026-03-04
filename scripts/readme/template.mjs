function toGitHubAnchor(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\- ]/g, '')
    .replace(/ /g, '-');
}

function buildCategoryToc(categories) {
  return categories
    .map((category) => {
      const anchor = toGitHubAnchor(category);
      return `- [${category}](#${anchor})`;
    })
    .join('\n');
}

export function buildReadmeDocument({ categories, generatedBody }) {
  const categoryToc = buildCategoryToc(categories);

  return `# Awesome Expo + React Native DX [![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![CI](https://github.com/eyupk3/awesome-expo-react-native-dx/actions/workflows/ci.yml/badge.svg)](https://github.com/eyupk3/awesome-expo-react-native-dx/actions/workflows/ci.yml)

Curated resources for Expo and React Native developer experience.

## Contents

${categoryToc}

## Contribution Rules

- Explain why the resource is valuable for Expo/React Native DX.
- Keep description to 140 characters or less.
- Do not submit duplicate domain + same product entries.
- \`last_verified\` cannot be in the future.

${generatedBody}

## License

Data and curation are released under [CC0-1.0](./LICENSE).
`;
}
