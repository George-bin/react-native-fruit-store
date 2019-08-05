import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { width } from '../../common/screen';

export default class NewGoodsItem extends Component {
  render() {
    return (
      <View style={styles.item}>
        <Image source={this.props.image} style={styles.image}></Image>
        <Text style={{ marginTop: 5, color: '#494949' }}>{this.props.name}</Text>
        <Text style={{ fontSize: 12, color: '#494949' }}>￥ {this.props.price}/500g</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    width: (width - 40) / 2,
    height: 150,
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    backgroundColor: '#f5f6f5',
    borderRadius: 20
  },
  image: {
    width: 100,
    height: 100
  }
});
