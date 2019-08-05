import React, { Component } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Header from './Header';
import Order from './Order';

const RefreshCon = (
  <RefreshControl
    refreshing={false}
    tintColor="#000000"
    title="loading"
    colors={['#000000']}
    progressBackgroundColor="#ffffff"
    enabled
  />
);

export default class MineScreen extends Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={RefreshCon}>
        <Header />
        <Order navigation={this.props.navigation} style={styles.order} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  order: {
    marginTop: 10
  }
});
