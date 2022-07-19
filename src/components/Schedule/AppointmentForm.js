import React, { useEffect, useState } from 'react';
import { Form, Input, AutoComplete, DatePicker, TimePicker, Button, Modal } from 'antd';
import { Select, Row, Col } from 'antd';
import { connect } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import Close from '@2fd/ant-design-icons/lib/Close';
import Email from '@2fd/ant-design-icons/lib/Email';
import Account from '@2fd/ant-design-icons/lib/Account';
import Identifier from '@2fd/ant-design-icons/lib/Identifier';
import CalendarMonth from '@2fd/ant-design-icons/lib/CalendarMonth';
import Pencil from '@2fd/ant-design-icons/lib/Pencil';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import moment from 'moment'
import { destroyFns } from 'antd/lib/modal/Modal';
import { Link } from 'react-router-dom';

const { TextArea } = Input;
const dateFormat = "YYYY/MM/DD";
const { Option } = Select;

const AppointmentForm = (props) => {
  const [form] = Form.useForm();
  const [additionalForm] = Form.useForm();
  const [options, setOptions] = useState([]);

  const { visible, newForm, formdata, closeModal, handleSubmit, customerData } = props;

  useEffect(() => {
    if (visible) {
      form.resetFields();
      additionalForm.resetFields();
      form.setFieldsValue(formdata);
      if (formdata.meta) {

        const additionalFormData = {};
        formdata.meta.map(additionalField => {
          if (additionalField != null) {
            if (additionalField['type'] == "Section") {
              additionalFormData[additionalField['meta_key']] = JSON.parse(additionalField['meta_value']);
            }
            else if (additionalField['type'] == "Date") {
              additionalFormData[additionalField['meta_key']] = moment(additionalField['meta_value'], dateFormat);
            }
            else if (additionalField['type'] == "Checkbox") {
              additionalFormData[additionalField['meta_key']] = additionalField['meta_value'] * 1;
            }
            else {
              additionalFormData[additionalField['meta_key']] = additionalField['meta_value'];
            }
          }
        })
        additionalForm.setFieldsValue(additionalFormData);
      }
    }
    else{

      form.resetFields();
      additionalForm.resetFields();
    }
  }, [visible]);

  const handelClick = () => {
    form
      .validateFields()
      .then((values) => {
        additionalForm.validateFields()
          .then((additionalValue) => {
            let submitData = {};
            Object.getOwnPropertyNames(values).map(key => {
              submitData[key] = values[key];
            })
            const temp = {};
            Object.getOwnPropertyNames(additionalValue).map(key => {
              if (Array.isArray(additionalValue[key])) {
                temp[key] = JSON.stringify(additionalValue[key]);
              }
              else {
                temp[key] = additionalValue[key];
              }
            })
            submitData['addition'] = temp;
            handleSubmit(submitData);
          })
          .catch((info1) => {
            console.log('Validate Failed', info1);
          })
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleSearch = (value) => {
    if (value.length > 3 && customerData) {
      const filterData = customerData.filter((item) => item.email.indexOf(value) >= 0);

      const data = [];
      filterData.map((item) => {
        return data.push({ label: item.email, value: item.email });
      });
      setOptions(data);
    } else {
      setOptions([]);
    }
  };

  const handleSelect = (value) => {
    const filterData = customerData.filter((item) => item.email == value);
    form.setFieldsValue({
      customer_id: filterData[0].id,
      name: filterData[0].name,
      phone: filterData[0].phone,
      customer_group_id: filterData[0].customer_group_id,
    });
  };
  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      title={newForm ? 'New Schedule' : 'Edit Schedule'}
      closeIcon={<Close style={{ fontSize: 22 }} />}
      onCancel={closeModal}
      forceRender
      footer={[
        <Button key="submit" type="primary" onClick={handelClick}>
          {newForm ? 'Add' : 'Save'}
        </Button>,
      ]}
      width={600}
    >
      {customerData.length > 0 ?  (

      <Form form={form} layout={'vertical'}>
        <div className={'gx-d-flex gx-justify-content-between'}>
          <Form.Item
            className={'gx-flex-1'}
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Title" prefix={<Pencil style={{ color: '#a2aabd', fontSize: 18 }} />} />
          </Form.Item>
        </div>
        <div className={'gx-d-flex gx-justify-content-between'}>
          <Form.Item
            className={'gx-flex-1'}
            name="date"
            label="Date"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
            style={{ paddingRight: 5 }}
          >
            <DatePicker
              suffixIcon={<CalendarMonth style={{ color: '#a2aabd', fontSize: 18 }} />}
              format={'YYYY-MM-DD'}
            />
          </Form.Item>
          <Form.Item
            className={'gx-flex-1'}
            name="startDate"
            label="Start Time"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
            style={{ paddingLeft: 5, width: 35 }}
          >
            <TimePicker placeholder={'Start Time'} format={'HH:mm'} minuteStep={5} />
          </Form.Item>
          <Form.Item
            className={'gx-flex-1'}
            name="endDate"
            label="End Time"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
            style={{ paddingLeft: 5, width: 35 }}
          >
            <TimePicker placeholder={'End Time'} format={'HH:mm'} minuteStep={5} />
          </Form.Item>
        </div>
        <div className={'gx-d-flex gx-justify-content-between'}>
          <Form.Item className={'gx-flex-1'} name="note" label="Note">
            <TextArea placeholder="Note" rows={4} />
          </Form.Item>
        </div>

        <div className={'gx-d-flex gx-justify-content-between'}>

          <Form.Item
            className={'gx-flex-1'}
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
            style={{ paddingRight: 5 }}
          >
            <Input placeholder="Customer name" prefix={<Account style={{ color: '#a2aabd', fontSize: 18 }} />} />
          </Form.Item>
          <Form.Item className={'gx-flex-1'} name="customer_group_id" label="Customer ID" style={{ paddingLeft: 5 }}>
            <Input placeholder="Customer ID" prefix={<Identifier style={{ color: '#a2aabd', fontSize: 18 }} />} />
          </Form.Item>

        </div>
        <div className={'gx-d-flex gx-justify-content-between'}>
          <Form.Item className={'gx-flex-1'} name="email" label="Email" style={{ paddingRight: 5 }}
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}>

            <AutoComplete onSearch={handleSearch} onSelect={handleSelect} options={options}>
              <Input type={'email'} data-url="test" placeholder="Email" prefix={<Email style={{ color: '#a2aabd', fontSize: 18 }} />} />
            </AutoComplete>

          </Form.Item>
          <Form.Item className={'gx-flex-1'} name="phone" label="Phone" style={{ paddingLeft: 5 }}>
            <PhoneInput
              country={'ca'}
              inputStyle={{
                width: '100%',
                height: 40,
                borderRadius: 3,
                border: '1px solid #d9d9d9',
              }}
              buttonStyle={{ backgroundColor: '#fff', borderRight: 0 }}
            />
          </Form.Item>
        </div>

        <Form.Item name="customer_id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item name="id" hidden={true}>
          <Input />
        </Form.Item>
      </Form>
      ) : (
          // <a href="/customers" className="ant-btn ant-btn-primary"> Add Customer </a>
          <Link to="customers" activeClassName="ant-btn ant-btn-primary">Add Customer</Link>
        )}
      {
        props.clientFieldData &&
        <Form form={additionalForm} layout={'vertical'}>
          <Row className={'gx-flex-sm-row'} gutter={[10]} align={"bottom"}>
            {
              props.clientFieldData.map(item => {
                if (item.enable != "0") {
                  switch (item.type) {
                    case "Text Field": {
                      return (
                        <Col span={12}>
                          <Form.Item
                            name={item.name}
                            label={item.label}
                            rules={[
                              {
                                required: item.is_required == 0 ? false : true,
                                message: 'Required',
                              },
                            ]}>
                            <Input placeholder={item.placeholder} defaultValue={item.defaultValue}></Input>
                          </Form.Item>
                        </Col>
                      )
                    }
                    case "Text Area": {

                      return (
                        <Col span={12}>
                          <Form.Item
                            name={item.name}
                            label={item.label}
                            rules={[
                              {
                                required: item.is_required == 0 ? false : true,
                                message: 'Required',
                              },
                            ]}>
                            <TextArea placeholder={item.placeholder} defaultValue={item.defaultValue} style={{ maxHeight: 43 }}></TextArea>
                          </Form.Item>
                        </Col>
                      )
                    }
                    case "Number": {

                      return (
                        <Col span={12}>
                          <Form.Item
                            name={item.name}
                            label={item.label}
                            rules={[
                              {
                                required: item.is_required == 0 ? false : true,
                                message: 'Required',
                              },
                            ]}>
                            <Input type={"number"} defaultValue={item.defaultValue}></Input>
                          </Form.Item>
                        </Col>
                      )
                    }
                    case "Section": {
                      return (
                        <Col span={12}>
                          <Form.Item
                            name={item.name}
                            label={item.label}
                            rules={[
                              {
                                required: item.is_required == 0 ? false : true,
                                message: 'Required',
                              },
                            ]}>
                            <Select className="ava-select-selection" maxTagCount={'responsive'} mode={item.is_multiple ? "multiple" : ""} placeholder={item.placeholder}>
                              {
                                JSON.parse(item.options).map(val => {
                                  return <Option key={val}>{val}</Option>
                                })
                              }
                            </Select>
                          </Form.Item>
                        </Col>
                      );
                    }
                    case "Date": {
                      return (
                        <Col span={12}>
                          <Form.Item
                            name={item.name}
                            label={item.label}
                            rules={[
                              {
                                required: item.is_required == 0 ? false : true,
                                message: 'Required',
                              },
                            ]}>
                            <DatePicker format={dateFormat} />
                          </Form.Item>
                        </Col>
                      );
                    }
                    case "Checkbox": {
                      return (
                        <Col span={12}>
                          <Form.Item
                            name={item.name}
                            valuePropName={"checked"}
                            style={{ marginBottom: 18, marginTop: 18 }}
                          >
                            <Checkbox defaultChecked={item.is_pre_select}>{item.label}</Checkbox>
                          </Form.Item>
                        </Col>
                      );
                    }
                    case "URL": {
                      return (
                        <Col span={12}>
                          <Form.Item
                            name={item.name}
                            label={item.label}
                            rules={[
                              {
                                required: item.is_required == 0 ? false : true,
                                message: 'Required',
                              },
                            ]}>
                            <Input type={"url"}></Input>
                          </Form.Item>
                        </Col>
                      );
                    }
                  }
                }
              })
            }
          </Row>
        </Form>
      }
    </Modal>
  );
};

const mapStateToProps = ({ customer, settings }) => {
  const { clientFieldData } = settings;
  const { customerData } = customer;
  return { customerData, clientFieldData };
};

export default connect(mapStateToProps, {})(AppointmentForm);
