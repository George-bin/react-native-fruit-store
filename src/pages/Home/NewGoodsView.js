import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { width } from '../../common/screen';
import NewGoodsItem from './NewGoodsItem';

export default class NewGoodsView extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.itemDatas.map((value, index) => (
          <TouchableOpacity key={`goodItem-${index}`} onPress={() => {
            this.props.navigation.navigate('ItemDetail', { value })
          }}>
            <NewGoodsItem
              name={value.name}
              price={value.price}
              image={value.image}
              key={`list-${index}`}/>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
