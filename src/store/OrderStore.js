import { observable } from 'mobx';

// 订单store
class CartStore {
  @observable allDatas = [];

  constructor(rootStore) {
    this.rootState = rootStore
  }
}

export default new CartStore();
