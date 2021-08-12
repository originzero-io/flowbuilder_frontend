import * as actions from "../constants/projectContants";

const projectReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.LOAD_PROJECTS:
      return [...payload]
    case actions.CREATE_PROJECT:
      return [...state,payload]
    case actions.DELETE_PROJECT:
      return state.filter(state=>state._id !== payload)
    default:
      return state;
  }
};
export default projectReducer;
