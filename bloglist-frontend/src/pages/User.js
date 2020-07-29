import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { getSingleUser } from '../reducers/userDetailsReducer';

import {
  TableContainer,
  TableRow,
  Table,
  Paper,
  TableCell,
  Link,
} from '@material-ui/core';

import '../components/styles/User.css';

const User = () => {
  const userID = useParams().id;
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(getSingleUser(userID));
  }, [dispatch, userID]);

  return (
    <>
      {userDetails.name !== undefined ? (
        <div>
          <h1>{userDetails.name}</h1>
          <h4>Added Blogs</h4>
          <TableContainer component={Paper}>
            <Table>
              {userDetails.blogs.map((blog) => {
                return (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blog/${blog.id}`} className="user-blog-row">
                        {blog.title}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </>
  );
};

export default User;
