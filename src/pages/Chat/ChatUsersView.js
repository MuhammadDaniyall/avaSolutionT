import React from 'react';

import SearchBox from 'components/SearchBox';
import ChatUserList from 'components/Chat/ChatUserList';
import CustomScrollbars from 'util/CustomScrollbars';
import { baseURL } from '../../util/Api';
import Avatar from 'antd/lib/avatar/avatar';

const ChatUsersView = (props) => {
  // console.log(props.selectedSectionId)
  return (
    <div className="gx-chat-sidenav-main">
      <div className="gx-chat-sidenav-header">
        <div className="gx-chat-user-hd">
          <div className="gx-chat-avatar gx-mr-3">
            <div className="gx-status-pos">
              {props.authUser.avatarUrl ? (
                <Avatar src={`${baseURL}auth/avatar/${props.authUser.id}`} className={'gx-size-60'} />
              ) : (
                <Avatar src={`https://via.placeholder.com/150x150`} className={'gx-size-60'}></Avatar>
              )}
              <span className="gx-status gx-online" />
            </div>
          </div>

          <div className="gx-module-user-info gx-flex-column gx-justify-content-center">
            <div className="gx-module-title">
              <h5 className="gx-mb-0">{props.authUser.username}</h5>
            </div>
            <div className="gx-module-user-detail">
              <span className="gx-text-grey gx-link">{props.authUser.email}</span>
            </div>
          </div>
        </div>
        <div className="gx-chat-search-wrapper">
          <SearchBox
            styleName="gx-chat-search-bar gx-lt-icon-search-bar-lg"
            placeholder="Search or start new chat"
            onChange={props.updateSearchChatUser}
            value={props.searchChatUser}
          />
        </div>
      </div>

      <div className="gx-chat-sidenav-content">
        <CustomScrollbars className="gx-chat-sidenav-scroll-tab-1">
          {props.chatUsers.length === 0 ? (
            <div className="gx-p-5">No user found</div>
          ) : (
            <ChatUserList
              chatUsers={props.chatUsers}
              selectedSectionId={props.selectedSectionId}
              onSelectUser={props.onSelectUser}
            />
          )}
        </CustomScrollbars>
      </div>
    </div>
  );
};

export default ChatUsersView;
