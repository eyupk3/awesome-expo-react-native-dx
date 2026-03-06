import { loadResources } from "./load-resources.mjs";

const MAX_RETRIES = 2;
const CONCURRENCY = 5;
const TIMEOUT_MS = 12000;
const GITHUB_DELAY_MS = 300;
const RATE_LIMIT_WAIT_MS = 5000;
const RATE_LIMIT_MAX_WAIT_MS = 30000;

const resources = loadResources();
const urlSet = new Set(resources.map((item) => item.url));
const urls = [...urlSet];

async function fetchWithTimeout(url, method = "HEAD") {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "awesome-expo-react-native-dx-link-check/1.0",
      },
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

async function checkUrl(url) {
  let timeoutCount = 0;
  let rateLimitCount = 0;
  let lastError = null;
  const isGitHub = url.startsWith("https://github.com/");

  if (isGitHub) {
    await new Promise((resolve) => setTimeout(resolve, GITHUB_DELAY_MS));
  }

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const head = await fetchWithTimeout(url, "HEAD");

      if (head.status === 429) {
        rateLimitCount += 1;
        const retryAfter = head.headers.get("retry-after");
        const waitMs = retryAfter
          ? Math.min(Number(retryAfter) * 1000, RATE_LIMIT_MAX_WAIT_MS)
          : RATE_LIMIT_WAIT_MS;
        await new Promise((resolve) => setTimeout(resolve, waitMs));
        continue;
      }

      if (!(head.status >= 200 && head.status < 400)) {
        const get = await fetchWithTimeout(url, "GET");

        if (get.status === 429) {
          rateLimitCount += 1;
          const retryAfter = get.headers.get("retry-after");
          const waitMs = retryAfter
            ? Math.min(Number(retryAfter) * 1000, RATE_LIMIT_MAX_WAIT_MS)
            : RATE_LIMIT_WAIT_MS;
          await new Promise((resolve) => setTimeout(resolve, waitMs));
          continue;
        }

        if (get.status >= 200 && get.status < 400) {
          return { url, ok: true, status: get.status };
        }
        if (isGitHub && get.status >= 500) {
          return {
            url,
            ok: true,
            transient: true,
            reason: `transient GitHub ${get.status}`,
          };
        }
        return {
          url,
          ok: false,
          status: get.status,
          reason: `GET returned ${get.status}`,
        };
      }
      if (isGitHub && head.status >= 500) {
        return {
          url,
          ok: true,
          transient: true,
          reason: `transient GitHub ${head.status}`,
        };
      }
      return { url, ok: true, status: head.status };
    } catch (error) {
      lastError = error;
      if (error.name === "AbortError") {
        timeoutCount += 1;
        continue;
      }
      continue;
    }
  }

  if (rateLimitCount > 0) {
    return {
      url,
      ok: true,
      rateLimit: true,
      reason: `rate-limited (429) after ${rateLimitCount} attempts with backoff`,
    };
  }

  if (timeoutCount > 0) {
    return {
      url,
      ok: true,
      timeout: true,
      reason: `timed out after ${MAX_RETRIES + 1} attempts`,
    };
  }

  if (isGitHub && lastError) {
    return {
      url,
      ok: true,
      transient: true,
      reason: `transient GitHub error: ${lastError.message}`,
    };
  }

  return {
    url,
    ok: false,
    reason: lastError ? lastError.message : "unknown network error",
  };
}

async function runPool(items, worker, concurrency) {
  const results = [];
  let index = 0;

  const workers = Array.from({ length: concurrency }, async () => {
    while (index < items.length) {
      const current = index;
      index += 1;
      // eslint-disable-next-line no-await-in-loop
      results[current] = await worker(items[current]);
    }
  });

  await Promise.all(workers);
  return results;
}

console.log(`Checking ${urls.length} unique URLs...`);
const results = await runPool(urls, checkUrl, CONCURRENCY);

const failures = results.filter((result) => !result.ok);
const timeoutWarnings = results.filter((result) => result.timeout);
const transientWarnings = results.filter((result) => result.transient);
const rateLimitWarnings = results.filter((result) => result.rateLimit);

for (const result of results) {
  if (result.ok && !result.timeout && !result.rateLimit) {
    const statusLabel = result.status ? ` (${result.status})` : "";
    console.log(`PASS: ${result.url}${statusLabel}`);
  }
}

if (timeoutWarnings.length > 0) {
  console.log("\nTimeout warnings (allowed):");
  for (const warning of timeoutWarnings) {
    console.log(`- ${warning.url}: ${warning.reason}`);
  }
}

if (transientWarnings.length > 0) {
  console.log("\nTransient warnings (allowed):");
  for (const warning of transientWarnings) {
    console.log(`- ${warning.url}: ${warning.reason}`);
  }
}

if (rateLimitWarnings.length > 0) {
  console.log("\nRate limit warnings (allowed after backoff):");
  for (const warning of rateLimitWarnings) {
    console.log(`- ${warning.url}: ${warning.reason}`);
  }
}

if (failures.length > 0) {
  console.error("\nLink check failures:");
  for (const failure of failures) {
    console.error(`- ${failure.url}: ${failure.reason ?? "failed"}`);
  }
  process.exit(1);
}

console.log("\nLink check passed.");
