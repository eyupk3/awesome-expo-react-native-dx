import { differenceInCalendarDays, isValid, parseISO, startOfToday } from 'date-fns';
import { CATEGORIES } from './constants.mjs';
import { loadResources } from './load-resources.mjs';

const WARN_AFTER_DAYS = 120;
const FAIL_AFTER_DAYS = 180;

const today = startOfToday();

const resources = loadResources().filter((item) => (item.status ?? 'active') !== 'deprecated');
const warnings = [];
const failures = [];
const summaryByCategory = new Map(CATEGORIES.map((c) => [c, { warn: 0, fail: 0 }]));

for (const item of resources) {
  const verifiedDate = parseISO(item.last_verified);
  if (!isValid(verifiedDate)) {
    failures.push(`${item.id}: invalid date '${item.last_verified}'`);
    continue;
  }
  const age = differenceInCalendarDays(today, verifiedDate);

  if (age > FAIL_AFTER_DAYS) {
    failures.push(`${item.id}: ${age} days old (>${FAIL_AFTER_DAYS})`);
    if (summaryByCategory.has(item.category)) {
      summaryByCategory.get(item.category).fail += 1;
    }
  } else if (age > WARN_AFTER_DAYS) {
    warnings.push(`${item.id}: ${age} days old (>${WARN_AFTER_DAYS})`);
    if (summaryByCategory.has(item.category)) {
      summaryByCategory.get(item.category).warn += 1;
    }
  }
}

console.log(`Checked staleness for ${resources.length} active resources.`);

if (warnings.length > 0) {
  console.log(`\nWarnings (> ${WARN_AFTER_DAYS} days):`);
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (failures.length > 0) {
  console.error(`\nFailures (> ${FAIL_AFTER_DAYS} days):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  console.error('\nCategory summary:');
  for (const [category, stats] of summaryByCategory.entries()) {
    if (stats.warn > 0 || stats.fail > 0) {
      console.error(`- ${category}: warn=${stats.warn}, fail=${stats.fail}`);
    }
  }

  process.exit(1);
}

console.log('Staleness check passed.');
