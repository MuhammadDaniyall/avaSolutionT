/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';

import ChatUsersView from './ChatUsersView';
import CommunicationView from './CommunicationView';
import { getUsers, getConversationData, addChatData, receiveMessage, readMessage } from 'appRedux/actions/Chat';
//
import Wechat from '@2fd/ant-design-icons/lib/Wechat';

const users = [
  {
    id: 1,
    name: 'Alex Dolgove',
    thumb: 'https://via.placeholder.com/150x150',
    status: 'away',
    mood: 'English versions from the 1914 translation by H. Rackham',
    lastMessage: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    unreadMessage: '',
    lastMessageTime: '20 min ago',
    recent: true,
  },
];

const Chat = (props) => {
  // console.log(props.user.id)
  const [loader, setLoader] = useState(false);
  const [drawerState, setDrawerState] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [searchChatUser, setSearchChatUser] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chatUsers, setChatUsers] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [scrolling, setScrolling] = useState(null);


  useEffect(() => {
    if (props.socket) {
      props.socket.off('message');
      props.socket.on('message', async (data) => {
        console.log(data.sender_id, selectedSectionId);
        if (data.sender_id !== selectedSectionId && selectedSectionId) {
          await props.readMessage(data);
          setScrolling(true);
        } else {
          await props.receiveMessage(data);
          setScrolling(false);
        }
        getChatUsers();
      });
      props.socket.on('newUserLogin', async () => {
        await props.getUsers(props.user.id);
      });
      props.socket.on('userDisconnect', async () => {
        await props.getUsers(props.user.id);
      });
    }
  }, [props.socket, selectedSectionId]);

  useEffect(() => {
    getChatUsers();
  }, []);

  const getChatUsers = async () => {
    await props.getUsers(props.user.id);
  };

  useEffect(() => {
    if (props.chatUsers.length) setChatUsers(props.chatUsers);
  }, [props.chatUsers]);

  useEffect(() => {
    const res = props.conversationList.filter((data) => data.id == selectedSectionId);
    if (res.length) {
      setConversation(res[0].conversationData);
    }
  }, [props.conversationList, selectedSectionId]);

  const filterUsers = (userName) => {
    if (userName === '') {
      return users.filter((user) => user.recent);
    }
    return users.filter((user) => user.name.toLowerCase().indexOf(userName.toLowerCase()) > -1);
  };

  const onSelectUser = async (user) => {
    setLoader(true);
    console.log(user)
    
    setSelectedUser(user);
console.log(user.user_id)
    await props.getConversationData(user.id,user.user_id);
    await props.getUsers(props.user.id);
    setSelectedSectionId(user.id);
    setDrawerState(drawerState);
    setScrolling(false);
    setLoader(false);
  };

  const _handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && e.keyCode != 13) {
      e.preventDefault();
      if (e.target.value.trim() != '') {
        submitComment();
      }
    } else {
      setMessage(e.target.value);
    }
  };
  const submitComment = async () => {
    await props.addChatData({ text: message, receiver_id: selectedUser.id,sender_id:props.user.id });
    await props.getUsers(props.user.id);
    setScrolling(true);
    setMessage('');
  };

  const updateMessageValue = (evt) => {
    setMessage(evt.target.value);
  };

  const updateSearchChatUser = (evt) => {
    setSearchChatUser(evt.target.value);
    setChatUsers(filterUsers(evt.target.value));
  };

  const onToggleDrawer = () => {
    setDrawerState(!drawerState);
  };
  console.log(selectedUser)
  return (
    <div className="gx-main-content">
      <div className="gx-app-module gx-chat-module">
        <div className="gx-chat-module-box">
          <div className="gx-d-block gx-d-lg-none">
            <Drawer placement="left" closable={false} visible={drawerState} onClose={onToggleDrawer}>
              <ChatUsersView
                authUser={props.user}
                chatUsers={chatUsers}
                searchChatUser={searchChatUser}
                selectedSectionId={selectedSectionId}
                onSelectUser={onSelectUser}
                updateSearchChatUser={updateSearchChatUser}
              />
            </Drawer>
          </div>
          <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
            <ChatUsersView
              authUser={props.user}
              chatUsers={chatUsers}
              searchChatUser={searchChatUser}
              selectedSectionId={selectedSectionId}
              onSelectUser={onSelectUser}
              updateSearchChatUser={updateSearchChatUser}
            />
          </div>
          {loader ? (
            <div className="gx-loader-view">
              <Wechat style={{ fontSize: 100, color: 'rgb(0 0 0 / 8%)' }} />
            </div>
          ) : (
            <CommunicationView
              user={props.user}
              message={message}
              conversation={conversation}
              selectedUser={selectedUser}
              submitComment={submitComment}
              onToggleDrawer={onToggleDrawer}
              updateMessageValue={updateMessageValue}
              _handleKeyPress={_handleKeyPress}
              isScrollDown={scrolling}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ commonData, auth, chat }) => {
  const { socket } = commonData,
    { user } = auth,
    { chatUsers, conversationList } = chat;
  return { socket, user, chatUsers, conversationList };
};
export default connect(mapStateToProps, { getUsers, getConversationData, addChatData, receiveMessage, readMessage })(
  Chat,
);
