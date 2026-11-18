# Prisma Visualizer

A visual database schema tool that transforms Prisma schema files into interactive database diagrams. Visualize models, fields, enums, and relationships through a clean, interactive interface.

## Overview

**Prisma Visualizer** allows developers to paste or upload a Prisma schema and automatically generate a visual representation of their database structure.

Instead of manually reading a large `.prisma` file, developers can explore their database through an interactive diagram with connected models and relationships.

## Features

- **Schema Input** — Paste Prisma schema directly into the editor.
- **File Upload** — Upload `.prisma` schema files.
- **Schema Parsing** — Parse models, enums, fields, and attributes.
- **Relationship Detection** — Automatically identify relationships between models.
- **Interactive Diagram** — Visualize database models and connections.
- **Auto Layout** — Automatically organize nodes for better readability.
- **Drag & Drop** — Move models around the canvas.
- **Zoom & Pan** — Navigate large database diagrams.
- **Model Sidebar** — Browse available models and enums.
- **Inspector Panel** — View detailed information about selected models and fields.
- **MiniMap** — Navigate the overall diagram.
- **Schema Validation** — Detect basic schema errors before generating the diagram.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | UI development |
| TypeScript | Type safety |
| Vite | Development server and build tool |
| React Flow | Interactive graph visualization |
| Zustand | State management |
| Dagre | Automatic graph layout |
| Tailwind CSS | Utility-first styling |
| CSS | Custom component styling |
| Lucide React | Icons |

## Project Architecture

```text
src/
├── app/
│   ├── App.tsx
│   └── routes/
│       └── Workspace.tsx
├── components/
│   ├── editor/
│   │   ├── SchemaEditor.tsx
│   │   └── SchemaUpload.tsx
│   ├── diagram/
│   │   ├── DiagramCanvas.tsx
│   │   ├── ModelNode.tsx
│   │   ├── RelationEdge.tsx
│   │   ├── DiagramToolbar.tsx
│   │   └── MiniMap.tsx
│   └── panels/
│       ├── InspectorPanel.tsx
│       └── SchemaSidebar.tsx
├── parser/
│   ├── tokenize.ts
│   ├── parseSchema.ts
│   ├── parseModel.ts
│   ├── parseField.ts
│   ├── parseAttributes.ts
│   ├── analyzeRelations.ts
│   └── types.ts
├── graph/
│   ├── buildNodes.ts
│   ├── buildEdges.ts
│   └── autoLayout.ts
├── store/
│   └── diagramStore.ts
├── utils/
│   └── schemaValidation.ts
├── main.tsx
└── index.css
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/prisma-visualizer.git
```

Navigate to the project directory:

```bash
cd prisma-visualizer
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Usage

1. Launch the application.
2. Paste your Prisma schema into the schema editor or upload a `.prisma` file.
3. Click **Generate Diagram**.
4. Explore the generated database diagram.
5. Select a model to view its details.
6. Drag nodes to reorganize the diagram.
7. Use the toolbar to zoom, fit, or rearrange the graph.

## Supported Prisma Schema Elements

### Models

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
}
```

### Enums

```prisma
enum Role {
  USER
  ADMIN
}
```

### Relationships

The visualizer aims to support common Prisma relationships:

- One-to-one
- One-to-many
- Many-to-many

### Field Attributes

Common Prisma field attributes include:

- `@id`
- `@unique`
- `@default()`
- `@relation()`
- `@updatedAt`
- `@@index`
- `@@unique`
- `@@map`

## Development Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run linting, if configured |

## Roadmap

### Phase 1 — MVP

- [x] Schema editor
- [x] Prisma schema file upload
- [x] Basic schema parsing
- [x] Model and enum extraction
- [x] Relationship analysis
- [x] React Flow visualization
- [x] Custom model nodes
- [x] Auto layout
- [x] Sidebar navigation
- [x] Inspector panel
- [x] Zoom and pan
- [x] MiniMap

### Phase 2 — Enhanced Visualization

- [ ] Improved relationship detection
- [ ] Better support for complex Prisma attributes
- [ ] Improved layout for large schemas
- [ ] Search models and fields
- [ ] Relationship highlighting
- [ ] Dark/light theme support
- [ ] Node customization

### Phase 3 — Advanced Features

- [ ] Export diagrams as PNG/SVG
- [ ] Export schema visualization as PDF
- [ ] Save and restore diagram layouts
- [ ] Schema comparison
- [ ] Database statistics
- [ ] Interactive relationship editing
- [ ] Multiple diagram layouts

## Contributing

Contributions, suggestions, bug reports, and feature requests are welcome.

If you want to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Commit your changes.
5. Submit a pull request.

## License

This project is currently under development. A license will be added when the project is ready for public release.

---

**Built for developers who prefer understanding databases visually rather than reading endless schema files.**