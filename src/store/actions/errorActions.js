export const setError = (error) => {
    const { response } = error;
    return {
        type: "SET_ERROR",
        payload: { message: response.data?.message || response.statusText, status: response.status },
    };
}