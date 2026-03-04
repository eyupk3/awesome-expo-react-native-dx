export function byIds(ids) {
  const set = new Set(ids);
  return (item) => set.has(item.id);
}

export function bySource(sourceKind) {
  return (item) => item.source_kind === sourceKind;
}

export function byType(type) {
  return (item) => item.type === type;
}

export function hasTag(tag) {
  return (item) => item.tags.includes(tag);
}

export function any(...predicates) {
  return (item) => predicates.some((predicate) => predicate(item));
}
