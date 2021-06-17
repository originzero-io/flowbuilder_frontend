import * as actions from "../constants/elementsContants";
import undoable,{excludeAction,includeAction} from "redux-undo"
import { isEdge, isNode } from "react-flow-renderer";
const elementReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.SET_ELEMENTS:
      return payload;
    case actions.IMPORT_ELEMENTS:
      return [...state, ...payload];
    case actions.ADD_NEW_NODE:
      return [...state, payload];   
    case actions.PASTE_NODES:
      return [...state, ...payload];   
    case actions.SET_ROTATE_ALL:
      return state.map((state) => {
        if (isNode(state)) {
          return {
            ...state,
            data: {
              ...state.data,
              align: payload,
            },
          };
        }
        else return state;
      });
    case actions.SET_EXPAND_ALL:
      return state.map((state) => {
        if (isNode(state)) {
          return {
            ...state,
            data: {
              ...state.data,
              expand: payload,
            },
          };
        }
        else return state;
      });
    case actions.ROTATE_NODE:
      return state.map((state) => {
        if (state.id === payload.self.id) {
          return {
            ...state,
            data: {
              ...state.data,
              align: payload.path,
            },
          };
        }
        return state;
      });
    case actions.ROTATE_MULTI_NODE:
      return state.map((state) => {
        if (payload.selectedIDArray.includes(state.id)) {
          return {
            ...state,
            data: {
              ...state.data,
              align: payload.path,
            },
          };
        }
        return state;
      });
    case actions.EXPAND_NODE:
      return state.map((state) => {
        if (state.id === payload.self.id) {
          return {
            ...state,
            data: {
              ...state.data,
              expand: !payload.self.data.expand,
            },
          };
        }
        return state;
      });
    case actions.CHANGE_NODE_NAME:
      return state.map((state) => {
        if (state.id === payload.self.id) {
          return {
            ...state,
            data: {
              ...state.data,
              label: payload.editedName,
            },
          };
        }
        return state;
      });
    case actions.SET_NODE_ENABLE:
      return state.map((state) => {
        if (state.id === payload.self.id) {
          return {
            ...state,
            data: {
              ...state.data,
              enable: payload.checked,
            },
          };
        }
        return state;
      });
    case actions.CHANGE_EDGE_TYPE:
      return state.map((state) => {
        if (isEdge(state)) {
          return {
            ...state,
            type:payload
          };
        }
        return state;
      });  
    case actions.SET_NODE_ENABLE_MULTIPLE:
      return state.map((state) => {
        if (payload.selectedIDArray.includes(state.id)) {
          return {
            ...state,
            data: {
              ...state.data,
              enable: !state.data.enable,
            },
          };
        }
        return state;
      });
    case actions.SET_OUTGOERS_ENABLE:
      return state.map((state) => {
        if (payload.outgouersIdArray.includes(state.id)) {
          return {
            ...state,
            data: {
              ...state.data,
              enable: payload.enable,
            },
          };
        }
        return state;
      });
    case actions.SET_ALL_NODES_DESELECT:
      return state.map((state) => {
        if (isEdge(state)) {
          return {
            ...state,
            animated: false,
          };
        }
        else if (isNode(state)) {
          return {
            ...state,
            data: {
              ...state.data,
              selected: false,
            },
          };
        }
      });
    case actions.SET_GROUP_SINGLE:
      return state.map((state) => {
        if (isNode(state)) {
          if (state.id === payload.self.id) {
            return {
              ...state,
              data: {
                ...state.data,
                group:payload.group,
              },
            };
          }
          return state;
        }
        else if (isEdge(state)) {
          if (state.source === payload.self.id) {
            return {
              ...state,
              group: payload.group,
              style: {
                ...state.style,
                stroke: payload.group.color,
              },
            };
          }
          return state;
        }
      });
    case actions.SET_GROUP_MULTIPLE:
      return state.map((state) => {
        if (isNode(state)) {
          if (payload.selectedIDArray.includes(state.id)) {
            return {
              ...state,
              data: {
                ...state.data,
                group:payload.group,
              },
            };
          }
          return state;
        }
        else if (isEdge(state)) {
          if (payload.selectedIDArray.includes(state.source)) {
            return {
              ...state,
              group: payload.group,
              style: {
                ...state.style,
                stroke: payload.group.color,
              },
            };
          }
          return state;
        }
      });
    case actions.SELECT_NODES:
      return state.map((els) => {
        if (payload.includes(els.id)) {
          if (isEdge(els)) {
            return {
              ...els,
              animated: true,
            };
          } else if(isNode(els)) {
            return {
              ...els,
              data: {
                ...els.data,
                selected: true
              },
            };
          }
        }
        else {
          if (isEdge(els)) {
            if (payload.includes(els.source) || payload.includes(els.target)) {
              return {
                ...els,
                animated:true
              }
            }
            else {
              return {
                ...els,
                animated: false,
              };
            }
          } else if(isNode(els)) {
            return {
              ...els,
              data: {
                ...els.data,
                selected: false,
              },
            };
          }
        }
      }); 
    case actions.DELETE_GROUP_OF_ELEMENT:
      return state.map((els) => {
        if (isNode(els)) {
          if (els.data.group.id === payload) {
            return {
              ...els,
              data: {
                ...els.data,
                group: {},
              },
            };
          }
          else return els;
        }
        else if (isEdge(els)) {
          if (els.group.id === payload) {
            return {
              ...els,
              group:{},
              style: {
                ...els.style,
                stroke: ''
              }
            }
          }
          else return els;
        }
      });
    case actions.UPDATE_GROUP_OF_ELEMENT:
      return state.map((els) => {
        if (isNode(els)) {
          if (els.data.group.id === payload.id) {
            return {
              ...els,
              data: {
                ...els.data,
                group: { ...els.data.group, name: payload.name, color: payload.color },
              },
            };
          }
          else return els;
        }
        else if (isEdge(els)) {
          if (els.group.id && els.group.id === payload.id) {
            return {
              ...els,
              group: { ...els.group, name: payload.name, color: payload.color },
              style: {
                ...els.style,
                stroke: payload.color
              }
            }
          }
          else return els;
        }
      });
    case actions.UPDATE_NODE_HANDLES:
      return state.map((els) => {
        if (els.id === payload.self.id) {
          return {
            ...els,
            data: {
              ...els.data,
              [payload.name]: payload.value,
            },
          };
        } else {
          return els;
        }
      });
    default:
      return state;
  }
};

const undoableElements = undoable(elementReducer, {
  limit: 10,
  filter: includeAction([
    actions.SET_ELEMENTS,
    actions.ADD_NEW_NODE,
    actions.SET_EXPAND_ALL,
    actions.SET_OUTGOERS_ENABLE,
    actions.SET_NODE_ENABLE,
    actions.SET_NODE_ENABLE_MULTIPLE,
    actions.SET_ROTATE_ALL,
    actions.CHANGE_EDGE_TYPE,
    actions.CHANGE_NODE_NAME,
    actions.EXPAND_NODE,
    actions.ROTATE_NODE,
    actions.ROTATE_MULTI_NODE,
    actions.IMPORT_ELEMENTS,
    actions.PASTE_NODES,
    actions.SET_GROUP_SINGLE,
    actions.SET_GROUP_MULTIPLE,
    actions.UPDATE_NODE_HANDLES
  ])
  // filter: excludeAction([
  //   actions.SELECT_NODES,
  //   actions.SET_ALL_NODES_DESELECT,
  //   flowActions.SET_CLICKED_ELEMENT,
  //   flowActions.SET_CLOSE_ALL_GROUPS,
  // ])
});

export default undoableElements;