import { renderSignalBadges } from './badges.mjs';
import { renderGitHubStarsBadge } from './github.mjs';

export function escapeTableText(text) {
  return String(text).replace(/\|/g, '\\|').replace(/\n/g, '<br>');
}

export function renderResourceCell(item) {
  const name = `[${escapeTableText(item.name)}](${item.url})`;
  const starsBadge = renderGitHubStarsBadge(item.url);
  if (!starsBadge) return name;
  return `${name}<br>${starsBadge}`;
}

export function renderSignalsCell(item) {
  const badges = renderSignalBadges(item);
  const tags = item.tags.map((tag) => `\`${escapeTableText(tag)}\``).join(' ');

  const details = [`Verified: ${item.last_verified}`];
  if (item.license) {
    details.push(`License: ${item.license}`);
  }
  if (tags) {
    details.push(`Tags: ${tags}`);
  }

  return `${badges}<br>${details.join(' · ')}`;
}

export function renderTable(entries, title) {
  const lines = [];
  lines.push(`### ${title} (${entries.length})`);
  lines.push('');

  if (entries.length === 0) {
    lines.push('_No entries yet._');
    lines.push('');
    return lines.join('\n');
  }

  lines.push('| Resource | Why it helps | Signals |');
  lines.push('| --- | --- | --- |');

  for (const item of entries) {
    lines.push(
      `| ${renderResourceCell(item)} | ${escapeTableText(item.description)} | ${renderSignalsCell(item)} |`
    );
  }

  lines.push('');
  return lines.join('\n');
}
