import React, { useState, useEffect } from 'react';
import { Modal, Form, Checkbox, Input, Button, Dropdown, Menu, Typography } from 'antd';
import {connect} from "react-redux"
import 
{
  getAlertSettings,
  updateAlertSetting,
} from "../../../appRedux/actions/Settings"
// icons
import Close from '@2fd/ant-design-icons/lib/Close';
import PlusThick from '@2fd/ant-design-icons/lib/PlusThick';

const { TextArea } = Input;
const { Link } = Typography;

const AlertEditForm = (props) => {
  const [form] = Form.useForm();
  const { data ,onFinish,visible} = props;
  const [SMSVisible,setSMSVisible] = useState(null);
  const [EmailVisible,setEmailVisible] = useState(null);
  
  useEffect(() => {
    
    form.resetFields();
    setSMSVisible(null);
    setEmailVisible(null);
    if (visible) {
      if (data) {
        change(data['SendAsSMS']);
        change1(data['SendAsEmail']);
      }
    }
    else{
      form.resetFields();
      setSMSVisible(null);
      setEmailVisible(null);
    }
  }, [visible]);
  const saveModalData = async () => {
    await form.validateFields().then((values) => {
      onFinish(values);
    })
    form.resetFields();
  }
  const handleClick = (e) => {
    console.log(e);
  };
  const change = (e) => {
    setSMSVisible(e);
  }
  const change1 = (e) => {
    setEmailVisible(e);
  }
  if (data) {
    form.setFieldsValue(data);
  }
  const menu = (
    <Menu onClick={handleClick}>
      <Menu.ItemGroup title="Insert placeholder" disabled>
        <Menu.Item key="0" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Waitlist link</span>
          <span style={{ color: '#bfbfbf' }}>link</span>
        </Menu.Item>
        <Menu.Item key="1" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Customer name</span>
          <span style={{ color: '#bfbfbf' }}>name</span>
        </Menu.Item>
        <Menu.Item key="2" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Cutomers position in line</span>
          <span style={{ color: '#bfbfbf' }}>order</span>
        </Menu.Item>
        <Menu.Item key="3" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Estimated wait time</span>
          <span style={{ color: '#bfbfbf' }}>eta</span>
        </Menu.Item>
        <Menu.Item key="4" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Selected service</span>
          <span style={{ color: '#bfbfbf' }}>service</span>
        </Menu.Item>
        <Menu.Item key="5" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Selected resource</span>
          <span style={{ color: '#bfbfbf' }}>resource</span>
        </Menu.Item>
        <Menu.Item key="6" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Selected notes</span>
          <span style={{ color: '#bfbfbf' }}>notes</span>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
  return (
      <Form form={form} layout={'vertical'}>
        <div className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <Form.Item name={'SendAsSMS'} valuePropName={'checked'}>
            <Checkbox onClick={(e) => {change(e.target.checked)}}>Send as SMS</Checkbox>
          </Form.Item>
          <Button type="link">Reset</Button>
        </div>
        <Form.Item name="sms_template" hidden={!SMSVisible}>
          {/* <div style={{ position: 'relative' }}> */}
            <TextArea autoSize={{ minRows: 4, maxRows: 4 }} maxLength={160} placeholder={'Description..'} />
            {/* <Dropdown overlay={menu} placement={'bottomRight'} overlayStyle={{ width: 400 }} trigger={['click']}>
              <PlusThick
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  color: '#fff',
                  fontSize: 16,
                  borderRadius: 2,
                  backgroundColor: '#d9d9d9',
                }}
                onClick={(e) => e.preventDefault()}
              />
            </Dropdown> */}
          {/* </div> */}
        </Form.Item>
        <div className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <Form.Item name={'SendAsEmail'} valuePropName={'checked'}>
            <Checkbox onChange={(e) => {change1(e.target.checked)}}>Send as Email</Checkbox>
          </Form.Item>
          <Button type="link">Reset</Button>
        </div>
        <Form.Item name="subject" hidden={!EmailVisible}>
          <Input placeholder={'Subject'} />
        </Form.Item>
        <Form.Item name="email_template" hidden={!EmailVisible}>
          {/* <div style={{ position: 'relative' }}> */}
            <TextArea autoSize={{ minRows: 4, maxRows: 4 }} maxLength={160} placeholder={'Description..'} />
            {/* <Dropdown overlay={menu} placement={'bottomRight'} overlayStyle={{ width: 400 }} trigger={['click']}>
              <PlusThick
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  color: '#fff',
                  fontSize: 16,
                  borderRadius: 2,
                  backgroundColor: '#d9d9d9',
                }}
                onClick={(e) => e.preventDefault()}
              />
            </Dropdown> */}
          {/* </div> */}
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} onClick={saveModalData}>save</Button>
        </Form.Item>
      </Form>
  );
};
const mapStateToProps = ({auth,settings}) => {
  const {user} = auth;
  const {alertSettings} = settings;
  return {user,alertSettings};
}
export default connect(mapStateToProps,{updateAlertSetting,getAlertSettings})(AlertEditForm);