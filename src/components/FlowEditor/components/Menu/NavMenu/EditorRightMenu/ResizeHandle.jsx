import { PanelResizeHandle } from "react-resizable-panels";

export default function ResizeHandle() {
  return (
    <PanelResizeHandle
      // className={styles.ResizeHandleOuter}
      style={{
        backgroundColor: "#2d2d2d",
        borderLeft: "0.5px solid black",
        borderRight: "0.5px solid black",
        width: "6px",
        opacity: "1",
        // background: "green",
      }}
    >
      {/* <div style={{ display: "flex" }}>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"
          />
        </svg>
      </div> */}
    </PanelResizeHandle>
  );
}
