import React from 'react';
import { Row, Col, Modal, Form, Input, Button, Checkbox, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const ClearConfirmModal = (props) => {
  const { visible, closeModal, handleSubmit } = props;
  const [form] = Form.useForm();
  const submit = async() => {
    await form.validateFields().then((values) => {
      handleSubmit(values);
    });
  };
  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      title={<b>Warning: This will delete the location from your account</b>}
      onCancel={closeModal}
      forceRender
      footer={null}
      width={700}
    >
      <Form form={form} layout={'vertical'}>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Required' }]}
          label={'All your data will be removed and it cannot be reversed. Are you sure?'}
        >
          <Input placeholder="Enter password" type={'password'}></Input>
        </Form.Item>
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
