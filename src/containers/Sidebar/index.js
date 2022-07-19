import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Space, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { menuData } from '../../constants/MenuData';
import AvatarWithName from '../../components/common/AvatarWithName';
import logo from '../../assets/images/logo png.png';

const { Sider } = Layout;

const Sidebar = (props) => {
  const { pathname } = props;
  const [openKeys, setOpenKeys] = useState('');
  const [selectedKeys, setSelectedKeys] = useState('');

  useEffect(() => {
    const selectedKeys = pathname.substr(1);
    setSelectedKeys(selectedKeys);
    setOpenKeys(selectedKeys.split('/')[0]);
  }, [pathname]);

  const onOpenChange = (keys) => {
    if (keys[1]) {
      setOpenKeys(keys[1]);
    } else {
      setOpenKeys('');
    }
  };

  return (
    <Sider collapsed={false}>
      <div className={'sidebar-app-logo'}>
        <img src={logo} alt="logo" />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={[openKeys]}
        selectedKeys={[selectedKeys]}
        // style={{ width: 200, height: '100%' }}
        onOpenChange={onOpenChange}
      >
        {menuData.map((item) => {
          if (item.name == 'Settings') if (props.user.role == 'resource') return true;

          return (
            <Menu.Item key={item.key} icon={item.icon} style={{ display: 'flex', alignItems: 'center' }}>
              <Link to={item.pathname}>{item.name}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

const mapStateToProps = ({ auth, settings }) => {
  const { user } = auth;
  const { pathname } = settings;
  return { user, pathname };
};
export default connect(mapStateToProps)(Sidebar);
