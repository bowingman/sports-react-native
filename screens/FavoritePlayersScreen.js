import React, { Component } from 'react';
import { AsyncStorage, ScrollView, FlatList, View, Text } from 'react-native';
import PlayerRow from '../components/PlayerRow';

export default class FavoritePlayersScreen extends Component {
  static navigationOptions = {
    title: 'Favorite Players',
  };

  constructor(props) {
    super(props);
    this.state = { 
      players: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('favoritePlayers', (err, result) => {
      if (result !== null) {
        const players = JSON.parse(result);
        this.setState({ isLoadingFavorites: false, players });
      }
    });
  }

  render() {
    const isLoading = this.state.isLoadingFavorites;
    if (isLoading) {
      return <Loading />;
    }
    if (this.state.players.length < 1) {
      return <View><Text>No Favorited Players Found</Text></View>
    }
    return (
      <ScrollView>
        <FlatList
          data={this.state.players}
          renderItem={({item}) => (
            <PlayerRow
              disabled
              player={item}
              logoURL={item.strThumb}
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
