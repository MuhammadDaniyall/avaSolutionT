import React, { useState, useEffect } from 'react';
import { Table, Tooltip, Space, Button, Modal, Typography, Dropdown, Menu, Row, Col, message } from 'antd';
import { connect } from 'react-redux';
import {
  getWaitlists,
  addWaitlist,
  updateWaitlist,
  deleteWaitlist,
  addToWaitlistFromServed,
} from '../../appRedux/actions/Waitlists';
import {
  getField,
  getResourceData,
} from '../../appRedux/actions/Settings'
// import CustomerModal from '../../components/Customers/CustomerModal';
import WaitlistModal from '../../components/Waitlists/WaitlistModal';

import MoveWaitlistModal from '../../components/Waitlists/MoveWaitlistModal';
import PriorityWaitlistModal from '../../components/Waitlists/PriorityWaitlistModal';
import AvatarWithName from '../../components/common/AvatarWithName';
import moment from 'moment';

import LeadPencil from '@2fd/ant-design-icons/lib/LeadPencil';
import DeleteOutline from '@2fd/ant-design-icons/lib/DeleteOutline';
import CheckBold from '@2fd/ant-design-icons/lib/CheckBold';
import DotsHorizontal from '@2fd/ant-design-icons/lib/DotsHorizontal';
import SwapVertical from '@2fd/ant-design-icons/lib/SwapVertical';
import CubeSend from '@2fd/ant-design-icons/lib/CubeSend';
import ChatOutline from '@2fd/ant-design-icons/lib/ChatOutline';
import CloseThick from '@2fd/ant-design-icons/lib/CloseThick';
import PlaylistPlus from '@2fd/ant-design-icons/lib/PlaylistPlus';
import InformationOutline from '@2fd/ant-design-icons/lib/InformationOutline';

const { confirm } = Modal;
const { Title } = Typography;

const WaitlistScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [formdata, setFormData] = useState(null);
  const [modalTitle, setModalTitle] = useState('Add customer to waitlist');
  const [modalType, setModalType] = useState('waitlist');
  const [moveModal, setMoveModal] = useState(false);
  const [PriorityModal, setPriorityModal] = useState(false);


  const {
    user,
    waitlistData,
    priorityData,
    servedData,
    getWaitlists,
    addWaitlist,
    updateWaitlist,
    deleteWaitlist,
    addToWaitlistFromServed,
  } = props;
  console.log(user);

  const waitlistMenu = (row) => (
    <Menu onClick={(e) => handleMenuClick(e, 'waitlist', row)}>
      <Menu.Item
        key="send"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <CubeSend style={{ fontSize: 22 }} />
        Send Position
      </Menu.Item>
      <Menu.Item
        key="move"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <SwapVertical style={{ fontSize: 22 }} />
        Move
      </Menu.Item>
      <Menu.Item
        key="priority"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <SwapVertical style={{ fontSize: 22 }} />
        Set Priority
      </Menu.Item>
      <Menu.Item
        key="chat"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <ChatOutline style={{ fontSize: 22 }} />
        Chat
      </Menu.Item>
      <Menu.Item
        key="edit"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <LeadPencil style={{ fontSize: 22 }} />
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <DeleteOutline style={{ fontSize: 22 }} />
        Delete
      </Menu.Item>
    </Menu>
  );

  const priorityMenu = (row) => (
    <Menu onClick={(e) => handleMenuClick(e, 'priority', row)}>
      {/* <Menu.Item
        key="send"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <CubeSend style={{ fontSize: 22 }} />
        Send Position
      </Menu.Item> */}
      {/* <Menu.Item
        key="move"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <SwapVertical style={{ fontSize: 22 }} />
        Move
      </Menu.Item> */}
      
      <Menu.Item
        key="edit"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <LeadPencil style={{ fontSize: 22 }} />
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <DeleteOutline style={{ fontSize: 22 }} />
        Delete
      </Menu.Item>
    </Menu>
  );

  const servedMenu = (row) => (
    <Menu onClick={(e) => handleMenuClick(e, 'served', row)}>
      <Menu.Item
        key="addtowaitlist"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <PlaylistPlus style={{ fontSize: 22 }} />
        Add to waitlist
      </Menu.Item>
      <Menu.Item
        key="edit"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <LeadPencil style={{ fontSize: 22 }} />
        Edit
      </Menu.Item>
      {/* <Menu.Item
        key="delete"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 45,
        }}
      >
        <DeleteOutline style={{ fontSize: 22 }} />
        Delete
      </Menu.Item> */}
    </Menu>
  );

  const waitlistColumns = [
    {
      title: 'ID',
      dataIndex: 'order_num',
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '75%',
      render: (text, row) => (
        <div className={'table-cell-avatar__name'}>
          <AvatarWithName name={text} />
          <div style={{ marginLeft: 10 }}>
            <b className={'username'}>{text.charAt(0).toUpperCase() + text.slice(1)}&nbsp;</b>
            <br></br>
            <span className={'customer-note'} style={{ fontSize: 12 }}>
              {row.description}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Wait',
      dataIndex: 'wait_time',
      width: '10%',
      render: (text, row) => <>{moment(text).fromNow(true)}</>,
    },
    {
      title: 'Actions',
      dataIndex: '10%',
      render: (text, row) => (
        <Space size={15}>
          <Tooltip title={'Serve'} color={'#fff'}>
            <Button
              className={'content-form__circle__button gx-bg-success gx-border-success'}
              type="default"
              shape="circle"
              icon={<CheckBold style={{ fontSize: 20 }} />}
              onClick={() => handleServBtnClick(row)}
            />
          </Tooltip>
          <Tooltip title="More" color={'#fff'}>
            <Dropdown overlay={waitlistMenu(row)} trigger={['click']} placement="bottomRight" arrow>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Button
                  className={'content-form__circle__more__button gx-bg-white gx-border-grey'}
                  type="default"
                  shape="circle"
                  icon={<DotsHorizontal style={{ fontSize: 20 }} />}
                />
              </a> 
            </Dropdown>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const priorityColumns = [
    {
      title: 'ID',
      dataIndex: 'order_num',
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '65%',
      render: (text, row) => (
        <div className={'table-cell-avatar__name'}>
          <AvatarWithName name={text} />
          <div style={{ marginLeft: 10 }}>
            <b className={'username'}>{text.charAt(0).toUpperCase() + text.slice(1)}&nbsp;</b>
            <br></br>
            <span className={'customer-note'} style={{ fontSize: 12 }}>
              {row.description}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      width: '10%',
      render: (text, row) => <>{text}</>,
    },
    {
      title: 'Wait',
      dataIndex: 'wait_time',
      width: '10%',
      render: (text, row) => <>{moment(text).fromNow(true)}</>,
    },
    
    {
      title: 'Actions',
      dataIndex: '10%',
      render: (text, row) => (
        <Space size={15}>
          <Tooltip title={'Serve'} color={'#fff'}>
            <Button
              className={'content-form__circle__button gx-bg-success gx-border-success'}
              type="default"
              shape="circle"
              icon={<CheckBold style={{ fontSize: 20 }} />}
              onClick={() => handleServBtnClick(row)}
            />
          </Tooltip>
          <Tooltip title="More" color={'#fff'}>
            <Dropdown overlay={priorityMenu(row)} trigger={['click']} placement="bottomRight" arrow>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Button
                  className={'content-form__circle__more__button gx-bg-white gx-border-grey'}
                  type="default"
                  shape="circle"
                  icon={<DotsHorizontal style={{ fontSize: 20 }} />}
                />
              </a>
            </Dropdown>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const servedColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '75%',
      render: (text, row) => (
        <div className={'table-cell-avatar__name'}>
          <AvatarWithName name={text} />
          <div style={{ marginLeft: 10 }}>
            <b className={'username'}>{text.charAt(0).toUpperCase() + text.slice(1)}&nbsp;</b>
            <br></br>
            <span className={'customer-note'} style={{ fontSize: 12 }}>
              {row.description}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Served',
      dataIndex: 'serve_time',
      width: '10%',
    },
    {
      title: 'Actions',
      dataIndex: '10%',
      render: (text, row) => (
        <Space size={15}>
          <Tooltip title={'Delete'} color={'#fff'}>
            <Button
            onClick={()=>handleDelete(row.id)}
              className={'content-form__circle__button gx-bg-danger gx-border-danger'}
              type="default"
              shape="circle"
              icon={<CloseThick style={{ fontSize: 20 }} />}
              // onClick={() => handleServBtnClick(row)}
            />
          </Tooltip>
          <Tooltip title="More" color={'#fff'}>
            <Dropdown overlay={servedMenu(row)} trigger={['click']} placement="bottomRight" arrow>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Button
                  className={'content-form__circle__more__button gx-bg-white gx-border-grey'}
                  type="default"
                  shape="circle"
                  icon={<DotsHorizontal style={{ fontSize: 20 }} />}
                />
              </a>
            </Dropdown>
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    initialData();
  }, []);

  const initialData = async () => {
    await props.getField(user.id);
    await props.getResourceData(user.id);
    await props.getWaitlists(user.id);
  };

  const handleMenuClick = (e, type, row) => {
    switch (e.key) {
      case 'send':
        alert("Coming soon")
        break;
      case 'edit': 
        openModal(type, row);
        break;
      case 'delete':
        handleDelete(row.id);
        break;
      case 'addtowaitlist':
        addToWaitlistFromServed(row);
        props.getWaitlists(user.id);
        console.log('serve got')
        break;
      case 'move':
        moveWaitlist(row);
        break;
      case 'priority':
        priorityWaitlist(row);
        break;
    }
  };

  const openModal = (type, values) => {
    setFormData(values);
    if (values === null) {
      setModalState(true);
    } else {
      setModalState(false);
    }

    if (type === 'waitlist' && values === null) {
      setModalTitle('Add customer to waitlist');
    } else if (type === 'waitlist' && values !== null) {
      setModalTitle(`Edit ${values.name}`);
    }
    // else if (type === 'priority' && values === null) {
    //   setModalTitle('Serve customer');
    // } 
    else if (type === 'priority' && values !== null) {
      setModalTitle(`Edit ${values.name}`);
    }else if (type === 'served' && values === null) {
      setModalTitle('Serve customer');
    } else if (type === 'served' && values !== null) {
      setModalTitle(`Edit ${values.name}`);
    }
    setModalType(type);
    setVisible(true);
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure delete this waitlist?',
      icon: <InformationOutline />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        await deleteWaitlist(id);
        await getWaitlists(user.id);

      },
    });
  };

  const handleServBtnClick = async (row) => {
    console.log('serve')
    if (row.resource_id == null) {
      message.warning("No resource assigned to this customer.");
    }
    else {
      var id = user.id;
      row['user_id'] = id;
      row['priority'] = 'null';

      await updateWaitlist(row);
      await getWaitlists(user.id)

      console.log(row)

    }

  };

  // const handleServBtnClickFromPrority = async (row) => {
  //   console.log('serve')
  //   if (row.resource_id == null) {
  //     message.warning("No resource assigned to this customer.");
  //   }
  //   else {
  //     var id = user.id;
  //     row['user_id'] = id;

  //     await updateWaitlist(row);
  //     await getWaitlists(user.id)

  //     console.log(row)

  //   }

  // };

  const handleClickPriority = async (row, data) => {
    // if (row.resource_id == null) {
    //   message.warning("No resourece assigned to this customer.");
    // }
    // else {
      console.log(row);
      var id = user.id;
      row['user_id'] = id;
      row['id'] = data[0].id;
      console.log(row);
      console.log( data[0].id);
      console.log(row['id'])
      console.log(waitlistData)
      setPriorityModal(false)
      await updateWaitlist(row);
      await getWaitlists(user.id);

    // }
  };

  const handleClickMove= async (row, data) => {
  
      // console.log(row);
      // var id = user.id;
      // row['user_id'] = id;
      // row['id'] = data[0].id;
      // waitlistData.order_num=row.order_num
      // console.log(row);
      // console.log( data[0].id);
      // console.log(row['id'])
      // console.log(waitlistData)
      
      setMoveModal(false)
      // await updateWaitlist(row);
      // await getWaitlists(user.id);

    // }
  };

  const handleSubmit = async (values) => {
    setVisible(false);
    await addWaitlist({
      ...values,
      user_id: user.id,
      is_add: modalState,
      customer_id: formdata?.customer_id,
      id: formdata?.id,
      modal_type: modalType,
    });
    await getWaitlists(user.id);
  };
  // console.log(customer_id)

  const moveWaitlist = async (values) => {
    setFormData(values);
    setMoveModal(true);
  };

  const priorityWaitlist = async (values) => {
    setFormData(values);
    setPriorityModal(true);
  };

  return (
    <div className={'content-form waitlist__content-form'}>
      <div className={'content-form__header'}>
        <Title level={4}></Title>
      </div>
      <Row>
        <Col span={12}>
          <div className={'content-form__form'} style={{ marginRight: 10 }}>
            <div className={'waitlists__table gx-d-flex gx-justify-content-between gx-mb-30'}>
              <Title level={5}>Waitlist</Title>
              <Button type={'primary'} onClick={() => openModal('waitlist', null)}>
                New Waitlist
              </Button>
            </div>
            <div className={'waitlists__table gx-table-responsive'}>
              <Table
                columns={waitlistColumns}
                dataSource={waitlistData}
                rowKey={'id'}
                pagination={{ position: ['bottomLeft'], pageSize: 5 }}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className={'content-form__form'} style={{ marginRight: 10 }}>
            <div className={'waitlists__table gx-d-flex gx-justify-content-between gx-mb-30'}>
              <Title level={5}>Priority</Title>
              {/* <Button type={'primary'} onClick={() => openModal('waitlist', null)}>
                New Priority
              </Button> */}
            </div>
            <div className={'waitlists__table gx-table-responsive'}>
              <Table
                columns={priorityColumns}
                dataSource={priorityData}
                rowKey={'id'}
                pagination={{ position: ['bottomLeft'], pageSize: 5 }}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className={'mt-5 content-form__form'} >
            <div className={'waitlists__table gx-d-flex gx-justify-content-between gx-mb-30'}>
              <Title level={5}>Served</Title>
              <Button type={'primary'} onClick={() => openModal('served', null)}>
                New Served
              </Button>
            </div>
            <div className={'waitlists__table gx-table-responsive'}>
              <Table
                columns={servedColumns}
                dataSource={servedData}
                rowKey={'id'}
                pagination={{ position: ['bottomLeft'], pageSize: 5 }}
              />
            </div>
          </div>
        </Col>
      </Row>
    
      <WaitlistModal
        title={modalTitle}
        state={modalState}
        visible={visible}
        formdata={formdata}
        type={(props.user.role != 'resource') ? 'waitlist' : ''}
        handleSubmit={handleSubmit}
        closeModal={() => {
          setVisible(false);
        }}
      />
      <MoveWaitlistModal
      handleSubmit={handleClickMove}
        visible={moveModal}
        formdata={formdata}
        closeModal={() => {
          setMoveModal(false);
        }}
      />
      <PriorityWaitlistModal
        visible={PriorityModal}
        formdata={formdata}
        handleClickPriority={handleClickPriority}
        closeModal={() => {
          setPriorityModal(false);
        }}
      />

    </div>
  );
};

const mapStateToProps = ({ auth, waitlists }) => {
  const { user } = auth;
  const { waitlistData, servedData, priorityData } = waitlists;
  return { user, waitlistData, servedData, priorityData };
};

export default connect(mapStateToProps, {
  getResourceData,
  getWaitlists,
  addWaitlist,
  updateWaitlist,
  deleteWaitlist,
  addToWaitlistFromServed,
  getField,
})(WaitlistScreen);
