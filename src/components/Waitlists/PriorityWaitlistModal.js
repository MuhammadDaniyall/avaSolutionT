import React, { useEffect } from 'react';
import { Modal, Form, InputNumber, Button } from 'antd';
import { connect } from 'react-redux';

import Close from '@2fd/ant-design-icons/lib/Close';

const MoveWaitlistModal = ({ state, visible, formdata, handleClickPriority, closeModal, waitlistData }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(formdata);
  }, [visible]);

  const handelClick = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
        form.resetFields();
        console.log(waitlistData);
        handleClickPriority(values,waitlistData);
        visible = false;
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
      title={`Priority`}
      onCancel={closeModal}
      forceRender
      footer={[
        <Button key="submit" type="primary" onClick={handelClick}>
          {state ? 'Add' : 'Save'}
        </Button>,
      ]}
      width={400}
    >
      <Form form={form} style={{ textAlign: 'center' }}>
        <Form.Item
          className={'gx-flex-1'}
          name="priority"
          label={`Set Priority`}
          style={{ paddingRight: 5 }}
        >
          <InputNumber size="large" min={1} max={12} style={{ width: 150, borderRadius: 2 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = ({ waitlists }) => {
  const { waitlistData } = waitlists;
  return { waitlistData };
};

export default connect(mapStateToProps, {})(MoveWaitlistModal);
