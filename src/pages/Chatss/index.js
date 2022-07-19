import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, List, Avatar, Button, Switch, Typography, Input, Select, message, Layout, Badge, Form } from 'antd';
import FileImage from '@2fd/ant-design-icons/lib/FileImage';
import CardAccountDetailsOutline from '@2fd/ant-design-icons/lib/CardAccountDetailsOutline';
import AvatarWithName from '../../components/common/AvatarWithName';
import ChevronDown from '@2fd/ant-design-icons/lib/ChevronDown';
import ClockOutline from '@2fd/ant-design-icons/lib/ClockOutline';
import moment from 'moment';
import Magnify from '@2fd/ant-design-icons/lib/Magnify';

import socketIo, { Socket } from 'socket.io-client';
const SERVER = "http://127.0.0.1:8000";
const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;
const { TextArea } = Input;

const Chat = (props) => {
    // console.log(props)
    const bottomRef = React.useRef(null);
    const messageRef = React.useRef(null);
    const [chatUsers, setChatUsers] = useState(null);
    const [messages, setMessages] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(-1);
    const [socket, setSocket] = useState(null);
    const [reRenderKey, setReRenderKey] = useState(0); // integer state
    const [showScroll, setShowScroll] = useState(false);
    const [form] = Form.useForm();
    const [tempNewMessage, setTempNewMessage] = useState(null);
    const [tempDisconnectUser, setTempDisconnectUser] = useState(null);

    useEffect(() => {
        configSocket();
    }, [selectedChatId])

    const configSocket = () => {
        var tmpSocket = socketIo(SERVER + "/?id=" + props.user.id);
        console.log(tmpSocket)
        tmpSocket.on('connection', () => { })
        tmpSocket.on('newUserlogin', users => {
            console.log(users);
            setChatUsers(users);
        })
        tmpSocket.on('userDisconnect', user => {
            setTempDisconnectUser(user);
        })
        tmpSocket.on('message', message => {
            setTempNewMessage(message);
            // console.log('selectedChatId', selectedChatId)
            scrolling(message);

        })
        tmpSocket.on('messages', allMessages => {
            setMessages(allMessages);
            handleScroll();
        })
        setSocket(tmpSocket);
    }

    useEffect(() => {
        if (tempNewMessage != null) {
            var tmpMessage = messages;
            tmpMessage.push(tempNewMessage);
            var tmpusers = chatUsers;
            tmpusers.forEach(element => {
                if (element.id == tempNewMessage.sender_id) {
                    element.latestTimes[tempNewMessage.receiver_id] = tempNewMessage.time;
                }
                else if (element.id == tempNewMessage.receiver_id) {
                    element.latestTimes[tempNewMessage.sender_id] = tempNewMessage.time;

                }
            });
            setMessages(tmpMessage);
            setReRenderKey(reRenderKey => reRenderKey + 1);
        }
    }, [tempNewMessage])

    useEffect(() => {
        if (tempDisconnectUser) {
            var tmpdata = chatUsers;
            tmpdata.forEach(element => {
                if(element.id == tempDisconnectUser.id){
                    element.avaliable = false;
                }
            })
            setChatUsers(tmpdata);
            setReRenderKey(reRenderKey => reRenderKey + 1);
        }
    },[tempDisconnectUser])


    const scrolling = (message) => {
        console.log(selectedChatId);
        if (message.sender_id == props.user.id) {
            form.resetFields();
            handleScroll();
        }
        else{
            try{
                // console.log("------------scrolling",message.receiver_id,selectedChatId);

                if (messageRef && messages.receiver_id == selectedChatId) {
                    if (messageRef.current.scrollTop + 1000 > messageRef.current.scrollHeight) {
                        handleScroll();
                    }
                }

            } catch (e) {
                console.log(e);
            }
        }
    }



    const handleScroll = () => {
        if (bottomRef) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    const handleSelect = (user) => {
        setSelectedChatId(user.id);
        socket.emit('select_user', user);
    }
    const typeMessage = (e) => {
        if (e.key == 'Enter' && e.target.value != '' && !e.shiftKey) {
            var text = e.target.value;
            socket.emit('message', { sender_id: props.user.id, receiver_id: selectedChatId, text: text });
        }
    }
    const getLatestMessager = (users, user) => {
        var result = { id: -1, username: '', role: 'resource', time: 0 };
        for (let index = 0; index < users.length; index++) {

            if (users[index]['latestTimes'] != null && users[index]['latestTimes'] != undefined) {

                if (users[index]['id'] != user.id) {
                    Object.getOwnPropertyNames(users[index]['latestTimes']).forEach(key => {
                        if (key == user.id) {
                            var tmpTime = users[index]['latestTimes'][key];
                            if (tmpTime != 0) {
                                if ((new Date(tmpTime)).getTime() > result.time) {
                                    result.id = users[index]['id'];
                                    result.username = users[index]['username'];
                                    result.avaliable = users[index]['avaliable'];
                                    result.role = users[index]['role'];
                                    result.time = (new Date(tmpTime)).getTime();
                                }
                            }

                        }
                    });

                }

            }
        }
        return result;
    }
    const LatestMessager = (props) => {
        var user = getLatestMessager(props.data, props.user);
        var className = 'chat_users gx-flex-sm-row';
        if (user.id == selectedChatId) {
            className += ' selected';
        }
        if (user.id != -1) {
            return (
                <Row className={className} onClick={() => { handleSelect(user) }}>
                    <Badge className={'avatar__badge'} color={user.avaliable ? '#44d060' : '#ffb100'} dot>
                        <AvatarWithName name={user.username} size={'large'} />
                    </Badge>
                    <Col className={'user_info'}>
                        <h5>{user.username}</h5>
                        <Text>{user.role}</Text>
                    </Col>
                    <Col className={'last_chat_time'}>{moment(user.time).format("h:mm a")}</Col>
                </Row>
            );
        }
        else
            return <></>;
    }
    const checkScroll = () => {
        if (messageRef.current.scrollTop + 1000 > messageRef.current.scrollHeight) {
            setShowScroll(false);
        }
        else {
            setShowScroll(true)
        }
    }
    var nextMessage = undefined;
    console.log(chatUsers);
    return (
        <div className={'content-form chat__content-form'}>
            <Row className={'gx-flex-sm-row chat_pannel'}>
                <Button onClick={() => {console.log(selectedChatId)}}>212</Button>
                {
                    chatUsers &&
                    <Col className={'user_pannel'}>
                        <div className={'user_search'}>
                            <Input prefix={<Magnify style={{ fontSize: 27, color: ' #7a7f9a!important' }} />} style={{ backgroundColor: '#e6ebf5', color: ' #7a7f9a!important' }} type={'text'} placeholder={'Search message or users.'}></Input>
                        </div>
                        <LatestMessager data={chatUsers} user={props.user} ></LatestMessager>
                        {
                            chatUsers.map(user => {
                                var className = 'chat_users gx-flex-sm-row';
                                if (user.id == selectedChatId) {
                                    className += ' selected';
                                }
                                var tmpuser = getLatestMessager(chatUsers, props.user);
                                if (user.id != props.user.id && tmpuser.id != user.id) {

                                    return (
                                        <Row className={className} onClick={() => { handleSelect(user) }}>
                                            <Badge className={'avatar__badge'} color={user.avaliable ? '#44d060' : '#ffb100'} dot>
                                                <AvatarWithName name={user.username} size={'large'} />
                                            </Badge>
                                            <Col className={'user_info'}>
                                                <h5>{user.username}</h5>
                                                <Text>{user.role}</Text>
                                            </Col>
                                            {
                                                user.latestTimes &&
                                                <Col className={'last_chat_time'}>{(user.latestTimes[props.user.id] == 0 || !user.latestTimes[props.user.id]) ? '' : moment(user.latestTimes[props.user.id]).format("h:mm a")}</Col>
                                            }
                                        </Row>

                                    )
                                }
                                else {
                                    return <></>
                                }
                            })
                        }
                    </Col>
                }
                <Layout className={'messages'}>
                    <Header>
                        <Row>
                            {
                                chatUsers &&
                                <>
                                    {
                                        selectedChatId != -1 &&
                                        <Col span={8} className={'user'}>
                                            <AvatarWithName size={'large'} name={chatUsers.find(e => e.id == selectedChatId).username}></AvatarWithName>
                                            {chatUsers.find(e => e.id == selectedChatId).username}
                                            <div className={chatUsers.find(e => e.id == selectedChatId).avaliable ? 'green__badge' : 'orange__badge'}></div>
                                        </Col>

                                    }
                                </>
                            }
                        </Row>

                    </Header>
                    <Content>
                        {
                            selectedChatId != -1 ?
                                <div className={'messages'} ref={messageRef} onScroll={checkScroll}>
                                    {
                                        messages.map((message, index) => {
                                            if (message.sender_id == selectedChatId || message.receiver_id == selectedChatId) {
                                                var user = chatUsers.find(e => e.id == message.sender_id);
                                                var flag = false;
                                                nextMessage = messages[index + 1];
                                                if (nextMessage != undefined) {
                                                    if (messages[index].sender_id == nextMessage.sender_id) {
                                                        if (moment(messages[index].time).add(5, 'minutes').isAfter(nextMessage.time)) {
                                                            flag = true;
                                                        }
                                                        else {
                                                            flag = false;
                                                        }
                                                    }
                                                    else {
                                                        flag = false;
                                                    }
                                                }
                                                if (message.sender_id == selectedChatId) {
                                                    return (
                                                        <Row >
                                                            {
                                                                !flag ?
                                                                    <AvatarWithName size={'default'} name={user.username}></AvatarWithName>
                                                                    :
                                                                    <div style={{ width: 32 }}></div>
                                                            }
                                                            <div className={'message-box-left'}>
                                                                <div className={'message-box-left'}>
                                                                    <pre>{message.text}</pre>
                                                                    <Text className={'message_time'}><ClockOutline />{moment(message.time).format("h:mm a")}</Text>
                                                                </div>
                                                                {
                                                                    !flag &&
                                                                    <Text className={'user_name'}>{user.username}</Text>
                                                                }
                                                            </div>
                                                        </Row>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <Row style={{ justifyContent: 'flex-end' }}>
                                                            <div className={'message-box-right'}>
                                                                <div>
                                                                    <pre>{message.text}</pre>
                                                                    <Text className={'message_time'}><ClockOutline />{moment(message.time).format("h:mm a")}</Text>
                                                                </div>
                                                                {
                                                                    !flag &&
                                                                    <Text className={'user_name'}>{user.username}</Text>
                                                                }
                                                            </div>
                                                            {
                                                                !flag ?
                                                                    <AvatarWithName size={'default'} name={user.username} style={{ height: flag ? 45 : 0 }}></AvatarWithName>
                                                                    :
                                                                    <div style={{ width: 32 }}></div>
                                                            }
                                                        </Row>
                                                    )
                                                }
                                            }
                                        })
                                    }
                                    <div ref={bottomRef}></div>
                                </div>
                                :
                                <div className={'welcome'}>
                                    <Title level={2}>Welcome {props.user.username ? props.user.username : props.user.firstname + " " + props.user.lastname}</Title>
                                </div>
                        }
                    </Content>
                    <Footer>
                        {
                            selectedChatId != -1 &&
                            <Row className={'send_message_sector gx-flex-small-row'}>
                                <Col className={'input'}>
                                    <Form form={form}>
                                        <Form.Item name={"message"}>
                                            <TextArea className={'message_input'} placeholder={'Type message.'} autoFocus={true} onKeyDown={(e) => { typeMessage(e) }}></TextArea>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Row gutter={[10, 0]} style={{ width: 'auto', flex: '0 0 auto', display: 'flex' }}>
                                    <Col>
                                        <div className={'additional_feature'}><FileImage /></div>
                                    </Col>
                                    <Col>
                                        <div className={'additional_feature'}><CardAccountDetailsOutline /></div>
                                    </Col>

                                </Row>
                            </Row>
                        }
                    </Footer>
                </Layout>
                <Button className={'scroll-down-button'} type={'primary'} shape={'circle'} style={{ display: showScroll ? 'block' : 'none' }} onClick={handleScroll}><ChevronDown /></Button>
            </Row>
        </div>
    )
}

const mapStateToProps = (({ auth }) => {
    const { user } = auth;
    return { user };
})
export default connect(mapStateToProps, {})(Chat);
