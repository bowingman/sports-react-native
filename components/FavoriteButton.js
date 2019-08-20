import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { FontAwesome } from '@expo/vector-icons'

export default class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    if (this.props.active !== null) {
      this.state = ({ active: this.props.active });
      return;
    }
    this.state = ({ active: false });
  }

  onPress = () => {
    this.setState({ active: !this.state.active });
  }

  render() {
    let icon = (
      <FontAwesome 
        style={this.props.iconStyle}
        name='star-o'
        size={42}
        color='#FFDF00'
        onPress={this.onPress.bind(this)}
      />
    );
    if (this.state.active) {
      icon = React.cloneElement(icon, { name: 'star' }); // Update name to be 'star' (filled in star)
    }
    return (
      <View style={this.props.placementStyle}>
        {icon} 
      </View>
    );
  }
}

FavoriteButton.propTypes = {
  active: PropTypes.bool,
  iconStyle: PropTypes.object.isRequired,
};
