// users component's form page
import React, { useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import 'react-phone-input-2/lib/style.css';

// icons
import Close from '@2fd/ant-design-icons/lib/Close';

const UserForm = (props) => {
  const { title, state, visible, handleSubmit, closeModal, formData } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(formData);
    } else {
      form.resetFields();
    }
  }, [visible]);

  const handleClick = () => {
    form
      .validateFields()
      .then((values) => {
        handleSubmit({ ...values });
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
      title={title}
      onCancel={closeModal}
      forceRender
      footer={[
        <Button key="submit" type="primary" onClick={handleClick}>
          {state ? 'Add' : 'Save'}
        </Button>,
      ]}
      width={600}
    >
      <Form form={form} layout={'vertical'}>
        <Row className={'gx-flex-sm-row'}>
          <Col className={'gx-p-2'} span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input type="text" placeholder="Name" />
            </Form.Item>
          </Col>
          <Col className={'gx-p-2'} span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Invalid email type!',
                },
              ]}
            >
              <Input type="text" placeholder="Email" />
            </Form.Item>
            <Form.Item name="ID" style={{ display: 'none' }}>
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

// export default UserForm;

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};
export default connect(mapStateToProps, {})(UserForm);
// export default connect(mapStateToProps, { addManager, getManagerData, updateManager })(UsersSettings);
