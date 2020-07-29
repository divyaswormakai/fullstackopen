import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllUsers } from '../reducers/userDetailsReducer';

import { Link } from 'react-router-dom';
import {
  TableContainer,
  TableRow,
  TableHead,
  Table,
  Paper,
  TableCell,
} from '@material-ui/core';

import '../components/styles/User.css';

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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Full Name</b>
                </TableCell>
                <TableCell>
                  <b>Blogs Created</b>
                </TableCell>
              </TableRow>
            </TableHead>
            {userDetails.length > 0
              ? userDetails.map((user) => {
                  return (
                    <TableRow key={user.id} className="users-list-row">
                      <TableCell>
                        <Link
                          to={`/user/${user.id}`}
                          className="users-username"
                        >
                          {user.name}
                        </Link>
                      </TableCell>
                      <TableCell>{user.blogs.length}</TableCell>
                    </TableRow>
                  );
                })
              : null}
          </Table>
        </TableContainer>
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
