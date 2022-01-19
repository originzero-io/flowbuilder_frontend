const permissions = {
    device: {
        aCAN_CREATE_CONTROLLER: false,
        aCAN_CREATE_PROCESSOR: false,
        aCAN_USAGE_CONTROLLER: [/*controller_id*/],
        aCAN_USAGE_PROCESSOR: [/*processor_id*/],
        aCAN_EDIT_CONTROLLER: [/*controller_id*/],
        aCAN_EDIT_PROCESSOR: [/*processor_id*/],
        aCAN_DELETE_CONTROLLER: false,
        aCAN_DELETE_PROCESSOR: false,
    },
    project: {
        CAN_CREATE_PROJECT: false,
        CAN_CREATE_DASHBOARD: [/*project_id*/],
        CAN_CREATE_FLOW: [/*project_id*/],
        CAN_USAGE_FLOW:[/*flow_id*/],
        CAN_USAGE_DASHBORAD:[/*dashboard_id*/],
        CAN_EDIT_PROJECT: [/*project_id*/],
        CAN_EDIT_FLOW: [/*flow_id*/],
        CAN_EDIT_DASHBOARD: [/*dashboard_id*/],
        CAN_EDIT_NODE: [/*node_id*/],
        CAN_DELETE_PROJECT: [/*project_id*/],
        CAN_DELETE_FLOW: [/*flow_id*/],
        CAN_DELETE_DASHBOARD: [/*dashboard_id*/],
        CAN_VIEW_PROJECT: [/*project_id*/],
        CAN_VIEW_FLOW: [/*flow_id*/],
        CAN_VIEW_DASHBOARD: [/*dashboard_id*/]
    },
    team: {
        CAN_INVITE_MEMBER: false,
        CAN_REMOVE_MEMBER: false,
        CAN_ASSIGN_PERMISSION: false
    }
};

console.log(permissions);