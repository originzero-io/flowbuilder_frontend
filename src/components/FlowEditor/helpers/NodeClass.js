import {
  getOutgoers,
  // getIncomers,
  // getConnectedEdges,
  isEdge,
} from "reactflow";
import notification from "utils/ui/notificationHelper";
import { setElements } from "store/reducers/flow/flowElementsSlice";

export default class Node {
  elements = [];

  nodes = [];

  edges = [];

  constructor(message) {
    console.log(
      `%c ${message}`,
      "background: green; color: white; display: block;",
    );
  }

  applyElements = (elements, dispatch) => {
    // const { nodes, edges } = getNodesAndEdges(elements);
    this.elements = elements;
    this.nodes = [];
    this.edges = [];
    this.dispatch = dispatch;
  };

  doInput = async (data, self, outgoers) => {
    // console.log("inject outgoers", outgoers);
    console.log("Input fonksiyonuna gelen data", data);
    // const res = await axios.get('http://localhost:5000/users/getAll');
    // console.log("res:", res);
    this.sendDataToYourOutgoers(data, self, outgoers);
  };

  doSplit = (data, self, outgoers) => {
    // console.log("split data:", data);
    this.sendDataToYourOutgoers(data, self, outgoers);
  };

  doCombine = (data, self, outgoers) => {
    console.log("Combine fonksiyonuna gelen data:", data);
    const datas = this.solveDataFromMyEdges(self);
    console.log(
      "Combine: Edgelerim içerisinden sadece datanın filtrelenmişi:",
      datas,
    );
    let combined = "";
    datas.map((data) => {
      return (combined += `${data.payload} `);
    });
    // combined = "This is for " + datas[0].payload;
    // console.log("COMBINED:", combined);
    notification.success(`Datas combined ${combined}`);
    // const connected = getConnectedEdges([self], this.edges);
    // BURDA KALINDI
    // console.log("combine connected:", connected);
    this.sendDataToYourOutgoers([{ source1: combined }], self, outgoers);
  };

  doNotification = (data, self, outgoers) => {
    console.log("Notification fonksiyonuna gelen data:", data);
    const datas = this.solveDataFromMyEdges(self);
    console.log(
      "Notification: Edgelerim içerisinden sadece datanın filtrelenmişi: ",
      datas,
    );
    datas.map((data) => {
      console.log(
        `%c source: ${data.source}\n target: ${data.target}\n payload: ${data.payload}`,
        "background: orange; color: black; display: block;",
      );
      notification.success(`${data.target} ${data.payload}`);
    });
  };

  sendDataToYourOutgoers = (data, self, outgoers) => {
    console.log("SEND DATA TO YOUR OUTGOERS");
    console.log("-----------------------------");
    this.combineEdgesWithData(data, self);
    // console.log("BİRLEŞTİRİLMİŞ DATA", this.elements);
    outgoers.map((node) => {
      console.log(`"${node.type}" FONKSİYONU ÇAĞIRILIYOR...`);
      const childOutgoers = getOutgoers(node, this.elements);
      return node.data.onChange(data, node, childOutgoers);
    });
    console.log("-----------------------------");
  };

  solveDataFromMyEdges = (self) => {
    const targets = this.edges.filter((edge) => edge.target === self.id);
    // console.log("edges that target is me", targets);
    return targets.map((target) => target.data);
  };

  combineEdgesWithData = (data, self) => {
    console.log(`${self.type}-->EDGELER İLE BİRLEŞTİRİLECEK DATA-->`, data);
    let indis = 0;
    const newElements = this.elements.map((element, index) => {
      if (isEdge(element)) {
        // benden çıkan edge
        if (element.source === self.id) {
          console.log("BİRLEŞTİRİLMİŞ DATA:", element);
          return {
            ...element,
            data: {
              source: element.sourceHandle,
              target: element.targetHandle,
              payload: data[indis++][element.sourceHandle],
            },
          };
        }
        return element;
      }
      return element;
    });
    this.dispatch(setElements(newElements));
    this.applyElements(newElements, this.dispatch);
  };
}
