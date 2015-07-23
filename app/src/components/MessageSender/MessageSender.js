import React from 'react';
import Request from '../../utils/Request'

export default class MessageSender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: props.initialTitle, text: props.initialText};
  }


  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }
  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const message = {
      title: this.state.title,
      message: this.state.text
     };
    
    Request.post({
      url: this.props.source,
      contentType: 'application/json',
      data: JSON.stringify(message)
    })
    .then(() => {
      this.setState({title: '', text: ''});
    })
  }

  render() {
    var createItem = function(item) {
      return <li><b>{item.title}</b><span>{item.text}</span></li>;
    };
    return (
      <fieldset>
        <legend>Send a new message</legend>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label for="title">Title</label>
            <input onChange={this.handleTitleChange.bind(this)} value={this.state.title} id="title" className="form-control" />
          </div>
          <div className="form-group">
            <label for="text">Text</label>
            <input onChange={this.handleTextChange.bind(this)} value={this.state.text} id="text" className="form-control" />
          </div>          
          <button type="submit" className="btn btn-primary pull-right">Add</button>
        </form>
      </fieldset>  
    );
  }
};

MessageSender.propTypes = { 
  initialTitle: React.PropTypes.string,
  initialText: React.PropTypes.string
};

MessageSender.defaultProps = {
  initialTitle: '',
  initialText: '' 
};
