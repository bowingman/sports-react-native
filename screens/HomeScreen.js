import React, { Component } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import TeamList from '../components/TeamList';

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#cccccc',
    flex: 1
  },
});

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'NFL Teams',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('FavoritePlayers')}
          title='Favorites'
          color='black'
        >
        </Button>
      ),
    }
  };

  render() {
    return (
      <View style={styles.bg}>
        <TeamList nav={this.props.navigation} />
      </View>
    );
  }
}
