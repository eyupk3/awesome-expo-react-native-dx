import { sortByName } from "../constants.mjs";
import { renderTable } from "./render-table.mjs";

export function groupBySubcategory(list) {
  const groups = new Map();
  for (const item of list) {
    const key = item.subcategory ?? "Other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  // Sort items within each group
  for (const items of groups.values()) {
    items.sort(sortByName);
  }
  return [...groups.entries()].map(([title, items]) => ({ title, items }));
}

export function renderCategory(category, list) {
  const groups = groupBySubcategory(list);

  const lines = [];
  lines.push(`## ${category}`);
  lines.push("");

  for (const group of groups) {
    lines.push(renderTable(group.items, group.title));
  }

  lines.push("");
  return lines.join("\n");
}
