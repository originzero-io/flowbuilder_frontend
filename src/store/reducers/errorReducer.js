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

export const setError = (error) => {
  const { response } = error;
  return {
      type: "SET_ERROR",
      payload: { message: response.data?.message || response.statusText, status: response.status },
  };
}
