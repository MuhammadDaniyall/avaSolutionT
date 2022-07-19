import React from 'react';
import { connect } from 'react-redux';
// component
import AlertTabContent from '../../../components/Settings/Alerts/AlertTabContent';

const AlertsSettings = (props) => {
  return (
    <div className={'setting-form__wrapper waitlist-setting__form'}>
      <div className={'setting-form__header'}>Alerts</div>
      <div className={'setting-form__body'}>
            <AlertTabContent />
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, schedule }) => {
  const { user } = auth;
  const { bookingData } = schedule;
  return { user, bookingData };
};

export default connect(mapStateToProps, {})(AlertsSettings);
