import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TeamList from '../components/TeamList.js';

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#cccccc',
    flex: 1
  },
});

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'NFL Teams',
  };
  render() {
    return (
      <View style={styles.bg}>
        <TeamList nav={this.props.navigation} />
      </View>
    );
  }
}
