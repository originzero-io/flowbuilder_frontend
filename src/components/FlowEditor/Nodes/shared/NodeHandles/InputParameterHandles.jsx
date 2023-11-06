import Tooltip from "components/Shared/Tooltip/Tooltip";
import { Handle, Position } from "reactflow";

const InputParameterHandles = ({ nodeId, inputParameters, handleColor }) => {
  const parameters = Object.entries(inputParameters);
  return (
    <>
      {parameters.map((parameter, index) => (
        // <div key={index} style={{ display: "flex" }}>
        //   {/* <div style={{ color: "gray", marginLeft: "2px" }}>{parameter[0]}</div> */}
        //   <Handle
        //     key={parameter[0]}
        //     type="target"
        //     position={Position.Left}
        //     className="node-handle horizontal"
        //     id={`${parameter[1]}_${parameter[0]}`}
        //     style={{ backgroundColor: handleColor[parameter[1]] }}
        //     data-tip={parameter[0]}
        //     data-for={nodeId}
        //   />
        //   <Tooltip id={nodeId} place="left" />
        // </div>
        <Handle
          key={parameter[0]}
          type="target"
          position={Position.Left}
          className="node-handle horizontal"
          id={`${parameter[1]}_${parameter[0]}`}
          style={{ backgroundColor: handleColor[parameter[1]] }}
          data-tip={parameter[0]}
          data-for={nodeId}
        >
          <Tooltip id={nodeId} place="left" />
        </Handle>
      ))}
    </>
  );
};

export default InputParameterHandles;
