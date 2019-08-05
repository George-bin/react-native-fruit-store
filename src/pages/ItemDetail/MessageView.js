import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import theme from '../../common/theme';

class List extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>{this.props.message}</Text>
      </View>
    )
  }
}

export default class MessageView extends Component {
  render() {
    return (
      <ScrollableTabView
        style={{ flex: 1, height: 300 }}
        tabBarBackgroundColor="white"
        tabBarActiveTextColor={theme.color}
        tabBarTextStyle={{ fontSize: 14, marginTop: 13 }}
        tabBarUnderlineStyle={{ backgroundColor: theme.color }}
        initialPage={0}>
        {['商品详情', '产品参数', '售后保障'].map(v => (
          <List tabLabel={v} message={v} key={v} />
        ))}
      </ScrollableTabView>
    )
  }
}

