export interface SchemaValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateSchemaInput(schema: string): SchemaValidationResult {
  const errors: string[] = [];

  if (!schema.trim()) {
    errors.push("Schema cannot be empty.");
  }

  if (!/\bmodel\s+\w+\s*\{/.test(schema)) {
    errors.push("Schema must contain at least one model.");
  }

  const openBraces = (schema.match(/\{/g) ?? []).length;
  const closeBraces = (schema.match(/\}/g) ?? []).length;

  if (openBraces !== closeBraces) {
    errors.push("Unbalanced braces detected.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}