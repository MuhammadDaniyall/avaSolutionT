import React, { useEffect, useState } from 'react';
import { Table, Tooltip, Space, Button, Modal, Typography } from 'antd';
import { connect } from 'react-redux';
import { UserAddOutlined } from '@ant-design/icons';
import {FaUserEdit} from 'react-icons/fa'
import{HiOutlineMail} from 'react-icons/hi'
import {IoMdPersonAdd} from 'react-icons/io'
import moment from 'moment';
import {
  getUsers,
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addWaitlists,
} from '../../appRedux/actions/User';

import {
  getField
}from "../../appRedux/actions/Settings"

import UserModal from '../../components/Users/UserModal';
import AvatarWithName from '../../components/common/AvatarWithName';

import Delete from '@2fd/ant-design-icons/lib/Delete';
import LeadPencil from '@2fd/ant-design-icons/lib/LeadPencil';
import InformationOutline from '@2fd/ant-design-icons/lib/InformationOutline';

const { confirm } = Modal;
const { Title } = Typography;

const UserScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [formdata, setFormData] = useState(null);
  const [modalTitle, setModalTitle] = useState('Add user to waitlist');

  const { user, userData, getUsers, addUser, getAllUsers, updateUser, deleteUser } = props;

  useEffect(() => {
    initialData();
  }, []);
  const initialData = async () => {
    // await props.getField(user.id)
    // await getUsers(user.id);
    await getAllUsers();
  };

  const columns = [
    {
      title: '',
      dataIndex: '',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      width: '20%',
      render: (text) => (
        <div className={'table-cell-avatar__name'}>
       

          <AvatarWithName name={text} />
          &nbsp;&nbsp;
          <span className={'username'}>{text?.charAt(0).toUpperCase() + text?.slice(1)}&nbsp;</span>
        </div>
      ),
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      width: '10%',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '10%',
    },
    
    // {
    //   title: 'Add to Waitlist',
    //   dataIndex: '',
    //   width: '15%',
    //   render: (row) => (
    //     <Button shape='circle' style={{backgroundColor:"#808000",color:"white"}} onClick={() => {handleClick(row.id)}}>
    //     <IoMdPersonAdd size={15}/>
    //     </Button>
    //   ),
    // },
    {
      title: 'Send Email',
      dataIndex: '',
      width: '10%',
      render: (row) => (
        <Button style={{backgroundColor:"#008080",color:"white"}} shape='circle' onClick={() => {SendEmail(row.id)}}>
<HiOutlineMail size={15}/>        </Button>
      ),
    },
    {
      title: 'Actions',
      dataIndex: '',
      
      render: (text, row) => (
        <Space size={15}>
          <Tooltip title="Edit" color={'#fff'}>
            <Button
              className={'content-form__circle__button gx-bg-secondary gx-border-secondary'}
              type="default"
              shape="circle"
              icon={<FaUserEdit/>}
              onClick={() => openModal(row)}
            />
          </Tooltip>
          <Tooltip title="Delete" color={'#fff'}>
            <Button
              className={'content-form__circle__button gx-bg-danger gx-border-danger'}
              type="default"
              shape="circle"
              icon={<Delete style={{ fontSize: 20 }} />}
              onClick={() => handleDelete(row.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <InformationOutline />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        await deleteUser(id);
      },
    });
  };

  const openModal = (values) => {
    console.log(values);
    setVisible(true);
    setFormData(values);
    if (values !== null) {
      setModalTitle('Edit User');
      setModalState(true);
    } else {
      setModalTitle('New User');
      setModalState(false);
    }
  };

  const handleSubmit = async (values) => {
    if (formdata === null) await addUser({ ...values, user_id: user.id });
    else await updateUser(formdata.id, values);
    setVisible(false);
  };

  // const handleClick = async (e) => {
  //   console.log(e);
  //   await props.addWaitlists({user_id:props.user.id,user_id:e});
  // };

  const SendEmail = async (e) => {
    console.log(e)
  };



  return (
    <div className={'content-form User__content-form'}>
      <div className={'content-form__header'}>
        <Title level={4}></Title>
        <Tooltip title="Add New User" color={'#fff'}>
        <Button  style={{color:'#e6fffb',backgroundColor:"#6495ED"}} shape='square'  onClick={() => openModal(null)} 
        icon={<UserAddOutlined />}>
        </Button>
        </Tooltip>
      </div>
      <div className={'content-form__form'}>
        <div className={'User__table gx-table-responsive'}>
        <Table
    columns={columns}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0,paddingLeft:"8%" }}><span style={{fontWeight:500}}>Description :</span> {record.description}</p>,
      rowExpandable: record => record.description !== null ,
    }}
    rowKey="id"
    dataSource={userData}
    pagination={{ position: ['bottomLeft'], pageSize: 5 }}
  />
        </div>
      </div>
      {/* {console.log(formdata)} */}
 
      <UserModal
        title={modalTitle}
        state={modalState}
        visible={visible}
        formdata={formdata}
        type={'user'}
        handleSubmit={handleSubmit}
        closeModal={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = ({ auth, users }) => {
  // console.log(users);
  const { user } = auth;
  const { userData } = users;
  return { user, userData };
};

export default connect(mapStateToProps, {
  getUsers,
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addWaitlists,
  getField,
})(UserScreen);
