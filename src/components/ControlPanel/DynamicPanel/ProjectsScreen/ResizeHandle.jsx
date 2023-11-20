import { PanelResizeHandle } from "react-resizable-panels";

export default function ResizeHandle() {
  return (
    <PanelResizeHandle
      // className={styles.ResizeHandleOuter}
      style={{
        backgroundColor: "#ffff",
        width: "7px",
        opacity: "1",
        position: "relative",
        // background: "green",
      }}
    >
      <div
        style={{
          background: "#C1C1C1",
          width: "3px",
          height: "40px",
          position: "absolute",
          top: "40%",
          left: "30%",
          borderRadius: "20px",
        }}
      />
    </PanelResizeHandle>
  );
}
