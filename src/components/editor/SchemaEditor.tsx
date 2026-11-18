import { Code2, Play, Trash2 } from "lucide-react";
import { useDiagramStore } from "../../store/diagramStore";
import SchemaUpload from "./SchemaUpload";

interface Props {
  onUpload: (content: string, filename: string) => void;
}

export default function SchemaEditor({ onUpload }: Props) {
  const schemaText = useDiagramStore((state) => state.schemaText);
  const setSchemaText = useDiagramStore((state) => state.setSchemaText);
  const generateDiagram = useDiagramStore(
    (state) => state.generateDiagram,
  );
  const clear = useDiagramStore((state) => state.clear);
  const error = useDiagramStore((state) => state.error);

  return (
    <aside className="editor-panel">
      <div className="panel-heading">
        <div className="panel-title">
          <Code2 size={16} />
          <span>Schema Editor</span>
        </div>

        <button className="icon-button" title="Clear" onClick={clear}>
          <Trash2 size={15} />
        </button>
      </div>

      <div className="editor-container">
        <textarea
          value={schemaText}
          onChange={(event) => setSchemaText(event.target.value)}
          spellCheck={false}
          placeholder="Paste your Prisma schema here..."
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="editor-footer">
        <span>{schemaText.split("\n").length} lines</span>
        <SchemaUpload onUpload={onUpload} />
        <button className="generate-button" onClick={generateDiagram}>
          <Play size={14} />
          Generate
        </button>
      </div>
    </aside>
  );
}