import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import TeamList from './components/TeamList.js';

export default class App extends Component {

  render() {
    return (
      <ScrollView style={{flex: 1, paddingTop:40}}>
        <TeamList />
      </ScrollView>
    );
  }
}
