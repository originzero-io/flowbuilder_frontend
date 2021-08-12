export const setError = (error) => {
    console.log("ERRORRR:", error.response);
    return {
        type: "SET_ERROR",
        payload: { message: error.response.data.message, status: error.response.status },
    };
}