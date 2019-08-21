import React, { Component } from 'react';
import PlayerRow from './PlayerRow'
import { AsyncStorage, FlatList, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Loading from './Loading';

export default class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoadingPlayerData: true, isLoadingFavorites: true, favorites: [] };
  }

  componentDidMount() {
    // Load favorited players to highlight in list from storage
    AsyncStorage.getItem('favoritePlayers', (err, result) => {
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

  // Handle saving player object to persisted storage
  onEnable = (player) => {
    const newFavs = [...this.state.favorites, player];
    this.setState({ favorites: newFavs });
    AsyncStorage.setItem('favoritePlayers', JSON.stringify(newFavs));
  }

  // Handle removing player object to persisted storage
  onDisable = (player) => {
    const newFavs = [...this.state.favorites].filter(p => p.idPlayer !== player.idPlayer);
    this.setState({ favorites: newFavs });
    AsyncStorage.setItem('favoritePlayers', JSON.stringify(newFavs));
  }

  // Return a bool if player is in favorites list
  playerExistsInFavorites = (player) => {
    return this.state.favorites.some(p => p.idPlayer === player.idPlayer)
  }

  render() {
    const isLoading = this.state.isLoadingFavorites || this.state.isLoadingPlayerData;
    if (isLoading) {
      return <Loading />
    }

    return (
      <ScrollView>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <PlayerRow
              player={item}
              active={this.playerExistsInFavorites(item)}
              logoURL={item.strThumb}
              onFavorite={this.props.onFavorite}
              name={item.strPlayer}
              onEnable={this.onEnable}
              onDisable={this.onDisable}
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