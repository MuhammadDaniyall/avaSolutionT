import React from 'react';
import { Avatar } from 'antd';
import { baseURL } from '../../../../util/Api';
import moment from 'moment';

const ReceivedMessageCell = ({ conversation, user }) => {
  return (
    <div className="gx-chat-item">
      {user.avatarUrl ? (
        <Avatar src={`${baseURL}auth/avatar/${user.id}`} className="gx-size-40 gx-align-self-end"></Avatar>
      ) : (
        <Avatar src={`https://via.placeholder.com/150x150`} className="gx-size-40 gx-align-self-end"></Avatar>
      )}

      <div className="gx-bubble-block">
        <div className="gx-bubble">
          <pre className="gx-message">{conversation.message}</pre>
          <div className="gx-time gx-text-muted gx-text-right gx-mt-2">
            {conversation.created_at ? moment(conversation.created_at).format('YYYY-MM-DD H:mm:ss') : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessageCell;
