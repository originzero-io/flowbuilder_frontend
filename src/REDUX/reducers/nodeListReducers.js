import * as types from "../../components/nodes/constant/nodeTypes";
import setVariables from "../../assets/icons/Set_Variables.png";
import combineIcon from "../../assets/icons/Combine.png";
import splitIcon from "../../assets/icons/Split.png";
import notificationIcon from "../../assets/icons/Notification.png";
const panelNodeList = [
  {
    id: 1,
    name: types.SET_VARIABLES,
    icon: setVariables,
    fav: false,
  },
  {
    id: 2,
    name: types.NOTIFICATION,
    icon: notificationIcon,
    fav: false,
  },
  {
    id: 3,
    name: types.COMBINE,
    icon: combineIcon,
    fav: false,
  },
  {
    id: 4,
    name: types.SPLIT,
    icon: splitIcon,
    fav: false,
  },
  {
    id: 5,
    name: types.CALCULATE,
    icon: splitIcon,
    fav: false,
  },
  {
    id: 6,
    name: types.EXCEL_READ,
    icon: splitIcon,
    fav: false,
  },
  {
    id: 7,
    name: types.SERIAL_READ,
    icon: splitIcon,
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

