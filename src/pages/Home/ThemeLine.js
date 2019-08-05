import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import theme from '../../common/theme';

export default class ThemeLine extends Component {
  render() {
    return (
      <View style={[styles.lineStyle, this.props.lineStyle]}>
        <Text style={[styles.textStyle, this.props.textStyle]}>{this.props.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  lineStyle: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: theme.color
  }
});
