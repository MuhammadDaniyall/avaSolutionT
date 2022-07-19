import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button, Row, Col, Avatar, Typography, Divider, Tooltip, message } from 'antd';
import AvatarWithName from '../../components/common/AvatarWithName';

import {
    getResourceData,
} from "../../appRedux/actions/Settings";
import {
    addDescriptionReport,
    getDescriptionReportData,
} from "../../appRedux/actions/Tasks";

import Close from '@2fd/ant-design-icons/lib/Close';
import Plus from '@2fd/ant-design-icons/lib/Plus';
import InformationOutline from '@2fd/ant-design-icons/lib/InformationOutline';
import { baseURL } from '../../util/Api';

const { TextArea } = Input;
const { Text } = Typography;
const { confirm } = Modal;

const TaskModal = (props) => {
    const { visible, formdata, closeModal, user } = props;
    const [reportText, SetReportText] = useState('');

    useEffect(() => {
        if (props.formdata) {
            initialData();
        }
    }, [props.formdata])
    const initialData = async () => {
        await props.getResourceData(user.id);
        await props.getDescriptionReportData(props.formdata.id)
    }
    const Report = async (description_id) => {
        if (reportText != '') {
            confirm({
                title: 'Are you sure Report?',
                icon: <InformationOutline />,
                okText: 'Yes',
                okType: 'primary',
                cancelText: 'No',
                async onOk() {
                    await props.addDescriptionReport({ description_id: description_id, reportText: reportText, resource_id: props.user.id });
                    SetReportText('');
                },
            });
        }
        else {
            message.warning("Please enter Report!");
        }
    }

    return (
        <Modal
            className={'gx-modal'}
            visible={visible}
            closeIcon={<Close style={{ fontSize: 22 }} />}
            title={'Reports'}
            onCancel={closeModal}
            forceRender
            footer={null}
            width={550}
        >
            {
                formdata &&
                <Form layout={'vertical'}>
                    <Row className={'gx-flex-sm-row'}>
                        <Col span={14}>
                            <Form.Item label={'Description'}>
                                <pre style={{ paddingLeft: 10 }}>{props.formdata.title}</pre>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label={'Assign Resources'}>
                                {
                                    props.resourceData &&
                                    <Avatar.Group maxCount={7} style={{ paddingLeft: 10 }}>
                                        {
                                            props.formdata.resources.map(resource => {
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
                            </Form.Item>
                        </Col>

                    </Row>
                    <Form.Item label={'Reports'}>
                        <Divider style={{ marginTop: 3 }} />
                        {
                            props.reportData &&
                            <Row className={'gx-flex-sm-row'}>
                                {
                                    props.reportData.map(report => {
                                        return <>
                                            <Col span={2}>
                                                {
                                                    props.resourceData.map(resource => {
                                                        if (resource.ID == report.resource_id) {
                                                            if (resource.img_path) {
                                                                return <Avatar src={`${baseURL}resource/avatar/${resource.ID}`} style={{ backgroundColor: 'gray' }} />
                                                            }
                                                            else {
                                                                return <AvatarWithName name={resource.name} size={'middle'} />
                                                            }
                                                        }
                                                    })
                                                }
                                            </Col>
                                            <Col span={20} style={{ display: 'flex', alignItems: 'center' }}>
                                                <pre>{report.report}</pre>
                                            </Col>
                                            <Divider />
                                        </>
                                    })
                                }
                                {
                                    props.reportData.length == 0 &&
                                    <>
                                        <Col span={24} style={{ textAlign: 'center' }}>
                                            <Text>There is no report yet.</Text>
                                            <Divider />
                                        </Col>
                                    </>
                                }
                            </Row>
                        }
                    </Form.Item>
                    {
                        props.user.role == "resource" &&
                        <>
                            {
                                formdata.resources.find(resource => resource == props.resourceData.find(element => element['name'] == props.user.username && element['email'] == props.user.email)['ID']) &&
                                <Row className={'gx-flex-sm-row'}>
                                    <Col span={20}>
                                        <TextArea style={{ maxHeight: 60, minHeight: 60 }} placeholder={'Enter your Report.'} value={reportText} onChange={(e) => {
                                            SetReportText(e.target.value)
                                        }}></TextArea>
                                    </Col>
                                    <Col span={4} style={{ direction: 'rtl' }}>
                                        <Tooltip title={'Add report'} color={'#fff'}>
                                            <Button
                                                className={'content-form__circle__button gx-bg-primary gx-border-primary'}
                                                type="default"
                                                shape="circle"
                                                style={{ width: 60, height: 60 }}
                                                icon={<Plus style={{ fontSize: 20 }} />}
                                                onClick={() => { Report(props.formdata.id) }}
                                            />
                                        </Tooltip>
                                    </Col>
                                </Row>
                            }
                        </>
                    }
                </Form>
            }
        </Modal>
    );
};

const mapStateToProps = (({ settings, auth, tasks }) => {
    const { user } = auth;
    const { reportData } = tasks;
    const { resourceData } = settings;
    return { resourceData, user, reportData };
})
export default connect(mapStateToProps, { getResourceData, addDescriptionReport, getDescriptionReportData })(TaskModal);

