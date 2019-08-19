import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

// TODO: Proptypes

export default class TeamRow extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <View style={{ paddingLeft: 5, flexDirection:"row" }}>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: this.props.logoURL}}
            />
            <Text style={{marginTop: 18, marginLeft: 10}}>{this.props.name}</Text>
        </View>
    );
  }
}
