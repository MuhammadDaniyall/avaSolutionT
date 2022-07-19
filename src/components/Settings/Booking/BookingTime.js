import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Typography,Input,Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { getBookingSettings, updateBookingSetting } from '../../../appRedux/actions/Settings';

const { Title, Text } = Typography;
const { Option } = Select;
const BookingTime = (props) => {
  const timeKind = [
    ['5 min',5],
    ['10 min',10],
    ['15 min',15],
    ['20 min',20],
    ['25 min',25],
    ['30 min',30],
    ['35 min',35],
    ['40 min',40],
    ['45 min',45],
    ['50 min',50],
    ['1 hour',60],
    ['1 hour 30 min',90],
    ['2 hour',120],
    ['3 hour',180],
    ['4 hour',240],
    ['5 hour',300],
    ['6 hour',360],
    ['7 hour',420],
    ['8 hour',480]
  ];
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [tempFormData,setTempFormData] = useState(null);

  const handleClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    props.getBookingSettings(props.user.id);
  }, [visible]);
  useEffect(() => {
    setTempFormData(props.bookingSettings);
  },[props.bookingSettings]);
  useEffect(()=>{
    form.setFieldsValue(tempFormData)
  },[tempFormData])
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
  const getDurationName = (key) => {
    for (let index = 0; index < timeKind.length; index++) {
      const element = timeKind[index];
      if(timeKind[index][1] == key){
        return timeKind[index][0];
      }
    }
  }
  const isAvailable = (time,type) => {
    if(type == 'min'){
      if(time < parseInt(tempFormData.maxDuration))
        return false;
    }
    else{
      if(time > parseInt(tempFormData.minDuration))
        return false;
    }
    return true;
  }
  const settingDurationChange = (e) => {
    form.validateFields()
    .then((result) => {
      setTempFormData(result);
    })
  }
  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Booking times
          </Title>
          {props.bookingSettings && (
            <Text>
              Booking duration is<b>{getDurationName(props.bookingSettings['minDuration'])}</b>, max duration is <b>{getDurationName(props.bookingSettings['maxDuration'])}</b> and <b>{props.bookingSettings['SpotsPerTimeSlot']}spots</b> can be booked at a time.
            </Text>
          )}
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      {visible && (
        <Form className={'gx-mt-4'} form={form} layout={'vertical'}>
          <div className={'gx-d-flex gx-justify-content-between'}>
            <div style={{ width: '30%',marginRight:'3%' }}>
              <Form.Item
                name="minDuration"
                label={'Min duration'}
                rules={[{ required: true, message: 'reqired!' }]}
              >
                <Select onChange={() => {settingDurationChange()}} >
                  {timeKind.map((item) => {
                    return <Option disabled={isAvailable(item[1],'min')} key={item[1]}>{item[0]}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div style={{ width: '30%',marginRight:'3%' }}>
              <Form.Item
                name="maxDuration"
                label={'Max duration'}
                rules={[{ required: true, message: 'reqired!' }]}
              >
                <Select onChange={() => {settingDurationChange()}}>
                  {timeKind.map((item) => {
                    return <Option disabled={isAvailable(item[1],'max')} key={item[1]}>{item[0]}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div style={{ width: '30%' }}>
              <Form.Item
                name="SpotsPerTimeSlot"
                label={
                  <span>
                    Spots per time slot&nbsp;
                    <Tooltip
                      color={'white'}
                      title='If each time slot can be booked by more than one person.'
                    >
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>}
                rules={[{ required: true, message: 'reqired!' }]}
              >
                <Input type={"number"}></Input>
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
})(BookingTime);
