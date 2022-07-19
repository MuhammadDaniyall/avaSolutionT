import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';
import CustomerScreen from '../pages/Customers';
import UsersScreen from '../pages/Users';
import ControlFlowScreen from '../pages/Control Flow';
import PackagesScreen from '../pages/Packages';
import ReportingScreen from '../pages/Reporting';
import SettingScreen from '../pages/settings';
import SubscriptionScreen from '../pages/Subscriptions';
import TicketSupportScreen from '../pages/Ticket&Support';




const App = ({ match, auth }) => {
  return (

    <Switch>
      {/* <h1>test {`${match.url}`}</h1> */}
      <Route path={`/admin/dashboard`} component={Dashboard} />
      <Route path={`/admin/users-admin`} component={UsersScreen} />
      <Route path={`/admin/customers-admin`} component={CustomerScreen} />
       <Route path={`/admin/control-flows-admin`} component={ControlFlowScreen} />
      <Route path={`/admin/packages-admin`} component={PackagesScreen} />
      <Route path={`/admin/subscriptions-admin`} component={SubscriptionScreen} />
      <Route path={`/admin/website-settings-admin`} component={SettingScreen} />
      <Route path={`/admin/reporting-admin`} component={ReportingScreen} /> 
      <Route path={`/admin/ticket-support-admin`} component={TicketSupportScreen} /> 


      {/* {auth.user.role !== 'resource' ? (
        <Route path={`${match.url}settings`} component={SettingsScreen} />
      ) : (
          <Redirect to={'/dashboard'}></Redirect>
        )}
      <Route path={`${match.url}chat`} component={Chat} /> */}
    </Switch>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, {})(App);
