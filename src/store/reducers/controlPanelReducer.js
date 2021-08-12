import * as actions from "../constants/controlPanelContants";
import { panelConfig } from "../initialValues";
const controlPanelReducer = (state = panelConfig, { type, payload }) => {
  switch (type) {
    case actions.SET_ACTIVE_PANEL:
      return { ...state, activePanel: payload };
    case actions.SET_COPIED_ELEMENTS:
      return {...state, copiedElements: payload };
    case actions.SET_ACTIVE_PROJECT:
      return { ...state, activeProject: payload };
    case actions.ADD_DASHBOARD:
      return { ...state, dashboards: [...state.dashboards, payload] };
    case actions.UPDATE_DASHBOARD:
      return { ...state, dashboards: [...state.dashboards, payload] };
    case actions.DELETE_DASHBOARD:
      return {
        ...state,
        dashboards: state.dashboards.filter((dashboard) => dashboard.id !== payload.id),
      };
    default:
      return state;
  }
};
export default controlPanelReducer;
