import React from 'react';
import UserCell from './UserCell';

const ChatUserList = ({ chatUsers, selectedSectionId, onSelectUser }) => {
  console.log(chatUsers)
  return (
    <div className="gx-chat-user">
      {chatUsers.map((chat, index) => (
        <UserCell key={index} chat={chat} selectedSectionId={selectedSectionId} onSelectUser={onSelectUser} />
      ))}
    </div>
  );
};

export default ChatUserList;
