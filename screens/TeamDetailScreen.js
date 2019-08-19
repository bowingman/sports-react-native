import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import TeamRow from '../components/TeamRow.js';

export default class TeamDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', 0);
    return fetch(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${id}`)
        .then((response) => response.json())
        .then((responseJson) => {

        this.setState({
            isLoading: false,
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
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }
    const data = this.state.dataSource;
    const isHome = data.idHomeTeam === nav.getParam('id');
    const location = isHome ? 'home' : 'away';
    const opponent = isHome ? data.strAwayTeam : data.strHomeTeam;
    return (
        <View style={{backgroundColor: '#CCCCCC', flex: 1}}>
            <TeamRow logoURL={logo} name={name}></TeamRow>
            <Text style={{paddingBottom: 20}}>Manager: {manager}</Text>
            <Text style={{paddingBottom: 20}}>Stadium: {stadiumName}</Text>
            <Text style={{paddingBottom: 20}}>Next game is {location} verses {opponent} on {data.dateEvent}</Text>
        </View>
    );
  }
}

