import React, { useEffect, useState } from 'react';
import { Table, Tooltip, Space, Button, Modal, Typography } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  addWaitlists,
} from '../../appRedux/actions/Customer';

import {
  getField
}from "../../appRedux/actions/Settings"

import CustomerModal from '../../components/Customers/CustomerModal';
import AvatarWithName from '../../components/common/AvatarWithName';

import Delete from '@2fd/ant-design-icons/lib/Delete';
import LeadPencil from '@2fd/ant-design-icons/lib/LeadPencil';
import InformationOutline from '@2fd/ant-design-icons/lib/InformationOutline';

const { confirm } = Modal;
const { Title } = Typography;

const CustomerScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [formdata, setFormData] = useState(null);
  const [modalTitle, setModalTitle] = useState('Add customer to waitlist');

  const { user, customerData, getCustomers, addCustomer, updateCustomer, deleteCustomer } = props;

  useEffect(() => {
    initialData();
  }, []);
  const initialData = async () => {
    await props.getField(user.id)
    await getCustomers(user.id);
  };
  var data = 
  {
    created_at: "2021-02-05T07:12:27.000Z",
    customer_group_id: null,
    description: null,
    email: "22",
    id: 147,
    meta: [],
    name: "22",
    phone: null,
    updated_at: "2021-02-05T07:12:27.000Z",
    user_id: 1,
  }
  const columns = [
    {
      title: '',
      dataIndex: '',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      render: (text) => (
        <div className={'table-cell-avatar__name'}>
          <AvatarWithName name={text} />
          &nbsp;&nbsp;
          <span className={'username'}>{text.charAt(0).toUpperCase() + text.slice(1)}&nbsp;</span>
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
    {
      title: 'Description',
      dataIndex: 'description',
      width: '50%',
    },
    {
      title: 'Add to Waitlist',
      dataIndex: '',
      width: '5%',
      render: (row) => (
        <Button type="primary" onClick={() => {handleClick(row.id)}}>
          Add Waitlist
        </Button>
      ),
    },
    {
      title: 'Send SMS',
      dataIndex: '',
      width: '5%',
      render: (row) => (
        <Button type="primary" onClick={() => {SendSMS(row.id)}}>
          Send SMS
        </Button>
      ),
    },
    {
      title: 'Send Email',
      dataIndex: '',
      width: '5%',
      render: (row) => (
        <Button type="primary" onClick={() => {SendEmail(row.id)}}>
          Send Email
        </Button>
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
              icon={<LeadPencil style={{ fontSize: 20 }} />}
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
      title: 'Are you sure delete this customer?',
      icon: <InformationOutline />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        await deleteCustomer(id);
      },
    });
  };

  const openModal = (values) => {
    setFormData(values);
    if (values === null) {
      setModalTitle('Edit Customer');
      setModalState(true);
    } else {
      setModalTitle('New Customer');
      setModalState(false);
    }
    setVisible(true);
  };

  const handleSubmit = async (values) => {
    if (formdata === null) await addCustomer({ ...values, user_id: user.id });
    else await updateCustomer(formdata.id, values);
    setVisible(false);
  };

  const handleClick = async (e) => {
    await props.addWaitlists({user_id:props.user.id,customer_id:e});
  };
  const SendSMS = async (e) => {
    console.log(e);
  };
  const SendEmail = async (e) => {
    console.log(e)
  };

  return (
    <div className={'content-form customer__content-form'}>
      <div className={'content-form__header'}>
        <Title level={4}></Title>
        <Button type="primary" className={'content-form__button'} onClick={() => openModal(null)}>
          + New Customer
        </Button>
      </div>
      <div className={'content-form__form'}>
        <div className={'customer__table gx-table-responsive'}>
          <Table
            columns={columns}
            dataSource={customerData}
            rowKey="id"
            pagination={{ position: ['bottomLeft'], pageSize: 5 }}
          />
        </div>
      </div>
      <CustomerModal
        title={modalTitle}
        state={modalState}
        visible={visible}
        formdata={formdata}
        type={'customer'}
        handleSubmit={handleSubmit}
        closeModal={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = ({ auth, customer }) => {
  const { user } = auth;
  const { customerData } = customer;
  return { user, customerData };
};

export default connect(mapStateToProps, {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  addWaitlists,
  getField,
})(CustomerScreen);
