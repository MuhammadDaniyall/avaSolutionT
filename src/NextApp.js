import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Index from 'pages/index2/index2';
// import "assets/vendors/style";
import 'styles/ava.less';
//  Magnific-popup
import "./assets/css/magnific-popup.css";

//  css
import "./assets/css/bootstrap.min.css";
import "./assets/css/icons.css";
import "./assets/css/style.css";
import AdminDashboard from './Admin/containers/App/index'

import configureStore, { history } from './appRedux/store';
import App from './containers/App/index';

export const store = configureStore();

const NextApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/index" component={Index} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default NextApp;

