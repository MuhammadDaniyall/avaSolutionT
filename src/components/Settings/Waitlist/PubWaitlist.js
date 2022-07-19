import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';

const { Title, Text } = Typography;

const PubWaitlist = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log(values);
  };

  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Public Waitlsit
          </Title>
          <Text>Client can view your waitlist online at v2.waitwhile.com/l/vly010.</Text>
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      <div style={{ width: '50%' }}>
        {visible && (
          <Form className={'gx-mt-4'} form={form} layout={'vertical'}>
            <Form.Item name="location_name" label={'Location Name'}>
              <Input placeholder="Location Name" />
            </Form.Item>
            <Form.Item className={'gx-mb-0'}>
              <Button type="primary" onClick={handleSubmit}>
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default PubWaitlist;
