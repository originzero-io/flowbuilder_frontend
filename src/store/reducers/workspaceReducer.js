import * as actions from "../constants/workspaceConstants";

const initialState = {
  activeWorkspace: "",
  workspaces: [],
};
const workspaceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_ACTIVE_WORKSPACE:
      return { ...state, activeWorkspace: payload };
    case actions.GET_WORKSPACES:
      return { ...state, workspaces: payload };
    case actions.CREATE_WORKSPACE:
      return { ...state, workspaces: [...state.workspaces, payload] };
    case actions.EDIT_WORKSPACE:
      return {
        activeWorkspace:payload,
        workspaces: state.workspaces.map((state) => {
          if (state._id === payload._id) {
            return payload;
          } else return state;
        }),
      };
    case actions.DELETE_WORKSPACE:
      return { ...state, workspaces: state.workspaces.filter((s) => s._id !== payload) };
    default:
      return state;
  }
};
export default workspaceReducer;
