import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import { connect } from "react-redux";
import { getBookingSettings, updateBookingSetting } from '../../../appRedux/actions/Settings';
import WorkingHourModal from './CalendarDisplay/workingHours';
import CalendarModal from './CalendarDisplay/calendar';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const OpeningHour = (props) => {
  const [form] = Form.useForm();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [workingHourVisible, setWorkingHourVisible] = useState(false);

  const OpenWorkingHour = () => {
    setWorkingHourVisible(true);
  };

  const saveWorkingTime = (...values) => {
    const tmp = props.bookingSettings
    tmp.openingGeneralHours = JSON.stringify(values[0]);
    if (values[3] == true) {
      tmp.openingWaitListHours = false;
    } else {
      tmp.openingWaitListHours = JSON.stringify(values[1]);
    }
    if (values[4] == true) {
      tmp.openingBookingHours = false;
    } else {
      tmp.openingBookingHours = JSON.stringify(values[2]);
    }
    tmp['user_id'] = props.user.id;
    props.updateBookingSetting(tmp);
    setWorkingHourVisible(false);
  };
  const saveCalendarData = (...values) => {
    const tmp = props.bookingSettings;
    tmp['CalendarData'] = JSON.stringify(values[0]);
    tmp['user_id'] = props.user.id;
    props.updateBookingSetting(tmp);
  }


  const clearAll = () => {
    const tmp = {};
    tmp.openingGeneralHours = false;
    tmp.openingWaitListHours = false;
    tmp.openingBookingHours = false;
    tmp['user_id'] = props.user.id;
    props.updateBookingSetting(tmp);
    setWorkingHourVisible(false);
  };
  const OpenCalendar = () => {
    setCalendarVisible(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
  };
  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Opening hours
          </Title>

        </div>
        <Row className={"gx-flex-sm-row"} gutter={[10]}>
          <Col>
            <Button onClick={OpenCalendar} style={{ width: 100, height: 40 }}>Calendar</Button>
          </Col>
          <Col>
            <Button onClick={OpenWorkingHour} style={{ width: 100, height: 40 }}>Edit</Button>
          </Col>
        </Row>
      </div >
      {props.bookingSettings &&
        <Col span={12} style={{ marginLeft: 31 }}>
          {props.bookingSettings.openingGeneralHours != "0" ? (
            JSON.parse(props.bookingSettings.openingGeneralHours).map((item, index) => {
              return (
                <Row className={'gx-flex-sm-row'} key={index}>
                  <Col span={14}>
                    <Row className={'gx-flex-sm-row'}>{item.name}</Row>
                  </Col>
                  <Col span={10}>
                    <Row className={'gx-flex-sm-row'}>
                      {item.isWorking != 'Working' && <Col span={24}>{item.isWorking}</Col>}
                      {item.isWorking == 'Working' &&
                        item.data.map((val) => {
                          return <Col span={24}>{val[0] + '-' + val[1]}</Col>;
                        })}
                      {props.bookingSettings.openingWaitListHours != "0" &&
                        JSON.parse(props.bookingSettings.openingWaitListHours).map((item1, index1) => {
                          if (index1 == index) {
                            if (item1.isWorking != 'Working') {
                              return (
                                <Col
                                  style={{
                                    fontSize: 11,
                                    color: '#c0c0bf',
                                    textAlign: 'left',

                                  }}
                                  span={18}
                                >
                                  <ClockCircleOutlined
                                    style={{
                                      fontSize: 11,
                                      color: '#c0c0bf',
                                    }}
                                  />
                                  {item1.isWorking}
                                </Col>
                              );
                            }
                            return item1.data.map((val, indexVal) => {
                              let tag;
                              if (indexVal == 0) {
                                tag = (
                                  <Col
                                    style={{
                                      fontSize: 11,
                                      color: '#c0c0bf',
                                      textAlign: 'left',
                                    }}
                                    span={18}
                                  >
                                    <ClockCircleOutlined
                                      style={{
                                        fontSize: 11,
                                        color: '#c0c0bf',
                                      }}
                                    />
                                    {val[0] + '-' + val[1]}
                                  </Col>
                                );
                              } else {
                                tag = (
                                  <Col
                                    style={{
                                      fontSize: 11,
                                      color: '#c0c0bf',
                                      textAlign: 'left',
                                    }}
                                    span={18}
                                  >
                                    {val[0] + '-' + val[1]}
                                  </Col>
                                );
                              }
                              return tag;
                            });
                          }
                          return true;
                        })}
                      {props.bookingSettings.openingBookingHours != "0" &&
                        JSON.parse(props.bookingSettings.openingBookingHours).map((item1, index1) => {
                          if (index1 == index) {
                            if (item1.isWorking != 'Working') {
                              return (
                                <Col
                                  style={{
                                    fontSize: 11,
                                    color: '#c0c0bf',
                                    textAlign: 'left',

                                  }}
                                  span={18}
                                >
                                  <ClockCircleOutlined
                                    style={{
                                      fontSize: 11,
                                      color: '#c0c0bf',
                                    }}
                                  />
                                  {item1.isWorking}
                                </Col>
                              );
                            }
                            return item1.data.map((val, indexVal) => {
                              let tag;
                              if (indexVal == 0) {
                                tag = (
                                  <Col
                                    style={{
                                      fontSize: 11,
                                      color: '#c0c0bf',
                                      textAlign: 'left',
                                    }}
                                    span={18}
                                  >
                                    <CalendarOutlined
                                      style={{
                                        fontSize: 11,
                                        color: '#c0c0bf',
                                      }}
                                    />
                                    {val[0] + '-' + val[1]}
                                  </Col>
                                );
                              } else {
                                tag = (
                                  <Col
                                    style={{
                                      fontSize: 11,
                                      color: '#c0c0bf',
                                      textAlign: 'left',
                                    }}
                                    span={18}
                                  >
                                    {val[0] + '-' + val[1]}
                                  </Col>
                                );
                              }
                              return tag;
                            });
                          }
                          return true;
                        })}
                    </Row>
                  </Col>
                </Row>
              );
            })
          ) : (
              <a />
            )}

        </Col>
      }
      {props.bookingSettings &&
        <WorkingHourModal
          visible={workingHourVisible}
          saveWorkingTime={saveWorkingTime}
          clearAll={clearAll}
          modalData={props.bookingSettings}
          closeModal={() => {
            setWorkingHourVisible(false);
          }}
        ></WorkingHourModal>
      }
      {props.bookingSettings &&
        <CalendarModal
          visible={calendarVisible}
          closeModal={() => {
            setCalendarVisible(false);
          }}
          formData={props.bookingSettings}
          calendarDataSubmit={saveCalendarData}
        ></CalendarModal>
      }
    </div >
  );
};

const mapStateToProps = ({ auth, settings }) => {
  const { user } = auth;
  const { bookingSettings } = settings;
  return { user, bookingSettings };
};
export default connect(mapStateToProps, { getBookingSettings, updateBookingSetting, })(OpeningHour);
