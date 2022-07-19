import React, { useEffect, useState } from 'react';
import { Button, Space, Typography, Select } from 'antd';
import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import { connectProps } from '@devexpress/dx-react-core';
import '../../styles/dx.common.css';
import '../../styles/dx.light.css';
import moment from 'moment';
import { message } from 'antd';
import { connect } from 'react-redux';
import { getBookingData, addBookingData, updateBookingData, deleteBookingData } from '../../appRedux/actions/Schedule';

import {
    getField,
} from '../../appRedux/actions/Settings'

import { getFilterBookingSetting } from '../../appRedux/actions/Settings';

import AppointmentForm from '../../components/Schedule/AppointmentForm';
import AppointmentTooltipContainer from '../../components/Schedule/AppointmentTooltipContainer';
import Appointment from '../../components/Schedule/Appointment';
import notify from 'devextreme/ui/notify';
import { element } from 'prop-types';

const { Title } = Typography;
const { Option } = Select;

const resourcesData = [
    {
        id: 1,
        text: 'booking',
        color: '#1e90ff',
    },
    {
        id: 2,
        text: 'appointment',
        color: '#52c41a',
    },
    {
        id: 3,
        text: 'decline',
        color: '#607d8b',
    },
];

const ScheduleScreen = (props) => {

    const [visible, setVisible] = useState(false);
    const [formdata, setFormData] = useState(null);
    const [newForm, setNewForm] = useState(false);
    const [isCell, setIsCell] = useState(false);
    const [calendarNotWorking, setCalendarNotWorking] = useState(null);
    const { user, bookingData, addBookingData, updateBookingData, deleteBookingData, getBookingData } = props;
    const [startDay, setStartDay] = useState(0);
    const [generalStartTime, setGeneralStartTime] = useState(8);
    const [generalEndTime, setGeneralEndTime] = useState(8);
    const [scheduleView, setScheduleView] = useState(null);
    const [minDuration, setMinDuration] = useState(30);
    const [SelectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        AppointmentTooltip.update();
        initialData();
    }, []);

    const initialData = async () => {
        await props.getField(user.id);
        await props.getBookingData(user.id);
        await props.getFilterBookingSetting({ user_id: user.id });
    };

    useEffect(() => {
        if (props.bookingSettings) {
            generalSetting();
            setCalendarNotWorking([]);
        }
    }, [props.bookingSettings])

    const onAppointmentFormOpening = (e) => {
        e.cancel = true;
    }



    const generalSetting = async () => {
        if (props.bookingSettings.WeekStartDay == "Monday") {
            setStartDay(1);
        }
        else if (props.bookingSettings.WeekStartDay == "Today") {
            setStartDay(moment(new Date()).format("d"));
        }
        if (props.bookingSettings.StartHour)
            setGeneralStartTime(props.bookingSettings.StartHour * 1);

        if (props.bookingSettings.EndHour) {
            setGeneralEndTime(props.bookingSettings.EndHour * 1);
        }
        if (props.bookingSettings.minDuration) {
            setMinDuration(props.bookingSettings.minDuration * 1);
        }
        // if (props.bookingSettings.maxDuration)
        //     setMaxDuration(props.bookingSettings.maxDuration * 1);
        if (props.bookingSettings.DefaultView)
            switch (props.bookingSettings.DefaultView) {
                case "Daily":
                    {
                        setScheduleView("day");
                        break;
                    }
                case "Weekly":
                    {
                        setScheduleView("week");
                        break;
                    }
                case "Monthly":
                    {
                        setScheduleView("month");
                        break;
                    }
                case "List":
                    {
                        // setScheduleView("day");
                        break;
                    }
            }
    }
    const notifyDisableDate = () => {
        notify('This time is not working.', 'warning', 2000);
    }

    const renderDataCell = (itemData) => {
        if (scheduleView == "month") {
            return (<div>{itemData.text}</div>);
        }
        const isDisableDate = isWorking(itemData.startDate);
        return (
            <div className={isDisableDate ? 'disable-date' : ''}>{itemData.text}</div>
        );
    }

    const onAppointmentEditBtnClick = async(bookingId) => {
        setNewForm(false);
        setVisible(true);
        await updateBookingData(bookingId)
        await getBookingData(user.id);
    };

    const onAppointmentDeleteBtnClick = async (bookingId) => {
        await deleteBookingData(bookingId);
        await getBookingData(user.id);
    };
    const AppointmentTooltip = connectProps(AppointmentTooltipContainer, () => {
        return {
            onAppointmentEditBtnClick: onAppointmentEditBtnClick,
            onAppointmentDeleteBtnClick: onAppointmentDeleteBtnClick,
        };
    });
    const handleClick = () => {
        setNewForm(true);
        if (isCell) setVisible(true);
    };

    const handleSubmit = async (values) => {
        const isValidAppointments = isValidAppointment(values);
        if (!isValidAppointments) {
            notifyDisableDate();
        }
        else {
            setVisible(false);
            var id = user.id;
            values['user_id'] = id;
            console.log(values);
            if (newForm) await addBookingData(values);
            else await updateBookingData(values);
            await getBookingData(user.id);

        }
    };


    const onCellClick = (e) => {
        var cellCount = props.bookingData.filter(data => {
            return moment(data.startDate).isBetween(e.cellData.startDate, e.cellData.endDate, undefined, '[]') && moment(data.endDate).isBetween(e.cellData.startDate, e.cellData.endDate, undefined, '[]');
        }).length;
        if (cellCount >= props.bookingSettings.SpotsPerTimeSlot) {
            setIsCell(false);
            notify("This time is too much appointment!", "warning", 2000);
        }
        else {
            const startDate = new Date(e.cellData.startDate);
            if (!isValidAppointmentDate(startDate)) {
                setIsCell(false);
            }
            else {
                setIsCell(true);
            }
            setVisible(false);
            setFormData({
                date: moment(e.cellData.startDate),
                startDate: moment(e.cellData.startDate),
                endDate: moment(e.cellData.endDate),
            });
        }
    };
    const onAppointmentUpdating = (e) => {
        var dates = getBetweenTime(e.newData.startDate, e.newData.endDate, props.bookingSettings.minDuration);
        if (!checkTime(dates,e.oldData)) {
            e.cancel = true;
            notify("This time is too much appointment!", "warning", 2000);
        }
        else {
            const isValidAppointments = isValidAppointment(e.newData);
            if (!isValidAppointments) {
                e.cancel = true;
                notifyDisableDate();
            }
        }
    }
    const checkTime = (Dates,oldData) => {
        for (let index1 = 0; index1 < Dates.length; index1++) {
            const element1 = Dates[index1];
            var count = 0;
            for (let index = 0; index < props.bookingData.length; index++) {
                const element = props.bookingData[index];
                if(!(moment(element['startDate']).isSame(oldData['startDate'])&&moment(element['endDate']).isSame(oldData['endData']))){
                    if (moment(element['startDate']).isSame(element1['start']) && moment(element['endDate']).isSame(element1['end'])) {
                        count++;
                    }
                    else if (moment(element['startDate']).isBetween(element1['start'], element1['end'], undefined, "[)") || moment(element['endDate']).isBetween(element1['start'], element1['end'], undefined, "(]")||moment(element1['start']).isBetween(element['startDate'], element['endDate'], undefined, "[)") || moment(element1['end']).isBetween(element['startDate'], element['endDate'], undefined, "(] ")) {
                        {
                            // if () {
                                count++;
                            // }
                        }
                    }
                }
            }
            if (count >= props.bookingSettings.SpotsPerTimeSlot) {
                return false;
            }
        }
        return true;
    }
    const getBetweenTime = (startTime, endTime, duration) => {
        var result = [];
        if (moment(startTime).isAfter(endTime)) {
            notify("Start time must before than end time.", "error", 2000);
            return;
        }
        do {
            var temp = {};
            temp['start'] = moment(startTime).format("YYYY-MM-DD h:mm:ss");
            startTime = moment(startTime).add(duration, "minutes").format("YYYY-MM-DD h:mm:ss");
            temp['end'] = moment(startTime).format("YYYY-MM-DD h:mm:ss");
            result.push(temp);
        } while (moment(startTime).isBefore(endTime));
        return result;
    }
    const onAppointmentClick = (e) => {
        setNewForm(false);
        setIsCell(false);
        setFormData({
            ...e.appointmentData,
            date: moment(e.appointmentData.startDate),
            startDate: moment(e.appointmentData.startDate),
            endDate: moment(e.appointmentData.endDate),
        });
    };
    const onAppointmentUpdated = async (e) => {
        await updateBookingData(e.appointmentData);
        await getBookingData(user.id);
    };

    const isWorking = (date) => {
        var result = false;
        var isSettingCalendar = false;
        var tempCalendarData = JSON.parse(props.bookingSettings.CalendarData);
        for (let index = 0; index < tempCalendarData.length; index++) {
            const year = tempCalendarData[index]['Year'];
            const month = tempCalendarData[index]['Month'];
            const day = tempCalendarData[index]['Date'];
            if (moment(date).format('YYYY') == year && moment(date).format('M') == (month + 1) && moment(date).format('D') == day) {
                isSettingCalendar = true;
                const data = tempCalendarData[index]['Data']['BookingHours'] ? tempCalendarData[index]['Data']['BookingHours'] : tempCalendarData[index]['Data']['GeneralHours'];
                if (data['isWorking'] == 'Not Working') {
                    return true;
                }
                else if (data['isWorking'] == "Working") {
                    for (let index1 = 0; index1 < data['data'].length; index1++) {
                        var tmp = year + "-" + (month + 1) + "-" + day + " ";
                        var tmpdate = moment(date).format('YYYY-MM-DD hh:mm a');
                        var startTime = tmp + data['data'][index1][0];
                        var endTime = tmp + data['data'][index1][1];
                        if (moment(tmpdate).isBetween(startTime, endTime) || (moment(tmpdate).isSame(startTime))) {
                            return false;
                        }
                    }
                    return true;
                }
                else if (data['isWorking'] == 'All Day') {
                    return false;
                }
            }
        }
        var GeneralData = props.bookingSettings.openingBookingHours != "0" ? JSON.parse(props.bookingSettings.openingBookingHours) : JSON.parse(props.bookingSettings.openingGeneralHours);
        if (GeneralData) {
            for (let index2 = 0; index2 < GeneralData.length; index2++) {
                if (moment(date).format("dddd") == GeneralData[index2]['name'])
                    var tempGeneralData = GeneralData[index2];
            }
            if (tempGeneralData['isWorking'] == 'Not Working') {
                return true;
            }
            else if (tempGeneralData['isWorking'] == "Working") {
                for (let index1 = 0; index1 < tempGeneralData['data'].length; index1++) {
                    var tmp = "2020-10-10 ";
                    var tmpdate = tmp + moment(date).format('hh:mm a');
                    var startTime = tmp + tempGeneralData['data'][index1][0];
                    var endTime = tmp + tempGeneralData['data'][index1][1];
                    if (moment(tmpdate).isBetween(startTime, endTime) || (moment(tmpdate).isSame(startTime))) {
                        return false;
                    }
                }
                return true;
            }
            else if (tempGeneralData['isWorking'] == 'All Day') {
                return false;
            }
        }
        return result;
    }

    const isValidAppointment = (appointmentData) => {
        const startDate = new Date(appointmentData.startDate);
        const endDate = new Date(appointmentData.endDate);
        return isValidAppointmentInterval(startDate, endDate);
    }

    const isValidAppointmentInterval = (startDate, endDate) => {
        const date = startDate;
        while (moment(date).isBefore(moment(endDate))) {
            if (!isValidAppointmentDate(date)) {
                return false;
            }
            const newDateTime = moment(date).add(minDuration, 'minutes');
            date.setTime(newDateTime);
        }

        return true;
    }

    const onCurrentDateChange = async (e) => {
        setSelectedDate(e);
        var tmp;
        tmp = getFilterTime(scheduleView, startDay, moment(e).format("YYYY-MM-DD"))
        await props.getFilterBookingSetting({ user_id: user.id, filterTime: tmp, currentView: scheduleView });

    };
    const isValidAppointmentDate = (date) => {
        return !isWorking(date);
    }
    const getFilterTime = (type, startDate, CurrentDate) => {
        if (startDate == "Today") {
            startDate = moment(new Date()).format("dddd");
        }
        var filterTime = { start: "", end: "" };
        var generalDate = CurrentDate;
        switch (type) {
            case "day": {
                filterTime['start'] = moment(generalDate).format("YYYY-MM-DD");
                filterTime['end'] = moment(generalDate).format("YYYY-MM-DD");
                break;
            }
            case "week": {
                var tempGeneralDate = generalDate;
                while (moment(tempGeneralDate).format("d") != startDate) {
                    tempGeneralDate = moment(tempGeneralDate).subtract(1, 'days');
                }
                filterTime['start'] = moment(tempGeneralDate).format("YYYY-MM-DD");
                tempGeneralDate = generalDate;
                while (moment(tempGeneralDate).add(1, "days").format("d") != startDate) {
                    tempGeneralDate = moment(tempGeneralDate).add(1, 'days');
                }
                filterTime['end'] = moment(tempGeneralDate).format("YYYY-MM-DD");
                break;
            }
            case "month": {
                var month = moment(generalDate).format("M");
                var year = moment(generalDate).format("YYYY");
                filterTime['start'] = moment(generalDate).format('YYYY-MM') + "-1";
                filterTime['end'] = moment(new Date(year, month, 0)).format('YYYY-MM-DD');
                break;
            }
            default: {
                break;
            }
        }
        return filterTime;
    }
    const changeView = async (e) => {
        var tmp;
        tmp = getFilterTime(e, startDay, moment(SelectedDate).format("YYYY-MM-DD"));
        await props.getFilterBookingSetting({ user_id: user.id, filterTime: tmp, currentView: e });
    }
    return (
        <div className={'content-form tasks__content-form'}>
            <div className={'content-form__header'}>
                <Title level={4}></Title>
                <Button type="primary" className={'content-form__button'} onClick={handleClick}>
                    + New Schedule
            </Button>
            </div>
            <div className={'content-form__form'}>
                <div className={'booking__wrapper'}>
                    {
                        props.bookingSettings &&
                        <Select value={scheduleView} style={{ width: 100, width: 132, top: 206, zIndex: 2, right: 59, position: 'absolute' }}
                            onChange={(e) => { changeView(e) }}
                        >
                            {/* <Option key={'List'}>List</Option> */}
                            <Option key={'day'}>Daily</Option>
                            <Option key={'week'}>Weekly</Option>
                            <Option key={'month'}>Monthly</Option>
                        </Select>
                    }
                    {
                        calendarNotWorking &&
                        <Scheduler
                            // agendaDuration
                            agenaDuration={1}
                            // views={views}
                            dataCellRender={renderDataCell}
                            dataSource={bookingData}
                            defaultCurrentView={scheduleView}
                            defaultCurrentDate={new Date()}
                            startDayHour={8}
                            endDayHour={22}
                            height={600}
                            // onAppointmentDblClick={false}
                            onAppointmentClick={onAppointmentClick}
                            showAllDayPanel={false}
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentUpdated={onAppointmentUpdated}
                            onCellClick={onCellClick}
                            appointmentComponent={Appointment}
                            appointmentTooltipComponent={AppointmentTooltip}
                            onCurrentDateChange={onCurrentDateChange}
                            onAppointmentUpdating={onAppointmentUpdating}
                            firstDayOfWeek={startDay}
                            startDayHour={generalStartTime}
                            endDayHour={generalEndTime}
                            currentView={scheduleView}
                            cellDuration={minDuration}
                        >
                            <Resource dataSource={resourcesData} fieldExpr="appointment_type" useColorAsDefault={true} />
                        </Scheduler>
                    }
                    {formdata !== null && (
                        <AppointmentForm
                            visible={visible}
                            newForm={newForm}
                            formdata={formdata}
                            handleSubmit={handleSubmit}
                            closeModal={() => {
                                setVisible(false);
                            }}
                        />
                    )}
                </div>
                <div className={'booking-status__wrapper'}>
                    <Space size={15}>
                        <div className={'status-row'}>
                            <span className={'status-row-bullet status-row__booking'}></span>
                            <span className={'status-row-label'}> - Booking</span>
                        </div>
                        <div className={'status-row'}>
                            <span className={'status-row-bullet status-row__accept'}></span>
                            <span className={'status-row-label'}> - Accept</span>
                        </div>
                        <div className={'status-row'}>
                            <span className={'status-row-bullet status-row__cancel'}></span>
                            <span className={'status-row-label'}> - Cancel</span>
                        </div>
                    </Space>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ auth, schedule, settings }) => {
    const { user } = auth;
    const { bookingSettings } = settings;
    const { bookingData } = schedule;
    return { user, bookingData, bookingSettings };
};

export default connect(mapStateToProps, {
    getBookingData,
    addBookingData,
    updateBookingData,
    deleteBookingData,
    getField,
    getFilterBookingSetting,
})(ScheduleScreen);
