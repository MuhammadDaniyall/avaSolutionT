import React from 'react';
import { connect } from 'react-redux';
// component
import LocationName from '../../../components/Settings/Waitlist/LocationName';
import AutoRemove from '../../../components/Settings/Waitlist/AutoRemove';
import ClientInfo from '../../../components/Settings/Waitlist/ClientInfo';
import WaitListRule from '../../../components/Settings/Waitlist/WaitListRules';
import WaitTimeEstimation from '../../../components/Settings/Waitlist/WaitTimeEstimation';
import ResetAndDelete from '../../../components/Settings/Waitlist/ResetAndDelete';
import CustomerStatus from '../../../components/Settings/Waitlist/CustomerStatus';
const WaitlistSettings = (props) => {
  return (
    <div className={'setting-form__wrapper waitlist-setting__form'}>
      <div className={'setting-form__header'}>Waitlist</div>
      <div className={'setting-form__body'}>
        {/* <LocationName /> */}
        <AutoRemove />
        <ClientInfo />
        <WaitListRule />
        <WaitTimeEstimation />
        <CustomerStatus />
        {/* <ResetAndDelete /> */}
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, schedule }) => {
  const { user } = auth;
  const { bookingData } = schedule;
  return { user, bookingData };
};

export default connect(mapStateToProps, {})(WaitlistSettings);
