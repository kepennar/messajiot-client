import React from 'react';
import Request from '../../utils/Request'

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: props.initialMessages};
  }

  componentDidMount() {
    Request.get({
      url: this.props.source,
      contentType: 'application/json'
    })
    .then((messages) => {
      this.setState({
        messages: messages
      });
    })
  }

  render() {
    var createItem = function(item) {
      return (
        <dl className="dl-horizontal">
          <dt>{item.title}</dt>
          <dd>{item.text}</dd>
        </dl>
      );
    };
    return (
      <message-list>
        <fieldset>
          <legend>Last messages</legend>
          {this.state.messages.map(createItem)}
        </fieldset>
      </message-list>
    );
  }
};

MessageList.propTypes = { 
  initialMessages: React.PropTypes.array
};

MessageList.defaultProps = { 
  initialMessages: []
};
