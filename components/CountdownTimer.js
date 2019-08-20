import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

// const getTimeString = (t) => new Date(t).toISOString();      
const getTimeString = (ms) => {
  if (ms <= 0) {
    return '00:00:00';
  }

  // Get hours from milliseconds
  var hours = ms / (1000 * 60 * 60);
  var flooredHours = Math.floor(hours);
  var hrs = flooredHours > 9 ? flooredHours : '0' + flooredHours;

  // Convert remainder to minutes
  var minutes = (hours - flooredHours) * 60;
  var flooredMinutes = Math.floor(minutes);
  var mins = flooredMinutes > 9 ? flooredMinutes : '0' +  flooredMinutes;

  // Convert remainder to seconds
  var seconds = (minutes - flooredMinutes) * 60;
  var flooredSeconds = Math.floor(seconds);
  var secs = flooredSeconds > 9 ? flooredSeconds : '0' + flooredSeconds;
  return `${hrs}:${mins}:${secs}`;
} 

export default class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    if (this.props.time !== null) {
      this.state = ({ time: this.props.time });
      return;
    }
    this.state = ({ time: 0 });
  }

  tick = (amount) => {
    if (this.state.time >= 0) {
        this.setState({ time: new Date(this.state.time - amount) });
    }
  }

  componentDidMount() {
    const second = 1000;
    this.interval = setInterval(() => this.tick(second), second);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <View>
        <Text style={this.props.textStyle}>{getTimeString(this.state.time)}</Text>
      </View>
    );
  }
}

CountdownTimer.propTypes = {
  time: PropTypes.number,
  textStyle: PropTypes.object,
};
