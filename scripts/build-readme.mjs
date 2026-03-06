import fs from "node:fs";
import path from "node:path";
import { CATEGORIES } from "./constants.mjs";
import { loadResources } from "./load-resources.mjs";
import { renderCategory } from "./readme/render-category.mjs";
import { buildReadmeDocument } from "./readme/template.mjs";

const ROOT = process.cwd();
const README_PATH = path.join(ROOT, "README.md");

const resources = loadResources();
const active = resources.filter(
  (item) => (item.status ?? "active") !== "deprecated",
);

const byCategory = new Map(CATEGORIES.map((category) => [category, []]));
for (const item of active) {
  if (byCategory.has(item.category)) {
    byCategory.get(item.category).push(item);
  }
}

const categoryCounts = new Map(CATEGORIES.map((category) => [category, 0]));
for (const [category, list] of byCategory.entries()) {
  categoryCounts.set(category, list.length);
}

const generatedBody = CATEGORIES.map((category) =>
  renderCategory(category, byCategory.get(category) ?? []),
).join("\n");
const readme = buildReadmeDocument({
  categories: CATEGORIES,
  categoryCounts,
  generatedBody,
});

fs.writeFileSync(README_PATH, `${readme.trimEnd()}\n`, "utf8");
console.log(`README generated at ${README_PATH}`);
