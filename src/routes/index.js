import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';
import WaitlistScreen from '../pages/Waitlist';
import CustomerScreen from '../pages/Customer';
import staff from '../pages/staff';
import ScheduleScreen from '../pages/Schedule';
import TaskScreen from '../pages/Task';
import ResourcesScreen from '../pages/Resources';
import ResourcesSchedule from '../pages/ResourcesSchedule';

import SettingsScreen from '../pages/Settings';
import Chat from '../pages/Chat';
// import Index from '../pages/index2/index2';

const App = ({ match, auth }) => {
  return (

    <Switch>

      <Route path={`${match.url}dashboard`} component={Dashboard} />
      <Route path={`${match.url}waitlist`} component={WaitlistScreen} />
      <Route path={`${match.url}schedule`} component={ScheduleScreen} />
      <Route path={`${match.url}customers`} component={CustomerScreen} />
      <Route path={`${match.url}staff`} component={staff} />
      <Route path={`${match.url}tasks`} component={TaskScreen} />
      <Route path={`${match.url}resources`} component={ResourcesScreen} />
      <Route path={`${match.url}resources-schedule`} component={ResourcesSchedule} />

      {auth.user.role !== 'resource' ? (
        <Route path={`${match.url}settings`} component={SettingsScreen} />
      ) : (
          <Redirect to={'/dashboard'}></Redirect>
        )}
      <Route path={`${match.url}chat`} component={Chat} />
    </Switch>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, {})(App);
