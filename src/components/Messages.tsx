import React from 'react'
import ChatBody from './chat/chatBody/ChatBody';
import Nav from './chat/nav/Nav';

const Messages = () => {
  return (
    <div className="__main">
      <Nav />
      <ChatBody />
    </div>
  );
}

export default Messages