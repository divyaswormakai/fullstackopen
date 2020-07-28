import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllUsers } from '../reducers/userDetailsReducer';

const UserRow = ({ user }) => {
  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const Users = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const userDetails = useSelector((state) => state.userDetails);

  const usersDiv = () => {
    return (
      <>
        <h1>Users:</h1>
        <table>
          <tr>
            <th width="200px">Full Name:</th>
            <th>Blogs Created:</th>
          </tr>
          <tbody>
            {userDetails.length > 0
              ? userDetails.map((user) => {
                  return <UserRow user={user} />;
                })
              : null}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div>
      {userInfo.token === undefined || userInfo.token === null
        ? null
        : usersDiv()}
    </div>
  );
};

export default Users;
