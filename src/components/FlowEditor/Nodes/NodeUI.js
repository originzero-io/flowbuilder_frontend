import {
  CalculateIcon,
  CombineIcon,
  NotificationIcon,
  SplitIcon,
  TriggerIcon,
} from "./shared/NodeIcons";

const NodeUI = {
  TRIGGER: {
    icon: TriggerIcon,
    category: "Common",
  },
  CONSTANT: {
    icon: TriggerIcon,
    category: "Common",
  },
  COMBINE: {
    icon: CombineIcon,
    category: "Functional",
  },
  NOTIFICATION: {
    icon: NotificationIcon,
    category: "Common",
  },
  SPLIT: {
    icon: SplitIcon,
    category: "Functional",
  },
  HTTP_REQUEST: {
    icon: SplitIcon,
    category: "Network",
  },
  CALCULATE: {
    icon: CalculateIcon,
    category: "Functional",
  },
  VELOCITY_MODE: {
    icon: SplitIcon,
    category: "Device",
  },

  POSITION_MODE: {
    icon: SplitIcon,
    category: "Device",
  },
  MOTORSPEED: {
    icon: SplitIcon,
    category: "Device",
  },
  PID: {
    icon: CalculateIcon,
    category: "Functional",
  },
  DELAY: {
    icon: SplitIcon,
    category: "Intervals & Timers",
  },
  // EXCEL_READ: {
  //
  //   icon: ExcelReadIcon,
  // },
  // EXCEL_WRITE: {
  //
  //   icon: NotificationIcon,
  // },
  // SERIAL_READ: {
  //
  //   icon: SplitIcon,
  // },
  // HTTP_REQUEST: {
  //
  //   icon: SplitIcon,
  // },
  // JSON_PARSE: {
  //   ,
  //   icon: SplitIcon,
  // },
  // CSV_PARSE: {
  //   ,
  //   icon: SplitIcon,
  // },
  // XML_PARSE: {
  //   ,
  //   icon: SplitIcon,
  // },
  // JOIN_PARSE: {
  //   ,
  //   icon: SplitIcon,
  // },
  // SPLICE_PARSE: {
  //   ,
  //   icon: SplitIcon,
  // },
  // SORT_PARSE: {
  //   ,
  //   icon: SplitIcon,
  // },
  // MIN_ARRAY: {
  //   ,
  //   icon: SplitIcon,
  // },
  // MAX_ARRAY: {
  //   ,
  //   icon: SplitIcon,
  // },
  // TCP_IN: {
  //   ,
  //   icon: SplitIcon,
  // },
  // TCP_OUT: {
  //   ,
  //   icon: SplitIcon,
  // },
  // MODBUS_READ: {
  //   ,
  //   icon: SplitIcon,
  // },
  // MODBUS_WRITE: {
  //
  //   icon: NotificationIcon,
  // },
  // S7_READ: {
  //   ,
  //   icon: TriggerIcon,
  // },
  // S7_WRITE: {
  //
  //   icon: NotificationIcon,
  // },
  // SEND_SMS: {
  //
  //   icon: NotificationIcon,
  // },
  // SEND_MAIL: {
  //
  //   icon: NotificationIcon,
  // },
  // FILE: {
  //   ,
  //   icon: SplitIcon,
  // },
};

export default NodeUI;
