import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { connect } from 'react-redux';
import { getWaitListSettings, updateWaitListSetting } from '../../../appRedux/actions/Settings';
const { Title, Text } = Typography;

const LocationName = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    props.getWaitListSettings(props.user.id);
  }, [visible]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const submitData = props.WaitListSettings;
    Object.getOwnPropertyNames(values).map((key) => {
      submitData[key] = values[key];
      return true;
    });
    submitData.user_id = props.user.id;
    await props.updateWaitListSetting(submitData);
    setVisible(false);
  };

  if (props.WaitListSettings) {
    form.setFieldsValue(props.WaitListSettings);
  }
  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Location Name
          </Title>
          {props.WaitListSettings && (
            <Text>
              Your location name is <b>{props.WaitListSettings.location_name}</b>
            </Text>
          )}
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      <div style={{ width: '50%' }}>
        {visible && (
          <Form className={'gx-mt-4'} form={form} layout={'vertical'}>
            <Form.Item name="location_name" label={'Location Name'} rules={[{ required: true, message: 'Required' }]}>
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

// export default LocationName;
const mapStateToProps = ({ auth, settings }) => {
  const { user } = auth;
  const { WaitListSettings } = settings;
  return { user, WaitListSettings };
};
export default connect(mapStateToProps, {
  getWaitListSettings,
  updateWaitListSetting,
})(LocationName);
