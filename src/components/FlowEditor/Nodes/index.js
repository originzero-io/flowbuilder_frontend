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

const Nodes = {
  TRIGGER: {
    engine: {
      targetCount: 0,
      sourceCount: 1,
      ioType: "source",
    },
    ui: {
      component: TriggerNode,
      icon: TriggerIcon,
    },
  },
  CONSTANT: {
    engine: {
      targetCount: 0,
      sourceCount: 1,
      ioType: "source",
    },
    ui: {
      component: TriggerNode,
      icon: TriggerIcon,
    },
  },
  COMBINE: {
    engine: {
      targetCount: 1,
      sourceCount: 1,
      ioType: "both",
    },
    ui: {
      component: CombineNode,
      icon: CombineIcon,
    },
  },
  NOTIFICATION: {
    engine: {
      targetCount: 1,
      sourceCount: 0,
      ioType: "target",
    },
    ui: {
      component: NotificationNode,
      icon: NotificationIcon,
    },
  },
  SPLIT: {
    engine: {
      targetCount: 1,
      sourceCount: 1,
      ioType: "both",
    },
    ui: {
      component: SplitNode,
      icon: SplitIcon,
    },
  },
  CALCULATE: {
    engine: {
      targetCount: 1,
      sourceCount: 1,
      ioType: "both",
    },
    ui: {
      component: CalculateNode,
      icon: CalculateIcon,
    },
  },
  // EXCEL_READ: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: ExcelReadNode,
  //     icon: ExcelReadIcon,
  //   },
  // },
  // EXCEL_WRITE: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: NotificationNode,
  //     icon: NotificationIcon,
  //   },
  // },
  // SERIAL_READ: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: SerialReadNode,
  //     icon: SplitIcon,
  //   },
  // },
  // HTTP_REQUEST: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: HttpRequestNode,
  //     icon: SplitIcon,
  //   },
  // },
  // JSON_PARSE: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: JsonParseNode,
  //     icon: SplitIcon,
  //   },
  // },
  // CSV_PARSE: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: JsonParseNode,
  //     icon: SplitIcon,
  //   },
  // },
  // XML_PARSE: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: JsonParseNode,
  //     icon: SplitIcon,
  //   },
  // },
  // JOIN_PARSE: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: JsonParseNode,
  //     icon: SplitIcon,
  //   },
  // },
  // SPLICE_PARSE: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: JsonParseNode,
  //     icon: SplitIcon,
  //   },
  // },
  // SORT_PARSE: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: JsonParseNode,
  //     icon: SplitIcon,
  //   },
  // },
  // MIN_ARRAY: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: JsonParseNode,
  //     icon: SplitIcon,
  //   },
  // },
  // MAX_ARRAY: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 1,
  //     ioType: "both",
  //   },
  //   ui: {
  //     component: JsonParseNode,
  //     icon: SplitIcon,
  //   },
  // },
  // TCP_IN: {
  //   engine: {
  //     targetCount: 0,
  //     sourceCount: 1,
  //     ioType: "source",
  //   },
  //   ui: {
  //     component: TriggerNode,
  //     icon: TriggerIcon,
  //   },
  // },
  // TCP_OUT: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 0,
  //     ioType: "target",
  //   },
  //   ui: {
  //     component: NotificationNode,
  //     icon: NotificationIcon,
  //   },
  // },
  // MODBUS_READ: {
  //   engine: {
  //     targetCount: 0,
  //     sourceCount: 1,
  //     ioType: "source",
  //   },
  //   ui: {
  //     component: TriggerNode,
  //     icon: TriggerIcon,
  //   },
  // },
  // MODBUS_WRITE: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 0,
  //     ioType: "target",
  //   },
  //   ui: {
  //     component: NotificationNode,
  //     icon: NotificationIcon,
  //   },
  // },
  // S7_READ: {
  //   engine: {
  //     targetCount: 0,
  //     sourceCount: 1,
  //     ioType: "source",
  //   },
  //   ui: {
  //     component: TriggerNode,
  //     icon: TriggerIcon,
  //   },
  // },
  // S7_WRITE: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 0,
  //     ioType: "target",
  //   },
  //   ui: {
  //     component: NotificationNode,
  //     icon: NotificationIcon,
  //   },
  // },
  // SEND_SMS: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 0,
  //     ioType: "target",
  //   },
  //   ui: {
  //     component: NotificationNode,
  //     icon: NotificationIcon,
  //   },
  // },
  // SEND_MAIL: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 0,
  //     ioType: "target",
  //   },
  //   ui: {
  //     component: NotificationNode,
  //     icon: NotificationIcon,
  //   },
  // },
  // FILE: {
  //   engine: {
  //     targetCount: 1,
  //     sourceCount: 0,
  //     ioType: "target",
  //   },
  //   ui: {
  //     component: JsonParseNode,
  //     icon: SplitIcon,
  //   },
  // },
};

export default Nodes;
