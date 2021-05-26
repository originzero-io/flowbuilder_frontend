import * as actionTypes from "../constants/controlPanelContants";

const panelConfig = {
  activePanel: "Projects",
  projects: [
    {
      id: "project0",
      name: "Project 1",
      author: "Anaks",
      flows: [{id:"flow0", name: "flow1", description: "anaks flow" }],
    },
  ],
  activeProject: { id: null, name: null, author: null, flows: [] },
};

const controlPanelReducer = (state = panelConfig, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_ACTIVE_PANEL:
      return { ...state, activePanel: payload };
    case actionTypes.ADD_PROJECT:
      return { ...state, projects: [...state.projects, payload] };
    case actionTypes.SET_ACTIVE_PROJECT:
      return { ...state, activeProject: payload };
    case actionTypes.ADD_NEW_FLOW_TO_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          state.projects.map((project) => {
            if (project.id === payload.project.id) {
              return {
                ...project,
                flows: [...project.flows, payload.flow],
              };
            }
            else return project;
          }),
        ],
      };
    default:
      return state;
  }
};
export default controlPanelReducer;
