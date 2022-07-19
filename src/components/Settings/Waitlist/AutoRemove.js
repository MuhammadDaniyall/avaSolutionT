import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Typography } from 'antd';
import { connect } from 'react-redux';
import { getWaitListSettings, updateWaitListSetting } from '../../../appRedux/actions/Settings';

const { Option } = Select;
const { Title, Text } = Typography;

const AutoRemove = (props) => {
  const date = [
    'never',
    '1hours',
    '2hours',
    '3hours',
    '4hours',
    '5hours',
    '6hours',
    '7hours',
    '8hours',
    '9hours',
    '10hours',
    '1days',
    '2days',
    '3days',
    '4days',
    '5days',
    '6days',
    '7days',
    '1months',
    '2months',
    '3months',
    '6months',
  ];
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

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
            Auto Remove
          </Title>
          {props.WaitListSettings && (
            <Text>
              Client are automatically removed from your waitlist after <b>{props.WaitListSettings.waiting}</b> and from
              your serving page after <b>{props.WaitListSettings.serving}</b>
            </Text>
          )}
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      {visible && (
        <Form className={'gx-mt-4'} form={form} layout={'vertical'}>
          <div className={'gx-d-flex gx-justify-content-between'}>
            <div style={{ width: '49%' }}>
              <Form.Item
                name="waiting"
                label={'Remove waiting client after...'}
                rules={[{ required: true, message: 'reqired!' }]}
              >
                <Select>
                  {date.map((item) => {
                    return <Option key={item}>{item}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div style={{ width: '49%' }}>
              <Form.Item
                name="serving"
                label={'Remove serving clients after...'}
                rules={[{ required: true, message: 'reqired!' }]}
              >
                <Select>
                  {date.map((item) => {
                    return <Option key={item}>{item}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
          </div>
          <Form.Item className={'gx-mb-0'}>
            <Button type="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

// export default AutoRemove;
const mapStateToProps = ({ auth, settings }) => {
  const { user } = auth;
  const { WaitListSettings } = settings;
  return { user, WaitListSettings };
};
export default connect(mapStateToProps, {
  getWaitListSettings,
  updateWaitListSetting,
})(AutoRemove);
