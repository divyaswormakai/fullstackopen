import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../components/LoginForm';

import { LogOutFromReducer, InitializeUser } from '../reducers/userReducer';

const UserInfo = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(InitializeUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(LogOutFromReducer());
  };

  return (
    <div>
      {userInfo.token === undefined || userInfo.token === null ? (
        <LoginForm />
      ) : (
        <>
          <p>
            {userInfo.username} is logged in.{' '}
            <button onClick={handleLogout}>Logout</button>
          </p>
        </>
      )}
    </div>
  );
};

export default UserInfo;
