import React from 'react';

import BookingTime from '../../../components/Settings/Booking/BookingTime';
import CalendarDisplay from '../../../components/Settings/Booking/CalendarDisplay';
import OpeningHour from '../../../components/Settings/Booking/OpeningHour';
import ClientInfo from '../../../components/Settings/Booking/ClientInfo';
import BookingRule from '../../../components/Settings/Booking/BookingRule';

const BookingSettings = (props) => (
  <div className={'setting-form__wrapper waitlist-setting__form'}>
    <div className={'setting-form__header'}>Booking</div>
    <div className={'setting-form__body'}>
      <BookingTime />
      <CalendarDisplay />
      <OpeningHour />
      <BookingRule />
      {/* <ClientInfo /> */}
    </div>
  </div>
);

export default BookingSettings;
