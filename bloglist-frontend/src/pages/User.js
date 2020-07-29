import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { getSingleUser } from '../reducers/userDetailsReducer';

const User = () => {
  const userID = useParams().id;
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(getSingleUser(userID));
  }, [dispatch]);

  return (
    <>
      {userDetails.name !== undefined ? (
        <div>
          <h1>{userDetails.name}</h1>
          <h4>Added Blogs</h4>
          {userDetails.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>;
          })}
        </div>
      ) : null}
    </>
  );
};

export default User;
