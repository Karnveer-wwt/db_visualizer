import { create } from "zustand";
import type { Edge, Node } from "@xyflow/react";

import { parsePrismaSchema } from "../parser/parseSchema";
import { buildNodes } from "../graph/buildNodes";
import { buildEdges } from "../graph/buildEdges";
import { autoLayout } from "../graph/autoLayout";
import type { ParsedPrismaSchema } from "../parser/types";
import type { ModelNodeData } from "../graph/buildNodes";

interface DiagramState {
  schemaText: string;
  parsedSchema: ParsedPrismaSchema | null;

  nodes: Node<ModelNodeData>[];
  edges: Edge[];

  selectedModel: string | null;
  error: string | null;

  setSchemaText: (schema: string) => void;
  generateDiagram: () => void;
  selectModel: (modelName: string | null) => void;
  applyAutoLayout: () => void;
  clear: () => void;
}

export const useDiagramStore = create<DiagramState>((set, get) => ({
  schemaText: "",
  parsedSchema: null,
  nodes: [],
  edges: [],
  selectedModel: null,
  error: null,

  setSchemaText: (schemaText) => set({ schemaText, error: null }),

  generateDiagram: () => {
    const { schemaText } = get();

    try {
      const parsedSchema = parsePrismaSchema(schemaText);
      const initialNodes = buildNodes(parsedSchema.models);
      const initialEdges = buildEdges(parsedSchema.relations);
      const layoutedNodes = autoLayout(
        initialNodes,
        initialEdges,
      ) as Node<ModelNodeData>[];

      set({
        parsedSchema,
        nodes: layoutedNodes,
        edges: initialEdges,
        selectedModel: null,
        error: null,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Unable to parse Prisma schema.",
      });
    }
  },

  selectModel: (modelName) => set({ selectedModel: modelName }),

  applyAutoLayout: () => {
    const { nodes, edges } = get();
    set({ nodes: autoLayout(nodes, edges) as Node<ModelNodeData>[] });
  },

  clear: () =>
    set({
      schemaText: "",
      parsedSchema: null,
      nodes: [],
      edges: [],
      selectedModel: null,
      error: null,
    }),
}));