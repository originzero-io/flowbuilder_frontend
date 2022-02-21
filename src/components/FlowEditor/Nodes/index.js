import SetVariablesNode from "./SetVariables";
import NotificationNode from "./Notification";
import CombineNode from "./Combine";
import SplitNode from "./Split";
import CalculateNode from "./Calculate";
import ExcelReadNode from "./ExcelRead";
import SerialReadNode from "./SerialRead";
import HttpRequestNode from "./HttpRequest";
import * as types from "./constant/nodeTypes"
import JsonParseNode from "./JsonParse";
const customNodes = {
  [types.SET_VARIABLES]: SetVariablesNode,
  [types.NOTIFICATION]: NotificationNode,
  [types.SPLIT]: SplitNode,
  [types.COMBINE]: CombineNode,
  [types.CALCULATE]: CalculateNode,
  [types.EXCEL_READ]: ExcelReadNode,
  [types.EXCEL_WRITE]: ExcelReadNode,
  [types.SERIAL_READ]: SerialReadNode,
  [types.HTTP_REQUEST]: HttpRequestNode,
  [types.JSON_PARSE]: JsonParseNode,
  [types.CSV_PARSE]: JsonParseNode,
  [types.XML_PARSE]: JsonParseNode,
  [types.JOIN_ARRAY]: JsonParseNode,
  [types.SPLICE_ARRAY]: JsonParseNode,
  [types.SORT_ARRAY]: JsonParseNode,
  [types.MIN_ARRAY]: JsonParseNode,
  [types.MAX_ARRAY]: JsonParseNode,
  [types.TCP_IN]: JsonParseNode,
  [types.TCP_OUT]: JsonParseNode,
  [types.MODBUS_READ]: JsonParseNode,
  [types.MODBUS_WRITE]: JsonParseNode,
  [types.S7_READ]: JsonParseNode,
  [types.S7_WRITE]: JsonParseNode,
  [types.SEND_SMS]: JsonParseNode,
  [types.SEND_MAIL]: JsonParseNode,
  [types.FILE]: JsonParseNode,
};

export default customNodes;
