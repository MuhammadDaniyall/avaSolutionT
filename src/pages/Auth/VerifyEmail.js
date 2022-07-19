import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { userSignOut, resendEmail } from '../../appRedux/actions/Auth';
import AuthLayout from '../../containers/Auth/AuthLayout';

// import email_img from '../../assets/images/email.png'

const VerifyEmail = (props) => {
  const [email, setEmail] = useState('john.smith@gmail.com');

  useEffect(() => {
    if (props.token === null) {
      props.history.push('/signin');
    } else {
      if (props.user.email_verified_at) props.history.push('/property/add');
      // props.history.push('/dashboard')
      else setEmail(props.user.email);
    }
  }, []);

  const handleBack = async () => {
    await props.userSignOut();
    props.history.push('/signin');
  };

  const handleResend = async () => {
    await props.resendEmail(props.user);
  };

  return (
    <AuthLayout {...props}>
      <div className="cb-verify-email-container">
        <div className="cb-verify-email-title">Verify your email address</div>
        <div className="cb-verify-email-subtitle">
          To complete your profile and start selling on eBay with <br />
          CultBay, you will need to verify your email address
        </div>
        <div className="cb-verify-email-iamge-container">{/* <img src={email_img} alt="email" /> */}</div>
        <div className="cb-verify-email-content">
          An email has been sent to <span className="email">{email}</span> with a link to verify your account. If you
          have not received the email after a few minutes, please check your spam folder.
        </div>
        <div className="cb-verify-email-button-container">
          <Button type="primary" ghost onClick={handleBack}>
            Back
          </Button>
          <Button type="primary" onClick={handleResend}>
            Resend email
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

const mapStateToProps = ({ auth }) => {
  const { token, user } = auth;
  return { token, user };
};

export default connect(mapStateToProps, { userSignOut, resendEmail })(VerifyEmail);
