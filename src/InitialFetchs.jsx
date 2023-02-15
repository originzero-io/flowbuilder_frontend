import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "store/reducers/userSlice";
import useAuth from "./hooks/useAuth";

export default function InitialFetchs() {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      // add all initial fetch request below
      dispatch(getAllUsers());
    }
  }, [auth.isAuthenticated]);
  return null;
}
