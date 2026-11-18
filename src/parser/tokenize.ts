import type { PrismaBlock } from "./types";

const BLOCK_TYPES = ["model", "enum", "datasource", "generator"] as const;

function stripComments(input: string): string {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
}

function findBlockEnd(source: string, openBrace: number): number {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = openBrace; i < source.length; i++) {
    const char = source[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }

      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{") depth++;
    if (char === "}") depth--;

    if (depth === 0) return i;
  }

  return -1;
}

export function tokenizePrismaSchema(schema: string): PrismaBlock[] {
  const source = stripComments(schema);
  const blocks: PrismaBlock[] = [];

  const pattern = new RegExp(
    `\\b(${BLOCK_TYPES.join("|")})\\s+(\\w+)\\s*\\{`,
    "g",
  );

  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source)) !== null) {
    const type = match[1] as PrismaBlock["type"];
    const name = match[2];
    const openBrace = pattern.lastIndex - 1;
    const endBrace = findBlockEnd(source, openBrace);

    if (endBrace === -1) {
      throw new Error(`Unclosed block: ${type} ${name}`);
    }

    const body = source.slice(openBrace + 1, endBrace);

    blocks.push({
      type,
      name,
      body,
      attributes: [],
    });

    pattern.lastIndex = endBrace + 1;
  }

  return blocks;
}