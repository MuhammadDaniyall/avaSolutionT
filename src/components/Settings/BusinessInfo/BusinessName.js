import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { connect } from 'react-redux';
import { 
    getBusinessInfoSetting,
    updateBusinessInfoSetting, 
} from '../../../appRedux/actions/Settings';
const { Title, Text } = Typography;

const LocationName = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    props.getBusinessInfoSetting(props.user.id);
  }, [visible]);
  useEffect(() => {
      if (props.businessInfoSetting) {
        form.setFieldsValue(props.businessInfoSetting);
      }

  },[props.businessInfoSetting])

  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log(values);
    const submitData = props.businessInfoSetting;
    Object.getOwnPropertyNames(values).map((key) => {
      submitData[key] = values[key];
      return true;
    });
    submitData.user_id = props.user.id;
    await props.updateBusinessInfoSetting(submitData);
    setVisible(false);
  };

  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Business Name
          </Title>
          {props.businessInfoSetting && (
            <Text>
              Your Business name is <b>{props.businessInfoSetting.business_name}</b>
            </Text>
          )}
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      <div style={{ width: '50%' }}>
        {visible && (
          <Form className={'gx-mt-4'} form={form} layout={'vertical'}>
            <Form.Item name="business_name" label={'Business Name'} rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="Business Name" />
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
  const { businessInfoSetting } = settings;
  console.log(settings);
  return { user, businessInfoSetting };
};
export default connect(mapStateToProps, {
  getBusinessInfoSetting, 
  updateBusinessInfoSetting,
})(LocationName);
