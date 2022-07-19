/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';

import AppLocale from 'lngProvider';
import MainApp from './MainApp';
import SignIn from '../../pages/Auth/SignIn';
import SignUp from '../../pages/Auth/SignUp';
import ForgotPassword from '../../pages/Auth/ForgotPassword';
import ResetPassword from '../../pages/Auth/ResetPassword';
import VerifyEmail from '../../pages/Auth/VerifyEmail';
import CustomerAppointmentScreen from '../../pages/Appointment/CustomerAppointmentScreen';

// invite manager component
import Invite from '../../pages/Auth/invite';
// invite resource component
import InviteResource from '../../pages/Auth/invite_resource';

import axios from 'util/Api';
import { setInitUrl } from 'appRedux/actions/Auth';
import { getUser } from '../../appRedux/actions/Auth';

const RestrictedRoute = ({ component: Component, token, ...rest }) => {
  if(token){
    axios.defaults.headers.common.Authorization = 'Bearer ' + token;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

class App extends Component {
  componentWillMount() {
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token && !nextProps.user) {
      this.props.getUser();
    }
  }

  render() {
    const { match, location, locale, token, initURL } = this.props;
    if (location.pathname === '/') {
      if (token === null) {
        return <Redirect to={'/signin'} />;
      } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
        return <Redirect to={'/dashboard'} />;
      } else {
        return <Redirect to={initURL} />;
      }
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
          <Switch>
            <Route exact path="/signin" component={SignIn} />

            {/* invite component */}
            <Route exact path="/invite/:ID" component={Invite} />
            {/* invite_resource component */}
            <Route exact path="/invite_resource/:ID" component={InviteResource} />

            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:token" component={ResetPassword} />
            <Route exact path="/verify-email" component={VerifyEmail} />
            <Route exact path="/appointment/:random_key" component={CustomerAppointmentScreen} />
            <RestrictedRoute path={`${match.url}`} token={token} component={MainApp} />
          </Switch>
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { locale } = settings;
  const { user, token, initURL } = auth;
  return { locale, token, user, initURL };
};
export default connect(mapStateToProps, { setInitUrl, getUser })(App);
