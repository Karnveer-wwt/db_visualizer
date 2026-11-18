import { parseAttributes } from "./parseAttributes";
import type { PrismaField } from "./types";

const SCALAR_TYPES = new Set([
  "String",
  "Int",
  "Float",
  "Boolean",
  "DateTime",
  "Json",
  "BigInt",
  "Decimal",
  "Bytes",
]);

export function parseField(
  line: string,
  modelNames: Set<string>,
  enumNames: Set<string>,
): PrismaField | null {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith("//")) return null;

  const match = trimmed.match(/^(\w+)\s+(\w+)(\?|\[\])?\s*(.*)$/);

  if (!match) return null;

  const [, name, baseType, modifier = "", rest] = match;
  const attributes = parseAttributes(rest);

  const isScalar = SCALAR_TYPES.has(baseType);
  const isEnum = enumNames.has(baseType);
  const isRelation = modelNames.has(baseType);

  const getAttribute = (attributeName: string) =>
    attributes.find((attribute) => attribute.name === attributeName);

  return {
    name,
    type: baseType,

    isRequired: modifier !== "?",
    isNullable: modifier === "?",
    isList: modifier === "[]",

    isScalar,
    isEnum,
    isRelation,

    isId: Boolean(getAttribute("id")),
    isUnique: Boolean(getAttribute("unique")),
    isForeignKey: false,
    isUpdatedAt: Boolean(getAttribute("updatedAt")),

    defaultValue: getAttribute("default")?.args,

    attributes,
  };
}