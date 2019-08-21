import React, { Component } from 'react';
import PlayerRow from './PlayerRow'
import { ActivityIndicator, AsyncStorage, FlatList, ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';

export default class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoadingPlayerData: true, isLoadingFavorites: true };
  }

  componentDidMount() {

    // Load favorited players
    AsyncStorage.getItem('favoritedPlayers', (err, result) => {
      if (result !== null) {
        this.setState({ isLoadingFavorites: false, favorites: JSON.parse(result) });
      } else {
        this.setState({ isLoadingFavorites: false, favorites: [] });
      }
    });

    // Load roster data
    return fetch(`https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${this.props.teamId}`)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoadingPlayerData: false,
          dataSource: responseJson.player,
        }, function(){

        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  onPress = (player) => {
    const favorites = this.state.favorites;
    let newFavorites = [];
    if (favorites.length > 0) {
      newFavorites = [ ...favorites]; // Copy favorites array
    }

    // If player is not favorited, favorite it
    const index = favorites.indexOf(player);
    if (index > -1) {
      newFavorites.splice(index, 1);
    } else {
      newFavorites.push(player);
    }

    // Save this to change to persisted storage
    this.setState({ favorites: newFavorites });
    AsyncStorage.setItem('favoritedPlayers', JSON.stringify(newFavorites));
  }

  render() {
    const isLoading = this.state.isLoadingFavorites || this.state.isLoadingPlayerData;
    if (isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <ScrollView>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <PlayerRow
              active={this.state.favorites.includes(item.strPlayer)}
              logoURL={item.strThumb}
              onFavorite={this.props.onFavorite}
              name={item.strPlayer}
              onPress={this.onPress}
              position={item.strPosition}
            >
            </PlayerRow>
          )}
          keyExtractor={({idPlayer}, index) => idPlayer}
        />
      </ScrollView>
    );
  }
}

PlayerList.propTypes = {
  teamId: PropTypes.string,
  onFavorite: PropTypes.func.isRequired,
};