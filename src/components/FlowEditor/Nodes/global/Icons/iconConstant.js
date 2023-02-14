import {
  SetVariablesIcon,
  NotificationIcon,
  CombineIcon,
  SplitIcon,
  CalculateIcon,
  ExcelReadIcon,
} from "./index";

const icons = {
  Notification: NotificationIcon,
  Trigger: SetVariablesIcon,
  Constant: SetVariablesIcon,
  Calculate: CalculateIcon,
  Combine: CombineIcon,
  Split: SplitIcon,
  Serial_Read: SplitIcon,
  Excel_Read: ExcelReadIcon,
  Excel_Write: ExcelReadIcon,
  Http_Request: SplitIcon,
  JSON_Parse: SplitIcon,
  CSV_Parse: SplitIcon,
  XML_Parse: SplitIcon,
  Join: SplitIcon,
  Splice: SplitIcon,
  Sort: SplitIcon,
  Min_Element: SplitIcon,
  Max_Element: SplitIcon,
  TCP_In: SplitIcon,
  TCP_Out: SplitIcon,
  Modbus_Read: SplitIcon,
  Modbus_Write: SplitIcon,
  S7_Read: SplitIcon,
  S7_Write: SplitIcon,
  Send_SMS: CombineIcon,
  Send_Mail: CombineIcon,
  File: CombineIcon,
};

const getIconComponent = (type) => icons[type];

export default getIconComponent;
