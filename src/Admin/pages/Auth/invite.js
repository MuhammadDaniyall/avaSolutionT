// invited manager's signup page

import React, { useState, useEffect } from 'react';
import { Button, message, Input } from 'antd';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userSignUp, managerConfirmById, managerSignUp } from '../../appRedux/actions/Auth';
import AuthLayout from '../../containers/Auth/AuthLayout';
const Signup = (props) => {
  const [data, setData] = useState({
    name: { err: '', value: null },
    email: { err: '', value: null },
    password: { err: '', value: null },
  });
  const { name, email, password } = data;

  useEffect(() => {
    if (props.token != null) {
      props.history.push('/dashboard');
    }
  }, [props.token]);

  useEffect(() => {
    managerConfirmById();
  }, []);

  const managerConfirmById = async (id) => {
    await props.managerConfirmById({ id: props.match.params.ID });
  };

  useEffect(() => {
    if (props.authMSG) {
      const tmpData = { ...data };
      tmpData[props.authMSG.tag].err = props.authMSG.message;
      setData(tmpData);
    }
  }, [props.authMSG]);

  const handleChange = (name, value) => {
    const tmpData = { ...data };
    tmpData[name] = { err: '', value: value };
    setData(tmpData);
  };

  const handleClick = async () => {
    const name = props.managerConfirm.name;
    const email = props.managerConfirm.email;
    await props.managerSignUp({
      name: name,
      email: email,
      password: password.value,
      id: props.match.params.ID,
    });
    message.warning('signup was success');
  };
  if (props.managerConfirm == 'manager already signup' || props.managerConfirm == 'manager not found') {
    message.warning(props.managerConfirm);
    return <Redirect to={'/signin'} />;
  }
  return (
    <AuthLayout {...props}>
      <div className="gx-login-wrapper">
        <div className="gx-login-header-wrapper">
          <span>Invite With</span>
        </div>
        <div className="gx-login-input-wrapper">
          <Input
            className={'gx-login-input' + (name.err ? ' gx-login-input-err' : '')}
            placeholder="Name"
            value={props.managerConfirm ? props.managerConfirm.name : ''}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled
          />
          {name.err && <span className="gx-login-input-err-messgae">{name.err}</span>}
        </div>
        <div className="gx-login-input-wrapper">
          <Input
            className={'gx-login-input' + (email.err ? ' gx-login-input-err' : '')}
            value={props.managerConfirm ? props.managerConfirm.email : ''}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled
          />
          {email.err && <span className="gx-login-input-err-messgae">{email.err}</span>}
        </div>
        <div className="gx-login-input-wrapper">
          <Input
            className={'gx-login-input' + (password.err ? ' gx-login-input-err' : '')}
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange('password', e.target.value)}
          />
          {password.err && <span className="gx-login-input-err-messgae">{password.err}</span>}
        </div>
        <Button className="gx-login-btn submit" onClick={handleClick}>
          Sign Up
        </Button>
        <div className="gx-login-footer-wrapper">
          Already have an account?&nbsp;<Link to="/signin">Sign In.</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

const mapStateToProps = ({ auth }) => {
  const { token, authMSG, managerConfirm } = auth;
  return { token, authMSG, managerConfirm };
};

export default connect(mapStateToProps, {
  userSignUp,
  managerConfirmById,
  managerSignUp,
})(Signup);
