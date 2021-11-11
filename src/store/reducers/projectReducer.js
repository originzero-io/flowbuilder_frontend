import * as actions from "../constants/projectContants";

const initialState = {
  activeProject: "",
  projects:[]
}
const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.LOAD_PROJECTS:
      return { ...state, projects: payload }
    case actions.CREATE_PROJECT:
      return { ...state, projects: [...state.projects, payload] };
    case actions.SET_ACTIVE_PROJECT:
      return { ...state, activeProject: payload }
    case actions.UPDATE_PROJECT:
      return {
        activeProject:payload,
        projects: state.projects.map((state) => {
          if (state._id === payload._id) {
            return payload;
          } else return state;
        }),
      };
    case actions.DELETE_PROJECT:
      return { ...state, projects: state.projects.filter(s => s._id !== payload) }
    default:
      return state;
  }
};
export default projectReducer;
