import * as actions from "../constants/authConstants";

const initialState = {
  status: "",
  message: "",
};

const errorReducer = (state = initialState, {type,payload}) => {
  switch (type) {
    case "SET_ERROR":
      return {
          status: payload.status,
          message: payload.message        
      };
    default:
      return state;
  }
};
export default errorReducer;
