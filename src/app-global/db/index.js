import localforage from "localforage";
import { loadFunctionsToNode } from "../helpers/loadFunctionsToNode";
localforage.config({
  name: "LocalForage DB",
  storeName: "Anaks-Flow",
});
export const getDataFromDb = async (nodeClass) => {
  return await localforage
    .getItem("flow")
    .then((storedFlow) => {
      if (storedFlow) {
        const flow = JSON.parse(storedFlow);
        const flowElements = flow.elements;
        const elements = flowElements.map((els) => {
          return {
            ...els,
            data: {
              ...els.data,
              onChange: loadFunctionsToNode(els.type, nodeClass)
            }
          };
        });
        return {
          elements,
          position: flow.position,
          zoom: flow.zoom
        };
      } else {
        return Promise.reject("No flow");
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
export const saveToDb = async (reactFlowInstance) => {
  console.log("savetodb:",reactFlowInstance)
  if (reactFlowInstance) {
    const flow = reactFlowInstance.toObject();
    console.log("floww:",flow)
    return await localforage
      .setItem("flow", JSON.stringify(flow))
      .then((res) => {
        alert("Save successful");
      })
      .catch((err) => Promise.reject(err));
  } else {
    Promise.reject("No reactflow instance");
  }
};
