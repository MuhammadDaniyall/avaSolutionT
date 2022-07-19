import React from 'react';
import moment from 'moment';

import HandshakeOutline from '@2fd/ant-design-icons/lib/HandshakeOutline';
import ClockTimeFiveOutline from '@2fd/ant-design-icons/lib/ClockTimeFiveOutline';
import Cancel from '@2fd/ant-design-icons/lib/Cancel';

const Appointment = (model) => (
  <div className={'appointment__view'}>
    <div className={'gx-d-flex gx-align-items-center'}>
      <div className={'gx-mr-1'} style={{ height: 18 }}>
        {model.data.appointmentData.appointment_type == 1 ? (
          <ClockTimeFiveOutline style={{ color: '#fff', fontSize: 18 }} />
        ) : model.data.appointmentData.appointment_type == 2 ? (
          <HandshakeOutline style={{ color: '#fff', fontSize: 18 }} />
        ) : (
          <Cancel style={{ color: '#fff', fontSize: 18 }} />
        )}
      </div>
      <div className={'gx-text-truncate'} style={{ fontSize: 13, fontWeight: 600 }}>
        {model.data.appointmentData.title}
      </div>
    </div>
    <div className={'gx-d-flex gx-mt-1'} style={{ fontSize: 11 }}>
      <span className={'gx-ml-2'}>
        {moment(model.data.appointmentData.startDate).format('HH:mm')} -{' '}
        {moment(model.data.appointmentData.endDate).format('HH:mm')}
      </span>
    </div>
  </div>
);

export default Appointment;
