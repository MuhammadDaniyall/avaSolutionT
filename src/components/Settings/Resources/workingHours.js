/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
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
  const { visible, closeModal, saveWorkingTime, clearAll, modalData } = props;
  const data = [
    {
      name: 'Monday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Tuesday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Wednesday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Thursday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Friday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Saturday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Sunday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
  ];
  const data1 = [
    {
      name: 'Monday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Tuesday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Wednesday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Thursday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Friday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Saturday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Sunday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
  ];
  const data2 = [
    {
      name: 'Monday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Tuesday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Wednesday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Thursday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Friday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Saturday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
    {
      name: 'Sunday',
      isWorking: 'Working',
      data: [['9:00 pm', '6:00 pm', 'none', 'none']],
    },
  ];
  const [modalPage, setModalPage] = useState('working');
  const [waitlistIsGeneral, setWaitlistIsGeneral] = useState(true);
  const [bookingIsGeneral, setBookingIsGeneral] = useState(true);
  const [workingTime, setWorkingTime] = useState(data);
  const [waitListTime, setWaitListTime] = useState(data1);
  const [BookingTime, setBookingTime] = useState(data2);

  useEffect(() => {
    if (visible) {
      const modalData1 = JSON.parse(modalData);
      if (modalData1.generalHours) {
        setWorkingTime(modalData1.generalHours);
        if (modalData1.waitListHours) {
          setWaitListTime(modalData1.waitListHours);
          setWaitlistIsGeneral(false);
        }
        if (modalData1.bookingHours) {
          setBookingTime(modalData1.bookingHours);
          setBookingIsGeneral(false);
        }
        setModalPage('working');
      } else {
        setWorkingTime(data);
        setWaitListTime(data1);
        setBookingTime(data2);
        setWaitlistIsGeneral(true);
        setBookingIsGeneral(true);
        setModalPage('working');
      }
    } else {
      setWorkingTime(data);
      setWaitListTime(data1);
      setBookingTime(data2);
      setWaitlistIsGeneral(true);
      setBookingIsGeneral(true);
      setModalPage('working');
    }
  }, [visible]);
  const add = (index) => {
    if (modalPage === 'working') {
      const workingTime1 = [...workingTime];
      const timeTemp = workingTime1[index].data[workingTime1[index].data.length - 1];
      const time = [];
      time[0] = timeTemp[1];
      if (moment(timeTemp[1], format).isAfter(moment('11:00 pm', format))) {
        message.warning('The end of the day');
        return;
      }
      time[1] = moment(time[0], format).add(1, 'hours').format(format);
      time[2] = 'none';
      time[3] = 'none';
      workingTime1[index].data.push(time);
      setWorkingTime(workingTime1);
    } else if (modalPage === 'waitlist') {
      const waitListTime1 = [...waitListTime];
      const timeTemp = waitListTime1[index].data[waitListTime1[index].data.length - 1];
      const time = [];
      time[0] = timeTemp[1];
      if (moment(timeTemp[1], format).isAfter(moment('11:00 pm', format))) {
        message.warning('The end of the day');
        return;
      }
      time[1] = moment(time[0], format).add(1, 'hours').format(format);
      time[2] = 'none';
      time[3] = 'none';
      waitListTime1[index].data.push(time);
      setWaitListTime(waitListTime1);
    } else if (modalPage === 'booking') {
      const BookingTime1 = [...BookingTime];
      const timeTemp = BookingTime1[index].data[BookingTime1[index].data.length - 1];
      const time = [];
      time[0] = timeTemp[1];
      if (moment(timeTemp[1], format).isAfter(moment('11:00 pm', format))) {
        message.warning('The end of the day');
        return;
      }
      time[1] = moment(time[0], format).add(1, 'hours').format(format);
      time[2] = 'none';
      time[3] = 'none';
      BookingTime1[index].data.push(time);
      setBookingTime(BookingTime1);
    }
  };
  const remove = (index1, index2) => {
    if (modalPage === 'working') {
      const workingTime1 = [...workingTime];
      workingTime1[index1].data.splice(index2, 1);
      setWorkingTime(workingTime1);
    } else if (modalPage === 'waitlist') {
      const waitListTime1 = [...waitListTime];
      waitListTime1[index1].data.splice(index2, 1);
      setWaitListTime(waitListTime1);
    } else if (modalPage === 'booking') {
      const BookingTime1 = [...BookingTime];
      BookingTime1[index1].data.splice(index2, 1);
      setBookingTime(BookingTime1);
    }
  };

  const handleChangeTime = (...values) => {
    const indexDay = values[1];
    const indexCol = values[2];
    const index = values[3];
    let tempTime = [];
    if (modalPage === 'working') {
      tempTime = [...workingTime];
    } else if (modalPage === 'waitlist') {
      tempTime = [...waitListTime];
    } else if (modalPage === 'booking') {
      tempTime = [...BookingTime];
    }
    tempTime[indexDay].data[indexCol][index] = moment(values[0]).format('h:mm A');
    if (indexCol === 0) {
      if (index === 0) {
        if (
          moment(tempTime[indexDay].data[indexCol][0], format).isAfter(
            moment(tempTime[indexDay].data[indexCol][1], format),
          )
        ) {
          tempTime[indexDay].data[indexCol][2] = 'block';
          tempTime[indexDay].data[indexCol][3] = 'none';
        } else {
          tempTime[indexDay].data[indexCol][2] = 'none';
          tempTime[indexDay].data[indexCol][3] = 'none';
        }
      }
      if (index === 1) {
        if (tempTime[indexDay].data.length === 1) {
          if (
            moment(tempTime[indexDay].data[indexCol][1], format).isBefore(
              moment(tempTime[indexDay].data[indexCol][0], format),
            )
          ) {
            tempTime[indexDay].data[indexCol][3] = 'block';
            tempTime[indexDay].data[indexCol][2] = 'none';
          } else {
            tempTime[indexDay].data[indexCol][2] = 'none';
            tempTime[indexDay].data[indexCol][3] = 'none';
          }
        } else {
          if (
            moment(tempTime[indexDay].data[indexCol][1], format).isBefore(
              moment(tempTime[indexDay].data[indexCol][0], format),
            )
          ) {
            tempTime[indexDay].data[indexCol][3] = 'block';
            tempTime[indexDay].data[indexCol][2] = 'none';
          }
          if (
            moment(tempTime[indexDay].data[indexCol + 1][0], format).isBefore(
              moment(tempTime[indexDay].data[indexCol][1], format),
            )
          ) {
            tempTime[indexDay].data[indexCol][3] = 'block';
            tempTime[indexDay].data[indexCol][2] = 'none';
          } else {
            tempTime[indexDay].data[indexCol][2] = 'none';
            tempTime[indexDay].data[indexCol][3] = 'none';
          }
        }
      }
    } else if (indexCol === tempTime[indexDay].data.length - 1) {
      if (index === 0) {
        if (
          moment(tempTime[indexDay].data[indexCol][0], format).isAfter(
            moment(tempTime[indexDay].data[indexCol][1], format),
          )
        ) {
          tempTime[indexDay].data[indexCol][2] = 'block';
          tempTime[indexDay].data[indexCol][3] = 'none';
        } else if (
          moment(tempTime[indexDay].data[indexCol][0], format).isBefore(
            moment(tempTime[indexDay].data[indexCol - 1][1], format),
          )
        ) {
          tempTime[indexDay].data[indexCol][2] = 'block';
          tempTime[indexDay].data[indexCol][3] = 'none';
        } else {
          tempTime[indexDay].data[indexCol][2] = 'none';
          tempTime[indexDay].data[indexCol][3] = 'none';
        }
      }
      if (index === 1) {
        if (
          moment(tempTime[indexDay].data[indexCol][1], format).isBefore(
            moment(tempTime[indexDay].data[indexCol][0], format),
          )
        ) {
          tempTime[indexDay].data[indexCol][3] = 'block';
          tempTime[indexDay].data[indexCol][2] = 'none';
        } else {
          tempTime[indexDay].data[indexCol][2] = 'none';
          tempTime[indexDay].data[indexCol][3] = 'none';
        }
      }
    } else {
      if (index === 0) {
        if (
          moment(tempTime[indexDay].data[indexCol][0], format).isAfter(
            moment(tempTime[indexDay].data[indexCol][1], format),
          )
        ) {
          tempTime[indexDay].data[indexCol][2] = 'block';
          tempTime[indexDay].data[indexCol][3] = 'none';
        } else if (
          moment(tempTime[indexDay].data[indexCol][0], format).isBefore(
            moment(tempTime[indexDay].data[indexCol - 1][1], format),
          )
        ) {
          tempTime[indexDay].data[indexCol][2] = 'block';
          tempTime[indexDay].data[indexCol][3] = 'none';
        } else {
          tempTime[indexDay].data[indexCol][2] = 'none';
          tempTime[indexDay].data[indexCol][3] = 'none';
        }
      }
      if (index === 1) {
        if (
          moment(tempTime[indexDay].data[indexCol][1], format).isBefore(
            moment(tempTime[indexDay].data[indexCol][0], format),
          )
        ) {
          tempTime[indexDay].data[indexCol][3] = 'block';
          tempTime[indexDay].data[indexCol][2] = 'none';
        } else if (
          moment(tempTime[indexDay].data[indexCol][1], format).isAfter(
            moment(tempTime[indexDay].data[indexCol + 1][0], format),
          )
        ) {
          tempTime[indexDay].data[indexCol][3] = 'block';
          tempTime[indexDay].data[indexCol][2] = 'none';
        } else {
          tempTime[indexDay].data[indexCol][2] = 'none';
          tempTime[indexDay].data[indexCol][3] = 'none';
        }
      }
    }
    if (modalPage === 'working') {
      setWorkingTime(tempTime);
    } else if (modalPage === 'waitlist') {
      setWaitListTime(tempTime);
    } else if (modalPage === 'booking') {
      setBookingTime(tempTime);
    }
  };

  const handelChangeWorkingSelect = (...values) => {
    if (modalPage === 'working') {
      const workingTime1 = [...workingTime];
      workingTime1[values[1]].isWorking = values[0];
      setWorkingTime(workingTime1);
    } else if (modalPage === 'waitlist') {
      const waitListTime1 = [...waitListTime];
      waitListTime1[values[1]].isWorking = values[0];
      setWaitListTime(waitListTime1);
    } else if (modalPage === 'booking') {
      const BookingTime1 = [...BookingTime];
      BookingTime1[values[1]].isWorking = values[0];
      setBookingTime(BookingTime1);
    }
  };
  const reset = () => {
    if (modalPage === 'working') {
      setWorkingTime(data);
    } else if (modalPage === 'waitlist') {
      setWaitListTime(data1);
    } else if (modalPage === 'booking') {
      setBookingTime(data2);
    }
  };
  const Sametime = (flag) => {
    if (flag === 'waitlist') {
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
    const tempWorking = [...workingTime];
    tempWorking.map((item) => {
      if (item.isWorking === 'Working') {
        item.data.map((val) => {
          if (val[2] === 'block' || val[3] === 'block') {
            isValid = false;
          }
          return true;
        });
      } else {
        item.data = [['9:00 pm', '6:00 pm', 'none', 'none']];
      }
      return true;
    });
    setWorkingTime(tempWorking);
    const tempWait = [...waitListTime];
    tempWait.map((item) => {
      if (item.isWorking === 'Working') {
        item.data.map((val) => {
          if (val[2] === 'block' || val[3] === 'block') {
            isValid = false;
          }
          return true;
        });
      } else {
        item.data = [['9:00 pm', '6:00 pm', 'none', 'none']];
      }
      return true;
    });
    setWaitListTime(tempWait);
    const tempBooking = [...BookingTime];
    tempBooking.map((item) => {
      if (item.isWorking == 'Working') {
        item.data.map((val) => {
          if (val[2] == 'block' || val[3] == 'block') {
            isValid = false;
          }
          return true;
        });
      } else {
        item.data = [['9:00 pm', '6:00 pm', 'none', 'none']];
      }
      return true;
    });
    setBookingTime(tempBooking);
    if (isValid) {
      saveWorkingTime(workingTime, waitListTime, BookingTime, waitlistIsGeneral, bookingIsGeneral);
    } else message.error('Invalid time provided!');
  };
  const clear = () => {
    clearAll();
    setWorkingTime(data);
    setWaitListTime(data1);
    setBookingTime(data2);
    setWaitlistIsGeneral(true);
    setBookingIsGeneral(true);
    setModalPage('working');
  };

  const closeChildModal = () => {
    setWorkingTime([]);
    closeModal();
  };

  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      closeIcon={<Close style={{ fontSize: 22 }} />}
      title={'Edit hours for Magasin Vidéotron Blainville'}
      onCancel={closeChildModal}
      forceRender
      footer={[
        <Button type={'default'} htmlType={'submit'} onClick={() => clear()}>
          clear All
        </Button>,
        <Button type={'default'} htmlType={'submit'} onClick={() => reset()}>
          reset
        </Button>,
        <Button type={'primary'} htmlType={'submit'} onClick={() => save()}>
          save
        </Button>,
      ]}
      width={800}
    >
      <Tabs defaultActiveKey="working" onChange={(e) => changeTab(e)}>
        <TabPane tab="General hours" key="working">
          <Form autoComplete="off">
            {workingTime.map((item, index) => {
              return (
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
                        {item.name}
                      </label>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    {item.isWorking == "Working" &&
                      <Form.Item>
                        <Select
                          defaultValue={"Working"}
                          style={{ width: 140 }}
                          onChange={(e) => handelChangeWorkingSelect(e, index)}
                        >
                          <Option value="Working">Working</Option>
                          <Option value="Not Working">Not Working</Option>
                          <Option value="All Day">All Day</Option>
                        </Select>
                      </Form.Item>

                    }
                    {item.isWorking == "All Day" &&
                      <Form.Item>
                        <Select
                          defaultValue={"All Day"}
                          style={{ width: 140 }}
                          onChange={(e) => handelChangeWorkingSelect(e, index)}
                        >
                          <Option value="Working">Working</Option>
                          <Option value="Not Working">Not Working</Option>
                          <Option value="All Day">All Day</Option>
                        </Select>
                      </Form.Item>

                    }
                    {item.isWorking == "Not Working" &&
                      <Form.Item>
                        <Select
                          defaultValue={"Not Working"}
                          style={{ width: 140 }}
                          onChange={(e) => handelChangeWorkingSelect(e, index)}
                        >
                          <Option value="Working">Working</Option>
                          <Option value="Not Working">Not Working</Option>
                          <Option value="All Day">All Day</Option>
                        </Select>
                      </Form.Item>

                    }
                  </Col>
                  {item.isWorking == 'Working' ? (
                    <Col>
                      <Form.Item>
                        {item.data.map((val, indexVal) => {
                          return (
                            <Space  style={{ display: '-webkit-box' }}>
                              <Form.Item style={{ boxSizing: 'inherit' }}>
                                <TimePicker
                                  clearIcon={false}
                                  showNow={false}
                                  style={{ width: 140 }}
                                  value={moment(val[0], format)}
                                  use12Hours={true}
                                  format={'h:mm A'}
                                  formatTime={'A'}
                                  onChange={(e) => handleChangeTime(e, index, indexVal, 0)}
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
                                  onChange={(e) => handleChangeTime(e, index, indexVal, 1)}
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
                                  <Button type={'primary'} shape={'circle'} onClick={() => add(index)}>
                                    <Plus />
                                  </Button>
                                ) : (
                                    <Button type={'danger'} shape={'circle'} onClick={() => remove(index, indexVal)}>
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
              );
            })}
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
              {waitListTime.map((item, index) => {
                return (
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
                          {item.name}
                        </label>
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      {item.isWorking == "Working" &&
                        <Form.Item>
                          <Select
                            defaultValue={"Working"}
                            style={{ width: 140 }}
                            onChange={(e) => handelChangeWorkingSelect(e, index)}
                          >
                            <Option value="Working">Working</Option>
                            <Option value="Not Working">Not Working</Option>
                            <Option value="All Day">All Day</Option>
                          </Select>
                        </Form.Item>

                      }
                      {item.isWorking == "All Day" &&
                        <Form.Item>
                          <Select
                            defaultValue={"All Day"}
                            style={{ width: 140 }}
                            onChange={(e) => handelChangeWorkingSelect(e, index)}
                          >
                            <Option value="Working">Working</Option>
                            <Option value="Not Working">Not Working</Option>
                            <Option value="All Day">All Day</Option>
                          </Select>
                        </Form.Item>

                      }
                      {item.isWorking == "Not Working" &&
                        <Form.Item>
                          <Select
                            defaultValue={"Not Working"}
                            style={{ width: 140 }}
                            onChange={(e) => handelChangeWorkingSelect(e, index)}
                          >
                            <Option value="Working">Working</Option>
                            <Option value="Not Working">Not Working</Option>
                            <Option value="All Day">All Day</Option>
                          </Select>
                        </Form.Item>

                      }
                    </Col>
                    {item.isWorking == 'Working' ? (
                      <Col>
                        <Form.Item>
                          {item.data.map((val, indexVal) => {
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
                                    onChange={(e) => handleChangeTime(e, index, indexVal, 0)}
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
                                    onChange={(e) => handleChangeTime(e, index, indexVal, 1)}
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
                                    <Button type={'primary'} shape={'circle'} onClick={() => add(index)}>
                                      <Plus />
                                    </Button>
                                  ) : (
                                      <Button type={'danger'} shape={'circle'} onClick={() => remove(index, indexVal)}>
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
                );
              })}
            </Form>
          )}
        </TabPane>
        <TabPane tab="Booking hours" key="booking">
          <Checkbox checked={bookingIsGeneral} style={{ marginLeft: '40%' }} onChange={(e) => Sametime('booking')}>
            Same as general
          </Checkbox>
          {!bookingIsGeneral && (
            <Form autoComplete="off">
              {BookingTime.map((item, index) => {
                return (
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
                          {item.name}
                        </label>
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      {item.isWorking == "Working" &&
                        <Form.Item>
                          <Select
                            defaultValue={"Working"}
                            style={{ width: 140 }}
                            onChange={(e) => handelChangeWorkingSelect(e, index)}
                          >
                            <Option value="Working">Working</Option>
                            <Option value="Not Working">Not Working</Option>
                            <Option value="All Day">All Day</Option>
                          </Select>
                        </Form.Item>

                      }
                      {item.isWorking == "All Day" &&
                        <Form.Item>
                          <Select
                            defaultValue={"All Day"}
                            style={{ width: 140 }}
                            onChange={(e) => handelChangeWorkingSelect(e, index)}
                          >
                            <Option value="Working">Working</Option>
                            <Option value="Not Working">Not Working</Option>
                            <Option value="All Day">All Day</Option>
                          </Select>
                        </Form.Item>

                      }
                      {item.isWorking == "Not Working" &&
                        <Form.Item>
                          <Select
                            defaultValue={"Not Working"}
                            style={{ width: 140 }}
                            onChange={(e) => handelChangeWorkingSelect(e, index)}
                          >
                            <Option value="Working">Working</Option>
                            <Option value="Not Working">Not Working</Option>
                            <Option value="All Day">All Day</Option>
                          </Select>
                        </Form.Item>

                      }
                    </Col>
                    {item.isWorking == 'Working' ? (
                      <Col>
                        <Form.Item>
                          {item.data.map((val, indexVal) => {
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
                                    onChange={(e) => handleChangeTime(e, index, indexVal, 0)}
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
                                    onChange={(e) => handleChangeTime(e, index, indexVal, 1)}
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
                                    <Button type={'primary'} shape={'circle'} onClick={() => add(index)}>
                                      <Plus />
                                    </Button>
                                  ) : (
                                      <Button type={'danger'} shape={'circle'} onClick={() => remove(index, indexVal)}>
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
                );
              })}
            </Form>
          )}
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default WorkingTimeForm;
