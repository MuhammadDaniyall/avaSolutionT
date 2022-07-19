import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getTasks, addTask, updateTask, deleteTask, changeTaskProgress } from '../../appRedux/actions/Tasks';
import { getResourceData } from '../../appRedux/actions/Settings';


import { Tooltip, Button, Modal, Typography, Row, Col, Card, Avatar, Layout, Progress, Divider, Checkbox } from 'antd';
import { CalendarFilled } from '@ant-design/icons';
import LeadPencil from '@2fd/ant-design-icons/lib/LeadPencil';
import Delete from '@2fd/ant-design-icons/lib/Delete';
import CheckBold from "@2fd/ant-design-icons/lib/CheckBold";
import InformationOutline from '@2fd/ant-design-icons/lib/InformationOutline';

import { baseURL } from '../../util/Api';
import moment from 'moment';

import AvatarWithName from '../../components/common/AvatarWithName';
import TaskModal from '../../components/Tasks/TaskModal';

const { confirm } = Modal;
const { Title, Text } = Typography;
const { Sider, Content } = Layout;

const TaskScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [formdata, setFormData] = useState(null);
  const [taskDatas, setTaskData] = useState([]);

  const { user, addTask, getTasks, updateTask, deleteTask, changeTaskProgress, getResourceData } = props;

  useEffect(() => {
    initialData();
  }, []);
  const initialData = async () => {
    await getTasks(user.id);
    await getResourceData(user.id);
  };
  useEffect(() => {
    if (props.taskData) {
      setTaskData(props.taskData);
      if (formdata) {
        for (let index = 0; index < props.taskData.length; index++) {
          if (props.taskData[index].id == formdata.id) {
            setFormData(props.taskData[index]);
            break;
          }
        }
      }
    }
  }, [props.taskData])
  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <InformationOutline />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        await deleteTask(id);
      },
    });
  };
  const changeProgress = (id, type) => {
    confirm({
      title: 'Are you sure Move this task to ' + type + '?',
      icon: <InformationOutline />,
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      async onOk() {
        await changeTaskProgress({ id: id, type: type });
      },
    });
  };

  const openModal = (values) => {
    setFormData(values);
    if (values === null) setModalState(true);
    else setModalState(false);
    setVisible(true);
  };
  const handleSubmit = async (values) => {
    if (formdata === null) await addTask({ ...values, user_id: user.id });
    else await updateTask({ ...values, id: formdata.id });
    setVisible(false);
  };

  const getPercent = (value) => {
    var countDone = 0;
    for (let index = 0; index < value.length; index++) {
      if (value[index].is_done == true) {
        countDone++;
      }
    }
    return Math.floor((countDone * 100) / value.length);
  }
  const getAvatars = (task) => {
    var result = [];
    task.descriptions.forEach(description => {
      description.resources.forEach(resource => {
        const found = result.find(element => element == resource);
        if (found == undefined) {
          result.push(resource);
        }
      })
    });
    var tags = result.map(resource => {

      for (let index = 0; index < props.resourceData.length; index++) {
        const element = props.resourceData[index];
        if (element.ID == resource) {
          if (element.img_path) {
            return <Avatar src={`${baseURL}resource/avatar/${resource}`} style={{ backgroundColor: 'gray' }} key={user.id}/>
          }
          else {
            return <AvatarWithName name={element.name} size={'middle'} />
          }
        }
      }
    })
    return tags;
  }
  return (
    <Row className={'gx-flex-small-row ava-task-content'} gutter={[40, 0]}>
      <Col span={8}>
        <div className={'content-form tasks__content-form'}>
          <div className={'content-form__header'}>
            <Title level={4}></Title>
            {
              props.user.role != "resource" &&
              <Button type="primary" className={'content-form__button'} onClick={() => openModal(null)}>
                + New Task
            </Button>
            }
          </div>
          <div className={'content-form__form'}  >
            {
              taskDatas &&
              taskDatas.map((task) => {
                if (task.progress == "todo") {
                  return (
                    <Card
                    // key={task.title}
                      style={{ marginTop: 16 }}
                      title={
                        <Layout>
                          <div>{task.title}</div>
                          <Sider>
                            {
                              props.user.role != "resource" ?
                                <div>
                                  <Tooltip title={'Edit'} color={'#fff'}>
                                    <Button
                                      className={'content-form__circle__button gx-bg-primary gx-border-primary'}
                                      type="default"
                                      shape="circle"
                                      icon={<LeadPencil style={{ fontSize: 20 }} />}
                                      onClick={() => openModal(task)}
                                    />
                                  </Tooltip>
                                  <Tooltip title={'Go to doing'} color={'#fff'}>
                                    <Button
                                      className={'content-form__circle__button gx-bg-success gx-border-success'}
                                      type="default"
                                      shape="circle"
                                      icon={<CheckBold style={{ fontSize: 20 }} />}
                                      onClick={() => changeProgress(task.id, "doing")}
                                    />
                                  </Tooltip>
                                  <Tooltip title={'Delete'} color={'#fff'}>
                                    <Button
                                      className={'content-form__circle__button gx-bg-danger gx-border-danger'}
                                      type="default"
                                      shape="circle"
                                      icon={<Delete style={{ fontSize: 20 }} />}
                                      onClick={() => handleDelete(task.id)}
                                    />
                                  </Tooltip>
                                </div> :
                                <Tooltip title={'Detail'} color={'#fff'}>
                                  <Button
                                    className={'content-form__circle__button gx-bg-primary gx-border-primary'}
                                    type="default"
                                    shape="circle"
                                    icon={<LeadPencil style={{ fontSize: 20 }} />}
                                    onClick={() => openModal(task)}
                                  />
                                </Tooltip>
                            }
                          </Sider>
                        </Layout>
                      }
                      hoverable
                    >
                      {
                        task.descriptions.map((description, index) => {
                          return (
                            <Row className={'gx-flex-sm-row'} style={{ alignItems: 'center' }} key={task.title}>
                              <Col span={1}></Col>
                              <Col span={2}>
                                <Checkbox checked={description.is_done} disabled></Checkbox>
                              </Col>
                              <Col span={21}>
                                <pre style={{ minHeight: 10, margin: 0 }}>{description.title}</pre>
                              </Col>
                              {
                                index != task.descriptions.length - 1 &&
                                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                              }
                            </Row>
                          )
                        })
                      }
                      <Divider />
                      <Row>
                        <Col span={1}></Col>
                        <Col span={1}><CalendarFilled /></Col>
                        <Col span={12}>
                          <Text>{moment(task['task_period'][0]).format("YYYY-MM-DD") + " - " + moment(task['task_period'][1]).format("YYYY-MM-DD")}</Text>
                        </Col>
                        <Col span={10} style={{ direction: 'rtl' }}>
                          {
                            props.resourceData &&
                            <Avatar.Group maxCount={5}>
                              {
                                getAvatars(task)
                              }
                            </Avatar.Group>
                          }
                        </Col>
                        <Col span={24}>
                          <Progress percent={getPercent(task.descriptions)} size="small" showInfo={false} trailColor={'#cecece'} showInfo />
                        </Col>
                      </Row>
                    </Card>

                  )
                }
              })
            }
          </div>
        </div>

      </Col>
      <Col span={8}>
        <div className={'content-form tasks__content-form'}>
          <div className={'content-form__header'}>
            <Title level={4}></Title>
          </div>
          <div className={'content-form__form'}>
            {
              taskDatas &&
              taskDatas.map((task) => {
                if (task.progress == "doing") {
                  return (
                    <Card
                      style={{ marginTop: 16 }}
                      title={
                        <Layout>
                          <div>{task.title}</div>
                          <Sider>
                            {
                              props.user.role != "resource" ?
                                <div>
                                  <Tooltip title={'Edit'} color={'#fff'}>
                                    <Button
                                      className={'content-form__circle__button gx-bg-primary gx-border-primary'}
                                      type="default"
                                      shape="circle"
                                      icon={<LeadPencil style={{ fontSize: 20 }} />}
                                      onClick={() => openModal(task)}
                                    />
                                  </Tooltip>
                                  <Tooltip title={'Go to Done'} color={'#fff'}>
                                    <Button
                                      className={'content-form__circle__button gx-bg-success gx-border-success'}
                                      type="default"
                                      shape="circle"
                                      icon={<CheckBold style={{ fontSize: 20 }} />}
                                      onClick={() => changeProgress(task.id, "done")}
                                    />
                                  </Tooltip>
                                  <Tooltip title={'Delete'} color={'#fff'}>
                                    <Button
                                      className={'content-form__circle__button gx-bg-danger gx-border-danger'}
                                      type="default"
                                      shape="circle"
                                      icon={<Delete style={{ fontSize: 20 }} />}
                                      onClick={() => handleDelete(task.id)}
                                    />
                                  </Tooltip>
                                </div> :
                                <Tooltip title={'Detail'} color={'#fff'}>
                                  <Button
                                    className={'content-form__circle__button gx-bg-primary gx-border-primary'}
                                    type="default"
                                    shape="circle"
                                    icon={<LeadPencil style={{ fontSize: 20 }} />}
                                    onClick={() => openModal(task)}
                                  />
                                </Tooltip>
                            }
                          </Sider>
                        </Layout>
                      }
                      hoverable
                    >
                      {
                        task.descriptions.map((description, index) => {
                          return (
                            <Row className={'gx-flex-sm-row'} style={{ alignItems: 'center' }}>
                              <Col span={1}></Col>
                              <Col span={2}>
                                <Checkbox checked={description.is_done} disabled></Checkbox>
                              </Col>
                              <Col span={21}>
                                <pre style={{ minHeight: 10, margin: 0 }}>{description.title}</pre>
                              </Col>
                              {
                                index != task.descriptions.length - 1 &&
                                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                              }
                            </Row>
                          )
                        })
                      }
                      <Divider />
                      <Row>
                        <Col span={1}></Col>
                        <Col span={1}><CalendarFilled /></Col>
                        <Col span={12}>
                          <Text>{moment(task['task_period'][0]).format("YYYY-MM-DD") + " - " + moment(task['task_period'][1]).format("YYYY-MM-DD")}</Text>
                        </Col>
                        <Col span={10} style={{ direction: 'rtl' }}>
                          {
                            props.resourceData &&
                            <Avatar.Group maxCount={5}>
                              {
                                getAvatars(task)
                              }
                            </Avatar.Group>
                          }
                        </Col>
                        <Col span={24}>
                          <Progress percent={getPercent(task.descriptions)} size="small" showInfo={false} trailColor={'#cecece'} showInfo />
                        </Col>
                      </Row>
                    </Card>

                  )
                }
              })
            }
          </div>
        </div>

      </Col>
      <Col span={8}>
        <div className={'content-form tasks__content-form'}>
          <div className={'content-form__header'}>
            <Title level={4}></Title>
          </div>
          <div className={'content-form__form'}>
            {
              taskDatas &&
              taskDatas.map((task) => {
                console.log(task)
                if (task.progress == "done") {
                  return (
                    <Card
                      style={{ marginTop: 16 }}
                      title={
                        <Layout>
                          <div>{task.title}</div>
                          <Sider>
                            {
                              props.user.role != "resource" &&
                              <div>
                                <Tooltip title={'Delete'} color={'#fff'}>
                                  <Button
                                    className={'content-form__circle__button gx-bg-danger gx-border-danger'}
                                    type="default"
                                    shape="circle"
                                    icon={<Delete style={{ fontSize: 20 }} />}
                                    onClick={() => handleDelete(task.id)}
                                  />
                                </Tooltip>
                              </div>
                            }
                          </Sider>
                        </Layout>
                      }
                      hoverable
                    >
                      {
                        task.descriptions.map((description, index) => {
                          return (
                            <Row className={'gx-flex-sm-row'} style={{ alignItems: 'center' }}>
                              <Col span={1}></Col>
                              <Col span={2}>
                                <Checkbox checked={description.is_done} disabled></Checkbox>
                              </Col>
                              <Col span={21}>
                                <pre style={{ minHeight: 10, margin: 0 }}>{description.title}</pre>
                              </Col>
                              {
                                index != task.descriptions.length - 1 &&
                                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                              }
                            </Row>
                          )
                        })
                      }
                      <Divider />
                      <Row>
                        <Col span={1}></Col>
                        <Col span={1}><CalendarFilled /></Col>
                        <Col span={12}>
                          <Text>{moment(task['task_period'][0]).format("YYYY-MM-DD") + " - " + moment(task['task_period'][1]).format("YYYY-MM-DD")}</Text>
                        </Col>
                        <Col span={10} style={{ direction: 'rtl' }}>
                          {
                            props.resourceData &&
                            <Avatar.Group maxCount={5}>
                              {
                                getAvatars(task)
                              }
                            </Avatar.Group>
                          }
                        </Col>
                        <Col span={24}>
                          <Progress percent={getPercent(task.descriptions)} size="small" showInfo={false} trailColor={'#cecece'} showInfo />
                        </Col>
                      </Row>
                    </Card>

                  )
                }
              })
            }
          </div>
        </div>

      </Col>

      <TaskModal
        state={modalState}
        visible={visible}
        formdata={formdata}
        handleSubmit={handleSubmit}
        closeModal={() => {
          setVisible(false);
        }}
      />
    </Row>
  );
};

const mapStateToProps = ({ auth, tasks, settings }) => {
  const { user } = auth;
  const { taskData } = tasks;
  const { resourceData } = settings;
  return { user, taskData, resourceData };
};

export default connect(mapStateToProps, {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getResourceData,
  changeTaskProgress,
})(TaskScreen);
