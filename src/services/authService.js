import axios from 'axios';
// export const checkAPI = () => {
//     return axios.get("https://jsonplaceholder.typicode.com/todos/1")
//         .then(user => user.data)
//         .catch(err => console.log(err));
// }
export const checkAPI = async () => {
    const response = await axios.get("/todos/1");
    return response.data;
}

const logout = () => {
    localStorage.removeItem("jwtToken");
}
