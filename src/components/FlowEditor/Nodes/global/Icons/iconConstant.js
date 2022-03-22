import {
  SetVariablesIcon,
  NotificationIcon,
  CombineIcon,
  SplitIcon,
  CalculateIcon,
  ExcelReadIcon,
} from "./index";

const icons = {
  "Notification": NotificationIcon,
  "Set Variables": SetVariablesIcon,
  "Calculate": CalculateIcon,
  "Combine": CombineIcon,
  "Split": SplitIcon,
  "Serial Read": SplitIcon,
  "Excel Read": ExcelReadIcon,
  "Excel Write": ExcelReadIcon,
  "Http Request": SplitIcon,
  "JSON Parse": SplitIcon,
  "CSV Parse": SplitIcon,
  "XML Parse": SplitIcon,
  "Join": SplitIcon,
  "Splice": SplitIcon,
  "Sort": SplitIcon,
  "Min Element": SplitIcon,
  "Max Element": SplitIcon,
  "TCP In": SplitIcon,
  "TCP Out": SplitIcon,
  "Modbus Read": SplitIcon,
  "Modbus Write": SplitIcon,
  "S7 Read": SplitIcon,
  "S7 Write": SplitIcon,
  "Send SMS": CombineIcon,
  "Send Mail": CombineIcon,
  "File": CombineIcon,
};

const getIconComponent = (type) => {
  return icons[type];
};

export default getIconComponent;
