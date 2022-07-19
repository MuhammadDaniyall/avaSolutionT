/* eslint-disable react/jsx-key */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Row, Space, Col, Modal, Form, Button, message, Select, Tabs, TimePicker, Checkbox } from 'antd';
import 'react-phone-input-2/lib/style.css';

// icons
import Close from '@2fd/ant-design-icons/lib/Close';
import Plus from '@2fd/ant-design-icons/lib/Plus';
import moment from 'moment';
const format = 'h:mm a';

const { Option } = Select;
const { TabPane } = Tabs;

const WorkingTimeForm = (props) => {
  const { visible, closeModal, saveWorkingTime, date, clear, modalData } = props;
  const [form] = Form.useForm();

  // useEffect(() => {
  //     setWorkingTime(data[date.day - 1]);
  //     setWaitListTime(data1[date.day - 1]);
  //     setBookingTime(data2[date.day - 1]);
  // }, [props.date])
  const data = [
    {
      name: 'Monday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Tuesday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Wednesday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Thursday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Friday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Saturday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Sunday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
  ];
  const data1 = [
    {
      name: 'Monday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Tuesday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Wednesday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Thursday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Friday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Saturday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Sunday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
  ];
  const data2 = [
    {
      name: 'Monday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Tuesday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Wednesday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Thursday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Friday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Saturday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Sunday',
      isWorking: 'Working',
      data: [['9:00 am', '6:00 pm', 'none', 'none']],
    },
  ];
  const [modalPage, setModalPage] = useState('working');
  const [waitlistIsGeneral, setWaitlistIsGeneral] = useState(true);
  const [bookingIsGeneral, setBookingIsGeneral] = useState(true);
  const [workingTime, setWorkingTime] = useState({});
  const [waitListTime, setWaitListTime] = useState({});
  const [BookingTime, setBookingTime] = useState({});

  useEffect(() => {
    if (visible) {
      if (modalData != undefined) {
        setWorkingTime(modalData.Data.GeneralHours);
        if (modalData.Data.WaitListHours) {
          setWaitListTime(modalData.Data.WaitListHours);
          setWaitlistIsGeneral(false);
        } else {
          setWaitListTime(data1[date.day - 1]);
        }
        if (modalData.Data.BookingHours) {
          setBookingTime(modalData.Data.BookingHours);
          setBookingIsGeneral(false);
        } else {
          setBookingTime(data2[date.day - 1]);
        }
        setModalPage('working');
      } else {
        setWorkingTime(data[date.day - 1]);
        setWaitListTime(data1[date.day - 1]);
        setBookingTime(data2[date.day - 1]);
      }
    } else {
      setWorkingTime(data[0]);
      setWaitListTime(data1[0]);
      setBookingTime(data2[0]);
      setWaitlistIsGeneral(true);
      setBookingIsGeneral(true);
    }
  }, [visible]);
  const add = () => {
    if (modalPage == 'working') {
      const workingTime1 = { ...workingTime };
      const timeTemp = workingTime1.data[workingTime1.data.length - 1];
      const time = [];
      time[0] = timeTemp[1];
      if (moment(timeTemp[1], format).isAfter(moment('11:00 pm', format))) {
        message.warning('The end of the day');
        return;
      }
      time[1] = moment(time[0], format).add(1, 'hours').format(format);
      time[2] = 'none';
      time[3] = 'none';
      workingTime1.data.push(time);
      setWorkingTime(workingTime1);
    } else if (modalPage == 'waitlist') {
      const waitListTime1 = { ...waitListTime };
      const timeTemp = waitListTime1.data[waitListTime1.data.length - 1];
      const time = [];
      time[0] = timeTemp[1];
      if (moment(timeTemp[1], format).isAfter(moment('11:00 pm', format))) {
        message.warning('The end of the day');
        return;
      }
      time[1] = moment(time[0], format).add(1, 'hours').format(format);
      time[2] = 'none';
      time[3] = 'none';
      waitListTime1.data.push(time);
      setWaitListTime(waitListTime1);
    } else {
      const BookingTime1 = { ...BookingTime };
      const timeTemp = BookingTime1.data[BookingTime1.data.length - 1];
      const time = [];
      time[0] = timeTemp[1];
      if (moment(timeTemp[1], format).isAfter(moment('11:00 pm', format))) {
        message.warning('The end of the day');
        return;
      }
      time[1] = moment(time[0], format).add(1, 'hours').format(format);
      time[2] = 'none';
      time[3] = 'none';
      BookingTime1.data.push(time);
      setBookingTime(BookingTime1);
    }
  };
  const remove = (index2) => {
    if (modalPage == 'working') {
      const workingTime1 = { ...workingTime };
      workingTime1.data.splice(index2, 1);
      setWorkingTime(workingTime1);
    } else if (modalPage == 'waitlist') {
      const waitListTime1 = { ...waitListTime };
      waitListTime1.data.splice(index2, 1);
      setWaitListTime(waitListTime1);
    } else if (modalPage == 'working') {
      const BookingTime1 = { ...BookingTime };
      BookingTime1.data.splice(index2, 1);
      setBookingTime(BookingTime1);
    }
  };

  const handleChangeTime = (...values) => {
    // let indexDay = values[1];
    const indexCol = values[1];
    const index = values[2];
    let tempTime = [];
    if (modalPage == 'working') {
      tempTime = { ...workingTime };
    } else if (modalPage == 'waitlist') {
      tempTime = { ...waitListTime };
    } else if (modalPage == 'booking') {
      tempTime = { ...BookingTime };
    }
    tempTime.data[indexCol][index] = moment(values[0]).format('h:mm A');
    if (indexCol == 0) {
      if (index == 0) {
        if (moment(tempTime.data[indexCol][0], format).isAfter(moment(tempTime.data[indexCol][1], format))) {
          tempTime.data[indexCol][2] = 'block';
          tempTime.data[indexCol][3] = 'none';
        } else {
          tempTime.data[indexCol][2] = 'none';
          tempTime.data[indexCol][3] = 'none';
        }
      }
      if (index == 1) {
        if (tempTime.data.length == 1) {
          if (moment(tempTime.data[indexCol][1], format).isBefore(moment(tempTime.data[indexCol][0], format))) {
            tempTime.data[indexCol][3] = 'block';
            tempTime.data[indexCol][2] = 'none';
          } else {
            tempTime.data[indexCol][2] = 'none';
            tempTime.data[indexCol][3] = 'none';
          }
        } else {
          if (moment(tempTime.data[indexCol][1], format).isBefore(moment(tempTime.data[indexCol][0], format))) {
            tempTime.data[indexCol][3] = 'block';
            tempTime.data[indexCol][2] = 'none';
          }
          if (moment(tempTime.data[indexCol + 1][0], format).isBefore(moment(tempTime.data[indexCol][1], format))) {
            tempTime.data[indexCol][3] = 'block';
            tempTime.data[indexCol][2] = 'none';
          } else {
            tempTime.data[indexCol][2] = 'none';
            tempTime.data[indexCol][3] = 'none';
          }
        }
      }
    } else if (indexCol == tempTime.data.length - 1) {
      if (index == 0) {
        if (moment(tempTime.data[indexCol][0], format).isAfter(moment(tempTime.data[indexCol][1], format))) {
          tempTime.data[indexCol][2] = 'block';
          tempTime.data[indexCol][3] = 'none';
        } else if (
          moment(tempTime.data[indexCol][0], format).isBefore(moment(tempTime.data[indexCol - 1][1], format))
        ) {
          tempTime.data[indexCol][2] = 'block';
          tempTime.data[indexCol][3] = 'none';
        } else {
          tempTime.data[indexCol][2] = 'none';
          tempTime.data[indexCol][3] = 'none';
        }
      }
      if (index == 1) {
        if (moment(tempTime.data[indexCol][1], format).isBefore(moment(tempTime.data[indexCol][0], format))) {
          tempTime.data[indexCol][3] = 'block';
          tempTime.data[indexCol][2] = 'none';
        } else {
          tempTime.data[indexCol][2] = 'none';
          tempTime.data[indexCol][3] = 'none';
        }
      }
    } else {
      if (index == 0) {
        if (moment(tempTime.data[indexCol][0], format).isAfter(moment(tempTime.data[indexCol][1], format))) {
          tempTime.data[indexCol][2] = 'block';
          tempTime.data[indexCol][3] = 'none';
        } else if (
          moment(tempTime.data[indexCol][0], format).isBefore(moment(tempTime.data[indexCol - 1][1], format))
        ) {
          tempTime.data[indexCol][2] = 'block';
          tempTime.data[indexCol][3] = 'none';
        } else {
          tempTime.data[indexCol][2] = 'none';
          tempTime.data[indexCol][3] = 'none';
        }
      }
      if (index == 1) {
        if (moment(tempTime.data[indexCol][1], format).isBefore(moment(tempTime.data[indexCol][0], format))) {
          tempTime.data[indexCol][3] = 'block';
          tempTime.data[indexCol][2] = 'none';
        } else if (moment(tempTime.data[indexCol][1], format).isAfter(moment(tempTime.data[indexCol + 1][0], format))) {
          tempTime.data[indexCol][3] = 'block';
          tempTime.data[indexCol][2] = 'none';
        } else {
          tempTime.data[indexCol][2] = 'none';
          tempTime.data[indexCol][3] = 'none';
        }
      }
    }
    if (modalPage == 'working') {
      setWorkingTime(tempTime);
    } else if (modalPage == 'waitlist') {
      setWaitListTime(tempTime);
    } else if (modalPage == 'booking') {
      setBookingTime(tempTime);
    }
  };

  const handelChangeWorkingSelect = (...values) => {
    if (modalPage == 'working') {
      const workingTime1 = { ...workingTime };
      workingTime1.isWorking = values[0];
      setWorkingTime(workingTime1);
    } else if (modalPage == 'waitlist') {
      const waitListTime1 = { ...waitListTime };
      waitListTime1.isWorking = values[0];
      setWaitListTime(waitListTime1);
    } else if (modalPage == 'booking') {
      const BookingTime1 = { ...BookingTime };
      BookingTime1.isWorking = values[0];
      setBookingTime(BookingTime1);
    }
  };
  const Sametime = (flag) => {
    if (flag == 'waitlist') {
      setWaitlistIsGeneral(!waitlistIsGeneral);
    } else {
      setBookingIsGeneral(!bookingIsGeneral);
    }
  };
  const changeTab = (value) => {
    setModalPage(value);
  };
  const save = () => {
    let isValid = true;
    const tempWorking = { ...workingTime };
    if (tempWorking.isWorking == 'Working') {
      tempWorking.data.map((val) => {
        if (val[2] == 'block' || val[3] == 'block') {
          isValid = false;
        }
      });
    } else {
      tempWorking.data = [['9:00 pm', '6:00 pm', 'none', 'none']];
    }
    setWorkingTime(tempWorking);
    const tempWait = { ...waitListTime };
    if (tempWait.isWorking == 'Working') {
      tempWait.data.map((val) => {
        if (val[2] == 'block' || val[3] == 'block') {
          isValid = false;
        }
      });
    } else {
      tempWait.data = [['9:00 pm', '6:00 pm', 'none', 'none']];
    }
    setWaitListTime(tempWait);
    const tempBooking = { ...BookingTime };
    if (tempBooking.isWorking == 'Working') {
      tempBooking.data.map((val) => {
        if (val[2] == 'block' || val[3] == 'block') {
          isValid = false;
        }
      });
    } else {
      tempBooking.data = [['9:00 pm', '6:00 pm', 'none', 'none']];
    }
    if (isValid) {
      saveWorkingTime(tempWorking, tempWait, tempBooking, waitlistIsGeneral, bookingIsGeneral);
    } else message.error('Invalid time provided!');
  };
  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      closeIcon={<Close style={{ fontSize: 22 }} />}
      title={'Edit hour for' + date.year + ',' + date.month + ',' + date.date}
      onCancel={closeModal}
      forceRender
      footer={[
        <Button type={'default'} htmlType={'submit'} onClick={() => clear(date)}>
          clear All
        </Button>,
        <Button type={'primary'} htmlType={'submit'} onClick={() => save()}>
          save
        </Button>,
      ]}
      width={800}
    >
      <Tabs defaultActiveKey="1" onChange={(e) => changeTab(e)}>
        <TabPane tab="General hours" key="working">
          <Form autoComplete="off">
            <Row>
              <Col span={5}>
                <Form.Item>
                  <label
                    style={{
                      float: 'left',
                      paddingLeft: '5px',
                      fontWeight: '700',
                      width: '60%',
                    }}
                  >
                    {workingTime.name}
                  </label>
                </Form.Item>
              </Col>
              <Col span={5}>
                {
                  workingTime.isWorking == "Working" &&
                  <Form.Item>
                    <Select
                      defaultValue={"Working"}
                      style={{ width: 140 }}
                      onChange={(e) => handelChangeWorkingSelect(e)}
                    >
                      <Option value="Working">Working</Option>
                      <Option value="Not Working">Not Working</Option>
                      <Option value="All Day">All Day</Option>
                    </Select>
                  </Form.Item>
                }
                {
                  workingTime.isWorking == "Not Working" &&
                  <Form.Item>
                    <Select
                      defaultValue={"Not Working"}
                      style={{ width: 140 }}
                      onChange={(e) => handelChangeWorkingSelect(e)}
                    >
                      <Option value="Working">Working</Option>
                      <Option value="Not Working">Not Working</Option>
                      <Option value="All Day">All Day</Option>
                    </Select>
                  </Form.Item>
                }
                {
                  workingTime.isWorking == "All Day" &&
                  <Form.Item>
                    <Select
                      defaultValue={"All Day"}
                      style={{ width: 140 }}
                      onChange={(e) => handelChangeWorkingSelect(e)}
                    >
                      <Option value="Working">Working</Option>
                      <Option value="Not Working">Not Working</Option>
                      <Option value="All Day">All Day</Option>
                    </Select>
                  </Form.Item>
                }
              </Col>
              {workingTime.isWorking == 'Working' ? (
                <Col>
                  <Form.Item>
                    {workingTime.data.map((val, indexVal) => {
                      return (
                        <Space style={{ display: '-webkit-box' }}>
                          <Form.Item style={{ boxSizing: 'inherit' }}>
                            <TimePicker
                              clearIcon={false}
                              showNow={false}
                              style={{ width: 140 }}
                              value={moment(val[0], format)}
                              use12Hours={true}
                              format={'h:mm A'}
                              formatTime={'A'}
                              onChange={(e) => handleChangeTime(e, indexVal, 0)}
                            />
                            <span
                              style={{
                                color: 'red',
                                fontSize: '11px',
                                display: val[2],
                                width: '140px',
                              }}
                            >
                              Time must not overlap with other intervals!
                            </span>
                          </Form.Item>
                          <Form.Item style={{ boxSizing: 'inherit' }}>
                            <TimePicker
                              clearIcon={false}
                              showNow={false}
                              style={{ width: 140 }}
                              value={moment(val[1], format)}
                              use12Hours={true}
                              format={'h:mm A'}
                              formatTime={'A'}
                              onChange={(e) => handleChangeTime(e, indexVal, 1)}
                            />
                            <span
                              style={{
                                color: 'red',
                                fontSize: '11px',
                                display: val[3],
                                width: '140px',
                              }}
                            >
                              Time must not overlap with other intervals!
                            </span>
                          </Form.Item>
                          <Form.Item>
                            {indexVal == 0 ? (
                              <Button type={'primary'} shape={'circle'} onClick={() => add()}>
                                <Plus />
                              </Button>
                            ) : (
                                <Button type={'danger'} shape={'circle'} onClick={() => remove(indexVal)}>
                                  <Close />
                                </Button>
                              )}
                          </Form.Item>
                        </Space>
                      );
                    })}
                  </Form.Item>
                </Col>
              ) : (
                  <Form.Item></Form.Item>
                )}
            </Row>
          </Form>
        </TabPane>
        <TabPane tab="Waitlist hours" key="waitlist">
          <Checkbox
            checked={waitlistIsGeneral}
            style={{ marginLeft: '40%', marginBottom: '10px' }}
            onChange={(e) => Sametime('waitlist')}
          >
            Same as general
          </Checkbox>
          {!waitlistIsGeneral && (
            <Form autoComplete="off">
              <Row>
                <Col span={5}>
                  <Form.Item>
                    <label
                      style={{
                        float: 'left',
                        paddingLeft: '5px',
                        fontWeight: '700',
                        width: '60%',
                      }}
                    >
                      {waitListTime.name}
                    </label>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  {
                    waitListTime.isWorking == "Working" &&
                    <Form.Item>
                      <Select
                        defaultValue={"Working"}
                        style={{ width: 140 }}
                        onChange={(e) => handelChangeWorkingSelect(e)}
                      >
                        <Option value="Working">Working</Option>
                        <Option value="Not Working">Not Working</Option>
                        <Option value="All Day">All Day</Option>
                      </Select>
                    </Form.Item>
                  }
                  {
                    waitListTime.isWorking == "Not Working" &&
                    <Form.Item>
                      <Select
                        defaultValue={"Not Working"}
                        style={{ width: 140 }}
                        onChange={(e) => handelChangeWorkingSelect(e)}
                      >
                        <Option value="Working">Working</Option>
                        <Option value="Not Working">Not Working</Option>
                        <Option value="All Day">All Day</Option>
                      </Select>
                    </Form.Item>
                  }
                  {
                    waitListTime.isWorking == "All Day" &&
                    <Form.Item>
                      <Select
                        defaultValue={"All Day"}
                        style={{ width: 140 }}
                        onChange={(e) => handelChangeWorkingSelect(e)}
                      >
                        <Option value="Working">Working</Option>
                        <Option value="Not Working">Not Working</Option>
                        <Option value="All Day">All Day</Option>
                      </Select>
                    </Form.Item>
                  }
                </Col>
                {waitListTime.isWorking == 'Working' ? (
                  <Col>
                    <Form.Item>
                      {waitListTime.data.map((val, indexVal) => {
                        return (
                          <Space style={{ display: 'flex' }}>
                            <Form.Item style={{ boxSizing: 'inherit' }}>
                              <TimePicker
                                clearIcon={false}
                                showNow={false}
                                style={{ width: 140 }}
                                value={moment(val[0], format)}
                                use12Hours={true}
                                format={'h:mm A'}
                                formatTime={'A'}
                                onChange={(e) => handleChangeTime(e, indexVal, 0)}
                              />
                              <span
                                style={{
                                  color: 'red',
                                  fontSize: '11px',
                                  display: val[2],
                                  width: '140px',
                                }}
                              >
                                Time must not overlap with other intervals!
                              </span>
                            </Form.Item>
                            <Form.Item style={{ boxSizing: 'inherit' }}>
                              <TimePicker
                                clearIcon={false}
                                showNow={false}
                                style={{ width: 140 }}
                                value={moment(val[1], format)}
                                use12Hours={true}
                                format={'h:mm A'}
                                formatTime={'A'}
                                onChange={(e) => handleChangeTime(e, indexVal, 1)}
                              />
                              <span
                                style={{
                                  color: 'red',
                                  fontSize: '11px',
                                  display: val[3],
                                  width: '140px',
                                }}
                              >
                                Time must not overlap with other intervals!
                              </span>
                            </Form.Item>
                            <Form.Item>
                              {indexVal == 0 ? (
                                <Button type={'primary'} shape={'circle'} onClick={() => add()}>
                                  <Plus />
                                </Button>
                              ) : (
                                  <Button type={'danger'} shape={'circle'} onClick={() => remove(indexVal)}>
                                    <Close />
                                  </Button>
                                )}
                            </Form.Item>
                          </Space>
                        );
                      })}
                    </Form.Item>
                  </Col>
                ) : (
                    <Form.Item></Form.Item>
                  )}
              </Row>
            </Form>
          )}
        </TabPane>
        <TabPane tab="Booking Hours" key="booking">
          <Checkbox checked={bookingIsGeneral} style={{ marginLeft: '40%' }} onChange={(e) => Sametime('booking')}>
            Same as general
          </Checkbox>
          {!bookingIsGeneral && (
            <Form autoComplete="off">
              <Row>
                <Col span={5}>
                  <Form.Item>
                    <label
                      style={{
                        float: 'left',
                        paddingLeft: '5px',
                        fontWeight: '700',
                        width: '60%',
                      }}
                    >
                      {BookingTime.name}
                    </label>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  {
                    BookingTime.isWorking == "Working" &&
                    <Form.Item>
                      <Select
                        defaultValue={"Working"}
                        style={{ width: 140 }}
                        onChange={(e) => handelChangeWorkingSelect(e)}
                      >
                        <Option value="Working">Working</Option>
                        <Option value="Not Working">Not Working</Option>
                        <Option value="All Day">All Day</Option>
                      </Select>
                    </Form.Item>
                  }
                  {
                    BookingTime.isWorking == "Not Working" &&
                    <Form.Item>
                      <Select
                        defaultValue={"Not Working"}
                        style={{ width: 140 }}
                        onChange={(e) => handelChangeWorkingSelect(e)}
                      >
                        <Option value="Working">Working</Option>
                        <Option value="Not Working">Not Working</Option>
                        <Option value="All Day">All Day</Option>
                      </Select>
                    </Form.Item>
                  }
                  {
                    BookingTime.isWorking == "All Day" &&
                    <Form.Item>
                      <Select
                        defaultValue={"All Day"}
                        style={{ width: 140 }}
                        onChange={(e) => handelChangeWorkingSelect(e)}
                      >
                        <Option value="Working">Working</Option>
                        <Option value="Not Working">Not Working</Option>
                        <Option value="All Day">All Day</Option>
                      </Select>
                    </Form.Item>
                  }
                </Col>
                {BookingTime.isWorking == 'Working' ? (
                  <Col>
                    <Form.Item>
                      {BookingTime.data.map((val, indexVal) => {
                        return (
                          <Space style={{ display: 'flex' }}>
                            <Form.Item style={{ boxSizing: 'inherit' }}>
                              <TimePicker
                                clearIcon={false}
                                showNow={false}
                                style={{ width: 140 }}
                                value={moment(val[0], format)}
                                use12Hours={true}
                                format={'h:mm A'}
                                formatTime={'A'}
                                onChange={(e) => handleChangeTime(e, indexVal, 0)}
                              />
                              <span
                                style={{
                                  color: 'red',
                                  fontSize: '11px',
                                  display: val[2],
                                  width: '140px',
                                }}
                              >
                                Time must not overlap with other intervals!
                              </span>
                            </Form.Item>
                            <Form.Item style={{ boxSizing: 'inherit' }}>
                              <TimePicker
                                clearIcon={false}
                                showNow={false}
                                style={{ width: 140 }}
                                value={moment(val[1], format)}
                                use12Hours={true}
                                format={'h:mm A'}
                                formatTime={'A'}
                                onChange={(e) => handleChangeTime(e, indexVal, 1)}
                              />
                              <span
                                style={{
                                  color: 'red',
                                  fontSize: '11px',
                                  display: val[3],
                                  width: '140px',
                                }}
                              >
                                Time must not overlap with other intervals!
                              </span>
                            </Form.Item>
                            <Form.Item>
                              {indexVal == 0 ? (
                                <Button type={'primary'} shape={'circle'} onClick={() => add()}>
                                  <Plus />
                                </Button>
                              ) : (
                                  <Button type={'danger'} shape={'circle'} onClick={() => remove(indexVal)}>
                                    <Close />
                                  </Button>
                                )}
                            </Form.Item>
                          </Space>
                        );
                      })}
                    </Form.Item>
                  </Col>
                ) : (
                    <Form.Item></Form.Item>
                  )}
              </Row>
            </Form>
          )}
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default WorkingTimeForm;
