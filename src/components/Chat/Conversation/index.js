import React, { useEffect } from 'react';

import ReceivedMessageCell from './ReceivedMessageCell';
import SentMessageCell from './SentMessageCell';

// eslint-disable-next-line react-hooks/rules-of-hooks
const Conversation = ({ conversationData, selectedUser, user, isScrollDown }) => {
  const bottomRef = React.useRef();
  const scrolling = () => {
    if (isScrollDown === true && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedUser]);
  return (
    <div className="gx-chat-main-content">
      {conversationData?.map((conversation, index) =>
        conversation.sender_id !== selectedUser.id ? (
          <SentMessageCell key={index} conversation={conversation} user={user} />
        ) : (
          <ReceivedMessageCell key={index} conversation={conversation} user={selectedUser} />
        ),
      )}
      <div ref={bottomRef} style={{ height: 0, width: '100%' }}></div>
      {scrolling()}
    </div>
  );
};

export default Conversation;
