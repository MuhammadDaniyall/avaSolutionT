import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';

// import page;
import WaitlistSettings from './Waitlist';
import BookingSettings from './Booking';
import ServiceSettings from './Services';
import ResourceSettings from './Resources';
import AlertsSettings from './Alerts';
import UsersSettings from './Users';
import BusinessInfo from './BusinessInfo';
import Localization from './Localization';

const SettingsScreen = (props) => {
  const { location } = props;
  useEffect(() => {
    props.history.push({ state: { detail: 'waitlist' } });
  }, []);

  const handleClick = (e) => {
    props.history.push({ state: { detail: e.key } });
  };

  return (
    <div className={'settings__content-form'}>
      <div className={'content-from__left'}>
        <Menu onClick={handleClick} defaultSelectedKeys={['waitlist']} defaultOpenKeys={['waitlist']} mode="inline">
          <Menu.Item key="waitlist">Waitlist</Menu.Item>
          <Menu.Item key="booking">Booking</Menu.Item>
          <Menu.Item key="services">Services</Menu.Item>
          <Menu.Item key="resources">Resources</Menu.Item>
          <Menu.Item key="alerts">Alerts</Menu.Item>
          {
            props.user.role != "manager" &&
            <Menu.Item key="users">Users</Menu.Item>
          }
          <Menu.Item key="businessInfo">Business Info</Menu.Item>
          <Menu.Item key="localization">Localization</Menu.Item>
        </Menu>
      </div>
      <div className={'content-form__right'}>
        {location.state?.detail === 'waitlist' && <WaitlistSettings />}
        {location.state?.detail === 'booking' && <BookingSettings />}
        {location.state?.detail === 'services' && <ServiceSettings />}
        {location.state?.detail === 'resources' && <ResourceSettings />}
        {location.state?.detail === 'alerts' && <AlertsSettings />}
        {location.state?.detail === 'users' && <UsersSettings />}
        {location.state?.detail === 'businessInfo' && <BusinessInfo />}
        {location.state?.detail === 'localization' && <Localization />}
      </div>
    </div>
  );
};
const mapStateToProps = (({ auth }) => {
  const { user } = auth;
  return { user };
})
export default connect(mapStateToProps, {})(SettingsScreen);
