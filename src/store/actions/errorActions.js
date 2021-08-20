export const setError = (error) => {
    console.log("ERROR:", error.response);
    const { response } = error;
    return {
        type: "SET_ERROR",
        payload: { message: response.data?.message || response.statusText, status: response.status },
    };
}