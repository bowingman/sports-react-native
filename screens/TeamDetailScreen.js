import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class TeamDetailScreen extends Component {

  render() {
    return (
      <View style={{backgroundColor: '#FFFFFF', flex: 1, paddingTop:20}}>
        {/* {this.props.team} */}
        <Text>{this.props.navigation.getParam('team', 'No Team')}</Text>
      </View>
    );
  }
}

