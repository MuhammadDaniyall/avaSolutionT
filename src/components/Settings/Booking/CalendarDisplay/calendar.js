/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import {
  Col,
  Modal,
  Calendar,
} from 'antd';
import 'react-phone-input-2/lib/style.css';
import moment from 'moment';

import WorkingHours from './dateworkinghour';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
const CalendarModal = (props) => {
  const { visible, closeModal, calendarDataSubmit, formData } = props;
  const [calendarData, SetCalendarData] = useState([]);
  const [defaultData, SetDefaultData] = useState([]);
  const [workingHourVisible, setWorkingHourVisible] = useState(null);
  const [selectDate, setSelectDate] = useState({
    year: moment().year(),
    month: moment().month(),
    date: moment().date(),
    day: moment().day(),
  });
  let isCalendarHeader = false;
  useEffect(() => {
    if (visible) {
      if (formData) {
        SetCalendarData(JSON.parse(formData['CalendarData']));
        SetDefaultData(formData);
      } else {
        SetCalendarData([]);
      }
    }
  }, [visible]);
  const getListData = (value) => {
    let listData;
    let listDefaultData = {GeneralHours:null,WaitListHours:null,BookingHours:null};
    calendarData.map((data) => {
      if (data.Year == value.year() && data.Month == value.month() && data.Date == value.date()) {
        listData = data.Data;
      }
      return true;
    });
    if (defaultData.length != 0) {
      var tempData;
      if (defaultData['openingGeneralHours'] != "0") {
        tempData = JSON.parse(defaultData['openingGeneralHours']);
        tempData.map((data, index) => {
          if (moment(value).format("dddd") == data['name']) {
            listDefaultData['GeneralHours'] = data;
            if(listDefaultData['GeneralHours']['isWorking'] != "Working"){
              listDefaultData['GeneralHours']['data'] = [];
            }
            if (defaultData['openingWaitListHours'] != "0") {
              listDefaultData['WaitListHours'] = JSON.parse(defaultData['openingWaitListHours'])[index];
              if(listDefaultData['WaitListHours']['isWorking'] != "Working"){
                listDefaultData['WaitListHours']['data'] = [];
              }
            }
            else
              listDefaultData['WaitListHours'] = false;
            if (defaultData['openingBookingHours'] != "0") {
              listDefaultData['BookingHours'] = JSON.parse(defaultData['openingBookingHours'])[index];
              if(listDefaultData['WaitListHours']['isWorking'] != "Working"){
                listDefaultData['WaitListHours']['data'] = [];
              }
            }
            else
              listDefaultData['BookingHours'] = false;
          }
          return true;
        });
      }
    }
    return ([listData?1:0,listData || listDefaultData]);
  };

  const dateCellRender = (value) => {
    var datas = getListData(value);
    const styles = {
      first: {
        color: '#f80',
        fontSize: '10px',
        textAlign: 'left',
      },
      last: {
        color: '#c0c0bf',
        fontSize: '10px',
        textAlign: 'left',
      },
    };
    const listData = datas[1];
    if(listData.GeneralHours == null)
      return;
    let style = styles.first;
    if (datas[0] == 0) {
      style = styles.last;
    }
    let tag2;
    let tag3;
    if (listData.WaitListHours) {
      if (listData.WaitListHours.isWorking != 'Working') {
        tag2 = (
          <Col style={{ marginLeft: -0, maxWidth: '200%', textAlign: 'left' }} span={24}>
            <ClockCircleOutlined />
            {listData.WaitListHours.isWorking}
          </Col>
        );
      } else {
        tag2 = listData.WaitListHours.data.map((item, index) => {
          if (index == 0) {
            return (
              <Col style={{ marginLeft: 0, maxWidth: '200%' }} span={24}>
                <ClockCircleOutlined />
                {item[0] + '-' + item[1]}
              </Col>
            );
          } else {
            return (
              <Col style={{ marginLeft: 0, maxWidth: '200%' }} span={24}>
                {item[0] + '-' + item[1]}
              </Col>
            );
          }
        });
      }
    }
    if (listData.BookingHours) {
      if (listData.BookingHours.isWorking != 'Working') {
        tag3 = (
          <Col style={{ marginLeft: -0, maxWidth: '200%', textAlign: 'left' }} span={24}>
            <CalendarOutlined />
            {listData.BookingHours.isWorking}
          </Col>
        );
      } else {
        tag3 = listData.BookingHours.data.map((item, index) => {
          if (index == 0) {
            return (
              <Col style={{ marginLeft: 0, maxWidth: '200%' }} span={24}>
                <CalendarOutlined />
                {item[0] + '-' + item[1]}
              </Col>
            );
          } else {
            return (
              <Col style={{ marginLeft: 0, maxWidth: '200%' }} span={24}>
                {item[0] + '-' + item[1]}
              </Col>
            );
          }
        });
      }
    }
    return (
      <Col className={'gx-p-2'} span={24} style={style}>
        {listData.length != 0 &&
          listData.GeneralHours.data.map((item, index) => {
            return (
              <Col style={{ marginLeft: 0, maxWidth: '200%' }} span={24}>
                {item[0] + '-' + item[1]}
              </Col>
            );
          })}
        {listData.GeneralHours.isWorking != 'Working' && (
          <Col style={{ marginLeft: 0, maxWidth: '200%' }} span={24}>
            {listData.GeneralHours.isWorking}
          </Col>
        )}
        {tag2}
        {tag3}
      </Col>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const SelectData = (values) => {
    if (isCalendarHeader == false) {
      const tmpdate = {};
      tmpdate.year = values.year();
      tmpdate.month = values.month();
      tmpdate.date = values.date();
      tmpdate.day = values.day();
      setWorkingHourVisible(true);
      setSelectDate(tmpdate);
    }
    isCalendarHeader = false;
  };
  const clearDate = (values) => {
    const temp = calendarData;
    temp.map((item, index) => {
      if (item.Year == values.year && item.Month == values.month && item.Date == values.date) {
        temp.splice(index, 1);
      }
      return true;
    });
    SetCalendarData(temp);
    calendarDataSubmit(calendarData);
    setWorkingHourVisible(false);
  };
  const saveWorkingTime = async (...values) => {
    setWorkingHourVisible(false);
    const tmp = {
      Year: '',
      Month: '',
      Date: '',
      Data: { GeneralHours: {}, WaitListHours: {}, BookingHours: {} },
    };
    tmp.Year = selectDate.year;
    tmp.Month = selectDate.month;
    tmp.Date = selectDate.date;
    tmp.Data.GeneralHours = values[0];
    tmp.Data.WaitListHours = values[1];
    tmp.Data.BookingHours = values[2];

    if (values[3] == true) {
      tmp.Data.WaitListHours = false;
    }
    if (values[4] == true) {
      tmp.Data.BookingHours = false;
    }
    const TempCalendarData = calendarData;
    let flag = true;
    for (let index = 0; index < TempCalendarData.length; index++) {
      const element = TempCalendarData[index];
      if (element.Year == tmp.Year && element.Month == tmp.Month && element.Date == tmp.Date) {
        TempCalendarData[index].Data = tmp.Data;
        flag = false;
        break;
      }
    }
    if (flag) {
      TempCalendarData.push(tmp);
    }
    SetCalendarData(TempCalendarData);
    calendarDataSubmit(calendarData);
  };
  const onPanelChange = (values) => {
    isCalendarHeader = true;
  };
  const getDataByDate = () => {
    var tmpdate = {};
    tmpdate['Year'] = selectDate.year;
    tmpdate['Month'] = selectDate.month;
    tmpdate['Date'] = selectDate.date;
    tmpdate['Data'] = getListData(moment(selectDate.year+"-"+(selectDate.month+1)+"-"+selectDate.date))[1];
    if(tmpdate['Data'].GeneralHours != null){
      return JSON.stringify(tmpdate);   
    }
    // const TempCalendarData = calendarData;
    // for (let index = 0; index < TempCalendarData.length; index++) {
    //   const element = TempCalendarData[index];
    //   if (element.Year == selectDate.year && element.Month == selectDate.month && element.Date == selectDate.date) {
    //     return JSON.stringify(element);
    //   }
    // }
  };
  return (
    <Modal visible={visible} onCancel={closeModal} width={1000} footer={null}>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={SelectData}
        onPanelChange={onPanelChange}
      />
      <WorkingHours
        visible={workingHourVisible}
        closeModal={() => setWorkingHourVisible(false)}
        date={selectDate}
        saveWorkingTime={saveWorkingTime}
        clear={clearDate}
        modalData={getDataByDate()}
      ></WorkingHours>
    </Modal>
  );
};
export default CalendarModal;
