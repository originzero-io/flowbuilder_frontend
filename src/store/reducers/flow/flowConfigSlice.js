import * as actions from "../../constants/flowConstants";

const flowConfigReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actions.SET_CURRENT_FLOW_CONFIG:
      return payload;
    default:
      return state;
  }
};

export default flowConfigReducer;

export const setCurrentFlowConfig = (data) => ({
  type: actions.SET_CURRENT_FLOW_CONFIG,
  payload: data,
});
