import React from 'react';

import './styles/Navbar.css';

import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';

import { AppBar, Toolbar, Grid } from '@material-ui/core';
const Navbar = () => {
  return (
    <div className="navbar">
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Link to="/" className="navbar-link">
                home
              </Link>{' '}
            </Grid>
            <Grid item xs={1}>
              <Link to="/users" className="navbar-link">
                users
              </Link>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={4} className="navbar-login">
              <UserInfo className="navbar-login" />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
