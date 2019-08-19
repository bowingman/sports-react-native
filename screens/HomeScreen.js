import React, { Component } from 'react';
import { View } from 'react-native';
import TeamList from '../components/TeamList.js';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'NFL Teams',
  };
  render() {
    return (
      <View style={{backgroundColor: '#CCCCCC', flex: 1}}>
        <TeamList nav={this.props.navigation} />
      </View>
    );
  }
}

