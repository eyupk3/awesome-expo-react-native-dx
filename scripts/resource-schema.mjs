import { isAfter, parseISO, startOfToday } from "date-fns";
import { z } from "zod";
import {
  CATEGORIES,
  MAINTAINED_VALUES,
  MAX_DESCRIPTION_LENGTH,
  MAX_TAGS,
  PLATFORMS,
  SOURCE_KINDS,
  STATUS_VALUES,
  SUBCATEGORIES,
  TYPES,
} from "./constants.mjs";

const today = startOfToday();

const allSubcategories = new Set();
for (const subs of SUBCATEGORIES.values()) {
  for (const sub of subs) {
    allSubcategories.add(sub);
  }
}

export const resourceSchema = z
  .object({
    id: z
      .string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "id must be a lowercase slug (kebab-case)",
      ),
    name: z
      .string()
      .refine(
        (value) => value.trim().length >= 2,
        "name must be a non-empty string",
      ),
    url: z.url({ protocol: /^https$/, error: "url must be a valid https URL" }),
    category: z
      .string()
      .refine(
        (value) => CATEGORIES.includes(value),
        "category must be one of the defined categories",
      ),
    subcategory: z
      .string()
      .optional()
      .refine(
        (value) => value === undefined || allSubcategories.has(value),
        "subcategory must be one of the defined subcategories",
      ),
    platform: z
      .string()
      .refine(
        (value) => PLATFORMS.has(value),
        "platform must be expo | react-native | both",
      ),
    type: z
      .string()
      .refine(
        (value) => TYPES.has(value),
        "type must be library | tool | template | article | video | repo | service",
      ),
    description: z
      .string()
      .min(1, "description must be a non-empty string")
      .max(
        MAX_DESCRIPTION_LENGTH,
        `description must be <= ${MAX_DESCRIPTION_LENGTH} characters`,
      ),
    last_verified: z.iso.date({ error: "last_verified must match YYYY-MM-DD" }),
    source_kind: z
      .string()
      .refine(
        (value) => SOURCE_KINDS.has(value),
        "source_kind must be official | community | commercial",
      ),
    license: z.string().optional().nullable(),
    maintained: z
      .string()
      .refine(
        (value) => MAINTAINED_VALUES.has(value),
        "maintained must be yes | unknown | no",
      ),
    status: z
      .string()
      .optional()
      .refine(
        (value) => value === undefined || STATUS_VALUES.has(value),
        "status must be active | deprecated when provided",
      ),
    tags: z
      .array(
        z
          .string()
          .refine(
            (value) => value.trim().length >= 2,
            "each tag must be a non-empty string",
          ),
      )
      .max(MAX_TAGS, `tags must have at most ${MAX_TAGS} values`),
  })
  .superRefine((item, ctx) => {
    const verifiedDate = parseISO(item.last_verified);
    if (isAfter(verifiedDate, today)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["last_verified"],
        message: "last_verified cannot be in the future",
      });
    }

    const tagSet = new Set();
    for (const tag of item.tags) {
      const normalized = tag.trim().toLowerCase();
      if (tagSet.has(normalized)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tags"],
          message: `duplicate tag '${tag}'`,
        });
      }
      tagSet.add(normalized);
    }

    // Validate subcategory belongs to the declared category
    if (item.subcategory !== undefined) {
      const allowed = SUBCATEGORIES.get(item.category);
      if (!allowed || !allowed.has(item.subcategory)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["subcategory"],
          message: `subcategory '${item.subcategory}' is not valid for category '${item.category}'`,
        });
      }
    }
  });
