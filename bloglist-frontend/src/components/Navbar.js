import React from 'react';

import './styles/Navbar.css';

import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">home</Link> &nbsp; &nbsp;
      <Link to="/users">users</Link>
      <UserInfo />
    </div>
  );
};

export default Navbar;
