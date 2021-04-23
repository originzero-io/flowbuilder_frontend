import * as types from "../../components/nodes/constant/nodeTypes";
import {
  SetVariablesIcon,
  NotificationIcon,
  CombineIcon,
  SplitIcon,
  CalculateIcon,
  ExcelReadIcon,
} from "../../components/global/SvgIcons";
const panelNodeList = [
  {
    id: 1,
    name: types.SET_VARIABLES,
    icon: <SetVariablesIcon />,
    fav: false,
  },
  {
    id: 2,
    name: types.NOTIFICATION,
    icon: <NotificationIcon />,
    fav: false,
  },
  {
    id: 3,
    name: types.COMBINE,
    icon: <CombineIcon />,
    fav: false,
  },
  {
    id: 4,
    name: types.SPLIT,
    icon: <SplitIcon />,
    fav: false,
  },
  {
    id: 5,
    name: types.CALCULATE,
    icon: <CalculateIcon />,
    fav: false,
  },
  {
    id: 6,
    name: types.EXCEL_READ,
    icon: <ExcelReadIcon />,
    fav: false,
  },
  {
    id: 7,
    name: types.SERIAL_READ,
    icon: <CalculateIcon />,
    fav: false,
  },
];
export const nodeListReducer = (state = panelNodeList, action) => {
  switch (action.type) {
    case "SET_LIST":
      return action.payload;
    default:
      return state;
  }
};
