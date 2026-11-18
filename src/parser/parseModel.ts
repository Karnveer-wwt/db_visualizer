import { parseAttributes } from "./parseAttributes";
import { parseField } from "./parseField";
import type { PrismaBlock, PrismaModel } from "./types";

export function parseModel(
  block: PrismaBlock,
  modelNames: Set<string>,
  enumNames: Set<string>,
): PrismaModel {
  const fields: PrismaModel["fields"] = [];
  const attributes: PrismaModel["attributes"] = [];

  for (const line of block.body.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed) continue;

    if (trimmed.startsWith("@@")) {
      attributes.push(...parseAttributes(trimmed));
      continue;
    }

    const field = parseField(trimmed, modelNames, enumNames);

    if (field) fields.push(field);
  }

  return {
    name: block.name,
    fields,
    attributes,
  };
}