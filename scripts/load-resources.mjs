import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, 'data', 'resources.yaml');

export function loadResources() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  const doc = yaml.load(raw);

  if (!Array.isArray(doc)) {
    throw new Error('data/resources.yaml must contain a YAML array at the top level.');
  }

  return doc;
}
