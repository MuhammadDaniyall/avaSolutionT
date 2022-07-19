import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Typography, Input, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { getBookingSettings, updateBookingSetting } from '../../../appRedux/actions/Settings';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const { Title, Text } = Typography;
const { Option } = Select;
const CalendarDisplay = (props) => {
  const hour = [
    ['12 AM',0],
    ['1 AM',1],
    ['2 AM',2],
    ['3 AM',3],
    ['4 AM',4],
    ['5 AM',5],
    ['6 AM',6],
    ['7 AM',7],
    ['8 AM',8],
    ['9 AM',9],
    ['10 AM',10],
    ['11 AM',11],
    ['12 PM',12],
    ['1 PM',13],
    ['2 PM',14],
    ['3 PM',15],
    ['4 PM',16],
    ['5 PM',17],
    ['6 PM',18],
    ['7 PM',19],
    ['8 PM',20],
    ['9 PM',21],
    ['10 PM',22],
    ['11 PM',23],
  ];
  const [visible, setVisible] = useState(false);
  const [tempFormData,setTempFormData] = useState(null);
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
  useEffect(() => {
    setTempFormData(props.bookingSettings);
  },[props.bookingSettings]);
  useEffect(()=>{
    form.setFieldsValue(tempFormData)
  },[tempFormData])
  const settingHourChange = (e) => {
    form.validateFields()
    .then((result) => {
      setTempFormData(result);
    })
  }
  const isAvailable = (time,type) => {
    if(type == 'start'){
      if(time < parseInt(tempFormData.EndHour))
        return false;
    }
    else{
      if(time > parseInt(tempFormData.StartHour))
        return false;
    }
    return true;
  }
  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Calendar display
          </Title>
          {props.bookingSettings && (
            <Text>
              Calendar week starts <b>{props.bookingSettings['WeekStartDay']}</b> and shows hours between <b>{hour[parseInt(props.bookingSettings['StartHour'])][0] + "-" + hour[parseInt(props.bookingSettings['EndHour'])][0] }.</b>
            </Text>
          )}
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      {visible && (
        <Form className={'gx-mt-4'} form={form} layout={'vertical'}>
          <div className={'gx-d-flex gx-justify-content-between'}>
            <div style={{ width: '22%', marginRight: '2%' }}>
              <Form.Item
                name="WeekStartDay"
                label={'Week start day'}
                rules={[{ required: true, message: 'reqired!' }]}
              >
                <Select>
                  <Option key={'Today'}>Today</Option>
                  <Option key={'Sunday'}>Sunday</Option>
                  <Option key={'Monday'}>Monday</Option>
                </Select>
              </Form.Item>
            </div>
            <div style={{ width: '22%', marginRight: '2%' }}>
              <Form.Item
                name="StartHour"
                label={'Start hour'}
                rules={[{ required: true, message: 'reqired!' }]}
              >
                <Select onChange={(e) => {settingHourChange(e)}}>
                  {hour.map((item) => {
                    return <Option disabled={isAvailable(item[1],'start')} key={item[1]}>{item[0]}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div style={{ width: '22%',marginRight:'2%' }}>
              <Form.Item
                name="EndHour"
                label={'End hour'}
                rules={[{ required: true, message: 'reqired!' }]}
              >
                <Select onChange={(e) => {settingHourChange(e)}}>
                  {hour.map((item) => {
                    return <Option disabled={isAvailable(item[1],'end')} key={item[1]}>{item[0]}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div style={{ width: '22%', marginRight: '3%' }}>
              <Form.Item
                name="DefaultView"
                label={'Default view'}
                rules={[{ required: true, message: 'reqired!' }]}
              >
                <Select>
                  <Option key={'List'}>List</Option>
                  <Option key={'Daily'}>Daily</Option>
                  <Option key={'Weekly'}>Weekly</Option>
                  <Option key={'Monthly'}>Monthly</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className={'gx-d-flex gx-justify-content-between'}>
            <div style={{ width: '30%', marginRight: '3%' }}>
              <Form.Item
                name="HidePast"
                rules={[{ required: true, message: 'reqired!' }]}
                valuePropName="checked"
              >
                <Checkbox>Hide past</Checkbox>
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

const mapStateToProps = ({ auth, settings }) => {
  const { user } = auth;
  const { bookingSettings } = settings;
  return { user, bookingSettings };
};
export default connect(mapStateToProps, {
  getBookingSettings,
  updateBookingSetting,
})(CalendarDisplay);
