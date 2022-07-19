import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Select } from 'antd';
import { connect } from 'react-redux';
import { 
    getLocalizationSetting,
    updateLocalizationSetting, 
} from '../../../appRedux/actions/Settings';
import {aryIannaTimeZones} from "./TimeZoneName";

const { Title, Text } = Typography;
const { Option } = Select;

const TimeZone = (props) => {
  const timeKind = [
    ['5 min',5],
    ['10 min',10],
    ['15 min',15],
    ['20 min',20],
    ['25 min',25],
    ['30 min',30],
    ['35 min',35],
    ['40 min',40],
    ['45 min',45],
    ['50 min',50],
    ['1 hour',60],
    ['1 hour 30 min',90],
    ['2 hour',120],
    ['3 hour',180],
    ['4 hour',240],
    ['5 hour',300],
    ['6 hour',360],
    ['7 hour',420],
    ['8 hour',480]
  ];
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    props.getLocalizationSetting(props.user.id);
  }, [visible]);
  useEffect(() => {
      if (props.localizationSetting) {
        form.setFieldsValue(props.localizationSetting);
      }

  },[props.localizationSetting])
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const submitData = props.localizationSetting;
    Object.getOwnPropertyNames(values).map((key) => {
      submitData[key] = values[key];
      return true;
    });
    submitData.user_id = props.user.id;
    await props.updateLocalizationSetting(submitData);
    setVisible(false);
  };
  return (
    <div className={'gx-border-bottom gx-pt-4 gx-pb-4'}>
      <div className={'gx-d-flex gx-justify-content-between'}>
        <div className={''}>
          <Title level={5} style={{ fontWeight: 700 }}>
            Time Zone
          </Title>
          {props.localizationSetting && (
            <Text>
              Your timezone is <b>{props.localizationSetting.timezone}</b>.
            </Text>
          )}
        </div>
        <Button onClick={handleClick}>{!visible ? 'Expand' : 'Close'}</Button>
      </div>
      <div style={{ width: '50%' }}>
        {visible && (
          <Form className={'gx-mt-4'} form={form} layout={'vertical'}>
            <Form.Item name="timezone" label={'Time Zone'} rules={[{ required: true, message: 'Required' }]}>
                <Select showSearch>
                  {aryIannaTimeZones.map((item) => {
                    return <Option key={item}>{item}</Option>;
                  })}
                </Select>
            </Form.Item>
            <Form.Item className={'gx-mb-0'}>
              <Button type="primary" onClick={handleSubmit}>
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

// export default LocationName;
const mapStateToProps = ({ auth, settings }) => {
  const { user } = auth;
  const { localizationSetting } = settings;
  return { user, localizationSetting };
};
export default connect(mapStateToProps, {
  getLocalizationSetting, 
  updateLocalizationSetting,
})(TimeZone);
