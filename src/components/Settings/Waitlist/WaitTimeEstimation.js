import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Typography, Input, Tooltip, Row, Col, Switch } from 'antd';
import { connect } from 'react-redux';
import { getWaitListSettings, updateWaitListSetting } from '../../../appRedux/actions/Settings';

import { QuestionCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Title, Text } = Typography;
const durationType = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months'];

const WaitTimeEstimation = (props) => {
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
  const [estimationForm] = Form.useForm();

  const handleClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    props.getWaitListSettings(props.user.id);
  }, [visible]);

  const handleSubmit1 = async () => {
    const values = await estimationForm.validateFields();
    estimationForm.resetFields();
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
    estimationForm.setFieldsValue(props.WaitListSettings);
  }
  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Wait Time Estimation
          </Title>
          <Text>Settings for time estimation.</Text>
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      {visible && (
        <Form className={'gx-mt-4'} form={estimationForm} layout={'vertical'}>
          <Row className={'gx-flex-sm-row'}>
            <Col span={8}>
              <span>
                Use estimated service duration&nbsp;
                <Tooltip
                  color={'white'}
                  title="If WaitWhile should use service durations you have provided or predict how long each service takes based on your actual usage data."
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </Col>
            <Col span={6}>
              <Form.Item name={'service_duration'} valuePropName="checked">
                <Switch size={'default'} style={{ marginTop: -15 }}></Switch>
              </Form.Item>
            </Col>
          </Row>
          <Row className={'gx-flex-sm-row'}>
            <Col span={8}>
              <span>
                Number of people that serve client &nbsp;
                <Tooltip
                  color={'white'}
                  title="How many peopel or resources are able to serve customers in parallel.The more that can serve,the shorter the estimated wait time."
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </Col>
            <Col span={6}>
              <Form.Item name={'number_of_serve_people'}>
                <Input type={'number'}></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row className={'gx-flex-sm-row'}>
            <Col span={8}>
              <span>
                Default serve duration&nbsp;
                <Tooltip
                  color={'white'}
                  title="How long on average a client is served until completion before the next client can be served.This impact the wait time."
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </Col>
            <Col span={6}>
              <Form.Item name={'default_serve_duration'}>
                <Input type={'number'}></Input>
              </Form.Item>
            </Col>
            <Col span={6} style={{ marginLeft: 30 }}>
              <Form.Item name={'default_serve_duration_type'}>
                <Select>
                  {durationType.map((item) => {
                    return <Option key={item}>{item}</Option>;
                  })}
                </Select>
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
})(WaitTimeEstimation);
