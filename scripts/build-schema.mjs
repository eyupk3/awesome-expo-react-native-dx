import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  CATEGORIES,
  MAINTAINED_VALUES,
  MAX_DESCRIPTION_LENGTH,
  MAX_TAGS,
  MIN_RESOURCES,
  PLATFORMS,
  SOURCE_KINDS,
  STATUS_VALUES,
  SUBCATEGORIES,
  TYPES,
} from "./constants.mjs";

const ROOT = process.cwd();
const SCHEMA_PATH = path.join(ROOT, "data", "resources.schema.json");

const allSubcategories = [];
for (const subs of SUBCATEGORIES.values()) {
  for (const sub of subs) {
    allSubcategories.push(sub);
  }
}
const uniqueSubcategories = [...new Set(allSubcategories)];

const itemSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(2),
  url: z.url(),
  category: z.enum(CATEGORIES),
  subcategory: z.enum(uniqueSubcategories).optional(),
  platform: z.enum([...PLATFORMS]),
  type: z.enum([...TYPES]),
  description: z.string().min(1).max(MAX_DESCRIPTION_LENGTH),
  last_verified: z.iso.date(),
  source_kind: z.enum([...SOURCE_KINDS]),
  license: z.string().nullable().optional(),
  maintained: z.enum([...MAINTAINED_VALUES]),
  status: z.enum([...STATUS_VALUES]).optional(),
  tags: z.array(z.string().min(2)).max(MAX_TAGS),
});

const catalogSchema = z.array(itemSchema).min(MIN_RESOURCES);

const jsonSchema = z.toJSONSchema(catalogSchema);

// Add metadata to the generated schema
jsonSchema.$id =
  "https://github.com/eyupk3/awesome-expo-react-native-dx/blob/main/data/resources.schema.json";
jsonSchema.title = "Expo + React Native DX Resource Catalog";
jsonSchema.description = "Schema for data/resources.yaml entries.";

fs.writeFileSync(
  SCHEMA_PATH,
  `${JSON.stringify(jsonSchema, null, 2)}\n`,
  "utf8",
);
console.log(`JSON Schema generated at ${SCHEMA_PATH}`);
