import React from 'react';
import MessageList from './MessageList/MessageList';
import MessageSender from './MessageSender/MessageSender';
import Timer from './Timer/Timer';


export default class MessageApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: props.initialItems, text: props.initialText};
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let nextItems = this.state.items.concat([this.state.text]);
    let nextText = '';
    this.setState({items: nextItems, text: nextText});
  }

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
MessageApp.propTypes = { 
  initialItems: React.PropTypes.array,
  initialText: React.PropTypes.string 
};

MessageApp.defaultProps = { 
  initialItems: [],
  initialText: '' 
};
