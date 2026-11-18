import { useDiagramStore } from "../../store/diagramStore";
import SchemaEditor from "../../components/editor/SchemaEditor";
import DiagramCanvas from "../../components/diagram/DiagramCanvas";
import SchemaSidebar from "../../components/panels/SchemaSidebar";
import InspectorPanel from "../../components/panels/InspectorPanel";
import { Database } from "lucide-react";

export default function Workspace() {
  const parsedSchema = useDiagramStore((state) => state.parsedSchema);
  const setSchemaText = useDiagramStore((state) => state.setSchemaText);

  const handleUpload = (content: string) => {
    setSchemaText(content);
  };

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <Database size={19} />
          </div>
          <span>Prisma<span className="brand-accent">Viz</span></span>
        </div>

        <div className="topbar-right">
          <span className="workspace-status">
            {parsedSchema ? "Diagram generated" : "Ready"}
          </span>
        </div>
      </header>

      <div className="workspace">
        <SchemaEditor onUpload={handleUpload} />

        <div className="diagram-area">
          <SchemaSidebar />

          <section className="diagram-panel">
            <DiagramCanvas />
          </section>

          <InspectorPanel />
        </div>
      </div>
    </main>
  );
}