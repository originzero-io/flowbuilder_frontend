import CalculateNode from "./Calculate.node";
import CombineNode from "./Combine.node";
import ExcelReadNode from "./ExcelRead.node";
import {
  CalculateIcon,
  CombineIcon,
  ExcelReadIcon,
  NotificationIcon,
  TriggerIcon,
  SplitIcon,
} from "./shared/NodeIcons";
import HttpRequestNode from "./HttpRequest.node";
import JsonParseNode from "./JsonParse.node";
import NotificationNode from "./Notification.node";
import SerialReadNode from "./SerialRead.node";
import TriggerNode from "./Trigger.node";
import SplitNode from "./Split.node";
import MqttOutNode from "./MqttOut.node";

const NodeUI = {
  TRIGGER: {
    component: TriggerNode,
    icon: TriggerIcon,
  },
  CONSTANT: {
    component: TriggerNode,
    icon: TriggerIcon,
  },
  COMBINE: {
    component: CombineNode,
    icon: CombineIcon,
  },
  NOTIFICATION: {
    component: NotificationNode,
    icon: NotificationIcon,
  },
  SPLIT: {
    component: SplitNode,
    icon: SplitIcon,
  },
  HTTP_REQUEST: {
    component: SplitNode,
    icon: SplitIcon,
  },
  CALCULATE: {
    component: CalculateNode,
    icon: CalculateIcon,
  },
  MQTT_OUT: {
    component: MqttOutNode,
    icon: SplitIcon,
  },
  DELAY: {
    component: MqttOutNode,
    icon: SplitIcon,
  },
  // EXCEL_READ: {
  //   component: ExcelReadNode,
  //   icon: ExcelReadIcon,
  // },
  // EXCEL_WRITE: {
  //   component: NotificationNode,
  //   icon: NotificationIcon,
  // },
  // SERIAL_READ: {
  //   component: SerialReadNode,
  //   icon: SplitIcon,
  // },
  // HTTP_REQUEST: {
  //   component: HttpRequestNode,
  //   icon: SplitIcon,
  // },
  // JSON_PARSE: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
  // CSV_PARSE: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
  // XML_PARSE: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
  // JOIN_PARSE: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
  // SPLICE_PARSE: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
  // SORT_PARSE: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
  // MIN_ARRAY: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
  // MAX_ARRAY: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
  // TCP_IN: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
  // TCP_OUT: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
  // MODBUS_READ: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
  // MODBUS_WRITE: {
  //   component: NotificationNode,
  //   icon: NotificationIcon,
  // },
  // S7_READ: {
  //   component: TriggerNode,
  //   icon: TriggerIcon,
  // },
  // S7_WRITE: {
  //   component: NotificationNode,
  //   icon: NotificationIcon,
  // },
  // SEND_SMS: {
  //   component: NotificationNode,
  //   icon: NotificationIcon,
  // },
  // SEND_MAIL: {
  //   component: NotificationNode,
  //   icon: NotificationIcon,
  // },
  // FILE: {
  //   component: JsonParseNode,
  //   icon: SplitIcon,
  // },
};

export default NodeUI;
