/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Input, Divider, message } from 'antd';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthLayout from '../../containers/Auth/AuthLayout';
import { userSignIn, googleSignIn } from '../../appRedux/actions/Auth';
import { hideMessage } from '../../appRedux/actions/Common';
import axios from 'util/Api';

// Icons
import GooglePlus from '@2fd/ant-design-icons/lib/GooglePlus';
import Facebook from '@2fd/ant-design-icons/lib/Facebook';
import CheckCircle from '@2fd/ant-design-icons/lib/CheckCircle';
import Information from '@2fd/ant-design-icons/lib/Information';

const Signin = (props) => {
  const [data, setData] = useState({
    email: { err: '', value: '' },
    password: { err: '', value: '' },
  });
  const { email, password } = data;
  const CLIENT_ID = '776931724021-qcv2m4u10f8a7n7tb2b75p3a7amcs0lm.apps.googleusercontent.com';

  useEffect(() => {
    delete axios.defaults.headers.common.Authorization;

    if (props.error)
      message.error({
        icon: <Information />,
        content: props.error,
        style: {
          color: '#7A7F93',
          fontSize: '12px',
          fontFamily: 'Poppins',
          fontWeight: 500,
        },
      });

    if (props.message)
      message.success({
        icon: <CheckCircle />,
        content: props.message,
        style: {
          color: '#1D577B',
          fontSize: '12px',
          fontFamily: 'Poppins',
          fontWeight: 500,
        },
      });

    props.hideMessage();
  }, [props.error]);

  useEffect(() => {
    if (props.authMSG) {
      const tmpData = { ...data };
      tmpData[props.authMSG.tag].err = props.authMSG.message;
      setData(tmpData);
    }
  }, [props.authMSG]);

  useEffect(() => {
    if (props.token != null) {
      props.history.push('/dashboard');
    }
  }, [props.token]);

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

    if (!password.value) {
      tmpData.password.err = 'This field is required';
      flag = false;
    }
    setData(tmpData);

    return flag;
  };

  const handleClick = async () => {
    const isValid = validate();
    if (isValid) await props.userSignIn({ email: email.value, password: password.value });
  };

  const responseGoogle = async (response) => {
    if (response.accessToken) {
      await props.googleSignIn({
        token: response.accessToken,
        googleID: response.googleId,
        profileObj: response.profileObj,
      });
    }
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <AuthLayout {...props} >
      <div className="gx-login-wrapper">
        <div className="gx-login-header-wrapper">
          <span>Sign In With</span>
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
        <div className="gx-login-checkbox-wrapper">
          <Checkbox className="remember">Remember me</Checkbox>
          <Link to="/forgot-password" className="forgot">
            Forgot password?
          </Link>
        </div>
        <Button className="gx-login-btn submit" onClick={handleClick}>
          Sign In
        </Button>
        <Divider style={{ color: '#ffffff', border: 1 }}>OR</Divider>
        <GoogleLogin
          clientId={CLIENT_ID}
          render={(renderProps) => (
            <Button className="gx-login-btn google" onClick={renderProps.onClick}>
              <GooglePlus style={{ color: '#ffffff', fontSize: 30 }} />
              <span style={{ flexGrow: 1 }}>Continue with Google</span>
            </Button>
          )}
          onSuccess={responseGoogle}
          cookiePolicy={'single_host_origin'}
          responseType="code,token"
        />
        <Button className="gx-login-btn facebook">
          <Facebook style={{ color: '#ffffff', fontSize: 30 }} />
          <span style={{ flexGrow: 1 }}>Continue with Facebook</span>
        </Button>
        <div className="gx-login-footer-wrapper">
          Do not have an account?&nbsp;<Link to="/signup">Sign Up.</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

const mapStateToProps = ({ auth, commonData }) => {
  const { token, user, authMSG } = auth;
  const { message, error } = commonData;
  return { token, user, authMSG, message, error };
};

export default connect(mapStateToProps, {
  userSignIn,
  googleSignIn,
  hideMessage,
})(Signin);
