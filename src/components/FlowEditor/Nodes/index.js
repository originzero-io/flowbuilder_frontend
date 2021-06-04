import SetVariables from "./SetVariables";
import NotificationNode from "./Notification";
import CombineNode from "./Combine";
import SplitNode from "./Split";
import CalculateNode from "./Calculate";
import ExcelReadNode from "./ExcelRead";
import SerialReadNode from "./SerialRead";
import * as types from "./constant/nodeTypes"
const customNodes = {
  [types.SET_VARIABLES]: SetVariables,
  [types.NOTIFICATION]: NotificationNode,
  [types.SPLIT]: SplitNode,
  [types.COMBINE]: CombineNode,
  [types.CALCULATE]: CalculateNode,
  [types.EXCEL_READ]: ExcelReadNode,
  [types.SERIAL_READ]: SerialReadNode
};

export default customNodes;
