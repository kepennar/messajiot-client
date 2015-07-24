import React from 'react';
import Request from '../../utils/Request'
import HandlersManager from '../../utils/HandlersManager'

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: props.initialMessages};
    this.handlersManager = HandlersManager.create('MessageList');

    this.handlersManager.addHandlers('messages:added', (name, data) => {
      this.setState({
        messages: this.state.messages.concat([data])
      });
    });
    this.handlersManager.addHandlers('messages:deleted', (name, data) => {
      this.setState({
        messages: []
      });
    });
  }

  componentDidMount() {
    // Initial datas
    Request.get({
      url: this.props.source,
      contentType: 'application/json'
    })
    .then((messages) => {
      this.setState({
        messages: messages
      });
    });
    // Call handlers on SSE messages
    var es = new EventSource('/sse');
    es.onmessage = (e) => {
      let {event, data} = JSON.parse(e.data);
      this.handlersManager.handle(event, data);
    };
  }

  render() {
    var createItem = function(item) {
      return (
        <dl className="dl-horizontal" key={item._id}>
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
