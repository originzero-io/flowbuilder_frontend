import * as actions from "../constants/userContants";
const initialState = {
  CAN_DO_EVERYTHING:false,
  device: {
    CAN_CREATE_CONTROLLER: true,
    CAN_CREATE_PROCESSOR: false,
    CAN_USAGE_ALL_CONTROLLER:false,
    CAN_USAGE_CONTROLLER: ["1", "2", "3"],
    CAN_USAGE_PROCESSOR: [
      /*processor_id*/
    ],
    CAN_EDIT_CONTROLLER: [
      /*controller_id*/
    ],
    CAN_EDIT_PROCESSOR: [
      /*processor_id*/
    ],
    CAN_DELETE_CONTROLLER: false,
    CAN_DELETE_PROCESSOR: false,
  },
  project: {
    CAN_CREATE_PROJECT: false,
    CAN_CREATE_DASHBOARD: [
      /*project_id*/
    ],
    CAN_CREATE_FLOW: [
      /*project_id*/
    ],
    CAN_USAGE_PROJECT: [
      /*project_id*/
    ],
    CAN_USAGE_FLOW: [
      /*flow_id*/
    ],
    CAN_USAGE_DASHBOARD: [
      /*dashboard_id*/
    ],
    CAN_EDIT_PROJECT: [
      /*project_id*/
    ],
    CAN_EDIT_FLOW: [
      /*flow_id*/
    ],
    CAN_EDIT_DASHBOARD: [
      /*dashboard_id*/
    ],
    CAN_EDIT_NODE: [
      /*node_id*/
    ],
    CAN_DELETE_PROJECT: [
      /*project_id*/
    ],
    CAN_DELETE_FLOW: [
      /*flow_id*/
    ],
    CAN_DELETE_DASHBOARD: [
      /*dashboard_id*/
    ],
    CAN_VIEW_PROJECT: [
      /*project_id*/
    ],
    CAN_VIEW_FLOW: [
      /*flow_id*/
    ],
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
        if (payload.name === "CAN_EDIT_PROJECT" && !state.project.CAN_VIEW_PROJECT.includes(payload.id)) {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: [...state[payload.permissionType][payload.name], payload.id],
              CAN_VIEW_PROJECT: [...state[payload.permissionType].CAN_VIEW_PROJECT, payload.id]
            },
          };
        }
        else if (payload.name === "CAN_EDIT_FLOW" && !state.project.CAN_VIEW_FLOW.includes(payload.id)) {
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
        if (payload.name === "CAN_EDIT_PROJECT") {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
              CAN_VIEW_PROJECT: state[payload.permissionType][payload.name].filter(p => p !== payload.id)
            }
          }
        }
        else if (payload.name === "CAN_EDIT_FLOW") {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]: state[payload.permissionType][payload.name].filter(p => p !== payload.id),
              CAN_VIEW_FLOW: state[payload.permissionType][payload.name].filter(p => p !== payload.id)
            }
          }
        }
        else {
          return {
            ...state,
            [payload.permissionType]: {
              ...state[payload.permissionType],
              [payload.name]:state[payload.permissionType][payload.name].filter(p=>p!==payload.id)
            }
          }
        }
      }
    // case "SET_MULTIPLE_PERMISSION":
    //   if (payload.checked) {
    //     return {
    //       ...state,
    //       [payload.permissionType]: {
    //         ...state[payload.permissionType],
    //         [payload.name]: [...state[payload.permissionType][payload.name], payload.id],
    //       },
    //     };
    //   }
    //   else {
    //     return {
    //       ...state,
    //       [payload.permissionType]: {
    //         ...state[payload.permissionType],
    //         [payload.name]:state[payload.permissionType][payload.name].filter(p=>p!==payload.id)
    //       }
    //     }
    //   }
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
    permissionType: permissionType,
  },
});
export const setCanDoEverytingPermission = (data) => ({
  type: "SET_CAN_DO_EVERYTHING",
  payload: data
});
export const setAllPermission = (event,data) => ({
  type: "SET_ALL_PERMISSION",
  payload: {
    name:event.target.name,
  }
});
