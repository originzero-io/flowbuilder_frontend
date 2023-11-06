import { Handle, Position } from "reactflow";

const OutputValueHandles = ({ outputValues, handleColor }) => {
  const values = Object.entries(outputValues);

  const isValid = (connection) => {
    const sourceType = connection.sourceHandle.split("_")[0];
    const targetType = connection.targetHandle.split("_")[0];

    const isSameDataType =
      sourceType === targetType || sourceType === "any" || targetType === "any";

    const isNotStatusHandle = targetType !== "trig" && targetType !== "status";

    return isSameDataType && isNotStatusHandle;
  };
  return (
    <>
      {values.map((value, index) => (
        <div key={index} style={{ display: "flex" }}>
          <Handle
            key={value[0]}
            type="source"
            position={Position.Right}
            id={`${value[1]}_${value[0]}`}
            isValidConnection={isValid}
            className="node-handle horizontal"
            style={{ backgroundColor: handleColor[value[1]] }}
          />
          {/* <div style={{ color: "gray", marginLeft: "2px" }}>{value[0]}</div> */}
        </div>
      ))}
    </>
  );
};

export default OutputValueHandles;
