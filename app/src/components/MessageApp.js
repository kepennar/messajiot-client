import React from 'react';
import MessageList from './MessageList/MessageList';
import MessageSender from './MessageSender/MessageSender';
import Timer from './Timer/Timer';


export default class MessageApp extends React.Component {

  render() {
    return (
      <div>
        <MessageList source="http://localhost:3000/api/messages" />
        <MessageSender source="http://localhost:3000/api/messages" />
        <Timer />
      </div>
    );
  }
}