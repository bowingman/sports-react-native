import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FavoriteButton from './FavoriteButton';

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 5,
  },
  icon: {
    paddingTop: 7,
    paddingRight: 15,
  },
  iconPlacement: {
    marginLeft: 'auto',
  },
  image: {
    height: 50,
    width: 50,
  },
  name: {
    fontSize: 18,
    marginTop: 16,
    marginLeft: 10,
  },
});

export default class PlayerRow extends Component {
  constructor(props) {
    super(props);
    if (this.props.showFavoriteIcon) {
      this.state = {
        showFavoriteIcon: this.props.showFavoriteIcon,
      }
      return;
    }
    // By default, don't show the favorite icon
    this.state = {
      showFavoriteIcon: false,
    }
  }

  render() {
    return (
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={{uri: this.props.logoURL}}
          />
          <Text style={styles.name}>{this.props.name}</Text>
          <FavoriteButton
            active={this.props.iconActive}
            placementStyle={styles.iconPlacement}
            iconStyle={styles.icon}
            onFavorite={this.props.onFavorite}
          />
        </View>
    );
  }
}

PlayerRow.propTypes = {
  name: PropTypes.string,
  logoURL: PropTypes.string,
  onFavorite: PropTypes.func,
};
