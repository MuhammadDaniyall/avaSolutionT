import React, { useState, useEffect } from 'react';
import { Form, Button, Typography } from 'antd';
import { connect } from 'react-redux';
import { getWaitListSettings, updateWaitListSetting } from '../../../appRedux/actions/Settings';
import WaitListRuleForm from './WaitListRuleForm';
const { Title, Text } = Typography;

const WaitListRule = (props) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    props.getWaitListSettings(props.user.id);
  }, [visible]);

  const onFinish = async (values) => {
    form.resetFields();
    const submitData = props.WaitListSettings;
    Object.getOwnPropertyNames(values).map((key) => {
      submitData[key] = values[key];
      return true;
    });
    submitData.user_id = props.user.id;
    await props.updateWaitListSetting(submitData);
    setVisible(false);
  };
  if (props.WaitListSettings) {
    form.setFieldsValue(props.WaitListSettings);
  }

  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Waitlist rules
          </Title>
          <Text>Settings for how client is allowed to join your waitlist.</Text>
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      <WaitListRuleForm data={props.WaitListSettings} visible={visible} onFinish={onFinish}></WaitListRuleForm>
    </div>
  );
};

const mapStateToProps = ({ auth, settings }) => {
  const { user } = auth;
  const { WaitListSettings } = settings;
  return { user, WaitListSettings };
};
export default connect(mapStateToProps, {
  getWaitListSettings,
  updateWaitListSetting,
})(WaitListRule);
