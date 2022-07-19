import React, { useState, useEffect } from 'react';
import { Modal, Form, Checkbox, Input, Button, Dropdown, Menu, Typography, Row, Col, Select } from 'antd';
// icons
import Close from '@2fd/ant-design-icons/lib/Close';
import PlusThick from '@2fd/ant-design-icons/lib/PlusThick';
import HowModal from "./HowModal"

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;
const AlertEditForm = (props) => {
  const [HowModalVisible,setHowModalVisible] = useState(null);
  const textInput = React.createRef();
  const textInput1 = React.createRef();
  const BookingReminderSelectOptions = ['5 min', '10 min', '15 min', '30 min', '1 hour', '2 hour', '3 hour', '12 hour', '1 day', '2 day', '3 day', '4 day', '5 day', '1 week', '2 weeks', '3 weeks', '1 month'];
  const NextInLineOptions = ['1th in line', '2th in line', '3th in line', '4th in line', '5th in line', '6th in line', '7th in line', '8th in line', '9th in line', '10th in line',
    '11th in line', '12th in line', '13th in line', '14th in line', '15th in line', '16th in line', '17th in line', '18th in line', '19th in line', '20th in line'];
  const [form] = Form.useForm();
  const { visible, title, modalKey, modalData, closeModal, handleSubmit } = props;
  const [SMSVisible, setSMSVisible] = useState(null);
  const [EmailVisible, setEmailVisible] = useState(null);

  useEffect(() => {
    if (visible) {
      if (modalData == null) {
        form.resetFields();
        setSMSVisible(false);
        setEmailVisible(false);
      }
      else {
        const tmpModalData = modalData;
        if (modalData['sms_template']) {
          tmpModalData['LeftCharactor'] = 160 - modalData['sms_template'].length;
        }
        else {
          tmpModalData['LeftCharactor'] = 160
        }
        form.setFieldsValue(tmpModalData);
        setSMSVisible(tmpModalData['SendAsSMS']);
        setEmailVisible(tmpModalData['SendAsEmail']);
      }
    }
    else {
      form.resetFields();
      setSMSVisible(false);
      setEmailVisible(false);
    }
  }, [visible]);
  const saveModalData = async () => {
    let values = await form.validateFields();
    handleSubmit(values);
  }
  const handleClick = async (e, where) => {
    if (where == "sms") {
      let values = await form.validateFields();
      values['sms_template'] += e.key;
      form.setFieldsValue(values);
      textInput.current.focus();
    }
    else if (where == 'email') {
      let values = await form.validateFields();
      values['email_template'] += e.key;
      form.setFieldsValue(values);
      textInput1.current.focus();
    }
  };
  const resetSMSTemplate = async () => {
    let values = await form.validateFields();
    values['sms_template'] = props.defaultSMSTemplate;
    values['LeftCharactor'] = 160 - props.defaultSMSTemplate.length;
    form.setFieldsValue(values);
  }
  const resetEmailTemplate = async () => {
    let values = await form.validateFields();
    values['email_template'] = props.defaultEmailTemplate;
    form.setFieldsValue(values);
  }
  const ChangeSMS = async () => {
    let values = await form.validateFields();
    values['LeftCharactor'] = 160 - values['sms_template'].length;
    form.setFieldsValue(values);
  }
  const openHowModal = () => {
    setHowModalVisible(true);
  }
  const closeHowModal = () => {
    setHowModalVisible(false);
  }
  const menu = (
    <Menu onClick={(e) => { handleClick(e, "sms") }}>
      <Menu.ItemGroup title="Insert placeholder" disabled>
        <Menu.Item key="{link}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Waitlist link</span>
          <span style={{ color: '#bfbfbf' }}>link</span>
        </Menu.Item>
        <Menu.Item key="{name}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Customer name</span>
          <span style={{ color: '#bfbfbf' }}>name</span>
        </Menu.Item>
        <Menu.Item key="{order}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Cutomers position in line</span>
          <span style={{ color: '#bfbfbf' }}>order</span>
        </Menu.Item>
        <Menu.Item key="{eta}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Estimated wait time</span>
          <span style={{ color: '#bfbfbf' }}>eta</span>
        </Menu.Item>
        <Menu.Item key="{service}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Selected service</span>
          <span style={{ color: '#bfbfbf' }}>service</span>
        </Menu.Item>
        <Menu.Item key="{resource}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Selected resource</span>
          <span style={{ color: '#bfbfbf' }}>resource</span>
        </Menu.Item>
        <Menu.Item key="{notes}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Selected notes</span>
          <span style={{ color: '#bfbfbf' }}>notes</span>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
  const menuBooking = (
    <Menu onClick={(e) => { handleClick(e, "sms") }}>
      <Menu.ItemGroup title="Insert placeholder" disabled>
        <Menu.Item key="{link}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Booking link</span>
          <span style={{ color: '#bfbfbf' }}>link</span>
        </Menu.Item>
        <Menu.Item key="{name}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Customer name</span>
          <span style={{ color: '#bfbfbf' }}>name</span>
        </Menu.Item>
        <Menu.Item key="{time}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Booking time</span>
          <span style={{ color: '#bfbfbf' }}>time</span>
        </Menu.Item>
        <Menu.Item key="{date}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Booking date only</span>
          <span style={{ color: '#bfbfbf' }}>date</span>
        </Menu.Item>
        <Menu.Item key="{hour}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Booking time of day only</span>
          <span style={{ color: '#bfbfbf' }}>hour</span>
        </Menu.Item>
        <Menu.Item key="{notes}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Customer notes</span>
          <span style={{ color: '#bfbfbf' }}>notes</span>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
  const menu1 = (
    <Menu onClick={(e) => { handleClick(e, "email") }}>
      <Menu.ItemGroup title="Insert placeholder" disabled>
        <Menu.Item key="{link}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Waitlist link</span>
          <span style={{ color: '#bfbfbf' }}>link</span>
        </Menu.Item>
        <Menu.Item key="{name}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Customer name</span>
          <span style={{ color: '#bfbfbf' }}>name</span>
        </Menu.Item>
        <Menu.Item key="{order}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Cutomers position in line</span>
          <span style={{ color: '#bfbfbf' }}>order</span>
        </Menu.Item>
        <Menu.Item key="{eta}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Estimated wait time</span>
          <span style={{ color: '#bfbfbf' }}>eta</span>
        </Menu.Item>
        <Menu.Item key="{service}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Selected service</span>
          <span style={{ color: '#bfbfbf' }}>service</span>
        </Menu.Item>
        <Menu.Item key="{resource}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Selected resource</span>
          <span style={{ color: '#bfbfbf' }}>resource</span>
        </Menu.Item>
        <Menu.Item key="{notes}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Selected notes</span>
          <span style={{ color: '#bfbfbf' }}>notes</span>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
  const menu1Booking = (
    <Menu onClick={(e) => { handleClick(e, "sms") }}>
      <Menu.ItemGroup title="Insert placeholder" disabled>
        <Menu.Item key="{link}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Booking link</span>
          <span style={{ color: '#bfbfbf' }}>link</span>
        </Menu.Item>
        <Menu.Item key="{name}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Customer name</span>
          <span style={{ color: '#bfbfbf' }}>name</span>
        </Menu.Item>
        <Menu.Item key="{time}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Booking time</span>
          <span style={{ color: '#bfbfbf' }}>time</span>
        </Menu.Item>
        <Menu.Item key="{date}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Booking date only</span>
          <span style={{ color: '#bfbfbf' }}>date</span>
        </Menu.Item>
        <Menu.Item key="{hour}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Booking time of day only</span>
          <span style={{ color: '#bfbfbf' }}>hour</span>
        </Menu.Item>
        <Menu.Item key="{notes}" className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <span style={{ fontWeight: 500 }}>Customer notes</span>
          <span style={{ color: '#bfbfbf' }}>notes</span>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      closeIcon={<Close style={{ fontSize: 22 }} />}
      title={title}
      onCancel={closeModal}
      forceRender
      footer={[
        <Button key="submit" type="primary" onClick={saveModalData}>
          Save
        </Button>,
      ]}
      width={700}
    >
      <Form form={form} layout={'vertical'}>
        <Row className={'gx-flex-sm-row'}>
          <Col span={24}>
            {
              modalKey == "BookingReminder" &&
              <Form.Item name={'remaining_time'} label={'Send reminder when remaining time is…'}>
                <Select>
                  {
                    BookingReminderSelectOptions.map(option => {
                      return <Option key={option}>{option}</Option>
                    })
                  }
                </Select>
              </Form.Item>
            }
          </Col>
        </Row>
        <div className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <Form.Item name={'SendAsSMS'} valuePropName={'checked'}>
            <Checkbox onChange={() => { setSMSVisible(!SMSVisible) }}>Send as SMS</Checkbox>

          </Form.Item>
          <Row className={'gx-flex-sm-row'} hidden={!SMSVisible}>
            <Col span={11}></Col>
            <Col span={2}>
              <Form.Item name={'LeftCharactor'}>
                <input style={{ border: 0, background: 'none', fontWeight: 'bold' ,color:'#a2aabd'}} disabled></input>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name={'LeftCharactor'} style={{color:'#a2aabd'}}>
                charactor left
              </Form.Item>
            </Col>
            <Col>
              <Button type="link" onClick={resetSMSTemplate} style={{marginLeft:12}}>Reset</Button>
            </Col>
          </Row>
        </div>
        <Form.Item hidden={!SMSVisible}>
          {
            modalKey == "NextInLine" &&
            <Row className={'gx-flex-sm-row'}>
              <Col>Send automatically when customer is</Col>
              <Col span={4} style={{marginLeft:6,marginRight:6,marginTop:-6}}>
                <Form.Item name="order_line">
                  <Select size={'small'}>
                    {
                      NextInLineOptions.map(option => {
                        return <Option key={option}>{option}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col>in relation to</Col>
              <Col span={6}  style={{marginLeft:6,marginTop:-6}}>
                <Form.Item name="order_relation">
                  <Select size={'small'}>
                    <Option key='everyone in line'>everyone in line</Option>
                    <Option key='resource'>resource</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          }

          <Form.Item name="sms_template">
            <TextArea maxLength={160} placeholder={'Description..'} style={{ minHeight: 100 }} onChange={(e) => { ChangeSMS(e.target.value) }} ref={textInput} />
          </Form.Item>
          <Dropdown overlay={modalKey.startsWith('Booking') ? menuBooking : menu} placement={'bottomRight'} overlayStyle={{ width: 400 }} trigger={['click']}>
            <PlusThick
              style={{
                position: 'absolute',
                bottom: 20,
                right: 10,
                color: '#fff',
                fontSize: 16,
                borderRadius: 2,
                backgroundColor: '#d9d9d9',
              }}
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>
        </Form.Item>
          {
            modalKey == "BookingConfirmation" &&
            <Text style={{color:'#a2aabd'}}>Message must include a way for the customer to unsubscribe with the STOP keyword. By default, <i><b>Reply STOP to block further SMS</b></i> will be added at the end.
                </Text>
          }
          {
            modalKey == "Confirmation" &&
            <Text style={{color:'#a2aabd'}}>Message must include a way for the customer to unsubscribe with the STOP keyword. By default, <i><b>Reply STOP to block further SMS</b></i> will be added at the end.
                </Text>
          }
        <div className={'gx-d-flex gx-align-items-center gx-justify-content-between'}>
          <Form.Item name={'SendAsEmail'} valuePropName={'checked'}>
            <Checkbox onChange={() => { setEmailVisible(!EmailVisible) }}>Send as Email</Checkbox>
          </Form.Item>
          <Button hidden={!EmailVisible} type="link" onClick={resetEmailTemplate}>Reset</Button>
        </div>
        <Form.Item name="subject" hidden={!EmailVisible}>
          <Input placeholder={'Subject'} />
        </Form.Item>
        <Form.Item hidden={!EmailVisible}>
          <Form.Item name="email_template">
            <TextArea autoSize={true} placeholder={'Description..'} style={{ minHeight: 100 }} ref={textInput1} />
          </Form.Item>
          <Dropdown overlay={modalKey.startsWith('Booking') ? menu1Booking : menu1} placement={'bottomRight'} overlayStyle={{ width: 400 }} trigger={['click']}>
            <PlusThick
              style={{
                position: 'absolute',
                bottom: 20,
                right: 10,
                color: '#fff',
                fontSize: 16,
                borderRadius: 2,
                backgroundColor: '#d9d9d9',
              }}
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>

        </Form.Item>
        <Text  style={{color:'#a2aabd'}}>Style with HTML or Markdown.<a style={{color:'#08f'}} onClick={openHowModal}>See how.</a> </Text>
      </Form>
      <HowModal visible={HowModalVisible} closeModal={closeHowModal}></HowModal>
    </Modal>
  );
};
export default AlertEditForm;