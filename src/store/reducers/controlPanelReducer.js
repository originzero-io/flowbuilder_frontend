import * as actions from "../constants/controlPanelContants";

const panelConfig = {
  activePanel: "Projects",
  activeProject: { id: "project0", name: "Project 1", author: "Anaks", flows: [] },
  copiedElements: [],
  projects: [
    {
      id: "project0",
      name: "Project 1",
      author: "Anaks",
    },
  ],
  dashboards: [
    {
      id: "dashboard0",
      name: "dashboard1",
      author: "Anıl Akseki",
      description: "anaks ilk flow",
      projectId: "project0",
    },
  ],
};

const controlPanelReducer = (state = panelConfig, { type, payload }) => {
  switch (type) {
    case actions.SET_ACTIVE_PANEL:
      return { ...state, activePanel: payload };
    case actions.SET_COPIED_ELEMENTS:
      return {...state, copiedElements: payload };
    case actions.ADD_PROJECT:
      return { ...state, projects: [...state.projects, payload] };
    case actions.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== payload.id),
      };
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
