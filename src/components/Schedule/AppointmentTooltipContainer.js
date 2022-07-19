import React from 'react';
import { Space, Button } from 'antd';
import moment from 'moment';

import Delete from '@2fd/ant-design-icons/lib/Delete';
import LeadPencil from '@2fd/ant-design-icons/lib/LeadPencil';
import ClockTimeFiveOutline from '@2fd/ant-design-icons/lib/ClockTimeFiveOutline';
import SubtitlesOutline from '@2fd/ant-design-icons/lib/SubtitlesOutline';

const AppointmentTooltipContainer = (props) => {
  const { data, onAppointmentEditBtnClick, onAppointmentDeleteBtnClick } = props;

  const handleEditClick = () => {
    onAppointmentEditBtnClick();
  };

  const handleDeleteClick = async () => {
    onAppointmentDeleteBtnClick(data.appointmentData.id);
  };

  return (
    <div className={'appointment__tooltip'}>
      <div className={'appointment__tooltip-header'}>
        <Space>
          <Button
            className={'content-form__circle__button gx-btn-orange'}
            type={'default'}
            shape={'circle'}
            icon={<LeadPencil style={{ fontSize: 24 }} />}
            disabled={data.appointmentData.appointment_type != 1}
            onClick={handleEditClick}
          />
          <Button
            className={'content-form__circle__button gx-btn-light'}
            type={'default'}
            shape={'circle'}
            icon={<Delete style={{ fontSize: 24 }} />}
            disabled={data.appointmentData.appointment_type == 2}
            onClick={handleDeleteClick}
          />
        </Space>
      </div>
      <div className={'appointment__tooltip-body'}>
        <div className={'gx-d-flex appointment-title'}>
          <span className={'gx-text-truncate'}>{data.appointmentData.title}</span>
        </div>
        <div className={'gx-d-flex gx-align-items-center gx-text-grey'}>
          <div className={'gx-mr-2'} style={{ height: 20 }}>
            <ClockTimeFiveOutline style={{ fontSize: 20 }} />
          </div>
          <div className={'gx-ml-1'}>
            {moment(data.appointmentData.startDate).format('HH:mm')} -{' '}
            {moment(data.appointmentData.endDate).format('HH:mm')}
          </div>
        </div>
        <div className={'gx-d-flex gx-align-items-center gx-text-grey gx-mt-2'}>
          <div className={'gx-mr-2'} style={{ height: 20 }}>
            <SubtitlesOutline style={{ fontSize: 20 }} />
          </div>
          <div className={'gx-ml-1 gx-text-truncate'} style={{ fontSize: 12 }}>
            {data.appointmentData.note}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTooltipContainer;
