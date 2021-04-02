import * as types from "../../config/NodeTypes";
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
    recent:false
  },
  {
    id: 2,
    name: types.NOTIFICATION,
    icon: notificationIcon,
    fav: false,
    recent:false
  },
  {
    id: 3,
    name: types.COMBINE,
    icon: combineIcon,
    fav: false,
    recent:false
  },
  {
    id: 4,
    name: types.SPLIT,
    icon: splitIcon,
    fav: false,
    recent:false
  },
  {
    id: 5,
    name: "Calculate",
    icon: splitIcon,
    fav: false,
    recent:false
  },
  {
    id: 6,
    name: "Excel Read",
    icon: splitIcon,
    fav: false,
    recent:false
  },
  {
    id: 7,
    name: "Serial Read",
    icon: splitIcon,
    fav: false,
    recent:false
  },
];

//const recentNodeList=[]
export const nodeListReducer = (state = panelNodeList, action) => {
  switch (action.type) {
    case "ADD_FAV":
      return action.payload;
    case "SET_LIST":
      return action.payload;
    default:
      return state;
  }
};
export const recentNodesListReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECENT":
      return [...state,action.payload];
    default:
      return state;
  }
};

