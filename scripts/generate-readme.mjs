import fs from 'node:fs';
import path from 'node:path';
import { CATEGORIES, sortByName } from './constants.mjs';
import { loadResources } from './load-resources.mjs';
import { renderCategory } from './readme/render-category.mjs';
import { buildReadmeDocument } from './readme/template.mjs';

const ROOT = process.cwd();
const README_PATH = path.join(ROOT, 'README.md');

const resources = loadResources();
const active = resources.filter((item) => (item.status ?? 'active') !== 'deprecated');

const byCategory = new Map(CATEGORIES.map((category) => [category, []]));
for (const item of active) {
  if (byCategory.has(item.category)) {
    byCategory.get(item.category).push(item);
  }
}

for (const list of byCategory.values()) {
  list.sort(sortByName);
}

const generatedBody = CATEGORIES.map((category) => renderCategory(category, byCategory.get(category) ?? [])).join('\n');
const readme = buildReadmeDocument({ categories: CATEGORIES, generatedBody });

fs.writeFileSync(README_PATH, `${readme.trimEnd()}\n`, 'utf8');
console.log(`README generated at ${README_PATH}`);
