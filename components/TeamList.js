import React, { Component } from 'react';
import TeamRow from './TeamRow'
import { ActivityIndicator, FlatList, ScrollView, View, TouchableOpacity } from 'react-native';

export default class TeamList extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=NFL')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.teams,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  onPress = (team) => {
    this.props.nav.navigate('Details', {
      id: team.idTeam,
      name: team.strTeam,
      logo: team.strTeamBadge,
      manager: team.strManager,
      stadiumName: team.strStadium,
    });
  }

  render() {
    if (this.state.isLoading) {
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
            <TouchableOpacity onPress={this.onPress.bind(this, item)}>
              <TeamRow logoURL={item.strTeamBadge} name={item.strTeam}></TeamRow>
            </TouchableOpacity>
            )
          }
          keyExtractor={({idTeam}, index) => idTeam}
        />
      </ScrollView>
    );
  }
}
