import { tokenizePrismaSchema } from "./tokenize";
import { parseModel } from "./parseModel";
import { analyzeRelations } from "./analyzeRelations";
import type {
  ParsedPrismaSchema,
  PrismaEnum,
} from "./types";

export function parsePrismaSchema(schema: string): ParsedPrismaSchema {
  const blocks = tokenizePrismaSchema(schema);

  const modelBlocks = blocks.filter((block) => block.type === "model");
  const enumBlocks = blocks.filter((block) => block.type === "enum");

  const modelNames = new Set(modelBlocks.map((block) => block.name));
  const enumNames = new Set(enumBlocks.map((block) => block.name));

  const models = modelBlocks.map((block) =>
    parseModel(block, modelNames, enumNames),
  );

  const enums: PrismaEnum[] = enumBlocks.map((block) => ({
    name: block.name,
    values: block.body
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("//"))
      .map((line) => line.split(/\s+/)[0])
      .filter(Boolean),
  }));

  const relations = analyzeRelations(models);

  return {
    models,
    enums,
    relations,
  };
}