'use strict';

var React = require('react');

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {secondsElapsed: props.initialseconds};
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
};
Timer.propTypes = { 
  initialseconds: React.PropTypes.number
};

Timer.defaultProps = { 
  initialseconds: 0
};
