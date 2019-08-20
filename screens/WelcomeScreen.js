import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class WelcomeScreen extends Component {


  componentDidMount() {
    /* TODO: Move this to DetailScreen */
    const favorite = {
      idTeam: 134946,
      strTeam: 'Cardinals',
      strTeamBadge: 'https://www.thesportsdb.com/images/media/team/badge/xvuwtw1420646838.png',
      strManager: 'Kliff Kingsbury',
      strStadium: 'State Farm Stadium',
    };
    AsyncStorage.setItem('favoriteTeam', JSON.stringify(favorite)); 
    /* */

    AsyncStorage.getItem('favoriteTeam', (err, result) => {
      if (result !== null) {
        const team = JSON.parse(result);
        const resetAndGoToFavoriteTeam = StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Home'}),
            NavigationActions.navigate({
              routeName: 'Details', 
              params: {
                id: team.idTeam,
                name: team.strTeam,
                logo: team.strTeamBadge,
                manager: team.strManager,
                stadiumName: team.strStadium,
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
