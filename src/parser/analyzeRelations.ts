import type {
  PrismaModel,
  PrismaRelation,
} from "./types";

interface RelationArgs {
  relationName?: string;
  sourceField?: string[];
  targetField?: string[];
}

function parseRelationArgs(args?: string): RelationArgs {
  if (!args) return {};

  const relationName = args.match(/^["']([^"']+)["']/)?.[1];

  const fields = args.match(/fields:\s*\[([^\]]+)\]/)?.[1];
  const references = args.match(/references:\s*\[([^\]]+)\]/)?.[1];

  return {
    relationName,
    sourceField: fields
      ?.split(",")
      .map((field) => field.trim()),
    targetField: references
      ?.split(",")
      .map((field) => field.trim()),
  };
}

export function analyzeRelations(
  models: PrismaModel[],
): PrismaRelation[] {
  const relations: PrismaRelation[] = [];
  const seen = new Set<string>();

  const modelMap = new Map(models.map((model) => [model.name, model]));

  for (const model of models) {
    for (const field of model.fields) {
      if (!field.isRelation) continue;

      const relationAttribute = field.attributes.find(
        (attribute) => attribute.name === "relation",
      );

      const details = parseRelationArgs(relationAttribute?.args);
      const targetModel = modelMap.get(field.type);

      if (!targetModel) continue;

      const reverseField = targetModel.fields.find(
        (targetField) =>
          targetField.isRelation &&
          targetField.type === model.name &&
          (details.relationName
            ? targetField.attributes.some(
                (attribute) =>
                  attribute.name === "relation" &&
                  attribute.args?.includes(details.relationName!),
              )
            : true),
      );

      const id = [
        model.name,
        field.type,
        details.relationName ?? "",
      ].join("::");

      if (seen.has(id)) continue;

      seen.add(id);

      const foreignKeyFields: string[] = details.sourceField ?? [];

      foreignKeyFields.forEach((fieldName) => {
        const foreignKey = model.fields.find(
          (modelField) => modelField.name === fieldName,
        );

        if (foreignKey) foreignKey.isForeignKey = true;
      });

      let cardinality: PrismaRelation["cardinality"];

      if (field.isList && reverseField?.isList) {
        cardinality = "many-to-many";
      } else if (field.isList || reverseField?.isList) {
        cardinality = "one-to-many";
      } else {
        const uniqueFK: boolean = foreignKeyFields.some((fieldName: string) =>
          model.fields.find((f) => f.name === fieldName)?.isUnique,
        );

        cardinality = uniqueFK ? "one-to-one" : "one-to-many";
      }

      relations.push({
        id,
        name: details.relationName,
        source: model.name,
        target: field.type,
        sourceField: details.sourceField,
        targetField: details.targetField,
        cardinality,
      });
    }
  }

  return relations;
}