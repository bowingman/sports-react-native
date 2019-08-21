import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
      </View>
    );
  }
}
