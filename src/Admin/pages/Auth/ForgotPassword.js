/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userForgot } from '../../appRedux/actions/Auth';
import AuthLayout from '../../containers/Auth/AuthLayout';

const ForgotPassword = (props) => {
  const [data, setData] = useState({ email: { err: '', value: '' } });
  const { email } = data;

  useEffect(() => {
    if (props.authMSG) {
      const tmpData = { ...data };
      tmpData[props.authMSG.tag].err = props.authMSG.message;
      setData(tmpData);
    }
  }, [props.authMSG]);

  useEffect(() => {
    if (props.message) {
      props.history.push('/signin');
    }
  }, [props.message]);

  const handleChange = (name, value) => {
    const tmpData = { ...data };
    tmpData[name] = { err: '', value: value };
    setData(tmpData);
  };

  const validate = () => {
    let flag = true;
    const tmpData = { ...data };

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
    setData(tmpData);

    return flag;
  };

  const handleClick = async () => {
    const isValid = validate();
    if (isValid) await props.userForgot({ email: email.value });
  };

  return (
    <AuthLayout {...props}>
      <div className="gx-login-wrapper">
        <div className="gx-login-header-wrapper">
          <span>Forgot Password?</span>
        </div>
        <div className="gx-login-input-wrapper">
          <Input
            className={'gx-login-input' + (email.err ? ' gx-login-input-err' : '')}
            placeholder="Email"
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {email.err && <span className="gx-login-input-err-messgae">{email.err}</span>}
        </div>
        <Button className="gx-login-btn submit" onClick={handleClick}>
          Request
        </Button>
        <div className="gx-login-footer-wrapper">
          Don't have an account?&nbsp;<Link to="/signup">Sign Up.</Link>
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

export default connect(mapStateToProps, { userForgot })(ForgotPassword);
