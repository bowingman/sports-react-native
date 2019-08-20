import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 5,
  },
  image: {
    height: 50,
    width: 50
  },
  name: {
    fontSize: 18,
    marginTop: 16,
    marginLeft: 10,
  },
});

export default class TeamRow extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <View style={styles.row}>
            <Image
              style={styles.image}
              source={{uri: this.props.logoURL}}
            />
            <Text style={styles.name}>{this.props.name}</Text>
        </View>
    );
  }
}

TeamRow.propTypes = {
  name: PropTypes.string,
  logoURL: PropTypes.string,
};
