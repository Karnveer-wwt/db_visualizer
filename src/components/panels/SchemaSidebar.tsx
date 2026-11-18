import { Database, Table2, Layers3 } from "lucide-react";
import { useDiagramStore } from "../../store/diagramStore";

export default function SchemaSidebar() {
  const parsedSchema = useDiagramStore((state) => state.parsedSchema);
  const selectedModel = useDiagramStore((state) => state.selectedModel);
  const selectModel = useDiagramStore((state) => state.selectModel);

  if (!parsedSchema) return null;

  return (
    <aside className="schema-sidebar">
      <div className="sidebar-section-heading">
        <Database size={14} />
        <span>Schema</span>
      </div>

      <div className="sidebar-group-title">
        <Table2 size={13} />
        Models ({parsedSchema.models.length})
      </div>

      {parsedSchema.models.map((model) => (
        <button
          key={model.name}
          className={`sidebar-item ${
            selectedModel === model.name ? "active" : ""
          }`}
          onClick={() => selectModel(model.name)}
        >
          <Table2 size={14} />
          <span>{model.name}</span>
          <span className="sidebar-count">{model.fields.length}</span>
        </button>
      ))}

      <div className="sidebar-group-title">
        <Layers3 size={13} />
        Enums ({parsedSchema.enums.length})
      </div>

      {parsedSchema.enums.map((item) => (
        <div className="sidebar-item enum-item" key={item.name}>
          <Layers3 size={14} />
          <span>{item.name}</span>
        </div>
      ))}
    </aside>
  );
}