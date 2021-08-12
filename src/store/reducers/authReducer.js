import * as actions from "../constants/authConstants";

const initialState = {
  username: "",
  role: "user",
  isAuthenticated: false,
  error: false,
  errorMessage: "",
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...payload,
        isAuthenticated: true,
        error: false,
        errorMessage: "",
      };
    case actions.LOGIN_ERROR:
      return {
        error: true,
        isAuthenticated: false,
        errorMessage: payload,
      };
    case actions.LOG_OUT:
      return {
        user: "",
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default authReducer;
