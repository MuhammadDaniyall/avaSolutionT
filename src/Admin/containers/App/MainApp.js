/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import socketIo from 'socket.io-client';

import App from '../../routes/index';
import Topbar from '../Header';
import Sidebar from '../Sidebar';
import { subcriptionURL } from '../../util/Api';
import { setSocket } from 'appRedux/actions/Common';

const { Content } = Layout;

const MainApp = (props) => {
  useEffect(() => {
    const socket = socketIo.connect(subcriptionURL, {
      transports: ['websocket'],
      path: '/socket.io',
    });

    socket.on('connect', () => {
      socket.emit('addUser', { userId: props.user.id, businessID: props.user.businessID });
      props.setSocket(socket);
    });
  }, []);

  return (
    <Layout className="gx-app-layout">
      <Sidebar />
      <Layout>
        <Topbar {...props} />
        <Content className={'gx-layout-content'}>
          <App match={props.match} />
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};
export default connect(mapStateToProps, { setSocket })(MainApp);
