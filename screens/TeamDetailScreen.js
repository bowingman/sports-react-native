import React, { Component } from 'react';
import { Alert, AsyncStorage, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import TeamRow from '../components/TeamRow';
import CountdownTimer from '../components/CountdownTimer';
import PlayerList from '../components/PlayerList';

// Calculate the ms until the next game on a given day and time strings
const msUntilNextGame = (day, time) => {
  const future = Date.parse(`${day} ${time} EST`); // (Hardcoding in timezone of EST)
  return future - new Date();
}

// Cleanup API response to be a more JS-friendly date format for Date.parse()
// 2019-08-22 => 22 Aug 2019
const jsFriendlyDate = (dateStr) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [ year, month, day ] = dateStr.split('-');
  return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    const stadium = nav.getParam('stadium', 'No stadium found');
    this.state = { 
      isLoadingNextGame: true,
      isLoadingFavorite: true,
      id,
      name,
      logo,
      manager,
      stadium,
      isFavorite: false,
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', 0);

    // Check if this team is favorited to fill star
    AsyncStorage.getItem('favoriteTeam', (err, result) => {
      if (result !== null) {
        this.setState({ isLoadingFavorite: false, isFavorite: JSON.parse(result).id === id });
      } else {
        this.setState({ isLoadingFavorite: false, isFavorite: false });
      }
    });

    // Pull data of next game
    return fetch(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${id}`)
      .then((response) => response.json())
      .then((responseJson) => {

      this.setState({
        isLoadingNextGame: false,
        gameData: responseJson.events[0],
      }, function(){
      });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  onFavorite = () => {
    const { id, name, logo, manager, stadium, isFavorite } = this.state;
    const favorite = { id, name, logo, manager, stadium };

    // If this team is not the active favorite, make it the favorite
    if (!isFavorite) { 
      Alert.alert('Team Favorited', `You have set the ${name} as your favorite team`);
      AsyncStorage.setItem('favoriteTeam', JSON.stringify(favorite));
    } else { // Otherwise, remove it as the favorite
      Alert.alert('Team Unfavorited', `The ${name} is no longer your favorite team`);
      AsyncStorage.removeItem('favoriteTeam');
    }
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
    const { id, gameData, name, logo, manager, stadium, isFavorite } = this.state;
    const isHome = gameData.idHomeTeam === id;
    const location = isHome ? 'Home' : 'Away';
    const opponentName = isHome ? gameData.strAwayTeam : gameData.strHomeTeam;
    const dateStr = gameData.dateEvent;
    const jsDate = jsFriendlyDate(dateStr);
    const time = gameData.strTime;
    return (
        <View style={styles.container}>
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
            <Text style={styles.name}>{stadium}</Text>

            <Text style={styles.heading}>Next Game</Text>
            <Text style={styles.name}>{location} vs the {opponentName}</Text>
            <Text style={styles.name}>{dateStr}</Text>
            <Text style={styles.heading}>Game Time Countdown</Text>

            <CountdownTimer textStyle={styles.name} time={msUntilNextGame(jsDate, time)}></CountdownTimer>
            <View
              style={{
                paddingTop: 5,
                borderBottomColor: '#cccccc',
                borderBottomWidth: 1,
              }}
            />
            {/* <Text style={styles.heading}>Roster</Text> */}
            <PlayerList
              teamId={id}
              onFavorite={() => {}}
            >
            </PlayerList>
        </View>
    );
  }
}

