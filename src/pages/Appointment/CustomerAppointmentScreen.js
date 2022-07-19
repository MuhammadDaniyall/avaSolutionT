import React, { useEffect } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { getKeyValidation, updateAppointment } from '../../appRedux/actions/Appointment';

const CustomerAppointmentScreen = (props) => {
  const { appointmentData, getKeyValidation, updateAppointment } = props;

  useEffect(() => {
    if (props.match.params.random_key) {
      keyValidation();
    } else {
      props.history.push('/signin');
    }
  }, []);

  useEffect(() => {
    // console.log(appointmentData);
  }, [appointmentData]);

  const keyValidation = async () => {
    await getKeyValidation(props.match.params.random_key);
  };

  const onAcceptClick = async () => {
    await updateAppointment(2, appointmentData);
  };

  const onCancelClick = async () => {
    await updateAppointment(3, appointmentData);
  };

  return (
    <div className={'gx-h-100 gx-d-flex gx-justify-content-center gx-align-items-center'}>
      {appointmentData.appointment_type == 1 && (
        <div className={'appointment__content-form gx-border gx-rounded-lg'}>
          <div className={'appointment-title__wrapper gx-mb-5'}>
            <p>You have a booking with</p>
            <b>{appointmentData.firstname}</b>
          </div>
          <div className={'appointment-body__wrapper'}>
            <div className={''}>
              <div className={'gx-d-flex gx-justify-content-between'}>
                <span style={{ color: 'gray', fontWeight: 600 }}>Date</span>
                <span>{moment(appointmentData.startDate).format('LL')}</span>
              </div>
              <div className={'gx-d-flex gx-justify-content-between gx-mt-2'}>
                <span style={{ color: 'gray', fontWeight: 600 }}>Time</span>
                <span>{moment(appointmentData.startDate).format('LT')}</span>
              </div>
            </div>
            <div className={'button__wrapper gx-mt-5'}>
              <Button
                className={'gx-btn-primary'}
                style={{ height: 45, fontSize: 16, fontWeight: 'bold' }}
                onClick={onAcceptClick}
              >
                Accept Booking
              </Button>
              <Button
                className={'gx-btn-danger'}
                style={{ height: 45, fontSize: 16, fontWeight: 'bold' }}
                onClick={onCancelClick}
              >
                Cancel Booking
              </Button>
            </div>
          </div>
        </div>
      )}
      {appointmentData.appointment_type == 2 && (
        <div className={'appointment__content-form gx-border gx-rounded-lg'}>
          <div className={'appointment-body__wrapper'}>Your booking has been accepted</div>
        </div>
      )}
      {appointmentData.appointment_type == 3 && (
        <div className={'appointment__content-form gx-border gx-rounded-lg'}>
          <div className={'appointment-body__wrapper'}>Your booking has been cancelled</div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ appointment }) => {
  const { appointmentData } = appointment;
  return { appointmentData };
};

export default connect(mapStateToProps, {
  getKeyValidation,
  updateAppointment,
})(CustomerAppointmentScreen);
