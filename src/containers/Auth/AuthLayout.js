import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo png.png';

const AuthLayout = (props) => {
  return (
    <div className="gx-auth-content-wrapper">
      <Link className="gx-app-logo-container" to="/signin">
        <img src={logo} alt="logo" />
      </Link>
      {props.children}
    </div>
  );
};

export default AuthLayout;
