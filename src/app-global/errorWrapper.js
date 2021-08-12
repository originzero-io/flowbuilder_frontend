import { useDispatch } from "react-redux";
import { setError } from "../store/actions/errorActions";
const errorWrapper = (e, func) => {
    e.preventDefault();
    try {
        func();
    } catch (error) {
       useDispatch()(setError(error)) 
    }
};

export default errorWrapper;