import CartStore from './CartStore';
import OrderStore from './OrderStore';

/*
* 根Store
* @class RootState
* CartStore 为购物车页面的数据
* OrderStore 为订单列表页的数据
* */

const RootState = { CartStore, OrderStore }
export default RootState;
