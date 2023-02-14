import { useEffect } from 'react';
import useAuth from './hooks/useAuth';
import { useDispatch } from 'react-redux';
import { getAllUsers } from 'store/reducers/userSlice';
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
