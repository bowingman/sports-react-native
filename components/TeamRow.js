import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';

// TODO: Proptypes

export default class TeamRow extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <View style={{ flexDirection:"row" }}>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: this.props.logoURL}}
            />
            <Text style={{marginTop: 18, marginLeft: 10}}>{this.props.name}</Text>
            {/* <AntDesign name="right" size={25}></AntDesign> */}
        </View>
    );
  }
}
