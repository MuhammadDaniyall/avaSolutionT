import React from 'react';
import { Badge, Typography } from 'antd';
// component
import AvatarWithName from '../../components/Common/AvatarWithName';
// import {  } from 'antd';

const { Text } = Typography;

const ChatUserListItem = (props) => {
  return (
    <div className={'gx-d-flex gx-align-items-center gx-justify-content-between chat-list'}>
      <div className={'gx-d-flex gx-align-items-center'}>
        <div className={'gx-d-block'}>
          <Badge className={'avatar__badge'} color={props.data.avaliable ? '#44d060' : '#ffb100'} dot>
            <AvatarWithName name={props.data.username} size={'large'} />
          </Badge>
        </div>
        <div className={'gx-d-block gx-ml-2'}>
          <Text>{props.data.username}</Text>
        </div>
      </div>
      <div>{props.data.username}</div>
    </div>
  );
};

export default ChatUserListItem;
