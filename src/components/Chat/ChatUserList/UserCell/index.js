import React from 'react';
import moment from 'moment';
import { baseURL } from '../../../../util/Api';
import Avatar from 'antd/lib/avatar/avatar';

const UserCell = ({ chat, selectedSectionId, onSelectUser }) => {
  return (
    <div
      className={`gx-chat-user-item ${selectedSectionId === chat.id ? 'active' : ''}`}
      onClick={() => {
        if (chat.id !== selectedSectionId) onSelectUser(chat);
      }}
    >
      <div className="gx-chat-user-row">
        <div className="gx-chat-avatar">
          <div className="gx-status-pos">
            {chat.avatarUrl ? (
              <Avatar src={`${baseURL}auth/avatar/${chat.id}`} className="gx-size-40"></Avatar>
            ) : (
              <Avatar src={`https://via.placeholder.com/150x150`} className="gx-size-40"></Avatar>
            )}
            <span className={`gx-status gx-small ${chat.avaliable ? 'gx-online' : 'gx-away'}`} />
          </div>
        </div>

        <div className="gx-chat-info">
          <span className="gx-name h4">{chat.name}</span>
          <div className="gx-chat-info-des gx-text-truncate">{chat.lastMessage ? chat.lastMessage + '...' : ''}</div>
          <div className="gx-last-message-time">
            {chat.lastMessageTime ? moment(chat.lastMessageTime).format('YYYY-MM-DD H:mm:ss') : ''}
          </div>
        </div>

        {chat.unreadMessage > 0 ? (
          <div className="gx-chat-date">
            <div className="gx-bg-primary gx-rounded-circle gx-badge gx-text-white">{chat.unreadMessage}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserCell;
