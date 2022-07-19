/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button, AutoComplete, Select } from 'antd';
import PhoneInput from 'react-phone-input-2';
import PropTypes from 'prop-types';
import 'react-phone-input-2/lib/style.css';

import { baseURL } from '../../../util/Api';

// icons
import CameraPlus from '@2fd/ant-design-icons/lib/CameraPlus';
import Close from '@2fd/ant-design-icons/lib/Close';

import WorkingHourModal from './workingHours';
import WorkingDateModal from './calendar';

import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const ResourceForm = (props) => {
  const [options, setOptions] = useState([]);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [AvaliableWorkingTime, setAvaliableWorkingTime] = useState({});
  const [detailedWorkingTime, setDetailedWorkingTime] = useState([]);
  const [avaliableWorkingVisible, setWorkingHourVisible] = useState(null);
  const [detailedWokingDateVisible, setWorkingDateVisible] = useState(null);

  const [value, setValue] = useState([]);
  const [optionsTmp, setTempOptions] = useState([]);

  const { title, state, visible, serviceData, formData, handleSubmit, closeModal, categoryNames } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    const tmp = [];
    const temp = [];
    if (serviceData) {
      serviceData.map((item) => {
        let src;
        if (item.img_path) {
          src = <img src={`${baseURL}service/avatar/${item.ID}`} style={{ backgroundColor: 'gray', width: 16,height:16 }}></img>;
        } else {
          src = (
            <div
              style={{
                borderRadius: 3,
                backgroundColor: item.color,
                width: 16,
                height: 16,
                float: 'left',
              }}
            ></div>
          );
        }
        temp.push({
          label: (
            <div style={{alignItems:'center',display:'flex'}}>
              {src}
              <span>{item.name}</span>
            </div>
          ),
          value: item.ID,
        });
        return temp;
      });
    }
    setTempOptions(temp);
    if (visible) {
      form.setFieldsValue(formData);
      if (formData) {
        setAvaliableWorkingTime(JSON.parse(formData.working_hour));
        setValue(JSON.parse(formData.serviceProvide));
        setDetailedWorkingTime(JSON.parse(formData.working_data));
      }
      categoryNames.map((item) => tmp.push({ value: item }));
      setOptions(tmp);
    } else {
      setAvaliableWorkingTime({});
      setPicture(null);
      setOptions([]);
      setImgData(null);
      setWorkingDateVisible(null);
      setWorkingHourVisible(null);
      setDetailedWorkingTime(null);
      setValue([]);
      setTempOptions([]);
      form.resetFields();
    }
  }, [visible]);

  const selectProps = {
    mode: 'multiple',
    style: {
      height:'20px',
      width: '100%',
    },
    value,
    options: optionsTmp,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: 'Service provided...',
  };

  const handelClick = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        handleSubmit({
          ...values,
          picture: picture,
          workingHour: JSON.stringify(AvaliableWorkingTime),
          serviceProvide: JSON.stringify(value),
          workingData: JSON.stringify(detailedWorkingTime),
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const editAvaliableHour = () => {
    setWorkingHourVisible(true);
  };
  const editDetailedDate = () => {
    setWorkingDateVisible(true);
  };
  const saveWorkingTime = (...values) => {
    const tmp = {};
    tmp.generalHours = values[0];
    if (values[3] == true) {
      tmp.waitListHours = false;
    } else {
      tmp.waitListHours = values[1];
    }
    if (values[4] == true) {
      tmp.bookingHours = false;
    } else {
      tmp.bookingHours = values[2];
    }
    setAvaliableWorkingTime(tmp);
    setWorkingHourVisible(false);
  };
  const clearAll = () => {
    setWorkingHourVisible(false);
    setAvaliableWorkingTime({});
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
      width={800}
    >
      <Form form={form} layout={'vertical'} encType="multipart/form-data">
        <Row className={'gx-flex-sm-row'}>
          <Col className={'gx-p-2'} span={16}>
            <Form.Item
              name="name"
              label="Resource Name"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input type="text" placeholder="Resource Name" />
            </Form.Item>
            <Form.Item name="display_name" label="Display Name">
              <Input type="text" placeholder="Display Name" defaultValue="" />
            </Form.Item>
            <Form.Item
              name="category_name"
              label="Category"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <AutoComplete options={options} placeholder="Category" />
            </Form.Item>
            <div className={'gx-d-flex gx-justify-content-between'}>
              <Form.Item
                className={'gx-flex-1'}
                name="email"
                label="Email"
                style={{ paddingRight: 5 }}
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Valid email required!',
                  },
                ]}
              >
                <Input type="text" placeholder="Email" />
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
            <Form.Item name="description" label="Description">
              <TextArea autoSize={{ minRows: 5, maxRows: 5 }} placeholder="Description" />
            </Form.Item>
            <Form.Item name="ID" hidden={true}>
              <Input placeholder="ID" />
            </Form.Item>
          </Col>
          <Col className={'gx-p-2'} span={8}>
            <Form.Item name="image" label="Image">
              <Input
                type="file"
                id={'raised-button-file'}
                className={'gx-d-none'}
                onChange={handleChange}
                accept="image/*"
              />
              <label className={'img-preview__wrapper'} htmlFor={'raised-button-file'}>
                {formData && formData.img_path ? (
                  <img className={'img__preview'} src={imgData || `${baseURL}resource/avatar/${formData.ID}`} />
                ) : (
                  imgData && <img className={'img__preview'} src={imgData} />
                )}
                {!formData
                  ? !imgData && <CameraPlus style={{ color: '#595959', fontSize: 30 }} />
                  : !imgData && !formData.img_path && <CameraPlus style={{ color: '#595959', fontSize: 30 }} />}
              </label>
              <div className={'upload-button__wrapper'} style={{ textAlign: 'center' }}>
                <label className={'upload__button'} htmlFor={'raised-button-file'}>
                  Upload Image...
                </label>
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row className={'gx-flex-sm-row'}>
          <Col className={'gx-p-2'} span={12}>
            <Form.Item name="AvaliableWorkingTime" label="AvaliableWorkingTime">
              <Button key="submit" type="primary" onClick={editAvaliableHour}>
                avaliable_working_time
              </Button>
            </Form.Item>
          </Col>
          <Col className={'gx-p-2'} span={12}>
            <Form.Item name="detailed_working_time" label="detailed_working_time">
              <Button key="submit" onClick={editDetailedDate}>
                detailed_working_time
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row className={'gx-flex-sm-row'}>
          <Col className={'gx-p-2'} span={12}>
            {AvaliableWorkingTime.generalHours != undefined ? (
              AvaliableWorkingTime.generalHours.map((item, index) => {
                return (
                  <Row className={'gx-flex-sm-row'} key={index}>
                    <Col span={6}>
                      <Row className={'gx-flex-sm-row'}>{item.name}</Row>
                    </Col>
                    <Col span={10}>
                      <Row className={'gx-flex-sm-row'}>
                        {item.isWorking != 'Working' && <Col span={24}>{item.isWorking}</Col>}
                        {item.isWorking == 'Working' &&
                          item.data.map((val) => {
                            return <Col span={24}>{val[0] + '-' + val[1]}</Col>;
                          })}
                        {AvaliableWorkingTime.waitListHours &&
                          AvaliableWorkingTime.waitListHours.map((item1, index1) => {
                            if (index1 == index) {
                              if (item1.isWorking != 'Working') {
                                return (
                                  <Col
                                    style={{
                                      fontSize: 11,
                                      color: '#c0c0bf',
                                      textAlign: 'left',
                                      marginLeft: 7,
                                    }}
                                    span={18}
                                  >
                                    <ClockCircleOutlined
                                      style={{
                                        fontSize: 11,
                                        color: '#c0c0bf',
                                      }}
                                    />
                                    {item1.isWorking}
                                  </Col>
                                );
                              }
                              return item1.data.map((val, indexVal) => {
                                let tag;
                                if (indexVal == 0) {
                                  tag = (
                                    <Col
                                      style={{
                                        fontSize: 11,
                                        color: '#c0c0bf',
                                        textAlign: 'right',
                                      }}
                                      span={18}
                                    >
                                      <ClockCircleOutlined
                                        style={{
                                          fontSize: 11,
                                          color: '#c0c0bf',
                                        }}
                                      />
                                      {val[0] + '-' + val[1]}
                                    </Col>
                                  );
                                } else {
                                  tag = (
                                    <Col
                                      style={{
                                        fontSize: 11,
                                        color: '#c0c0bf',
                                        textAlign: 'right',
                                      }}
                                      span={18}
                                    >
                                      {val[0] + '-' + val[1]}
                                    </Col>
                                  );
                                }
                                return tag;
                              });
                            }
                            return true;
                          })}
                        {AvaliableWorkingTime.bookingHours &&
                          AvaliableWorkingTime.bookingHours.map((item1, index1) => {
                            if (index1 == index) {
                              if (item1.isWorking != 'Working') {
                                return (
                                  <Col
                                    style={{
                                      fontSize: 11,
                                      color: '#c0c0bf',
                                      textAlign: 'left',
                                      marginLeft: 7,
                                    }}
                                    span={18}
                                  >
                                    <ClockCircleOutlined
                                      style={{
                                        fontSize: 11,
                                        color: '#c0c0bf',
                                      }}
                                    />
                                    {item1.isWorking}
                                  </Col>
                                );
                              }
                              return item1.data.map((val, indexVal) => {
                                let tag;
                                if (indexVal == 0) {
                                  tag = (
                                    <Col
                                      style={{
                                        fontSize: 11,
                                        color: '#c0c0bf',
                                        textAlign: 'right',
                                      }}
                                      span={18}
                                    >
                                      <CalendarOutlined
                                        style={{
                                          fontSize: 11,
                                          color: '#c0c0bf',
                                        }}
                                      />
                                      {val[0] + '-' + val[1]}
                                    </Col>
                                  );
                                } else {
                                  tag = (
                                    <Col
                                      style={{
                                        fontSize: 11,
                                        color: '#c0c0bf',
                                        textAlign: 'right',
                                      }}
                                      span={18}
                                    >
                                      {val[0] + '-' + val[1]}
                                    </Col>
                                  );
                                }
                                return tag;
                              });
                            }
                            return true;
                          })}
                      </Row>
                    </Col>
                  </Row>
                );
              })
            ) : (
              <a />
            )}
          </Col>
        </Row>
        <Row className={'gx-flex-sm-row'}>
          <Col span={10}>
            <Select className={"ava-select-selection"} maxTagCount={'responsive'} {...selectProps} />
          </Col>
        </Row>
      </Form>
      <WorkingHourModal
        visible={avaliableWorkingVisible}
        saveWorkingTime={saveWorkingTime}
        clearAll={clearAll}
        modalData={JSON.stringify(AvaliableWorkingTime)}
        closeModal={() => {
          setWorkingHourVisible(false);
        }}
      ></WorkingHourModal>
      <WorkingDateModal
        visible={detailedWokingDateVisible}
        closeModal={() => {
          setWorkingDateVisible(false);
        }}
        formData={detailedWorkingTime}
        workingDataSubmit={(v) => {
          setDetailedWorkingTime(v);
        }}
      ></WorkingDateModal>
    </Modal>
  );
};

ResourceForm.propTypes = {
  title: PropTypes.string,
  state: PropTypes.bool,
  visible: PropTypes.bool,
  serviceData: PropTypes.object,
  formData: PropTypes.object,
  handleSubmit: PropTypes.func,
  closeModal: PropTypes.func,
  categoryNames: PropTypes.array,
};

export default ResourceForm;
