const initialState = {
  CAN_DO_EVERYTHING:false,
  device: {
    CAN_CREATE_CONTROLLER: true,
    CAN_CREATE_PROCESSOR: false,

    CAN_USAGE_CONTROLLER_ALL:false,
    CAN_USAGE_CONTROLLER: [],

    CAN_USAGE_PROCESSOR_ALL:false,
    CAN_USAGE_PROCESSOR: [],

    CAN_EDIT_CONTROLLER_ALL:false,
    CAN_EDIT_CONTROLLER: [],

    CAN_EDIT_PROCESSOR_ALL:false,
    CAN_EDIT_PROCESSOR: [],

    CAN_DELETE_CONTROLLER: false,
    CAN_DELETE_PROCESSOR: false,
  },
  project: {
    CAN_CREATE_PROJECT: false,
    CAN_CREATE_DASHBOARD_ALL:false,
    CAN_CREATE_DASHBOARD: [
      /*project_id*/
    ],
    CAN_CREATE_FLOW_ALL:false,
    CAN_CREATE_FLOW: [
      /*project_id*/
    ],
    CAN_USAGE_PROJECT_ALL:false,
    CAN_USAGE_PROJECT: [
      /*project_id*/
    ],
    CAN_USAGE_FLOW_ALL:[/*project_id*/],
    CAN_USAGE_FLOW: [
      /*flow_id*/
    ],
    CAN_USAGE_DASHBOARD_ALL:[/*project_id*/],
    CAN_USAGE_DASHBOARD: [
      /*dashboard_id*/
    ],
    CAN_EDIT_PROJECT_ALL:false,
    CAN_EDIT_PROJECT: [
      /*project_id*/
    ],
    CAN_EDIT_FLOW_ALL:[/*project_id*/],
    CAN_EDIT_FLOW: [
      /*flow_id*/
    ],
    CAN_EDIT_DASHBOARD_ALL:[/*project_id*/],
    CAN_EDIT_DASHBOARD: [
      /*dashboard_id*/
    ],
    CAN_EDIT_NODE: [
      /*node_id*/
    ],
    CAN_DELETE_PROJECT_ALL:false,
    CAN_DELETE_PROJECT: [
      /*project_id*/
    ],
    CAN_DELETE_FLOW_ALL:[/*project_id*/],
    CAN_DELETE_FLOW: [
      /*flow_id*/
    ],
    CAN_DELETE_DASHBOARD_ALL:[/*project_id*/],
    CAN_DELETE_DASHBOARD: [
      /*dashboard_id*/
    ],
    CAN_VIEW_PROJECT_ALL:false,
    CAN_VIEW_PROJECT: [
      /*project_id*/
    ],
    CAN_VIEW_FLOW_ALL:[/*project_id*/],
    CAN_VIEW_FLOW: [
      /*flow_id*/
    ],
    CAN_VIEW_DASHBOARD_ALL:[/*project_id*/],
    CAN_VIEW_DASHBOARD: [
      /*dashboard_id*/
    ],
  },
  team: {
    CAN_INVITE_MEMBER: false,
    CAN_REMOVE_MEMBER: false,
    CAN_ASSIGN_PERMISSION: false,
  },
};
const userPermissionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_PERMISSIONS":
      return payload;
    case "SET_CAN_DO_EVERYTHING":
      return { ...state, CAN_DO_EVERYTHING: payload };
    case "SET_SINGLE_PERMISSION":
      return {
        ...state,
        [payload.permissionType]: {
          ...state[payload.permissionType],
          [payload.name]: payload.checked,
        },
      };
    case "SET_MULTIPLE_PERMISSION":
      if (payload.checked) {
        if ((payload.name === "CAN_EDIT_PROJECT" || payload.name === "CAN_USAGE_PROJECT" || payload.name === "CAN_DELETE_PROJECT") && !state.project.CAN_VIEW_PROJECT.includes(payload.id)) {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: [...state[payload.permissionType][payload.name], payload.id],
              CAN_VIEW_PROJECT: [...state[payload.permissionType].CAN_VIEW_PROJECT, payload.id]
            },
          };
        }
        else if ((payload.name === "CAN_EDIT_FLOW" || payload.name === "CAN_USAGE_FLOW" || payload.name === "CAN_DELETE_FLOW") && !state.project.CAN_VIEW_FLOW.includes(payload.id)) {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: [...state[payload.permissionType][payload.name], payload.id],
              CAN_VIEW_FLOW: [...state[payload.permissionType].CAN_VIEW_FLOW, payload.id]
            },
          };
        }
        else {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: [...state[payload.permissionType][payload.name], payload.id],
            },
          };
        }
      }
      else {
        if (payload.name === "CAN_USAGE_PROJECT") {
          if (!state.project.CAN_EDIT_PROJECT.includes(payload.id) && !state.project.CAN_DELETE_PROJECT.includes(payload.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                CAN_VIEW_PROJECT: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: false
              }
            }
          }
          else {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: false
              }
            }
          }
        }
        else if (payload.name === "CAN_EDIT_PROJECT") {
          if (!state.project.CAN_USAGE_PROJECT.includes(payload.id) && !state.project.CAN_DELETE_PROJECT.includes(payload.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                CAN_VIEW_PROJECT: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: false
              }
            }
          }
          else {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: false
              }
            }
          }
        }
        else if (payload.name === "CAN_DELETE_PROJECT") {
          if (!state.project.CAN_USAGE_PROJECT.includes(payload.id) && !state.project.CAN_EDIT_PROJECT.includes(payload.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                CAN_VIEW_PROJECT: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: false
              }
            }
          }
          else {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: false
              }
            }
          }
        }
        ///?problem begins here
        else if (payload.name === "CAN_USAGE_FLOW") {          
          if (!state.project.CAN_EDIT_FLOW.includes(payload.id) && !state.project.CAN_DELETE_FLOW.includes(payload.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                CAN_VIEW_FLOW: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: []
              }
            }
          }
          else {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: []
              }
            }
          }
        }
        else if (payload.name === "CAN_EDIT_FLOW") {          
          if (!state.project.CAN_USAGE_FLOW.includes(payload.id) && !state.project.CAN_DELETE_FLOW.includes(payload.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                CAN_VIEW_FLOW: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: []
              }
            }
          }
          else {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: []
              }
            }
          }
        }
        else if (payload.name === "CAN_DELETE_FLOW") {          
          if (!state.project.CAN_USAGE_FLOW.includes(payload.id) && !state.project.CAN_EDIT_FLOW.includes(payload.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                CAN_VIEW_FLOW: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: []
              }
            }
          }
          else {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
                [`${payload.name}_ALL`]: []
              }
            }
          }
        }
        else if (payload.name === "CAN_VIEW_FLOW") {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
              CAN_VIEW_FLOW: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
              [`${payload.name}_ALL`]: []
            }
          }
        }
        
        ///?problem ends here
        else {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
              [`${payload.name}_ALL`]: false
            }
          }
        }
      }
      case "SET_SINGLE_ALL_PERMISSION":
        if (payload.checked) {
          //if (payload.name === "CAN_EDIT_PROJECT" && !state.project.CAN_VIEW_PROJECT.includes(payload.id))
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [`${payload.name}_ALL`] :true
            },
          };
        }
        else {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: [],
              [`${payload.name}_ALL`]: false
            },
          }
        }
      case "SET_MULTIPLE_ALL_PERMISSION":
        if (payload.checked) {
          //if (payload.name === "CAN_EDIT_PROJECT" && !state.project.CAN_VIEW_PROJECT.includes(payload.id))
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [`${payload.name}_ALL`] :[...state[payload.permissionType][`${payload.name}_ALL`],payload.id]
            },
          };
        }
        else {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: [],
              //[payload.name]: state[payload.permissionType][payload.name].filter(s=>payload.data.includes(s._id)),
              [`${payload.name}_ALL`]: state[payload.permissionType][`${payload.name}_ALL`].filter(s => s !== payload.id)
            },
          }
        }  
    default:
      return state;
  }
};
export default userPermissionReducer;

export const setSinglePermission = (event, permissionType) => ({
  type: "SET_SINGLE_PERMISSION",
  payload: {
    name: event.target.name,
    checked: event.target.checked,
    permissionType: permissionType,
  },
});
export const setMultiplePermission = (event, permissionType) => ({
  type: "SET_MULTIPLE_PERMISSION",
  payload: {
    id: event.target.id,
    name: event.target.name,
    checked: event.target.checked,
    permissionType: permissionType
  },
});
export const setCanDoEverytingPermission = (data) => ({
  type: "SET_CAN_DO_EVERYTHING",
  payload: data
});
export const setSingleAllPermission = (event,data,permissionType) => ({
  type: "SET_SINGLE_ALL_PERMISSION",
  payload: {
    name: event.target.name,
    checked: event.target.checked,
    id:event.target.id,
    data: data,
    permissionType: permissionType
  }
});
export const setMultipleAllPermission = (event,data,permissionType) => ({
  type: "SET_MULTIPLE_ALL_PERMISSION",
  payload: {
    name: event.target.name,
    checked: event.target.checked,
    id:event.target.id,
    data: data,
    permissionType: permissionType
  }
});
