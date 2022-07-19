import React, { useEffect, useState } from 'react';
import { Form, Button, Typography, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { ResetSettings, ClearData, DeleteWaitList } from '../../../appRedux/actions/Settings';

import ClearConfirmModal from './ClearConfirmModal';
import ResetConfirmModal from './ResetConfirmModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const { Title, Text } = Typography;

const ResetAndDelete = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [ClearConfirmModalVisible, setClearConfirmModalVisible] = useState(false);
  const [ResetConfirmModalVisible, setResetConfirmModalVisible] = useState(false);
  const [DeleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);

  const closeClearModal = () => {
    setClearConfirmModalVisible(false);
  };

  const ClearhandleSubmit = async (values) => {
    const submitData = {};
    Object.getOwnPropertyNames(values).map((key) => {
      submitData[key] = values[key];
      return true;
    });
    submitData.user_id = props.user.id;
    await props.ClearData(submitData);
    setClearConfirmModalVisible(false);
  };
  const OpenClearModal = () => {
    setClearConfirmModalVisible(true);
  };

  const closeResetModal = () => {
    setResetConfirmModalVisible(false);
  };
  const resetHandleSubmit = async (values) => {
    const submitData = {};
    Object.getOwnPropertyNames(values).map((key) => {
      submitData[key] = values[key];
      return true;
    });
    submitData.user_id = props.user.id;
    await props.ResetSettings(submitData);
    setResetConfirmModalVisible(false);
  };
  const OpenResetModal = () => {
    setResetConfirmModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteConfirmModalVisible(false);
  };
  const deleteHandleSubmit = async (values) => {
    const submitData = {};
    Object.getOwnPropertyNames(values).map((key) => {
      submitData[key] = values[key];
      return true;
    });
    submitData.user_id = props.user.id;
    await props.DeleteWaitList(submitData);
    setDeleteConfirmModalVisible(false);
  };
  const OpenDeleteModal = () => {
    setDeleteConfirmModalVisible(true);
  };

  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Reset and delete data
          </Title>
          <Text>Restore settings and delete customer data.</Text>
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      {visible && (
        <Form layout={'vertical'}>
          <Row className={'gx-flex-sm-row'} style={{ marginTop: 20, alignItems: 'center' }}>
            <Col span={20}>
              <div>Restore all waitlist and bookings settings to the defaults.</div>
            </Col>
            <Col span={4}>
              <Button type={'default'} onClick={OpenResetModal} style={{ width: 170 }}>
                Reset settings
              </Button>
            </Col>
          </Row>
          <Row className={'gx-flex-sm-row'} style={{ marginTop: 20, alignItems: 'center' }}>
            <Col span={20}>
              <div>Delete all statistics and customer data for waitlist and bookings.</div>
            </Col>
            <Col span={4}>
              <Button type={'default'} onClick={OpenClearModal} style={{ width: 170, color: '#f24855' }}>
                Clear your data
              </Button>
            </Col>
          </Row>
          <Row className={'gx-flex-sm-row'} style={{ marginTop: 20, alignItems: 'center' }}>
            <Col span={20}>
              <div>Delete the location from your account including all customer data for waitlist and bookings.</div>
            </Col>
            <Col span={4}>
              <Button type={'default'} onClick={OpenDeleteModal} style={{ width: 170, color: '#f24855' }}>
                Delete waitlist
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      <ClearConfirmModal
        visible={ClearConfirmModalVisible}
        closeModal={closeClearModal}
        handleSubmit={ClearhandleSubmit}
      ></ClearConfirmModal>
      <ResetConfirmModal
        visible={ResetConfirmModalVisible}
        closeModal={closeResetModal}
        handleSubmit={resetHandleSubmit}
      ></ResetConfirmModal>
      <DeleteConfirmModal
        visible={DeleteConfirmModalVisible}
        closeModal={closeDeleteModal}
        handleSubmit={deleteHandleSubmit}
      ></DeleteConfirmModal>
    </div>
  );
};

// export default LocationName;
const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};
export default connect(mapStateToProps, {
  ResetSettings,
  ClearData,
  DeleteWaitList,
})(ResetAndDelete);
