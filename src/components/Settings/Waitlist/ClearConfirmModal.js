import React from 'react';
import { Row, Col, Modal, Form, Input, Button, Checkbox, Tooltip, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const ClearConfirmModal = (props) => {
  const { visible, closeModal, handleSubmit } = props;

  const [form] = Form.useForm();
  const submit = async () => {
    await form.validateFields().then((values) => {
      handleSubmit(values);
    });
  };
  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      title={<b>Warning: This will delete your statistics and customer data for this location</b>}
      onCancel={closeModal}
      forceRender
      footer={null}
      width={700}
    >
      <Form form={form} layout={'vertical'}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Select what data to delete</Text>
        <Row className={'gx-flex-sm-row'}>
          <Col span={24}>
            <Form.Item name={'waiting_guests'} valuePropName="checked">
              <Checkbox>Waiting guests</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row className={'gx-flex-sm-row'}>
          <Col span={24}>
            <Form.Item name="bookings" valuePropName="checked">
              <Checkbox>Bookings</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row className={'gx-flex-sm-row'}>
          <Col span={24}>
            <Form.Item name={'served_guests'} valuePropName="checked">
              <Checkbox>Served guests</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row className={'gx-flex-sm-row'}>
          <Col span={24}>
            <Form.Item name={'completed_guests'} valuePropName="checked">
              <Checkbox>Completed guests</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row className={'gx-flex-sm-row'}>
          <Col span={24}>
            <Form.Item name={'customer_database'} valuePropName="checked">
              <Checkbox>Customer database including all guests</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row className={'gx-flex-sm-row'}>
          <Col span={24}>
            <Form.Item name={'analytics'} valuePropName="checked">
              <Checkbox>Analytics</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row className={'gx-flex-sm-row'}>
          <Col span={24}>
            <Form.Item name={'wait_time_statistics'} valuePropName="checked">
              <Checkbox>Wait time statistics</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row className={'gx-flex-sm-row'}>
          <Col span={24}>
            <Form.Item
              name="password"
              label={'All your data will be removed and it cannot be reversed. Are you sure?'}
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="Enter password" type={'password'}></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button onClick={submit} type={'danger'} style={{ width: 100, height: 35, fontWeight: 'bold' }}>
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClearConfirmModal;
