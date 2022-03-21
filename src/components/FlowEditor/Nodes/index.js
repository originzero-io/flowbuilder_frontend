import SetVariablesNode from "./SetVariables.node";
import NotificationNode from "./Notification.node";
import CombineNode from "./Combine.node";
import SplitNode from "./Split.node";
import CalculateNode from "./Calculate.node";
import ExcelReadNode from "./ExcelRead.node";
import SerialReadNode from "./SerialRead.node";
import HttpRequestNode from "./HttpRequest.node";
import * as types from "./constant/nodeTypes"
import JsonParseNode from "./JsonParse.node";
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
