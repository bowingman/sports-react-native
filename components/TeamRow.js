import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
// TODO: Proptypes

export default class TeamRow extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: this.props.logoURL}}
          />
          <Text>{this.props.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
});
