import React, { useState, useEffect } from 'react';
import { Form, Button, Typography, Input, Tooltip, Row, Col, Switch } from 'antd';

import { QuestionCircleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const WaitListRuleForm = (props) => {
  const { visible, data, onFinish } = props;
  const [form] = Form.useForm();

  const [limitMaxWaitNumberVisible, setlimitMaxWaitNumberVisible] = useState(true);
  useEffect(() => {
    if (visible) {
      form.setFieldsValue(data);
      change(data.limit_max_waiting);
    }
  }, [visible]);

  const change = (value) => {
    if (!value) {
      setlimitMaxWaitNumberVisible(true);
    } else {
      setlimitMaxWaitNumberVisible(false);
    }
  };

  return (
    <Form className={'gx-mt-4'} form={form} onFinish={onFinish} hidden={!visible} layout={'vertical'}>
      <Row className={'gx-flex-sm-row'}>
        <Col span={8}>
          <span>
            Limit max waiting&nbsp;
            <Tooltip color={'white'} title="If you want limit the number client in your waitlist at any time">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        </Col>
        <Col span={4}>
          <Form.Item name={'limit_max_waiting'} valuePropName="checked">
            <Switch
              size={'default'}
              style={{ marginTop: -15 }}
              onChange={(e) => {
                change(e);
              }}
            ></Switch>
          </Form.Item>
        </Col>
        <Col span={6} hidden={limitMaxWaitNumberVisible}>
          <Text>Max # of waiting:</Text>
        </Col>
        <Col span={6} hidden={limitMaxWaitNumberVisible}>
          <Form.Item name="limit_max_wait_number">
            <Input style={{ marginTop: -9 }} type={'number'}></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row className={'gx-flex-sm-row'}>
        <Col span={8}>
          <span>
            Reject duplicates&nbsp;
            <Tooltip
              color={'white'}
              title="If the same client is not allowed to appear twice in waitlist. Based on phone number of email address."
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        </Col>
        <Col span={4}>
          <Form.Item name={'reject_duplicates'} valuePropName="checked">
            <Switch size={'default'} style={{ marginTop: -15 }}></Switch>
          </Form.Item>
        </Col>
      </Row>
      <Row className={'gx-flex-sm-row'}>
        <Col span={8}>
          <span>
            Reject flagged&nbsp;
            <Tooltip color={'white'} title="If a client flagged by you then disallow them to sign up again.">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        </Col>
        <Col span={4}>
          <Form.Item name={'reject_flagged'} valuePropName="checked">
            <Switch size={'default'} style={{ marginTop: -15 }}></Switch>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          save
        </Button>
      </Form.Item>
    </Form>
  );
};
export default WaitListRuleForm;
