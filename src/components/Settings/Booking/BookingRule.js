import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Typography, Input, Tooltip, Row, Col,Switch } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { getBookingSettings, updateBookingSetting } from '../../../appRedux/actions/Settings';

const { Title, Text } = Typography;
const { Option } = Select;
const BookingRule = (props) => {
  const bookingKind = [
    '1 slot',
    '2 slot',
    '3 slot',
    '4 slot',
    '5 slot',
    '6 slot',
    '7 slot',
    '8 slot',
    '9 slot',
    '10 slot',
    '11 slot',
    '12 slot',
  ];
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    props.getBookingSettings(props.user.id);
  }, [visible]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const submitData = props.bookingSettings;
    Object.getOwnPropertyNames(values).map((key) => {
      submitData[key] = values[key];
      return true;
    });
    submitData.user_id = props.user.id;
    await props.updateBookingSetting(submitData);
    setVisible(false);
  };

  if (props.bookingSettings) {
    form.setFieldsValue(props.bookingSettings);
  }
  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Booking rules
          </Title>
          <Text>
            How customer is allowed to book bookings.
          </Text>
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      {visible && (
        <Form className={'gx-mt-4'} form={form} layout={'vertical'}>
          <Row className={"gx-flex-sm-row"}>
            <Col span={6}>
              <Form.Item>
                <Text>Min booking</Text>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name={"MinBooking"}>
                <Select>
                  {bookingKind.map((item) => {
                    return <Option key={item}>{item}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className={"gx-flex-sm-row"}>
            <Col span={6}>
              <Form.Item>
                <Text>Max booking</Text>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name={"MaxBooking"}>
                <Select>
                  {bookingKind.map((item) => {
                    return <Option key={item}>{item}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className={"gx-flex-sm-row"}>
            <Col span={6}>
              <Form.Item>
                <Text>Min notice</Text>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name={"MinNoticeNumber"}>
                <Input type={'number'}></Input>
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={6}>

              <Form.Item name={"MinNoticeKind"}>
                <Select>
                  <Option key={'Minutes'}>Minutes(s)</Option>
                  <Option key={'Hour'}>Hour(s)</Option>
                  <Option key={'Day'}>Day(s)</Option>
                  <Option key={'Week'}>Week(s)</Option>
                  <Option key={'Months'}>Months(s)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className={"gx-flex-sm-row"}>
            <Col span={6}>
              <Form.Item>
                <Text>Max advance</Text>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name={"MaxAdvanceNumber"}>
                <Input type={'number'}></Input>
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={6}>

              <Form.Item name={"MaxAdvanceKind"}>
                <Select>
                  <Option key={'Minutes'}>Minutes(s)</Option>
                  <Option key={'Hour'}>Hour(s)</Option>
                  <Option key={'Day'}>Day(s)</Option>
                  <Option key={'Week'}>Week(s)</Option>
                  <Option key={'Months'}>Months(s)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className={"gx-flex-sm-row"}>
            <Col span={6}>
              <Form.Item>
                <Text>Allow customer to reschedule booking &nbsp;
                <Tooltip
                    color={'white'}
                    title="Show the reschedule buttons on the booking confirmation page."
                  >
                    <QuestionCircleOutlined />
                  </Tooltip></Text>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name={"AllowCustomerRescheduleBooking"} valuePropName="checked">
                <Switch></Switch>
              </Form.Item>
            </Col>
          </Row>
          <Row className={"gx-flex-sm-row"}>
            <Col span={6}>
              <Form.Item>
                <Text>Allow customer to cancel booking &nbsp;
                <Tooltip
                    color={'white'}
                    title="Show the cancel button on the booking confirmation page."
                  >
                    <QuestionCircleOutlined />
                  </Tooltip></Text>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name={"AllowCustomerCancelBooking"} valuePropName="checked">
                <Switch></Switch>
              </Form.Item>
            </Col>
          </Row>
          <Row className={"gx-flex-sm-row"}>
            <Col span={6}>
              <Form.Item>
                <Text>Allow your staff to overbook full time slots &nbsp;
                <Tooltip
                    color={'white'}
                    title="If your team can add addtional booking on times that are otherwise fully blocked. This is only for the international booking page and not the public online scheduling page"
                  >
                    <QuestionCircleOutlined />
                  </Tooltip></Text>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name={"AllowStaffOverBookFullTimeSlot"} valuePropName="checked">
                <Switch></Switch>
              </Form.Item>
            </Col>
          </Row>
          <Row className={"gx-flex-sm-row"}>
            <Col span={6}>
              <Form.Item>
                <Text>Reject flagged &nbsp;
                <Tooltip
                    color={'white'}
                    title="If a customer flagged by you then disallow them to signup again."
                  >
                    <QuestionCircleOutlined />
                  </Tooltip></Text>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name={"RejectFlagged"} valuePropName="checked">
                <Switch></Switch>
              </Form.Item>
            </Col>
          </Row>
          <Row className={"gx-flex-sm-row"}>
            <Col span={6}>
              <Form.Item>
                <Text>Reject duplicates &nbsp;
                <Tooltip
                    color={'white'}
                    title="If the same customer is not allowed to have more than 1 booking at a time"
                  >
                    <QuestionCircleOutlined />
                  </Tooltip> </Text>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name={"RejectDuplicate"} valuePropName="checked">
                <Switch></Switch>
              </Form.Item>
            </Col>
          </Row>
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

const mapStateToProps = ({ auth, settings }) => {
  const { user } = auth;
  const { bookingSettings } = settings;
  return { user, bookingSettings };
};
export default connect(mapStateToProps, {getBookingSettings,updateBookingSetting,})(BookingRule);
