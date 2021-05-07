import {
  SetVariablesIcon,
  NotificationIcon,
  CombineIcon,
  SplitIcon,
  CalculateIcon,
  ExcelReadIcon,
} from "../../global/SvgIcons";

const icons = {
  "Notification": NotificationIcon,
  "Set Variables": SetVariablesIcon,
  "Calculate": CalculateIcon,
  "Combine": CombineIcon,
  "Split": SplitIcon,
  "Serial Read": SplitIcon,
  "Excel Read": ExcelReadIcon,
};

const getIconComponent = (type) => {
  return icons[type];
};

export default getIconComponent;
