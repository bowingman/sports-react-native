import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
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
    this.state = { 
      isLoadingNextGame: true,
      // isLoadingFavorite: true,
      // favoriteTeam: null,
    };
  }
  componentDidMount() {
    const id = this.props.navigation.getParam('id', 0);
    return fetch(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${id}`)
      .then((response) => response.json())
      .then((responseJson) => {

      this.setState({
        isLoadingNextGame: false,
        dataSource: responseJson.events[0],
      }, function(){
      });

      })
      .catch((error) =>{
        console.error(error);
      });
      
  }

  render() {
    const nav = this.props.navigation;
    const name = nav.getParam('name', 'No name found');
    const logo = nav.getParam('logo', 'No logo found');
    const manager = nav.getParam('manager', 'No manager found');
    const stadiumName = nav.getParam('stadiumName', 'No stadium found');
    const isLoading = this.state.isLoadingNextGame;
    if (isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }
    const data = this.state.dataSource;
    const isHome = data.idHomeTeam === nav.getParam('id');
    const location = isHome ? 'Home' : 'Away';
    const opponentName = isHome ? data.strAwayTeam : data.strHomeTeam;
    const date = new Date(data.dateEvent);
    const dateStr = date.toDateString();
    return (
        <View>
            <TeamRow style={styles.row} logoURL={logo} name={name}></TeamRow>
            
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

