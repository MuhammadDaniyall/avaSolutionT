import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import SettingClientFieldForm from './SettingClientsFields';
const { Title, Text } = Typography;

const ClientInfo = (props) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Client info
          </Title>
          <Text>What info about your client you want to capture in your waitlist.</Text>
        </div>
        <Button onClick={handleClick} style={{ width: 74 }}>
          {'Edit'}
        </Button>
      </div>
      <SettingClientFieldForm visible={visible} closeModal={closeModal}></SettingClientFieldForm>
    </div>
  );
};

export default ClientInfo;
