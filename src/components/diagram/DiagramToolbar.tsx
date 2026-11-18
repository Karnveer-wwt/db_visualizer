import { LayoutGrid, Maximize, ZoomIn, ZoomOut } from "lucide-react";

interface Props {
  onAutoLayout: () => void;
  onFitView: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function DiagramToolbar({
  onAutoLayout,
  onFitView,
  onZoomIn,
  onZoomOut,
}: Props) {
  return (
    <div className="diagram-toolbar">
      <button onClick={onAutoLayout} title="Auto layout">
        <LayoutGrid size={15} />
        <span>Layout</span>
      </button>

      <div className="toolbar-divider" />

      <button onClick={onZoomOut} title="Zoom out">
        <ZoomOut size={15} />
      </button>

      <button onClick={onZoomIn} title="Zoom in">
        <ZoomIn size={15} />
      </button>

      <button onClick={onFitView} title="Fit view">
        <Maximize size={15} />
      </button>
    </div>
  );
}