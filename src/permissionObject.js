// const permissions = {
//     device: {
//         aCAN_CREATE_CONTROLLER: false,
//         aCAN_CREATE_PROCESSOR: false,
//         aCAN_USAGE_CONTROLLER: [/*controller_id*/],
//         aCAN_USAGE_PROCESSOR: [/*processor_id*/],
//         aCAN_EDIT_CONTROLLER: [/*controller_id*/],
//         aCAN_EDIT_PROCESSOR: [/*processor_id*/],
//         aCAN_DELETE_CONTROLLER: false,
//         aCAN_DELETE_PROCESSOR: false,
//     },
//     project: {
//         CAN_CREATE_PROJECT: false,
//         CAN_CREATE_DASHBOARD: [/*project_id*/],
//         CAN_CREATE_FLOW: [/*project_id*/],
//         CAN_USAGE_FLOW:[/*flow_id*/],
//         CAN_USAGE_DASHBORAD:[/*dashboard_id*/],
//         CAN_EDIT_PROJECT: [/*project_id*/],
//         CAN_EDIT_FLOW: [/*flow_id*/],
//         CAN_EDIT_DASHBOARD: [/*dashboard_id*/],
//         CAN_EDIT_NODE: [/*node_id*/],
//         CAN_DELETE_PROJECT: [/*project_id*/],
//         CAN_DELETE_FLOW: [/*flow_id*/],
//         CAN_DELETE_DASHBOARD: [/*dashboard_id*/],
//         CAN_VIEW_PROJECT: [/*project_id*/],
//         CAN_VIEW_FLOW: [/*flow_id*/],
//         CAN_VIEW_DASHBOARD: [/*dashboard_id*/]
//     },
//     team: {
//         CAN_INVITE_MEMBER: false,
//         CAN_REMOVE_MEMBER: false,
//         CAN_ASSIGN_PERMISSION: false
//     }
// };


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
console.log(initialState);