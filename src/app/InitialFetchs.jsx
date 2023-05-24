import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "store/reducers/userSlice";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import useAuth from "../utils/hooks/useAuth";

export default function InitialFetchs() {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      // add all initial fetch request below
      dispatch(getAllUsers());
      flowExecutorEvent.getNodeList();
    }
  }, [auth.isAuthenticated]);
  return null;
}
