import React, { Component } from 'react';
import { Alert, AsyncStorage, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import TeamRow from '../components/TeamRow';

const styles = StyleSheet.create({
  heading: {
    color: '#777777',
    fontSize: 16,
    paddingLeft: 5,
    paddingTop: 10
  },
  name: {
    fontSize: 18,
    paddingLeft: 10
  },
});

export default class TeamDetailScreen extends Component {
  static navigationOptions = {
    title: 'Team Details',
  };

  constructor(props) {
    super(props);
    const nav = this.props.navigation;
    const id = nav.getParam('id', 0);
    const name = nav.getParam('name', 'No name found');
    const logo = nav.getParam('logo', 'No logo found');
    const manager = nav.getParam('manager', 'No manager found');
    const stadiumName = nav.getParam('stadiumName', 'No stadium found');
    this.state = { 
      isLoadingNextGame: true,
      isLoadingFavorite: true,
      id,
      name,
      logo,
      manager,
      stadiumName,
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', 0);

    // Check if this team is favorited to fill star
    AsyncStorage.getItem('favoriteTeam', (err, result) => {
      if (result !== null) {
        this.setState({ isLoadingFavorite: false, isFavorite: JSON.parse(result).id === id });
      }
    });

    // Pull data of next game
    return fetch(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${id}`)
      .then((response) => response.json())
      .then((responseJson) => {

      this.setState({
        isLoadingNextGame: false,
        data: responseJson.events[0],
      }, function(){
      });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  onFavorite = () => {
    const { id, name, logo, manager, stadiumName } = this.state;
    const favorite = { id, name, logo, manager, stadiumName };
    Alert.alert('Success', `You have set the ${name} as your favorite team`);
    AsyncStorage.setItem('favoriteTeam', JSON.stringify(favorite));
  }

  render() {
    const isLoading = this.state.isLoadingNextGame || this.state.isLoadingFavorite;
    if (isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }
    // TODO: Consider fragment out the static details 
    const { id, data, name, logo, manager, stadiumName, isFavorite } = this.state;
    const isHome = data.idHomeTeam === id;
    const location = isHome ? 'Home' : 'Away';
    const opponentName = isHome ? data.strAwayTeam : data.strHomeTeam;
    const date = new Date(data.dateEvent);
    const dateStr = date.toDateString();

    return (
        <View>
            <TeamRow 
              style={styles.row}
              logoURL={logo}
              name={name} 
              showFavoriteIcon
              iconActive={isFavorite}
              onFavorite={this.onFavorite}>
            </TeamRow>
            
            <Text style={styles.heading}>Manager</Text>
            <Text style={styles.name}>{manager}</Text>

            <Text style={styles.heading}>Stadium</Text>
            <Text style={styles.name}>{stadiumName}</Text>

            <Text style={styles.heading}>Next Game</Text>
            <Text style={styles.name}>{location} vs the {opponentName}</Text>
            <Text style={styles.name}>{dateStr}</Text>
        </View>
    );
  }
}

