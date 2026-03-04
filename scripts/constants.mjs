export const CATEGORIES = [
  'Official Docs & Upgrade Guides',
  'Starter Kits & Boilerplates',
  'Navigation & Routing',
  'State, Data Fetching & Caching',
  'UI, Design Systems & Theming',
  'Forms & Validation',
  'Testing & QA',
  'Performance & Profiling',
  'Build, Release & EAS',
  'Native Modules & Device APIs',
  'Learning Resources (high-signal only)'
];

export const PLATFORMS = new Set(['expo', 'react-native', 'both']);
export const TYPES = new Set(['library', 'tool', 'template', 'article', 'video', 'repo', 'service']);
export const SOURCE_KINDS = new Set(['official', 'community', 'commercial']);
export const MAINTAINED_VALUES = new Set(['yes', 'unknown', 'no']);
export const STATUS_VALUES = new Set(['active', 'deprecated']);

export const MAX_DESCRIPTION_LENGTH = 140;
export const MAX_TAGS = 4;

export function sortByName(a, b) {
  return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
}

export function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
