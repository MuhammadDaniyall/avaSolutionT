import React from 'react';

import Conversation from 'components/Chat/Conversation';
import CustomScrollbars from 'util/CustomScrollbars';
//icons
import { Avatar } from 'antd';
import { baseURL } from '../../util/Api';
import Send from '@2fd/ant-design-icons/lib/Send';
import Wechat from '@2fd/ant-design-icons/lib/Wechat';

const CommunicationView = (props) => {
  console.log(props.selectedUser )
  return (
    <div className="gx-chat-box">
      {props.selectedUser === null ? (
        <div className="gx-comment-box">
          <div className="gx-fs-80">
            <i className="icon icon-chat gx-text-muted" />
          </div>
          <Wechat style={{ fontSize: 100, color: 'rgb(0 0 0 / 8%)' }} />
          <h1 className="gx-text-muted">Select User to start Chat</h1>
        </div>
      ) : (
        <div className={'gx-chat-main'}>
          <div className={'gx-chat-main-header'}>
            <span className={'gx-d-block gx-d-lg-none gx-chat-btn'}>
              <i className={'gx-icon-btn icon icon-chat'} onClick={props.onToggleDrawer} />
            </span>
            <div className={'gx-chat-main-header-info'}>
              <div className={'gx-chat-avatar gx-mr-2'}>
                <div className={'gx-status-pos'}>
                  {props.selectedUser.avatarUrl ? (
                    <Avatar src={`${baseURL}auth/avatar/${props.selectedUser.id}`} className={'gx-size-60'}></Avatar>
                  ) : (
                    <Avatar src={`https://via.placeholder.com/150x150`} className={'gx-size-60'}></Avatar>
                  )}
                  <span className={`gx-status ${props.selectedUser.avaliable ? 'gx-online' : 'gx-away'}`} />
                </div>
              </div>

              <div className={'gx-chat-contact-name'}>{props.selectedUser.name}</div>
            </div>
          </div>
          <CustomScrollbars className={'gx-chat-list-scroll'}>
            <Conversation
              conversationData={props.conversation}
              selectedUser={props.selectedUser}
              user={props.user}
              isScrollDown={props.isScrollDown}
            />
          </CustomScrollbars>

          <div className={'gx-chat-main-footer'}>
            <div className={'gx-flex-row gx-align-items-center'} style={{ maxHeight: 51 }}>
              <div className={'gx-col'}>
                <div className={'gx-form-group'}>
                  <textarea
                    id="required"
                    className="gx-border-0 ant-input gx-chat-textarea"
                    onKeyPress={props._handleKeyPress}
                    onChange={props.updateMessageValue}
                    value={props.message}
                    placeholder="Type message"
                  />
                </div>
              </div>
              <Send className={'gx-icon-btn'} style={{ fontSize: 20 }} onClick={props.submitComment}></Send>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationView;
