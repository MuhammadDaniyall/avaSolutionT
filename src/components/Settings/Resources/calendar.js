/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Space,
  Col,
  Modal,
  Form,
  Input,
  Button,
  message,
  Select,
  Tabs,
  TimePicker,
  Checkbox,
  Calendar,
  Badge,
} from 'antd';
import 'react-phone-input-2/lib/style.css';
import moment from 'moment';

import WorkingHours from './dateworkinghour';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
const CalendarModal = (props) => {
  const { visible, closeModal, workingDataSubmit, formData } = props;
  const [calendarData, SetCalendarData] = useState([]);
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
        SetCalendarData(formData);
      } else {
        SetCalendarData([]);
      }
    }
  }, [visible]);
  const getListData = (value) => {
    let listData;
    calendarData.map((data) => {
      if (data.Year == value.year() && data.Month == value.month() && data.Date == value.date()) {
        listData = data.Data;
      }
      return true;
    });
    const data = {
      GeneralHours: {
        name: 'Wednesday',
        isWorking: 'Working',
        data: [['9:00 am', '6:00 pm', 'none', 'none']],
      },
      WaitListHours: false,
      BookingHours: false,
      isDefault: true,
    };
    return listData || data;
  };

  const dateCellRender = (value) => {
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
    const listData = getListData(value);
    let style = styles.first;
    if (listData.isDefault) {
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
    setWorkingHourVisible(false);
  };
  const saveWorkingTime = (...values) => {
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
    workingDataSubmit(calendarData);
  };
  const onPanelChange = (values) => {
    isCalendarHeader = true;
  };
  const getDataByDate = () => {
    const TempCalendarData = calendarData;
    for (let index = 0; index < TempCalendarData.length; index++) {
      const element = TempCalendarData[index];
      if (element.Year == selectDate.year && element.Month == selectDate.month && element.Date == selectDate.date) {
        return element;
      }
    }
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
