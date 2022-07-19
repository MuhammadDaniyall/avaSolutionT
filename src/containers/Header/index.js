import React, { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown, Select, Typography, Row, Col } from 'antd';
import { connect } from 'react-redux';
import AvatarWithName from '../../components/common/AvatarWithName';
import { userSignOut } from '../../appRedux/actions/Auth';
import {
  getBusinessInfoSetting,
  getResourceDataByResource,
  updateResourceAvailable,
} from '../../appRedux/actions/Settings';
// import { getCustomers } from '../../appRedux/actions/Customer';

import AccountEditOutline from '@2fd/ant-design-icons/lib/AccountEditOutline';
import Logout from '@2fd/ant-design-icons/lib/Logout';
import CustomeAwayModal from '../../components/Settings/Resources/CustomAwayModal'
import moment from 'moment'
import Avatar from 'antd/lib/avatar/avatar';
import { baseURL } from '../../util/Api';

const { Title, Text } = Typography;
const { Header } = Layout;
const { Option } = Select;

const Topbar = (props) => {
  const { user, userSignOut } = props;
  const availablityClass = ['green__badge', 'orange__badge', 'red__badge'];
  const availablityText = ['Available', 'Away', 'Busy'];
  const [selectedResourceID, setSelectedResourceID] = useState(null);
  const [customVisible, setCustomVisible] = useState(false);
  console.log();
  var pageTitle = props.location.pathname.split("/")[1];
  pageTitle = pageTitle.toUpperCase();
  useEffect(() => {
    if (user) {
      init();
    }
  }, [user])
  const init = async () => {
    await props.getResourceDataByResource(user.id);
    await props.getBusinessInfoSetting(user.id);
  }
  // useEffect(()=>{

  // },[props.location.pathname])

  const handleAvailableUpdate = async (values) => {
    var submitData = "Custom," + moment(values['Date']).format("YYYY-MM-DD") + " " + moment(values['Time']).format("h:mm a");
    await props.updateResourceAvailable({ ID: values['resource_id'], available: submitData, where: 'header' });
    setCustomVisible(false);
  };

  const availableChange = async (type, resource_id) => {
    if (type == "custom") {
      setSelectedResourceID(resource_id);
      setCustomVisible(true);
      return;
    }
    var submitData = type;
    if (type == "BackIn1Hour") {
      submitData += "," + moment().add(1, 'hours').format("YYYY-MM-DD h:mm a");
    }
    else if (type == "BackIn30Min") {
      submitData += "," + moment().add(30, 'minutes').format("YYYY-MM-DD h:mm a");
    }
    await props.updateResourceAvailable({ ID: resource_id, available: submitData, where: 'header' });
  }

  const getAvailableOptions = (type) => {
    if (type == undefined) {
      var tempOption = [
        ['Away', 'set as away'],
        ['Busy', 'set as busy'],
        ['BackIn30Min', 'Back in 30 min'],
        ['BackIn1Hour', 'Back in 1 hour'],
        ['custom']
      ];
      return tempOption;
    }
    else if (type == "Away") {
      var tempOption = [
        ['Available', 'set as available'],
        ['Busy', 'set as busy'],
      ];
      return tempOption;
    }
    else if (type == "Busy") {
      var tempOption = [
        ['Available', 'set as available'],
        ['Away', 'set as away'],
        ['BackIn30Min', 'Back in 30 min'],
        ['BackIn1Hour', 'Back in 1 hour'],
        ['custom']
      ];
      return tempOption;
    }
    else if (type.startsWith('BackIn30Min')) {
      var tempOption = [
        ['Back', 'back at ' + type.split(",")[1]],
        ['Available', 'set as available'],
        ['Busy', 'set as busy'],
      ];
      return tempOption;
    }
    else if (type.startsWith('BackIn1Hour')) {
      var tempOption = [
        ['Back', 'back at ' + type.split(",")[1]],
        ['Available', 'set as available'],
        ['Busy', 'set as busy'],
      ];
      return tempOption;
    }
    else if (type.startsWith('Custom')) {
      var tempOption = [
        ['Back', 'back at ' + type.split(",")[1]],
        ['Available', 'set as available'],
        ['Busy', 'set as busy'],
      ];
      return tempOption;
    }
    else {
      var tempOption = [
        ['Away', 'set as away'],
        ['Busy', 'set as busy'],
        ['BackIn30Min', 'Back in 30 min'],
        ['BackIn1Hour', 'Back in 1 hour'],
        ['custom']
      ];
      return tempOption;
    }
  }
  const isAvailable = (type) => {
    if (type == undefined || type == "Available")
      return 0;
    else if (type.startsWith('BackIn1Hour') || type.startsWith('BackIn30Min') || type.startsWith('Custom') || type == "Away")
      return 1;
    else if (type == "Busy")
      return 2;
    else
      return 0;
  }


  const handleClick = ({ key }) => {
    switch (key) {
      case 'account':
        // userSignOut();
        break;
      case 'signout':
        userSignOut();
        break;
    }
  };

  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item
        key="account"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <AccountEditOutline style={{ fontSize: 22 }} />
        Account Settings
      </Menu.Item>
      <Menu.Item
        key="signout"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <Logout style={{ fontSize: 22 }} />
        Sign out
      </Menu.Item>
    </Menu>
  );
  // if user's role field is 'manger', display with his usermane.
  // in case admin, display with his firstname and lastname
  if (user.role == 'resource') {
    return (
      <Header>
        <div className="logo">{/* <img src={logo_img} alt="cultbay" /> */}</div>
        <Row className={'header__texts'}>
          <Col span={24}>
            {props.businessInfoSetting &&
              <Text className={'header__location'}>{props.businessInfoSetting['business_name']}</Text>
            }
          </Col>
          <Col span={24}>
            <Title className={'header__page'} level={3}>{pageTitle}</Title>
          </Col>
        </Row>
        <div style={{ flexGrow: 1 }}></div>
        {
          props.resourceUser &&
          <Select
            dropdownMatchSelectWidth={false}
            value={
              <span style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <div className={availablityClass[isAvailable(props.resourceUser.available)]}></div>
                <label>{availablityText[isAvailable(props.resourceUser.available)]}</label>
              </span>
            }
            clearIcon={<span>1</span>}
            style={{ width: 150 }}
            onChange={(e) => { availableChange(e, props.resourceUser.ID) }}
          >
            {
              getAvailableOptions(props.resourceUser.available).map(option => {
                return <Option key={option[0]} disabled={(option[0] == "Back")}>{option[1]}</Option>
              })
            }
          </Select>
        }
        {
          props.resourceUser &&
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
            <a className="ant-dropdown-link" style={{ marginLeft: 10 }} onClick={(e) => e.preventDefault()}>
              {
                props.resourceUser.img_path
                  ?
                  <Avatar src={`${baseURL}resource/avatar/${props.resourceUser.ID}`}></Avatar>
                  :
                  <AvatarWithName name={user.username} />

              }
             &nbsp;
            <span className={'username'}>
                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
              &nbsp;
            </span>
            </a>
          </Dropdown>
        }

        <CustomeAwayModal
          visible={customVisible}
          closeModal={() => {
            setCustomVisible(false);
          }}
          handleSubmit={handleAvailableUpdate}
          ID={selectedResourceID}
        ></CustomeAwayModal>
      </Header>
    );
  } else if(user.role == "manager"){
    return (
      <Header>
        <div className="logo">{/* <img src={logo_img} alt="cultbay" /> */}</div>
        <Row className={'header__texts'}>
          <Col span={24}>
            {props.businessInfoSetting &&
              <Text className={'header__location'}>{props.businessInfoSetting['business_name']}</Text>
            }
          </Col>
          <Col span={24}>
            <Title className={'header__page'} level={3}>{pageTitle}</Title>
          </Col>
        </Row>
        <div style={{ flexGrow: 1 }}></div>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <AvatarWithName name={user.username} /> &nbsp;
            <span className={'username'}>
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </span>
          </a>
        </Dropdown>
      </Header>
    );
  }
  else{
    return (
      <Header>
        <div className="logo">{/* <img src={logo_img} alt="cultbay" /> */}</div>
        <Row className={'header__texts'}>
          <Col span={24}>
            {props.businessInfoSetting &&
              <Text className={'header__location'}>{props.businessInfoSetting['business_name']}</Text>
            }
          </Col>
          <Col span={24}>
            <Title className={'header__page'} level={3}>{pageTitle}</Title>
          </Col>
        </Row>
        <div style={{ flexGrow: 1 }}></div>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <AvatarWithName name={user.firstname} /> &nbsp;
            <span className={'username'}>
              {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}
              &nbsp;{user.lastname.charAt(0).toUpperCase()}
            </span>
          </a>
        </Dropdown>
      </Header>
    );
  }
};

const mapStateToProps = ({ auth, settings }) => {
  const { token, user } = auth;
  const { resourceUser } = settings;
  const { businessInfoSetting } = settings;
  return { token, user, resourceUser, businessInfoSetting };
};

export default connect(mapStateToProps, { userSignOut, getResourceDataByResource, updateResourceAvailable, getBusinessInfoSetting })(Topbar);
