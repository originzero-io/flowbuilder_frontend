import * as actions from "../constants/teamConstants";

const initialState = {
  activeTeam: "",
  teams:[]
}
const teamReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.LOAD_TEAMS:
      return { ...state, teams: payload }
    case actions.CREATE_TEAM:
      return {...state,teams:[...state.teams,payload]}
    case actions.SET_ACTIVE_TEAM:
      return {...state,activeTeam:payload}
    case actions.DELETE_TEAM:
      return { ...state, teams: state.teams.filter(s => s._id !== payload) }
    default:
      return state;
  }
};
export default teamReducer;
