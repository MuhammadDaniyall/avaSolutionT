/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, Select, Checkbox, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const NewFieldModal = (props) => {
  const SectionSelect = React.createRef();
  const { visible, closeModal, handleSubmit, modalData } = props;
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [rule, setOptionRule] = useState([]);
  const [formItemDisplay, setformItemDisplay] = useState(['block', 'none', 'block', 'none', 'none', 'none']);
  useEffect(() => {
    if (visible) {
      const modalData1 = JSON.parse(modalData);
      modalData1.options = JSON.parse(modalData1.options);
      form.setFieldsValue(modalData1);
      form1.setFieldsValue(modalData1);
      changeType(modalData1.type);
    }
  }, [visible]);

  const AddField = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        form1.validateFields().then((secondSectorValues) => {
          const temp = {};
          Object.getOwnPropertyNames(values).map((key) => {
            temp[key] = values[key];
            return true;
          });
          Object.getOwnPropertyNames(secondSectorValues).map((key) => {
            temp[key] = secondSectorValues[key];
            return true;
          });
          temp.options = JSON.stringify(temp.options);
          handleSubmit(temp);
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  const changeType = (value) => {
    switch (value) {
      case 'Section': {
        setOptionRule([{ required: true, message: 'Required' }]);
        setformItemDisplay(['block', 'block', 'block', 'block', 'block', 'none']);
        break;
      }
      case 'Date': {
        setformItemDisplay(['none', 'none', 'none', 'none', 'none', 'none']);
        setOptionRule([]);
        break;
      }
      case 'Checkbox': {
        setformItemDisplay(['none', 'none', 'none', 'none', 'none', 'block']);
        setOptionRule([]);
        break;
      }
      case 'URL': {
        setformItemDisplay(['block', 'none', 'none', 'none', 'none', 'none']);
        setOptionRule([]);
        break;
      }
      default: {
        setformItemDisplay(['block', 'none', 'block', 'none', 'none', 'none']);
        setOptionRule([]);
        break;
      }
    }
  };
  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      title={<b>New Field</b>}
      onCancel={closeModal}
      forceRender
      footer={
        <Button onClick={AddField} type={'primary'} style={{ width: 100, height: 35, fontWeight: 'bold' }}>save</Button>
      }
      width={700}
      >
      <Form form={form} layout={'vertical'}>
        <Row className={'gx-flex-sm-row'} gutter={[20]}>
          <Col style={{ display: 'none' }}>
            <Form.Item name="ID">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'name'} label={'Name'} rules={[{ required: true, message: 'Required' }]}>
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'label'} label={'Label'} rules={[{ required: true, message: 'Required' }]} >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'type'} label={'Type'}>
              <Select
                onChange={(e) => {
                  changeType(e);
                }}
              >
                <Option value={'Text Field'}>Text Field</Option>
                <Option value={'Text Area'}>Text Area</Option>
                <Option value={'Number'}>Number</Option>
                <Option value={'Section'}>Section</Option>
                <Option value={'Date'}>Date</Option>
                <Option value={'Checkbox'}>Checkbox</Option>
                <Option value={'URL'}>URL</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} style={{ display: formItemDisplay[0] }}>
            <Form.Item name={'placeholder'} label={'Placeholder'}>
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
          <Col span={12} style={{ display: formItemDisplay[1] }}>
            <Form.Item name={'options'} label={'Options'} rules={rule}>
              <Select className={'ava-select-selection'} onChange={() => {SectionSelect.current.focus();}} ref={SectionSelect} mode="tags" maxTagCount={'responsive'} style={{ width: '100%' }}listHeight={250}></Select>
            </Form.Item>
          </Col>
          <Col span={12} style={{ display: formItemDisplay[2] }}>
            <Form.Item name={'defaultValue'} label={'Default Value'}>
              <Input placeholder="Default Value" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name={'ordering'}
              label={
                <span>
                  Ordering&nbsp;
                  <Tooltip
                    color={'white'}
                    title="This controls the order of field in relation to the other input fields.The lowest number shows first and the highest number shows last."
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
            >
              <Input type={'number'} placeholder="Ordering" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Form form={form1}>
        <Row className={'gx-flex-sm-row'}>
          <Col span={6}>
            <Form.Item name={'PORV'} label={'Option is'}>
              <Select size={'small'} style={{ width: 85 }}>
                <Option value={'Public'}>Public</Option>
                <Option value={'Private'}>Private</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'for'} label={'for'}>
              <Select size={'small'} style={{ width: 222 }}>
                <Option value={'Both'}>Both bookings and waitlist</Option>
                <Option value={'Booking'}>Only bookings</Option>
                <Option value={'Waitlist'}>Only waitlist</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row className={'gx-flex-sm-row'} gutter={[20]}>
          <Col span={12}>
            <Form.Item name="is_required" valuePropName="checked">
              <Checkbox>Is required</Checkbox>
            </Form.Item>
            <Form.Item
              name={'is_multiple'}
              valuePropName="checked"
              style={{ marginBottom: 0, display: formItemDisplay[3] }}
            >
              <Checkbox>Allow multiple</Checkbox>
            </Form.Item>
            <Form.Item
              name={'is_add_option'}
              valuePropName="checked"
              style={{ marginBottom: 0, display: formItemDisplay[4] }}
            >
              <Checkbox>Add "Other" Options</Checkbox>
            </Form.Item>
            <Form.Item name={'is_pre_select'} valuePropName="checked" style={{ display: formItemDisplay[5] }}>
              <Checkbox>Pre-Select</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewFieldModal;
