import { CATEGORY_GROUP_DEFINITIONS } from './groups.mjs';
import { renderTable } from './render-table.mjs';

export function groupByPredicates(list, groups) {
  let remaining = [...list];
  const result = [];

  for (const group of groups) {
    const matched = remaining.filter((item) => group.predicate(item));
    if (matched.length > 0) {
      result.push({ title: group.title, items: matched });
      const matchedSet = new Set(matched);
      remaining = remaining.filter((item) => !matchedSet.has(item));
    }
  }

  if (remaining.length > 0) {
    result.push({ title: 'Other', items: remaining });
  }

  return result;
}

export function renderCategory(category, list) {
  const definitions = CATEGORY_GROUP_DEFINITIONS.get(category) ?? [{ title: 'Other', predicate: () => true }];
  const groups = groupByPredicates(list, definitions);

  const lines = [];
  lines.push(`## ${category}`);
  lines.push('');

  for (const group of groups) {
    lines.push(renderTable(group.items, group.title));
  }

  lines.push('');
  return lines.join('\n');
}
