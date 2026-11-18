export type PrismaScalarType =
  | "String"
  | "Int"
  | "Float"
  | "Boolean"
  | "DateTime"
  | "Json"
  | "BigInt"
  | "Decimal"
  | "Bytes";

export interface PrismaAttribute {
  name: string;
  args?: string;
  raw: string;
}

export interface PrismaField {
  name: string;
  type: string;
  isRequired: boolean;
  isNullable: boolean;
  isList: boolean;
  isScalar: boolean;
  isEnum: boolean;
  isRelation: boolean;

  isId: boolean;
  isUnique: boolean;
  isForeignKey: boolean;
  isUpdatedAt: boolean;

  defaultValue?: string;
  attributes: PrismaAttribute[];
}

export interface PrismaModel {
  name: string;
  fields: PrismaField[];
  attributes: PrismaAttribute[];
}

export interface PrismaEnum {
  name: string;
  values: string[];
}

export interface PrismaRelation {
  id: string;
  name?: string;
  source: string;
  target: string;
  sourceField?: string[];
  targetField?: string[];
  cardinality: "one-to-one" | "one-to-many" | "many-to-many";
}

export interface ParsedPrismaSchema {
  models: PrismaModel[];
  enums: PrismaEnum[];
  relations: PrismaRelation[];
}

export interface PrismaBlock {
  type: "model" | "enum" | "datasource" | "generator";
  name: string;
  body: string;
  attributes: string[];
}