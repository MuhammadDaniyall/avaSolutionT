import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import { resetPassword, tokenValidation } from '../../appRedux/actions/Auth';
import AuthLayout from '../../containers/Auth/AuthLayout';
import axios from 'util/Api';

const ResetPassword = (props) => {
  const [data, setData] = useState({ password: { err: '', value: null } });
  const { password } = data;

  useEffect(() => {
    if (props.error) {
      props.history.push('/signin');
    } else {
      axios.defaults.headers.common.Authorization = 'Bearer ' + props.match.params.token;
      handleVerify();
    }
  }, [props.error]);

  useEffect(() => {
    if (props.message) {
      props.history.push('/signin');
    }
  }, [props.message]);

  const handleVerify = async () => {
    await props.tokenValidation(props.match.params.token);
  };

  const handleChange = (name, value) => {
    const tmpData = { ...data };
    tmpData[name] = { err: '', value: value };
    setData(tmpData);
  };

  const validate = () => {
    let flag = true;
    const tmpData = { ...data };

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
    if (isValid) await props.resetPassword({ password: password.value });
  };

  return (
    <AuthLayout {...props}>
      <div className="gx-login-wrapper">
        <div className="gx-login-header-wrapper">
          <span>Reset Password</span>
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
          Reset
        </Button>
      </div>
    </AuthLayout>
  );
};

const mapStateToProps = ({ commonData }) => {
  const { error, message } = commonData;
  return { error, message };
};

export default connect(mapStateToProps, { resetPassword, tokenValidation })(ResetPassword);
