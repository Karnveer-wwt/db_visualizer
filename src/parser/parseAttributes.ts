import type { PrismaAttribute } from "./types";

export function parseAttributes(input: string): PrismaAttribute[] {
  const attributes: PrismaAttribute[] = [];
  let i = 0;

  while (i < input.length) {
    if (input[i] !== "@") {
      i++;
      continue;
    }

    const start = i;
    i++;

    // Support @@ model-level attributes.
    if (input[i] === "@") i++;

    const nameStart = i;

    while (/[\w]/.test(input[i] ?? "")) {
      i++;
    }

    const name = input.slice(nameStart, i);

    if (!name) continue;

    let args: string | undefined;

    if (input[i] === "(") {
      const argsStart = ++i;
      let depth = 1;
      let inString = false;
      let escaped = false;

      while (i < input.length && depth > 0) {
        const char = input[i];

        if (inString) {
          if (escaped) escaped = false;
          else if (char === "\\") escaped = true;
          else if (char === '"') inString = false;
        } else {
          if (char === '"') inString = true;
          else if (char === "(") depth++;
          else if (char === ")") depth--;
        }

        i++;
      }

      args = input.slice(argsStart, i - 1);
    }

    attributes.push({
      name,
      args,
      raw: input.slice(start, i),
    });
  }

  return attributes;
}