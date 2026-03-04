function badge(label, value, color) {
  return `![${label}: ${value}](https://img.shields.io/static/v1?label=${encodeURIComponent(
    label
  )}&message=${encodeURIComponent(value)}&color=${color})`;
}

function colorForPlatform(platform) {
  if (platform === 'expo') return '3b82f6';
  if (platform === 'react-native') return '6366f1';
  return '0ea5e9';
}

function colorForType(type) {
  if (type === 'library') return '7c3aed';
  if (type === 'tool') return '0ea5e9';
  if (type === 'template') return '16a34a';
  if (type === 'repo') return 'ea580c';
  if (type === 'service') return 'a855f7';
  if (type === 'video') return 'dc2626';
  return '64748b';
}

function colorForOrigin(origin) {
  if (origin === 'maintainer') return '16a34a';
  if (origin === 'commercial') return 'a855f7';
  return '0284c7';
}

function colorForMaintained(maintained) {
  if (maintained === 'yes') return '16a34a';
  if (maintained === 'no') return 'dc2626';
  return 'f59e0b';
}

export function originFromSourceKind(sourceKind) {
  if (sourceKind === 'official') return 'maintainer';
  if (sourceKind === 'commercial') return 'commercial';
  return 'open-source';
}

export function renderSignalBadges(item) {
  const origin = originFromSourceKind(item.source_kind);
  return [
    badge('platform', item.platform, colorForPlatform(item.platform)),
    badge('type', item.type, colorForType(item.type)),
    badge('origin', origin, colorForOrigin(origin)),
    badge('maintained', item.maintained, colorForMaintained(item.maintained))
  ].join(' ');
}
