import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Typography, Tooltip, Row, Col, Switch } from 'antd';
import { connect } from 'react-redux';
import { getWaitListSettings, updateWaitListSetting } from '../../../appRedux/actions/Settings';

import { QuestionCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Title, Text } = Typography;
const statusIndicator = ['Estimated wait and order in line', 'Only order in line', 'Only estimated wait', 'Hide both'];

const CustomerStatus = (props) => {
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

  const handleSubmit1 = async () => {
    const values = await form.validateFields();
    form.resetFields();
    const submitData = props.WaitListSettings;
    Object.getOwnPropertyNames(values).map((key) => {
      submitData[key] = values[key];
      return true;
    });
    submitData.user_id = props.user.id;
    console.log(submitData);
    await props.updateWaitListSetting(submitData);
    setVisible(false);
  };

  if (props.WaitListSettings) {
    // console.log(props.WaitListSettings);
    form.setFieldsValue(props.WaitListSettings);
  }
  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Customer status page
          </Title>
          <Text>Settings for the page where your customer can view their wait status.</Text>
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      {visible && (
        <Form className={'gx-mt-4'} form={form} layout={'vertical'}>
          <Row className={'gx-flex-sm-row'}>
            <Col span={8}>
              <span>
                Status indicator&nbsp;
                <Tooltip color={'white'} title="How to show waitlist progress for the customer.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </Col>
            <Col span={6}>
              <Form.Item name={'status_indicator'}>
                <Select>
                  {statusIndicator.map((item) => {
                    return <Option key={item}>{item}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className={'gx-flex-sm-row'}>
            <Col span={8}>
              <span>
                Hide cancel &nbsp;
                <Tooltip color={'white'} title="Cutomer is not allowed to cancel place in line">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </Col>
            <Col span={6}>
              <Form.Item name={'hide_cancel'} valuePropName="checked">
                <Switch></Switch>
              </Form.Item>
            </Col>
          </Row>
          <Row className={'gx-flex-sm-row'}>
            <Col span={8}>
              <span>
                Show "Call Business" option&nbsp;
                <Tooltip color={'white'} title="If customer can call your business phone from status page">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </Col>
            <Col span={6}>
              <Form.Item name={'call_business'}>
                <Switch></Switch>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit1}>
              save
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth, settings }) => {
  const { user } = auth;
  const { WaitListSettings } = settings;
  return { user, WaitListSettings };
};
export default connect(mapStateToProps, {
  getWaitListSettings,
  updateWaitListSetting,
})(CustomerStatus);
