import PermissionService from "services/configurationService/permissionService"
import { beginTheBar,endTheBar } from "store/reducers/componentReducer";

export const defaultPermissions = {
  CAN_DO_EVERYTHING:true,
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
    CAN_EDIT_PROCESSOR: []
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
      /*{id: flow_id projectId: project_id}*/
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
     /*{id: flow_id projectId: project_id}*/
    ],
    CAN_EDIT_DASHBOARD_ALL:[/*project_id*/],
    CAN_EDIT_DASHBOARD: [
      /*dashboard_id*/
    ],
    CAN_EDIT_NODE: [
      /*node_id*/
    ],
    CAN_VIEW_PROJECT_ALL:false,
    CAN_VIEW_PROJECT: [
      /*project_id*/
    ],
    CAN_VIEW_FLOW_ALL:[/*project_id*/],
    CAN_VIEW_FLOW: [
      /*{id: flow_id projectId: project_id}*/
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
const userPermissionReducer = (state = defaultPermissions, { type, payload }) => {
  switch (type) {
    case "LOAD_USER_PERMISSION":
      return payload;
    case "SET_CAN_DO_EVERYTHING":
      return { ...state, CAN_DO_EVERYTHING: payload.checked };
    //? PROJECT_CREATE ==> true/false
    case "SET_SINGLE_PERMISSION":
      return {
        ...state,
        [payload.permissionType]: {
          ...state[payload.permissionType],
          [payload.name]: payload.checked,
        },
      };
    //? FLOW_CREATE ==> [...projects, projectId]
    case "SET_MULTIPLE_PERMISSION":
      if (payload.checked) {
        if ((payload.name === "CAN_EDIT_PROJECT")) {
          if (!state.project.CAN_VIEW_PROJECT.includes(payload.id) && !state.project.CAN_USAGE_PROJECT.includes(payload.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: [...state[payload.permissionType][payload.name], payload.id],
                CAN_VIEW_PROJECT: [...state[payload.permissionType].CAN_VIEW_PROJECT, payload.id],
                CAN_USAGE_PROJECT: [...state[payload.permissionType].CAN_USAGE_PROJECT, payload.id],
              },
            };
          }
          else if (state.project.CAN_VIEW_PROJECT.includes(payload.id) && state.project.CAN_USAGE_PROJECT.includes(payload.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: [...state[payload.permissionType][payload.name], payload.id],
              },
            };
          }
          else if (!state.project.CAN_USAGE_PROJECT.includes(payload.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: [...state[payload.permissionType][payload.name], payload.id],
                CAN_USAGE_PROJECT: [...state[payload.permissionType].CAN_USAGE_PROJECT, payload.id],
              },
            };
          }
          else if (!state.project.CAN_VIEW_PROJECT.includes(payload.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: [...state[payload.permissionType][payload.name], payload.id],
                CAN_VIEW_PROJECT: [...state[payload.permissionType].CAN_VIEW_PROJECT, payload.id],
              },
            };
          }
          else return state;
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
      else if (!payload.checked) {
        if (payload.name === "CAN_EDIT_PROJECT") {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
              CAN_VIEW_PROJECT: state[payload.permissionType].CAN_VIEW_PROJECT.filter(p => p !== payload.id),
              CAN_USAGE_PROJECT: state[payload.permissionType].CAN_USAGE_PROJECT.filter(p => p !== payload.id),
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
      else return state;
    
    //? PROJECT_FLOW_FLOWID ==> [...flows,flowId]
    case "SET_NESTED_MULTIPLE_PERMISSION":
      if (payload.checked) {
        if ((payload.name === "CAN_EDIT_FLOW") && !state.project.CAN_VIEW_FLOW.some(p => p.id === payload.flowData.id)) {
          if (!state.project.CAN_VIEW_FLOW.some(p => p.id === payload.flowData.id) && !state.project.CAN_USAGE_FLOW.some(p => p.id === payload.flowData.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: [...state[payload.permissionType][payload.name], payload.flowData],
                CAN_VIEW_FLOW: [...state.project.CAN_VIEW_FLOW, payload.flowData],
                CAN_USAGE_FLOW: [...state.project.CAN_USAGE_FLOW, payload.flowData],
              },
            };
          }
          else if (state.project.CAN_VIEW_FLOW.some(p => p.id === payload.flowData.id) && state.project.CAN_USAGE_FLOW.some(p => p.id === payload.flowData.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: [...state[payload.permissionType][payload.name], payload.flowData]
              },
            };
          }
          else if (!state.project.CAN_USAGE_FLOW.some(p => p.id === payload.flowData.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: [...state[payload.permissionType][payload.name], payload.flowData],
                CAN_USAGE_FLOW: [...state.project.CAN_USAGE_FLOW, payload.flowData],
              },
            };
          }
          else if (!state.project.CAN_VIEW_FLOW.some(p => p.id === payload.flowData.id)) {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [payload.name]: [...state[payload.permissionType][payload.name], payload.flowData],
                CAN_VIEW_FLOW: [...state.project.CAN_VIEW_FLOW, payload.flowData],
              },
            };
          }
          else return state;
        }
        else {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: [...state[payload.permissionType][payload.name], payload.flowData],
            },
          };
        }
      }
      else if (!payload.checked) {
        if (payload.name === "CAN_EDIT_FLOW") {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: state[payload.permissionType][payload.name].filter(p => p.id !== payload.flowData.id),
              CAN_VIEW_FLOW: state.project.CAN_VIEW_FLOW.filter(p => p.id !== payload.flowData.id),
              CAN_USAGE_FLOW: state.project.CAN_USAGE_FLOW.filter(p => p.id !== payload.flowData.id),
              [`${payload.name}_ALL`]: state[payload.permissionType][`${payload.name}_ALL`].filter(p => p !== payload.flowData.projectId),
            }
          }
        }
        else {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: state[payload.permissionType][payload.name].filter(p => p.id !== payload.flowData.id),
              [`${payload.name}_ALL`]: state[payload.permissionType][`${payload.name}_ALL`].filter(p => p !== payload.flowData.projectId),
            }
          }
        }
      }
      else return state;

    //? PROJECT_ALL ==> true/false  
    case "SET_SINGLE_ALL_PERMISSION":
      if (payload.checked) {
        if ((payload.name === "CAN_EDIT_PROJECT")) {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [`${payload.name}_ALL`]: true,
              CAN_VIEW_PROJECT_ALL:true,
              CAN_USAGE_PROJECT_ALL:true,
            },
          } 
        }
        else {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [`${payload.name}_ALL`]: true
            },
          };
        }
      }
      else {
        if (payload.name === "CAN_EDIT_PROJECT") {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [`${payload.name}_ALL`]: false,
              CAN_VIEW_PROJECT_ALL: false,
              CAN_USAGE_PROJECT_ALL: false,
            },
          }
        }
        else {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [`${payload.name}_ALL`]: false,
            }
          }
        }
      }
    
    //? PROJECT_FLOW_ALL ==> [flow_id]  
    case "SET_NESTED_ALL_PERMISSION":
      if (payload.checked) {
        if (payload.name === "CAN_EDIT_FLOW") {
          if(!state.project.CAN_VIEW_FLOW_ALL.includes(payload.id) && !state.project.CAN_USAGE_FLOW_ALL.includes(payload.id)){
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [`${payload.name}_ALL`]: [...state[payload.permissionType][`${payload.name}_ALL`], payload.id],
                CAN_VIEW_FLOW_ALL: [...state.project.CAN_VIEW_FLOW_ALL, payload.id],
                CAN_USAGE_FLOW_ALL: [...state.project.CAN_USAGE_FLOW_ALL, payload.id],
              },
            };
          }
          else if(state.project.CAN_VIEW_FLOW_ALL.includes(payload.id) && state.project.CAN_USAGE_FLOW_ALL.includes(payload.id)){
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [`${payload.name}_ALL`]: [...state[payload.permissionType][`${payload.name}_ALL`], payload.id],
              },
            };
          }
          else if(!state.project.CAN_VIEW_FLOW_ALL.includes(payload.id)){
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [`${payload.name}_ALL`]: [...state[payload.permissionType][`${payload.name}_ALL`], payload.id],
                CAN_VIEW_FLOW_ALL: [...state.project.CAN_VIEW_FLOW_ALL, payload.id],
              },
            };
          }
          else if(!state.project.CAN_USAGE_FLOW_ALL.includes(payload.id)){
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [`${payload.name}_ALL`]: [...state[payload.permissionType][`${payload.name}_ALL`], payload.id],
                CAN_USAGE_FLOW_ALL: [...state.project.CAN_USAGE_FLOW_ALL, payload.id],
              },
            };
          }
          else {
            return {
              ...state,
              [payload.permissionType]: {
                ...state[payload.permissionType],
                [`${payload.name}_ALL`]: [...state[payload.permissionType][`${payload.name}_ALL`], payload.id],
              },
            };
          }
        }
        else {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [`${payload.name}_ALL`]: [...state[payload.permissionType][`${payload.name}_ALL`], payload.id],
            },
          }
        }
      }
      else if (!payload.checked) {
        if (payload.name === "CAN_EDIT_FLOW") {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [`${payload.name}_ALL`]: state[payload.permissionType][`${payload.name}_ALL`].filter(s => s !== payload.id),
              CAN_VIEW_FLOW_ALL: state[payload.permissionType].CAN_VIEW_FLOW_ALL.filter(s => s !== payload.id),
              CAN_USAGE_FLOW_ALL: state[payload.permissionType].CAN_USAGE_FLOW_ALL.filter(s => s !== payload.id),
            },
          }
        }
        else {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [`${payload.name}_ALL`]: state[payload.permissionType][`${payload.name}_ALL`].filter(s => s !== payload.id),
            },
          }
        }
      }
      else return state;
      
    default:
      return state;
  }
};
export default userPermissionReducer;

export const setCanDoEverytingPermission = (event) => ({
  type: "SET_CAN_DO_EVERYTHING",
  payload: {
    checked:event.target.checked
  }
});
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
export const setNestedMultiplePermission = (event, flowData, permissionType) => ({
  type: "SET_NESTED_MULTIPLE_PERMISSION",
  payload: {
    id: event.target.id,
    name: event.target.name,
    checked: event.target.checked,
    flowData: flowData,
    permissionType: permissionType
  },
});
export const setSingleAllPermission = (event, permissionType) => ({
  type: "SET_SINGLE_ALL_PERMISSION",
  payload: {
    name: event.target.name,
    checked: event.target.checked,
    permissionType: permissionType
  }
});
export const setNestedAllPermission = (event, permissionType) => ({
  type: "SET_NESTED_ALL_PERMISSION",
  payload: {
    name: event.target.name,
    checked: event.target.checked,
    id:event.target.id, //projectId
    permissionType: permissionType
  }
});


export const loadUserPermission = (data) => ({
  type: "LOAD_USER_PERMISSION",
  payload: data
});

export const getUserPermissionInThisWorkspace = (workspace,user) => async (dispatch) => {
  dispatch(beginTheBar());
  const { permission } = await PermissionService.getUserPermissionInThisWorkspace(workspace._id, user._id);
  if(permission){
    dispatch(loadUserPermission(permission.permissions));
  }
  dispatch(endTheBar());
};
