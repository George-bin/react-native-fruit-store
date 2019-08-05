import { observable, computed, action } from 'mobx';

// 购物车Store
class CartStore {
  @observable foodList = [];

  // 删
  @action
  delect(name) {
    this.foodList = this.foodList.filter(e => e.name !== name);
  }

  @computed get isAllSelected() {
    const allTrue = this.foodList.every(v => v.isSelected === true);
    if (allTrue) {
      return true;
    }
    return false;
  }

  // 总价格
  @computed get totalMoney() {
    let money = 0;
    this.foodList.filter(e => e.isSelected === true).forEach(e => {
      money += e.price * e.count;
    });
    return money;
  }
}

export default new CartStore();
