import localforage from "localforage";
import { loadFunctionsToNode } from "../helpers/loadFunctionsToNode";
import {openNotification as notification} from "../../app-global/dom/notification"
localforage.config({
  name: "LocalForage DB",
  storeName: "Anaks-Flow",
});
export const getDataFromDb = async (flowConfig,nodeClass) => {
  return await localforage
    .getItem(flowConfig.id)
    .then((storedFlow) => {
      if (storedFlow) {
        const data = JSON.parse(storedFlow);
        const flowElements = data.flow.elements;
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
          position: data.flow.position,
          zoom: data.flow.zoom
        };
      } else {
        return Promise.reject("No flow");
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
export const saveToDb = async (flowConfig, flowGui) => {
  const { reactFlowInstance } = flowGui;
  const flow = reactFlowInstance.toObject();
  const data = {
    flowConfig,
    flowGui,
    flow
  }
  console.log("DATA:", data);
  const name = `${flowConfig.id}`;
  const value = JSON.stringify(data);
  console.log("name", name);
  console.log("value:", value);
  localStorage.setItem(`${data.flowConfig.id}`,JSON.stringify(data));
  // return await localforage
  //   .setItem("sdadas", value)
  //   .then((res) => {
  //     notification("","Save successful","success");
  //   })
  //   .catch((err) => Promise.reject(err));
};
