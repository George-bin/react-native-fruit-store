import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Router from './router';

// 获取mobx-store实例
import store from './store';

export default class App extends Component {
  render() {
    return (
      <Provider rootStore={store}>
        <Router />
      </Provider>
    )
  }
}
