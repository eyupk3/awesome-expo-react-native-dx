export function parseGitHubRepo(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (parsed.hostname.toLowerCase() !== 'github.com') return null;
  const segments = parsed.pathname.split('/').filter(Boolean);
  if (segments.length < 2) return null;

  const [owner, repoRaw] = segments;
  const blockedOwners = new Set(['topics', 'orgs', 'users', 'collections', 'marketplace', 'features']);
  if (blockedOwners.has(owner.toLowerCase())) return null;

  const repo = repoRaw.replace(/\.git$/i, '');
  if (!owner || !repo) return null;
  return { owner, repo };
}

export function renderGitHubStarsBadge(url) {
  const repo = parseGitHubRepo(url);
  if (!repo) return null;

  return `![GitHub stars](https://img.shields.io/github/stars/${repo.owner.toLowerCase()}/${repo.repo.toLowerCase()}?style=flat&logo=github&label=stars)`;
}
