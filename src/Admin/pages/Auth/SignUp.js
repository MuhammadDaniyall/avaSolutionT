/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import { Button, Divider, Input } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userSignUp } from '../../appRedux/actions/Auth';
import AuthLayout from '../../../containers/Auth/AuthLayout';
// Icons
import GooglePlus from '@2fd/ant-design-icons/lib/GooglePlus';
import Facebook from '@2fd/ant-design-icons/lib/Facebook';

const Signup = (props) => {
  const [data, setData] = useState({
    firstname: { err: '', value: null },
    lastname: { err: '', value: null },
    email: { err: '', value: null },
    password: { err: '', value: null },
  });
  const { firstname, lastname, email, password } = data;

  useEffect(() => {
    if (props.token != null) {
      props.history.push('/dashboard');
    }
  }, [props.token]);

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

  const validate = () => {
    let flag = true;
    const tmpData = { ...data };

    if (!firstname.value) {
      tmpData.firstname.err = 'This field is required';
      flag = false;
    }

    if (!lastname.value) {
      tmpData.lastname.err = 'This field is required';
      flag = false;
    }

    if (!email.value) {
      tmpData.email.err = 'This field is required';
      flag = false;
    } else {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email.value).toLowerCase())) {
        tmpData.email.err = "'Wrong email format";
        flag = false;
      }
    }

    if (!password.value) {
      tmpData.password.err = 'This field is required';
      flag = false;
    } else {
      const re = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
      if (!re.test(String(password.value))) {
        tmpData.password.err = 'Min 8 symbols, 1 special character, 1 number, 1 capital letter';
        flag = false;
      }
    }
    setData(tmpData);

    return flag;
  };

  const handleClick = async () => {
    const isValid = validate();
    if (isValid)
      await props.userSignUp({
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
      });
  };

  return (
    <AuthLayout {...props}>
      <div className="gx-login-wrapper">
        <div className="gx-login-header-wrapper">
          <span>Customer Sign Up </span>
        </div>
        <div className="gx-login-input-wrapper">
          <Input
            className={'gx-login-input' + (firstname.err ? ' gx-login-input-err' : '')}
            placeholder="First Name"
            onChange={(e) => handleChange('firstname', e.target.value)}
          />
          {firstname.err && <span className="gx-login-input-err-messgae">{firstname.err}</span>}
        </div>
        <div className="gx-login-input-wrapper">
          <Input
            className={'gx-login-input' + (lastname.err ? ' gx-login-input-err' : '')}
            placeholder="Last Name"
            onChange={(e) => handleChange('lastname', e.target.value)}
          />
          {lastname.err && <span className="gx-login-input-err-messgae">{lastname.err}</span>}
        </div>
        <div className="gx-login-input-wrapper">
          <Input
            className={'gx-login-input' + (email.err ? ' gx-login-input-err' : '')}
            placeholder="Email"
            onChange={(e) => handleChange('email', e.target.value)}
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
        <Divider style={{ color: '#ffffff', border: 1 }}>OR</Divider>
        <Button className="gx-login-btn google">
          <GooglePlus style={{ color: '#ffffff', fontSize: 30 }} />
          <span style={{ flexGrow: 1 }}>Continue with Google</span>
        </Button>
        <Button className="gx-login-btn facebook">
          <Facebook style={{ color: '#ffffff', fontSize: 30 }} />
          <span style={{ flexGrow: 1 }}>Continue with Facebook</span>
        </Button>
        <div className="gx-login-footer-wrapper">
          Already have an account?&nbsp;<Link to="/signInByCustomer">Sign In.</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

const mapStateToProps = ({ auth, commonData }) => {
  const { token, authMSG } = auth;
  const { message, error } = commonData;
  return { token, authMSG, message, error };
};

export default connect(mapStateToProps, { userSignUp })(Signup);
