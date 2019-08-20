import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class WelcomeScreen extends Component {

  componentDidMount() {
    AsyncStorage.getItem('favoriteTeam', (err, result) => {
      if (result !== null) {
        const team = JSON.parse(result);
        // A favorite team was found in storage, so:
          // Clear this initial loading screen from the navigation stack
          // Add Home to stack (to allow going back)
          // Add Details page to stack
        const resetAndGoToFavoriteTeam = StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Home'}),
            NavigationActions.navigate({
              routeName: 'Details', 
              params: {
                id: team.id,
                name: team.name,
                logo: team.logo,
                manager: team.manager,
                stadiumName: team.stadium,
              }
            }),
          ],
        });
        this.props.navigation.dispatch(resetAndGoToFavoriteTeam);
      } else { // No favorite team found
        const resetAndGoHomeAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        this.props.navigation.dispatch(resetAndGoHomeAction);
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
      </View>
    );
  }
}
