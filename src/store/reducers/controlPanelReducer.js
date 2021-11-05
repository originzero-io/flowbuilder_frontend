import * as actions from "../constants/controlPanelContants";

const panelConfig = {
  activeProject: {},
  copiedElements: []
};
const controlPanelReducer = (state = panelConfig, { type, payload }) => {
  switch (type) {
    case actions.SET_COPIED_ELEMENTS:
      return {...state, copiedElements: payload };
    case actions.SET_ACTIVE_PROJECT:
      return { ...state, activeProject: payload };
    default:
      return state;
  }
};
export default controlPanelReducer;
