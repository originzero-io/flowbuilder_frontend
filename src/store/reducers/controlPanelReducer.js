import * as actions from "../constants/controlPanelContants";

const panelConfig = {
  activeProject: {},
  copiedElements: []
};
const controlPanelReducer = (state = panelConfig, { type, payload }) => {
  switch (type) {
    case actions.SET_COPIED_ELEMENTS:
      return {...state, copiedElements: payload };
    default:
      return state;
  }
};
export default controlPanelReducer;

export const setCopiedElements = (nodes) => ({
  type: actions.SET_COPIED_ELEMENTS,
  payload: nodes
});