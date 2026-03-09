export const CATEGORIES = [
  "Docs & Upgrade Guides",
  "Starter Kits & Templates",
  "Navigation",
  "State & Data",
  "Backend & Auth",
  "UI & Styling",
  "Animation & Gestures",
  "UX Libraries",
  "Forms & Validation",
  "Media & Camera",
  "Device APIs",
  "Accessibility & i18n",
  "Push Notifications",
  "Analytics & Monitoring",
  "Monetization",
  "MCP Integrations",
  "Platform & Native Architecture",
  "Build & Release",
  "Testing & Quality",
  "Performance & Profiling",
  "Learning & Community",
];

export const SUBCATEGORIES = new Map([
  [
    "Docs & Upgrade Guides",
    new Set(["Expo Docs", "React Native Docs", "Upgrade Tools"]),
  ],
  [
    "Starter Kits & Templates",
    new Set(["Official Starters", "CLIs & Generators", "Community Templates"]),
  ],
  ["Navigation", new Set(["React Navigation", "Expo Router"])],
  [
    "State & Data",
    new Set([
      "Server State & Caching",
      "Client State",
      "Local Storage & Persistence",
      "Local-First Databases & Sync",
      "ORM & Query Builders",
    ]),
  ],
  ["Backend & Auth", new Set(["BaaS Platforms", "Auth Providers & SDKs"])],
  [
    "UI & Styling",
    new Set([
      "Expo UI",
      "Component Libraries",
      "Styling & Theming",
      "Icons & SVG",
    ]),
  ],
  [
    "Animation & Gestures",
    new Set(["Animation Libraries", "Graphics & Rendering", "Gestures"]),
  ],
  [
    "UX Libraries",
    new Set([
      "Carousels",
      "Sheets",
      "Toasts & Alerts",
      "Error Handling",
      "Rich Text & Markdown",
    ]),
  ],
  ["Forms & Validation", new Set(["Form Libraries", "Schema Validation"])],
  ["Media & Camera", new Set(["Image & Video", "Camera & Vision"])],
  ["Device APIs", new Set(["Maps & Location", "Device Utilities"])],
  ["Accessibility & i18n", new Set(["Accessibility", "Localization"])],
  ["Push Notifications", new Set(["Push Services"])],
  [
    "Analytics & Monitoring",
    new Set(["Analytics & Attribution", "Crash Reporting"]),
  ],
  ["Monetization", new Set(["In-App Purchases & Subscriptions"])],
  ["MCP Integrations", new Set(["MCP Setup Guides"])],
  [
    "Platform & Native Architecture",
    new Set([
      "Expo Modules & Config",
      "Development Builds",
      "React Native Architecture",
    ]),
  ],
  ["Build & Release", new Set(["EAS Pipeline", "Release Automation"])],
  [
    "Testing & Quality",
    new Set(["Unit & Component Testing", "E2E Testing", "CI Workflows"]),
  ],
  [
    "Performance & Profiling",
    new Set(["Lists & Rendering", "Runtime & Engine", "Bundle Analysis"]),
  ],
  [
    "Learning & Community",
    new Set([
      "Production Apps",
      "Curated Lists",
      "News & Updates",
      "Tutorials & Feeds",
    ]),
  ],
]);

export const PLATFORMS = new Set(["expo", "react-native", "both"]);
export const TYPES = new Set([
  "library",
  "tool",
  "template",
  "article",
  "video",
  "repo",
  "service",
]);
export const SOURCE_KINDS = new Set(["official", "community", "commercial"]);
export const MAINTAINED_VALUES = new Set(["yes", "unknown", "no"]);
export const STATUS_VALUES = new Set(["active", "deprecated"]);

export const MAX_DESCRIPTION_LENGTH = 140;
export const MAX_TAGS = 4;
export const MIN_RESOURCES = 60;

export function sortByName(a, b) {
  return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
}

export function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
