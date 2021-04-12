import {
  getOutgoers,
  getIncomers,
  getConnectedEdges,
  isEdge
} from "react-flow-renderer";
import { getNodesAndEdges } from "../helpers/elementController";
import { openNotification as notification } from "../dom/notification";
export const doInject = (self, elements) => {
  const outgoers = getOutgoers(self, elements);
  console.log("inject outgoers", outgoers);
  if (outgoers.length > 0) {
    outgoers.map((os) => {
      let childOutgoers = getOutgoers(os, elements);
      let childIncomers = getIncomers(os, elements);
      return os.data.onChange(null, self.type, 5, childOutgoers, elements);
    });
  } else {
    notification("Inject", "No Node");
  }
};

let lastValue;
export const doSplit = (self, callingNode, data, outgoers, elements) => {
  ///INPUT
  let parameter;

  ///CONTENT
  const { edges } = getNodesAndEdges(elements);

  if (self) {
    const connected = getConnectedEdges([self], edges);
    console.log("Connected Edge: ", connected);
  }

  ////OUTPUT
  if (outgoers.length > 0) {
    outgoers.map((os, index) => {
      if (callingNode === "split") {
        parameter = data[index];

        console.log("burdayım");
        console.log(parameter);
      } else {
        parameter = Number(data) + 1;
      }
      let childOutgoers = getOutgoers(os, elements);
      return os.data.onChange(
        null,
        callingNode,
        parameter,
        childOutgoers,
        elements
      );
    });
  } else {
    notification("Split", "No Node");
  }
};

export const doDebug = (self, callingNode, data, outgoers, elements) => {
  //console.log("debug incomers", incomers);
  console.log("Debug", data);
  notification("Debug", data);
};

export const doScript = (data, outgoers, elements, incomers) => {
  console.log("script incomers", incomers);
  console.log("script outgoers", outgoers);
  if (outgoers.length > 0) {
    //console.log("outgoers", outgoers);
    outgoers.map((os) => {
      let childOutgoers = getOutgoers(os, elements);
      let childIncomers = getIncomers(os, elements);
      return os.data.onChange(data, childOutgoers, elements, childIncomers);
    });
  } else {
    notification("Script", "No Node");
  }
};
export const doSwitch = (data, outgoers, elements, incomers) => {
  console.log("switch incomers", incomers);
  console.log("switch outgoers", outgoers);
  if (outgoers.length > 0) {
    //console.log("outgoers", outgoers);
    outgoers.map((os) => {
      let childOutgoers = getOutgoers(os, elements);
      let childIncomers = getIncomers(os, elements);
      return os.data.onChange(data, childOutgoers, elements, childIncomers);
    });
  } else {
    notification("Script", "No Node");
  }
};

export const doSerial = (data, outgoers, elements) => {
  if (outgoers.length > 0) {
    outgoers.map((os) => {
      let childOutgoers = getOutgoers(os, elements);
      let childIncomers = getIncomers(os, elements);
      return os.data.onChange(data + 5, childOutgoers, childIncomers);
    });
  } else {
    notification("Serial", "No Node");
  }
};

export const doLatex = (data, outgoers, elements) => {
  if (outgoers.length > 0) {
    notification(
      "Latex",
      `Hi I am Latex, Your value is ${DataTransfer}.\nI am coming soon with more than that.`
    );
    outgoers.map((os) => {
      let childOutgoers = getOutgoers(os, elements);
      let childIncomers = getIncomers(os, elements);
      return os.data.onChange(data, childOutgoers, elements, childIncomers);
    });
  } else {
    notification("Latex", data);
  }
};
