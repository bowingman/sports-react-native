import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import TeamList from './components/TeamList.js';

export default class App extends Component {

  render() {
    return (
      <View style={{backgroundColor: '#CCCCCC', flex: 1, paddingTop:20}}>
        <TeamList />
      </View>
    );
  }
}
