import {
  SetVariablesIcon,
  NotificationIcon,
  CombineIcon,
  SplitIcon,
  CalculateIcon,
} from "../../global/SvgIcons";

const icons = {
  "Notification": NotificationIcon,
  "Set Variables": SetVariablesIcon,
  "Calculate": CalculateIcon,
  "Combine": CombineIcon,
  "Split": SplitIcon,
  "Excel Read": SplitIcon,
  "Serial Read": SplitIcon,
};

const setIconInstance = (type) => {
    return icons[type]    
}

export default setIconInstance;
