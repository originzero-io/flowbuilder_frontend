import * as actionTypes from "../constants/controlPanelContants";

const panelConfig = {
  activePanel: "Teams",
  activeProject: { id: null, name: null, author: null, flows: [] },
  projects: [
    {
      id: "project0",
      name: "Project 1",
      author: "Anaks",
    },
  ],
  flows: [
    {
      id: "flow0",
      name: "flow1",
      author: "Anıl Akseki",
      description: "anaks ilk flow",
      projectId: "project0",
    },
    {
      id: "flow1",
      name: "flow2",
      author: "Akın Şibay",
      description: "deneme flowudur",
      projectId: "project0",
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
    case actionTypes.SET_ACTIVE_PANEL:
      return { ...state, activePanel: payload };
    case actionTypes.ADD_PROJECT:
      return { ...state, projects: [...state.projects, payload] };
    case actionTypes.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== payload.id),
      };
    case actionTypes.SET_ACTIVE_PROJECT:
      return { ...state, activeProject: payload };
    case actionTypes.ADD_FLOW:
      return { ...state, flows: [...state.flows, payload] };
    case actionTypes.UPDATE_FLOW:
      return { ...state, flows: [...state.flows, payload] };
    case actionTypes.DELETE_FLOW:
      return {
        ...state,
        flows: state.flows.filter((flow) => flow.id !== payload.id),
      };
    case actionTypes.ADD_DASHBOARD:
      return { ...state, dashboards: [...state.dashboards, payload] };
    case actionTypes.UPDATE_DASHBOARD:
      return { ...state, dashboards: [...state.dashboards, payload] };
    case actionTypes.DELETE_DASHBOARD:
      return {
        ...state,
        dashboards: state.dashboards.filter((dashboard) => dashboard.id !== payload.id),
      };
    default:
      return state;
  }
};
export default controlPanelReducer;
