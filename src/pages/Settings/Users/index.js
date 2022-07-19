/* eslint-disable react/jsx-key */
// settings/users component

import React, { useEffect, useState } from 'react';
import { List, Tooltip, Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { addManager, updateManager, getManagerData, deleteManager } from '../../../appRedux/actions/Settings';

// component
import UserForm from '../../../components/Settings/Users/UserForm';
import AvatarWithName from '../../../components/common/AvatarWithName';

import InformationOutline from '@2fd/ant-design-icons/lib/InformationOutline';
import Delete from '@2fd/ant-design-icons/lib/Delete';

const { confirm } = Modal;
const UsersSettings = (props) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleClick = () => {
    setFormData(null);
    setVisible(true);
  };

  useEffect(() => {
    initialData();
  }, []);

  useEffect(() => {
    groupData();
  }, [props.managerData]);

  const initialData = async () => {
    await props.getManagerData(props.user.id);
  };

  const groupData = () => {
    if (props.managerData) {
      setData(props.managerData);
    }
  };

  const handleEdit = (values) => {
    setFormData(values);
    setVisible(true);
  };

  const handleSubmit = async (values) => {
    setVisible(false);
    if (values.ID !== undefined) {
      await props.updateManager(values);
    } else {
      await props.addManager(values,props.user.id);
    }
  };

  const handleDelete = async (id) => {
    confirm({
      title: 'Are you sure delete this manager?',
      icon: <InformationOutline />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        await props.deleteManager(id);
      },
    });
  };
  return (
    <div className={'setting-form__wrapper waitlist-setting__form'}>
      <div className={'setting-form__header gx-d-flex gx-justify-content-between'}>
        <span>Users</span>
        <Button type={'primary'} onClick={handleClick}>
          Invite Users
        </Button>
      </div>
      <div className={'setting-form__body'}>
        <List className="item-list__wrapper" itemLayout="horizontal">
          <List.Item>
            <List.Item.Meta
              avatar={
                <AvatarWithName
                  name={props.user.username ? props.user.username : props.user.firstname + props.user.lastname}
                />
              }
              title={
                props.user.username
                  ? props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)
                  : props.user.firstname.charAt(0).toUpperCase() +
                    props.user.firstname.slice(1) +
                    '  ' +
                    props.user.lastname.charAt(0).toUpperCase() +
                    props.user.lastname.slice(1) +
                    '  (you)'
              }
              description={'admin'}
            />
          </List.Item>
          {data &&
            data.map((item) => {
              return (
                <List.Item
                  actions={[
                    <Tooltip title={'edit'} color={'#fff'}>
                      <Button onClick={() => handleEdit(item)}>Edit</Button>
                    </Tooltip>,
                    <Tooltip title={'Delete'} color={'#fff'}>
                      <Delete
                        className={'gx-text-danger'}
                        style={{ fontSize: 24 }}
                        onClick={() => handleDelete(item.ID)}
                      />
                    </Tooltip>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<AvatarWithName name={item.name} />}
                    title={
                      item.is_sign_up === 'true'
                        ? item.name?.charAt(0).toUpperCase() + item.name?.slice(1)
                        : [
                            <span>
                              {item.name?.charAt(0).toUpperCase() + item.name?.slice(1)}
                              <span className={'pending'}>pending</span>
                            </span>,
                          ]
                    }
                    description={'manager'}
                  />
                </List.Item>
              );
            })}
        </List>
      </div>
      <UserForm
        visible={visible}
        title={'Add Users'}
        formData={formData}
        handleSubmit={handleSubmit}
        closeModal={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = ({ auth, settings }) => {
  const { user } = auth;
  const { managerData } = settings;
  return { user, managerData };
};

export default connect(mapStateToProps, {
  addManager,
  getManagerData,
  updateManager,
  deleteManager,
})(UsersSettings);
