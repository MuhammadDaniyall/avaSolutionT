import React, { useState, useEffect } from 'react';
import { Switch, Button, Typography, Tabs } from 'antd';
import { connect } from 'react-redux';
import {
  getAlertSettings,
  updateAlertSetting,
} from "../../../appRedux/actions/Settings"
// components
import AlertEditModal from './AlertEditModal';

const { TabPane } = Tabs;
const { Title } = Typography;

const AlertTabContent = (props) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [modalKey, setModalKey] = useState('');
  const [modalData, setModalData] = useState('');
  const [defaultSMSTemplates, setdefaultSMSTemplates] = useState('');
  const [defaultEmailTemplates, setdefaultEmailTemplates] = useState('');


  const lists1 = [
    { Name: 'Confirmation', comment: ' sent when customer is added to waitlist.', key: 'Confirmation', defaultSMSTemplate: "Hi {name}! You're waitlisted to {business} as #{order} in line. See live wait at {link} Reply 'cancel' if you can't make it.", defaultEmailTemplate: "Hi {name}!\n\nYou've been waitlisted to {business} as #{order} in line. [View the waitlist]({link}) and remove yourself if you cannot make it.\n\nWe look forward to serve you soon!\n\n*{business}*" },
    { Name: 'Next in line', comment: ' sent automatically when customer is X in line.', key: 'NextInLine', defaultSMSTemplate: "Heads up! It's soon your turn at {business} so start heading back. If you can't make it, go to {link} or reply 'cance", defaultEmailTemplate: "Hi {name}!\n\nIt's soon your turn at {business} so start heading back. If you cannot make it, please [cancel yourself]({link}).\n\nWe look forward to serve you soon!\n\n*{business}*" },
    { Name: 'Alert', comment: ' sent when you click the "Alert" button.', key: 'Alert', defaultSMSTemplate: "Voila! It's your turn at {business}. Please return in 5 min. If you can't make it, go to {link} or reply 'cancel'", defaultEmailTemplate: "Hi {name}!\n\nIt's your turn at {business}. Please return in 5 min. If you cannot make it, please [cancel yourself]({link}).\n\nWe look forward to serve you soon!\n\n*{business}*" },
    { Name: 'Served', comment: ' sent when customer is served.', key: 'Served', defaultSMSTemplate: "Finally! You have been served at {business}", defaultEmailTemplate: "Hi {name}!\n\nWe're happy to now serve you at {business}." },
    { Name: 'Completed', comment: ' sent after a customer has been served and marked as completed.', key: 'Completed', defaultSMSTemplate: "Thank you for visiting {business}, {name}! We hope to see you back soon", defaultEmailTemplate: "Thank you for visiting {business}, {name}!\n\nWe hope to see you back soon." },
    { Name: 'Cancelled', comment: ' sent after a customer has been cancelled.', key: 'Cancelled', defaultSMSTemplate: "You've been cancelled from the waitlist for {business}. Thanks for letting us know, {name}", defaultEmailTemplate: "Hi {name}!\n\nYou've been cancelled from the waitlist for {business}.\n\nThank you!\n\n*{business}*" },
    { Name: 'No show', comment: ' sent automatically when [object Object] is marked as no-show.', key: 'NoShow', defaultSMSTemplate: "Your place in line at {business} was marked as no-show.", defaultEmailTemplate: "Hi {name}! \n\nYour place in line at {business} was marked as no-show. We hope to see you back soon!" }]
  const list2 = [
    { Name: 'Booking Confirmation', comment: ' sent automatically for new bookings.', key: 'BookingConfirmation', defaultSMSTemplate: "Hi {name}! You're scheduled for an booking {date} at {hour} at {business}. Manage it on {link}", defaultEmailTemplate: "Hi {name}!\n\nYou've been scheduled for an booking {calendar} at {business}. \n\nManage your booking on {link}. \n\nWe look forward to serve you soon!\n\n*{business}*" },
    { Name: 'Booking Reminder', comment: ' sent automatically to remind about the booking ahead of time.', key: 'BookingReminder', defaultSMSTemplate: "Heads-up that your booking is {calendar} at {business}. Manage it on {link}", defaultEmailTemplate: "Hi {name}!\n\nHeads-up that you have an booking coming up {calendar} at {business}. \n\nManage your booking on {link}.\n\nWe look forward to serve you soon!\n\n*{business}*" },
    { Name: 'Booking Alert', comment: 'sent on your request to notify a customer about their booking', key: 'BookingAlert', defaultSMSTemplate: "Voila! It's time for your booking at {business}. Please be ready in 5 min! Manage it on {link}", defaultEmailTemplate: "Hey {name}!\n\nGet ready for your booking {calendar} at {business}. We look forward to see you in just a moment! \n\n*{business}*" },
    { Name: 'Booking Served', comment: ' sent on your request to notify a customer is served', key: 'BookingServed', defaultSMSTemplate: "Finally! You have been served at {business}", defaultEmailTemplate: "Hi {name}!\n\nWe're happy to now serve you at {business}." },
    { Name: 'Booking Completed', comment: ' sent on your request to notify a customer has been marked as completed', key: 'BookingCompleted', defaultSMSTemplate: "Thank you for visiting {business}, {name}! We hope to see you back soon", defaultEmailTemplate: "Thank you for visiting {business}, {name}!\n\nWe hope to see you back soon." },
    { Name: 'Booking Cancelled', comment: ' sent after a booking has been cancelled.', key: 'BookingCancelled', defaultSMSTemplate: "Your booking was cancelled on {calendar} at {business}", defaultEmailTemplate: "Hi {name}!\n\nYour booking at {business} on {calendar} has been cancelled. \n\nYou can find another time on our [booking page](https://app.waitwhile.com/book/{waitlistId}).\n\nThank you!\n\n*{business}*" },
    { Name: 'Booking No showed', comment: ' sent automatically when [object Object] is marked as no-show.', key: 'BookingNoShow', defaultSMSTemplate: "{name} at {calendar} for {business} was no-showed.", defaultEmailTemplate: "Heads up!\n\n{name} booking at {calendar} for {business} was no-showed." },
  ]



  useEffect(() => {
    props.getAlertSettings(props.user.id);
  }, [])

  const handleChange = async (e, key, data_field) => {
    const tempData = {};
    tempData['user_id'] = props.user.id;
    tempData['key'] = key;
    tempData['enable'] = e;
    const data_field_temp = data_field;
    if (e) {
      data_field_temp['SendAsSMS'] = true;
      data_field_temp['SendAsEmail'] = true;
    }
    else {
      data_field_temp['SendAsSMS'] = false;
      data_field_temp['SendAsEmail'] = false;
    }
    tempData['data_field'] = JSON.stringify(data_field_temp);
    await props.updateAlertSetting(tempData);
  };
  const saveData = async (values) => {
    const tempData = {};
    if (values['SendAsSMS'] == true || values['SendAsEmail'] == true) {
      tempData['enable'] = true;
    }
    else {
      tempData['enable'] = false
    }
    tempData['data_field'] = JSON.stringify(values);
    tempData['user_id'] = props.user.id;
    tempData['key'] = modalKey;
    await props.updateAlertSetting(tempData);
    setVisible(false);
  }
  const handleClick = async (values) => {
    let index = 0;
    let flag = false;
    for (index = 0; index < props.alertSettings.length; index++) {
      if (props.alertSettings[index]['key'] == values.key) {
        flag = true;
        setModalData(JSON.parse(props.alertSettings[index]['data_field']));
        break;
      }
    }
    if (flag == false) {
      setModalData('');
    }
    setTitle(values.Name);
    setModalKey(values.key);
    setVisible(true);
    setdefaultSMSTemplates(values.defaultSMSTemplate);
    setdefaultEmailTemplates(values.defaultEmailTemplate);
  };

  if (!props.alertSettings) {
    return true;
  }
  else {
    return (
      <Tabs>
        <TabPane key={1} tab={<b>Waitlist</b>}>
          <div className={'alerts__wrapper'}>
            {
              lists1.map(item => {
                return (
                  <div className={'alerts-item__wrapper gx-d-flex gx-align-items-center gx-justify-content-between'}>
                    {
                      props.alertSettings.map(value => {
                        if (value.key == item.key) {
                          const temp = JSON.parse(value['data_field']);
                          var HeadComment = '';
                          if (temp['SendAsSMS']) {
                            HeadComment = HeadComment + 'SMS';
                            if (temp['SendAsEmail']) {
                              HeadComment = HeadComment + ' And Email';
                            }
                          }
                          else if (temp['SendAsEmail']) {
                            HeadComment = HeadComment + 'Email';
                          }
                          return (
                            <div className={'gx-d-flex gx-align-items-center'}>
                              <Switch checked={(value.enable)} onChange={(e) => { handleChange(e, item.key, JSON.parse(value['data_field'])) }} />
                              <div className={'gx-ml-3'}>
                                <Title level={5}>{item.Name}</Title>
                                {
                                  value.enable ?
                                    <span className={'alert-item__description'}>{HeadComment}{item.comment}</span>
                                    :
                                    <span className={'alert-item__description'}></span>
                                }
                              </div>
                            </div>
                          )
                        }
                      })
                    }
                    <Button onClick={() => handleClick(item)}>Edit</Button>
                  </div>
                )
              })
            }
          </div>
        </TabPane>

        <TabPane key={2} tab={<b>Bookings</b>}>
          <div className={'alerts__wrapper'}>
            {
              list2.map(item => {
                return <div className={'alerts-item__wrapper gx-d-flex gx-align-items-center gx-justify-content-between'}>
                  {
                    props.alertSettings.map(value => {
                      if (value.key == item.key) {
                        const temp = JSON.parse(value['data_field']);
                        var HeadComment = '';
                        if (temp['SendAsSMS']) {
                          HeadComment = HeadComment + 'SMS';
                          if (temp['SendAsEmail']) {
                            HeadComment = HeadComment + ' And Email';
                          }
                        }
                        else if (temp['SendAsEmail']) {
                          HeadComment = HeadComment + 'Email';
                        }
                        return (
                          <div className={'gx-d-flex gx-align-items-center'}>
                            <Switch checked={value.enable} onChange={(e) => { handleChange(e, item.key, JSON.parse(value['data_field'])) }} />
                            <div className={'gx-ml-3'}>
                              <Title level={5}>{item.Name}</Title>
                              {
                                value.enable ?
                                  <span className={'alert-item__description'}>{HeadComment}{item.comment}</span>
                                  :
                                  <span className={'alert-item__description'}></span>
                              }
                            </div>
                          </div>
                        )
                      }
                    })
                  }
                  <Button onClick={() => handleClick(item)}>Edit</Button>
                </div>
              })
            }
          </div>
        </TabPane>
        <AlertEditModal
          visible={visible}
          title={title}
          modalKey={modalKey}
          defaultEmailTemplate={defaultEmailTemplates}
          defaultSMSTemplate={defaultSMSTemplates}
          modalData={modalData}
          handleSubmit={saveData}
          closeModal={() => {
            setVisible(false);
          }}
        />
      </Tabs>
    );
  };

}

const mapStateToProps = ({ settings, auth }) => {
  const { user } = auth;
  const { alertSettings } = settings;
  return { alertSettings, user };
};

export default connect(mapStateToProps, { getAlertSettings, updateAlertSetting })(AlertTabContent);
