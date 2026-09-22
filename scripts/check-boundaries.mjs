#!/usr/bin/env node
/**
 * Enforces hard layer import boundaries (core / shadcn) from AGENTS.md.
 * Feature → feature is allowed (lax). Zero deps — `npm run lint:boundaries`.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");

const IMPORT_RE =
  /(?:from\s+|import\s*\()\s*['"](@(?:app|assets|core|features|shadcn)\/[^'"]+)['"]/g;

/**
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function walkTsFiles(dir) {
  /** @type {string[]} */
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkTsFiles(full)));
      continue;
    }
    if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

/**
 * @param {string} filePath
 */
function layerOf(filePath) {
  const top = path.relative(SRC, filePath).split(path.sep)[0];
  if (["app", "assets", "core", "features", "shadcn"].includes(top)) {
    return top;
  }
  return "other";
}

/**
 * @param {string} filePath
 * @param {string} source
 * @returns {string[]}
 */
function checkFile(filePath, source) {
  /** @type {string[]} */
  const errors = [];
  const layer = layerOf(filePath);
  const rel = path.relative(ROOT, filePath);

  for (const match of source.matchAll(IMPORT_RE)) {
    const specifier = match[1];

    if (layer === "core") {
      if (specifier.startsWith("@features/") || specifier.startsWith("@app/")) {
        errors.push(`${rel}: core must not import ${specifier}`);
      }
      continue;
    }

    if (layer === "shadcn") {
      if (
        specifier.startsWith("@features/") ||
        specifier.startsWith("@app/") ||
        specifier.startsWith("@core/")
      ) {
        errors.push(`${rel}: shadcn must not import ${specifier}`);
      }
    }
  }

  return errors;
}

async function main() {
  const files = await walkTsFiles(SRC);
  /** @type {string[]} */
  const allErrors = [];

  for (const file of files) {
    const source = await readFile(file, "utf8");
    allErrors.push(...checkFile(file, source));
  }

  if (allErrors.length > 0) {
    console.error("Boundary check failed:\n");
    for (const error of allErrors) console.error(`  • ${error}`);
    console.error(
      `\n${allErrors.length} violation(s). See AGENTS.md → Dependency boundaries.`,
    );
    process.exit(1);
  }

  console.log(
    `Boundary check passed (${files.length} files; hard rules: core + shadcn only).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
