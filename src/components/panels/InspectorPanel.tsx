import { useDiagramStore } from "../../store/diagramStore";
import { KeyRound, Fingerprint, Link2 } from "lucide-react";

export default function InspectorPanel() {
  const parsedSchema = useDiagramStore((state) => state.parsedSchema);
  const selectedModel = useDiagramStore((state) => state.selectedModel);

  const model = parsedSchema?.models.find(
    (item) => item.name === selectedModel,
  );

  if (!model) {
    return (
      <aside className="inspector-panel">
        <div className="inspector-empty">
          <p>Select a model to inspect its fields.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="inspector-panel">
      <div className="panel-heading">
        <span>Model Inspector</span>
      </div>

      <div className="inspector-content">
        <h3>{model.name}</h3>
        <p className="inspector-subtitle">
          {model.fields.length} fields
        </p>

        <div className="inspector-section-title">FIELDS</div>

        {model.fields.map((field) => (
          <div className="inspector-field" key={field.name}>
            <div className="inspector-field-heading">
              <span>{field.name}</span>
              {field.isId && <KeyRound size={13} aria-label="Primary Key" />}
              {field.isUnique && (
                <Fingerprint size={13} aria-label="Unique" />
              )}
              {field.isRelation && <Link2 size={13} aria-label="Relation" />}
            </div>

            <div className="inspector-field-meta">
              {field.type}
              {field.isList && "[]"}
              {field.isNullable && "?"}
              {field.isForeignKey && " · FK"}
            </div>

            {field.defaultValue && (
              <div className="inspector-default">
                Default: {field.defaultValue}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}