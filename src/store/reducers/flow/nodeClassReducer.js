import NodeClass from "../../../app-global/works/NodeClass";
const nodeClass = new NodeClass("nodeClass is created by redux store");

const nodeClassReducer = (state = nodeClass, action) => {
  return state;
};

export default nodeClassReducer;