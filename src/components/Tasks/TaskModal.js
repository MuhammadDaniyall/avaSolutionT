import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Modal, Form, Input, Button, Row, Col, DatePicker, Select, Typography, Card, Avatar, Checkbox, Tooltip, Layout, Progress, message, Divider } from 'antd';
import AvatarWithName from '../../components/common/AvatarWithName';

import {
  getResourceData,
} from "../../appRedux/actions/Settings";
import {
  deleteDescription,
} from "../../appRedux/actions/Tasks";


import Close from '@2fd/ant-design-icons/lib/Close';
import Delete from '@2fd/ant-design-icons/lib/Delete';
import SubtitlesOutline from '@2fd/ant-design-icons/lib/SubtitlesOutline';
import InformationOutline from '@2fd/ant-design-icons/lib/InformationOutline';
import TextBox from '@2fd/ant-design-icons/lib/TextBox';
import { CalendarFilled } from '@ant-design/icons';
import { baseURL } from '../../util/Api';
import DescriptionReportModal from '../../components/Tasks/DescriptionReportModal';

const { RangePicker } = DatePicker;
const { confirm } = Modal;
const { Title, Text } = Typography;
const { Sider, Content } = Layout;
const { TextArea } = Input;

const TaskModal = (props) => {
  const [form] = Form.useForm();
  const [optionsTmp, setTempOptions] = useState([]);
  const [value, setValue] = useState(undefined);
  const { state, visible, formdata, handleSubmit, closeModal, user } = props;
  const [descriptions, setDescriptions] = useState([]);
  const [reoportModalVisible, setReoportModalVisible] = useState(false);
  const [reportFormData, setReportFormData] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState({ index: -1, type: 'title' });

  useEffect(() => {
    initialData();
  }, [])
  const initialData = async () => {
    await props.getResourceData(user.id)
  }

  useEffect(() => {
    if (visible) {
      if (formdata) {
        var tempFormData = formdata;
        tempFormData['task_period'] = [moment(tempFormData['task_period'][0]), moment(tempFormData['task_period'][1])];
        form.setFieldsValue(tempFormData);
        setValue(tempFormData.resources);
        setDescriptions(formdata.descriptions);
      }
    } else {
      form.resetFields();
      setDescriptions([]);
      setSelectedDescription({ index: -1, type: 'title' });
    }
  }, [visible]);
  useEffect(() => {
    if (formdata) {
      setDescriptions(formdata.descriptions);
    }
  }, [formdata])
  useEffect(() => {
    if (props.resourceData) {
      const temp = [];
      if (props.resourceData) {
        props.resourceData.map((item ,index) => {
          var flag = (item.available != "Away") && (item.available != "Busy") && (!item.available.startsWith("Custom")) && (!item.available.startsWith("BackIn1Hour")) && (!item.available.startsWith("BackIn30Min"));
          let src;
          if (item.img_path) {
            src = <img src={`${baseURL}resource/avatar/${item.ID}`} style={{ backgroundColor: 'gray', width: 16, height: 16 }}></img>;
          } else {
            src = (
              <div className={'ava_task_modal_avatar'}  key={index}>
                <AvatarWithName name={item.name} fontSize={10} />
              </div>
            );
          }
          temp.push({
            disabled: !flag,
            label: (
              <div style={{ alignItems: 'center', display: 'flex' }} key={index}>
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
    }
  }, [props.resourceData])

  const selectProps = {
    mode: 'multiple',
    style: {
      height: '20px',
      width: '100%',
    },
    value,
    options: optionsTmp,
    placeholder: 'Select resource...',
  };

  const handelClick = () => {
    if (descriptions.length == 0) {
      message.error("Please add one or more descriptions");
      return;
    }
    form
      .validateFields()
      .then((values) => {
        var submitData = values;
        for (let index = 0; index < descriptions.length; index++) {
          const element = descriptions[index];
          if (element['title'] == '' || element['resources'].length == 0) {
            message.error("Please enter fields");
            return;
          }

        }
        form.resetFields();
        submitData['descriptions'] = descriptions;
        if (submitData['task_period'] !== undefined) {
          submitData['task_period'] = JSON.stringify([moment(submitData['task_period'][0]).format("YYYY-MM-DD"), moment(submitData['task_period'][1]).format("YYYY-MM-DD")]);
        }
        handleSubmit(submitData);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const changeDescriptionState = (index) => {
    var tempDescriptions = descriptions;
    tempDescriptions[index]['is_done'] = !tempDescriptions[index]['is_done'];
    setDescriptions(tempDescriptions);
  }



  const openReportModal = (values) => {
    setReportFormData(values);
    setReoportModalVisible(true);
  }
  const handleDelete = (value, index) => {
    if (descriptions.length == 1) {
      message.error("You can't delete final descriptions!");
      return
    }
    confirm({
      title: 'Are you sure delete this Description?',
      icon: <InformationOutline />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        if (value.id == undefined) {
          var tmpdata = descriptions;
          tmpdata.splice(index, 1);
          setDescriptions([...tmpdata]);
        }
        else {
          await props.deleteDescription(value.id);
        }
      },
    });
  }

  const addDescription = () => {
    var tmpdata = { title: '', resources: [] };
    setDescriptions([...descriptions, tmpdata]);
  }
  const inputFocus = (event, index, type) => {
    setSelectedDescription({ index: index, type: type });
    event.stopPropagation();
  }

  const removeFocus = (event) => {
    setSelectedDescription({ index: -1, type: 'title' });
  }

  const changeDescription = (index, type, value) => {
    var tmpdata = descriptions;
    tmpdata[index][type] = value;
    setDescriptions(tmpdata);
    setDescriptions([...tmpdata]);
  }


  const getPercent = (value) => {
    var countDone = 0;
    for (let index = 0; index < value.length; index++) {
      if (value[index].is_done == true) {
        countDone++;
      }
    }
    return (countDone * 100) / value.length;
  }
  return (
    <Modal
    // key={user.}
      className={'gx-modal ava_task_description'}
      visible={visible}
      closeIcon={<Close style={{ fontSize: 22 }} />}
      title={state ? 'New Task' : 'Edit Task'}
      onCancel={closeModal}
      forceRender
      footer={[
        <Button key="submit" type="primary" onClick={handelClick}>
          {state ? 'Add' : 'Save'}
        </Button>,
      ]}
      width={550}
    >
      <Form form={form} layout={'vertical'}>
        <Row className={'gx-flex-sm-row'}>
          {
            props.user.role != "resource" ?
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
                <Input placeholder="Title" disabled={(props.user.role == "resource") ? true : false} prefix={<SubtitlesOutline style={{ color: '#a2aabd', fontSize: 18 }} />} />
              </Form.Item>
              :
              <>
                {
                  props.formdata &&
                  <>
                    <Col span={24}>
                      <Title style={{ fontSize: '14px', fontWeight: 500,marginBottom:0 }} >Title</Title>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={23} style={{ lineHeight: '25px' }}>
                      <Text>{props.formdata.title}</Text>
                    </Col>
                  </>
                }
              </>
          }

        </Row>
        <Row className={'gx-flex-sm-row'}>
          <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
            <Title level={5} style={{ marginBottom: 0, fontSize: '14px', fontWeight: 500 }}>{"Descriptions"}</Title>
          </Col>
          {
            props.user.role != 'resource' &&
            <Col span={12} style={{ direction: 'rtl' }}>
              <Button type={'primary'} onClick={() => { addDescription() }}>Add Description</Button>
            </Col>
          }
        </Row>

        <Row>
          {
            descriptions.map((description, index) => {
              return (
                <>
                  <Card
                    onClick={(e) => { removeFocus() }}
                    title={
                      <Layout>
                        {
                          (index == selectedDescription.index && selectedDescription.type == 'title') && props.user.role != "resource" ?
                            <TextArea type={'text'} defaultValue={description.title} onChange={(e) => { changeDescription(index, 'title', e.target.value) }} onClick={(e) => { inputFocus(e, index, 'title') }}></TextArea>
                            :
                            <Content onClick={(e) => { inputFocus(e, index, 'title') }}>{description.title == '' ? <span style={{ borderBottom: '1px solid gray' }}>click here to input title.</span> : <pre>{description.title}</pre>}</Content>
                        }
                        <Sider>
                          {
                            props.user.role != "resource" &&
                            <>
                              <Tooltip title={'Delete'} color={'#fff'}>
                                <Button
                                  className={'content-form__circle__button gx-bg-danger gx-border-danger'}
                                  type="default"
                                  shape="circle"
                                  icon={<Delete style={{ fontSize: 20 }} />}
                                  onClick={() => handleDelete(description, index)}
                                />
                              </Tooltip>
                            </>
                          }
                          <Tooltip title={'Reports'} color={'#fff'}>
                            <Button
                              className={'content-form__circle__button gx-bg-primary gx-border-primary'}
                              type="default"
                              shape="circle"
                              icon={<TextBox style={{ fontSize: 20 }} />}
                              onClick={() => openReportModal(description)}
                            />
                          </Tooltip>
                        </Sider>
                      </Layout>
                    }
                    hoverable
                  >
                    <Row className={'gx-flex-sm-row'}>
                      <Col span={10}>
                        <Checkbox defaultChecked={description.is_done} onChange={(e) => { changeDescriptionState(index) }} disabled={(props.user.role == "resource" && description.resources.find(resource => resource == props.resourceData.find(element => element['name'] == props.user.username && element['email'] == props.user.email)['ID']) ? false : true)}>Is Done</Checkbox>
                      </Col>
                      {
                        props.resourceData &&
                        <>
                          {
                            (index == selectedDescription.index && selectedDescription.type == 'resources') && props.user.role != "resource" ?
                              <Col span={14}>
                                <Select className={"ava-select-selection"} maxTagCount={'responsive'} {...selectProps} defaultValue={description.resources} onChange={(e) => { changeDescription(index, 'resources', e) }} onClick={(e) => { inputFocus(e, index, 'resources') }} />
                              </Col>
                              :
                              <Col span={14} style={{ direction: 'rtl' }} onClick={(e) => { inputFocus(e, index, 'resources') }}>
                                {
                                  (description.resources.length == 0) ?
                                    <Content><span style={{ borderBottom: '1px solid gray' }}>click here to select resources</span></Content>
                                    :
                                    <Avatar.Group maxCount={5}>
                                      {
                                        description.resources.map(resource => {
                                          for (let index = 0; index < props.resourceData.length; index++) {
                                            const element = props.resourceData[index];
                                            if (element.ID == resource) {
                                              if (element.img_path) {
                                                return <Avatar src={`${baseURL}resource/avatar/${resource}`} style={{ backgroundColor: 'gray' }} />
                                              }
                                              else {
                                                return <AvatarWithName name={element.name} size={'middle'} />
                                              }
                                            }
                                          }
                                        })
                                      }
                                    </Avatar.Group>
                                }
                              </Col>
                          }
                        </>
                      }
                    </Row>
                  </Card>
                </>
              )
            })
          }
          {
            descriptions.length == 0 &&
            <>
              <Divider />
              <Text style={{ textAlign: 'center' }}>There is no description yet.</Text>
              <Divider />
            </>
          }
        </Row>

        <Row className={'gx-flex-sm-row'} gutter={[10, 0]}>
          <Col span={12}>
            {
              props.user.role != "resource" ?
                <Form.Item name={'task_period'} label={'Task period'} rules={[
                  {
                    required: true,
                    message: 'Please enter Time'
                  }
                ]}>
                  <RangePicker disabled={props.user.role == "resource"} />
                </Form.Item>
                :
                <>
                  {
                    props.formdata &&
                    <Form.Item label={'Task Period'}>
                      <Row className={'gx-flex-sm-row'}>
                        <Col span={1}></Col>
                        <Col span={1}><CalendarFilled /></Col>
                        <Col span={1}></Col>
                        <Col span={21}>
                          <Text>{moment(props.formdata['task_period'][0]).format("YYYY-MM-DD") + " - " + moment(props.formdata['task_period'][1]).format("YYYY-MM-DD")}</Text>
                        </Col>
                      </Row>

                    </Form.Item>
                  }
                </>
            }
          </Col>
          <Col span={12}>
            {
              descriptions.length != 0 &&
              <Form.Item label={'Task Progress'}>
                <Row className={'gx-flex-sm-row'}>
                  <Col span={20}>
                    <Progress percent={getPercent(descriptions)} size="small" showInfo={false} trailColor={'#cecece'} />
                  </Col>
                  <Col span={4}>
                    <span>{descriptions.length}/{descriptions.length * getPercent(descriptions) / 100}</span>
                  </Col>
                </Row>
              </Form.Item>
            }
          </Col>
        </Row>
      </Form>
      <DescriptionReportModal
        visible={reoportModalVisible}
        formdata={reportFormData}
        closeModal={() => {
          setReoportModalVisible(false);
        }}
      >
      </DescriptionReportModal>
    </Modal>
  );
};

const mapStateToProps = (({ settings, auth }) => {
  const { user } = auth;
  const { resourceData } = settings;
  return { resourceData, user };
})
export default connect(mapStateToProps, { getResourceData, deleteDescription })(TaskModal);

