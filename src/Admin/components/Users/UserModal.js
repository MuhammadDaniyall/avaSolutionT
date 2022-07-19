import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, AutoComplete, Select, Row, Col, DatePicker, Typography } from 'antd';
import Close from '@2fd/ant-design-icons/lib/Close';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { connect } from 'react-redux';

import Email from '@2fd/ant-design-icons/lib/Email';
import Account from '@2fd/ant-design-icons/lib/Account';
import Identifier from '@2fd/ant-design-icons/lib/Identifier';
import SubtitlesOutline from '@2fd/ant-design-icons/lib/SubtitlesOutline';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import moment from 'moment'

const dateFormat = "YYYY/MM/DD";
const { TextArea } = Input;
const { Option } = Select;
const { Text, Title } = Typography;
const UserModal = (props) => {
  const [options, setOptions] = useState([]);
  const { title, state, visible, formdata, handleSubmit, closeModal, userData, type } = props;
  const [form] = Form.useForm();
  const [additionalForm] = Form.useForm();
  console.log(formdata)

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(formdata);
      console.log(form);
      // if (formdata) {
      //   const additionalFormData = {};
        
      //   console.log(formdata);
      //   formdata.meta.map(additionalField => {
      //     if (additionalField != null) {
      //       if (additionalField['type'] == "Section") {
      //         additionalFormData[additionalField['meta_key']] = JSON.parse(additionalField['meta_value']);
      //       }
      //       else if (additionalField['type'] == "Date") {
      //         additionalFormData[additionalField['meta_key']] = moment(additionalField['meta_value'], dateFormat);
      //       }
      //       else if (additionalField['type'] == "Checkbox") {
      //         additionalFormData[additionalField['meta_key']] = additionalField['meta_value'] * 1;
      //       }
      //       else {
      //         additionalFormData[additionalField['meta_key']] = additionalField['meta_value'];
      //       }
      //     }
      //   })
      //   additionalForm.setFieldsValue(additionalFormData);
      // }
      setOptions([]);
    } else {
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
            form.resetFields();
            additionalForm.resetFields();
            let submitData = {};
            Object.getOwnPropertyNames(values).map(key => {
              submitData[key] = values[key];
              console.log(values);
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
    if (value.length > 3 && userData) {
      const filterData = userData.filter((item) => item.email.indexOf(value) >= 0);

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
    const filterData = userData.filter((item) => item.email == value);
    form.setFieldsValue(filterData[0]);
  };
  return (
    <Modal
      className={'gx-modal'}
      visible={visible}
      closeIcon={<Close style={{ fontSize: 22 }} />}
      title={title}
      onCancel={closeModal}
      forceRender
      footer={[
        <Button key="submit" type="primary" onClick={handelClick}>
          {state ? 'Add' : 'Save'}
        </Button>,
      ]}
      width={600}
    >
      <Form form={form} layout={'vertical'}>
        <Form.Item name="user_id" style={{ display: 'none' }} >
          <Input></Input>
        </Form.Item>
        <Row className={"gx-flex-sm-row"}>
          <Form.Item
            className={'gx-flex-1'}
            name="username"
            label="Username"
            rules={[
              {
                type:'string',
                required: true,
                message: 'Required',
              },
            ]}
            style={{ paddingRight: 5 }}
          >
            <Input placeholder="User name" prefix={<Account style={{ color: '#a2aabd', fontSize: 18 }} />} />
            
          </Form.Item>
          <Form.Item
            className={'gx-flex-1'}
            name="firstname"
            label="First Name"
            rules={[
              {
                required: true,
                type:'string',
                message: 'Required',
              },
            ]}
            style={{ paddingRight: 5 }}
          >
            <Input placeholder="First name" prefix={<Account style={{ color: '#a2aabd', fontSize: 18 }} />} />
            
          </Form.Item>
          <Form.Item
            className={'gx-flex-1'}
            name="lastname"
            label="Lastname"
            rules={[
              {
                type:'string',
                required: true,
                message: 'Required',
              },
            ]}
            style={{ paddingRight: 5 }}
          >
            <Input placeholder="Last name" prefix={<Account style={{ color: '#a2aabd', fontSize: 18 }} />} />
            
          </Form.Item>
          <Form.Item className={'gx-flex-1'} name="user_group_id" label="User ID" style={{ paddingLeft: 5 }}>
            <Input placeholder="User ID" prefix={<Identifier style={{ color: '#a2aabd', fontSize: 18 }} />} />
          </Form.Item>
        </Row>
        <Row className={"gx-flex-sm-row"}>
          <Form.Item className={'gx-flex-1'} name="email" label="Email" style={{ paddingRight: 5 }}
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Required',
              },
            ]}
          >
            <AutoComplete onSearch={handleSearch} onSelect={handleSelect} options={options}>
              <Input type={'email'} placeholder="Email" prefix={<Email style={{ color: '#a2aabd', fontSize: 18 }} />} />
            </AutoComplete>
          </Form.Item>
          <Form.Item className={'gx-flex-1'} name="phone" label="Phone" style={{ paddingLeft: 5 }}>
            {/* <PhoneInput
              country={'ca'}
              inputStyle={{
                width: '100%',
                height: 40,
                borderRadius: 3,
                border: '1px solid #d9d9d9',
              }}
              buttonStyle={{ backgroundColor: '#fff', borderRight: 0 }}
            /> */}
          </Form.Item>
        </Row>
        <Row className={"gx-flex-sm-row"}>
          <Form.Item name="description" label="Description" style={{ width: '50%', paddingRight: 5 }}>
            <Input placeholder="Description" prefix={<SubtitlesOutline style={{ color: '#a2aabd', fontSize: 18 }} />} />
          </Form.Item>
          {
            type == 'waitlist' &&
            <Form.Item name="resource_id" label="Resource" style={{ width: '50%', paddingRight: 5 }}>
              {
                props.resourceData &&
                <Select>
                  {
                    props.resourceData.map(item => {
                      return <Option key={item.ID}>{item.username}</Option>
                    })
                  }
                </Select>

              }
            </Form.Item>
          }
        </Row>
      </Form>
      {
        props.clientFieldData &&
        <Form form={additionalForm} layout={'vertical'} style={{ marginTop: (type == 'waitlist') ? 0 : -72 }}>
          <Row className={'gx-flex-sm-row'} gutter={[10]} align={"bottom"}>
            {
              type != 'waitlist' &&
              <Col span={12}></Col>
            }
            {
              props.clientFieldData.map(item => {
                if (item.enable != "0") {
                  switch (item.type) {
                    case "Text Field": {
                      return (
                        <Col span={12}>
                          <Form.Item
                            name={item.username}
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
                            name={item.username}
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
                            name={item.username}
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
                            name={item.username}
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
                            name={item.username}
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
                            name={item.username}
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
                            name={item.username}
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

const mapStateToProps = ({ users, settings }) => {
  const { clientFieldData } = settings;
  const { resourceData } = settings;
  const { userData } = users;
  return { userData, clientFieldData, resourceData };
};

export default connect(mapStateToProps, {})(UserModal);
