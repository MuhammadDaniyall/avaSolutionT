import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Button, DatePicker, TimePicker } from 'antd';
import 'react-phone-input-2/lib/style.css';

import Close from '@2fd/ant-design-icons/lib/Close';

const CustomAwayModal = (props) => {
  const { visible, handleSubmit, closeModal, ID } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

  const handleClick = () => {
    form
      .validateFields()
      .then((values) => {

        handleSubmit({ ...values,resource_id:ID });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      closeIcon={<Close style={{ fontSize: 22 }} />}
      title={"Set as away until..."}
      onCancel={closeModal}
      forceRender
      footer={[
        <Button key="submit" type="primary" onClick={handleClick}>
          {'Save'}
        </Button>,
      ]}
      width={600}
    >
      <Form form={form} layout={'vertical'}>
        <Row className={'gx-flex-sm-row'}>
          <Col className={'gx-p-2'} span={24}>
            <Form.Item
              name="Date"
              label="Date"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <DatePicker></DatePicker>
            </Form.Item>
          </Col>
          <Col className={'gx-p-2'} span={24}>
            <Form.Item
              name="Time"
              label="Time"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <TimePicker format={'h:mm A'}></TimePicker>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CustomAwayModal;
