import { URL } from "node:url";
import { CATEGORIES, MIN_RESOURCES } from "./constants.mjs";
import { loadResources } from "./load-resources.mjs";
import { resourceSchema } from "./resource-schema.mjs";

const resources = loadResources();
const errors = [];
const validResources = [];

const ids = new Set();
const urls = new Set();
const domainNamePair = new Set();

for (const [index, item] of resources.entries()) {
  const row = `item #${index + 1}`;
  const parsed = resourceSchema.safeParse(item);

  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
      errors.push(`${row}: ${path}${issue.message}`);
    }
    continue;
  }

  const resource = parsed.data;
  validResources.push(resource);

  if (ids.has(resource.id)) {
    errors.push(`${row}: duplicate id '${resource.id}'`);
  }
  ids.add(resource.id);

  if (urls.has(resource.url)) {
    errors.push(`${row}: duplicate url '${resource.url}'`);
  }
  urls.add(resource.url);

  const parsedUrl = new URL(resource.url);
  const pairKey = `${parsedUrl.hostname.replace(/^www\./, "")}::${resource.name.trim().toLowerCase()}`;
  if (domainNamePair.has(pairKey)) {
    errors.push(
      `${row}: duplicate domain+name combination detected (${pairKey})`,
    );
  }
  domainNamePair.add(pairKey);
}

if (resources.length < MIN_RESOURCES) {
  errors.push(
    `dataset must contain at least ${MIN_RESOURCES} resources; found ${resources.length}`,
  );
}

const categoryCounts = new Map(CATEGORIES.map((category) => [category, 0]));
for (const item of validResources) {
  if ((item.status ?? "active") !== "deprecated") {
    categoryCounts.set(item.category, categoryCounts.get(item.category) + 1);
  }
}

for (const [category, count] of categoryCounts.entries()) {
  if (count < 3) {
    errors.push(
      `category '${category}' must contain at least 3 active resources; found ${count}`,
    );
  }
}

if (errors.length > 0) {
  console.error("Validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validation passed for ${resources.length} resources.`);
