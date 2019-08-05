import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  RefreshControl
} from 'react-native';
// toast 组件
import Toast from 'react-native-easy-toast';
import theme from '../../common/theme';
import MessageView from './MessageView';

@inject('rootStore')
@observer
export default class ItemDetailScreen extends Component {
  static navigationOptions = {
    // 解决安卓标题偏右问题
    headerRight: <View />
  }
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      // 设置缩放初始值：1
      bounceValue: new Animated.Value(1)
    }
    // 创建一个ref去存储 DOM元素
    this.toastRef = React.createRef();
  }

  @computed get cartCount() {
    const { rootStore } = this.props;
    const { CartStore } = rootStore;
    const { foodList } = CartStore;
    return foodList.length;
  }

  addNum = () => {
    let { num } = this.state;
    this.setState({
      num: (num += 1)
    });
  };

  reduceNum = () => {
    let { num } = this.state;
    if (num <= 0) return;
    this.setState({
      num: (num -= 1)
    });
  };

  // 跳转到购物车页面
  goCartPage = () => {
    const { navigation } = this.props;
    // 跳转时，传一个params来动态设置购物车的header
    navigation.navigate('Cart');
  };

  addCart = value => {
    const { num, bounceValue } = this.state;
    if (num === 0) {
      this.toastRef.current.show('添加数量不能为0哦~');
      return;
    }
    // 加入购物车页面的列表上
    // 点一次，购物车数据同步刷新
    bounceValue.setValue(1.5);
    // 开始执行动画
    Animated.spring(
      // 可选的基本动画类型: spring, decay, timing
      bounceValue, // 将`bounceValue`值动画化
      {
        toValue: 1, // 将其值以动画的形式改到一个较小值
        friction: 1 // Bouncier spring(反弹度)
      }
    ).start(); // 开始执行动画

    this.updateCartScreen(value);
    this.toastRef.current.show('添加成功^_^请前往购物车页面查看');
    this.setState({
      num: 0
    })
  };

  handleRefresh = value => {
    // console.log(value)
  };

  // 同步更新购物车页面的数据
  updateCartScreen(value) {
    const { num } = this.state;
    const { navigation, rootStore } = this.props;
    const { value: val } = navigation.state.params;
    const { name } = val;
    // 判断购物车页面是否存在同样名字的物品
    const { CartStore } = rootStore;
    const itemData = value;
    // 找出索引
    const index = CartStore.foodList.findIndex(e => e.name === name);
    // 不存在
    if (index === -1) {
      // 增加需要用到的字段
      itemData.count = 0;
      itemData.isSelected = true;
      CartStore.foodList.push(value);
      const { length } = CartStore.foodList;
      CartStore.foodList[length - 1].count += num;
    } else {
      // 增加对应name的count
      CartStore.foodList[index].count += num;
    }
  }

  render() {
    // console.log(this.cartCount())
    const { num, bounceValue } = this.state;
    const { navigation } = this.props;
    const { value } = navigation.state.params;
    const { name, price, image } = value;
    const count = this.cartCount;
    // 设置下拉刷新
    const refreshCon = (
      <RefreshControl
        refreshing={false}
        tintColor="#000000"
        title="loading"
        colors={['#000000']}
        progressBackgroundColor="#ffffff"
        enabled
        onRefresh={this.handleRefresh}
      />
    );
    return (
      <ScrollView style={styles.container} refreshControl={refreshCon}>
        <View style={styles.topWrapper}>
          <View style={styles.imgWrapper}>
            <Image source={image} style={styles.image} />
            {/*<Image source={image} style={styles.image} />*/}
          </View>
          {/*加减商品*/}
          <View style={styles.chooseLine}>
            <View style={styles.chooseNumber}>
              <TouchableOpacity style={styles.operationButton} onPress={this.addNum}>
                <Text style={[styles.buttonText,{ fontSize: 18, marginTop: -4 }]}>+</Text>
              </TouchableOpacity>
              <Text style={styles.number}>数量 {num}</Text>
              <TouchableOpacity style={styles.operationButton} onPress={this.reduceNum}>
                <Text style={[styles.buttonText,{ fontSize: 28, marginTop: -7 }]}>-</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, { paddingLeft: 24, paddingRight: 10 }]}
              onPress={() => this.addCart(value)}>
              <Text style={styles.buttonText}>加入购物车 ☝</Text>
            </TouchableOpacity>
          </View>

          {/*购物车动画*/}
          <Animated.View
            style={[styles.cart2, { transform: [{ scale: bounceValue }] }]}>
            <TouchableOpacity onPress={this.goCartPage}>
              <Image
                source={require('../../assets/img/cart2.png')}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </Animated.View>

          {/* 购物车商品数量为0不出现 */}
          {count === 0 ? null : (
            <View style={styles.circle}>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.fontColor
                }}>
                {count}
              </Text>
            </View>
          )}
          {/*基本信息*/}
          <View style={styles.message}>
            <Text style={{ color: '#494949' }}>有货</Text>
            <Text style={{ fontSize: 18, paddingTop: 5, color: '#494949' }}>{name}</Text>
            <Text style={{ fontSize: 16, paddingTop: 5, paddingBottom: 10, color: '#494949' }}>
              ￥{price}
              /500g
            </Text>
          </View>
        </View>

        {/*商品信息 tab选项卡*/}
        <View style={styles.bottomWrapper}>
          <MessageView />
        </View>

        {/*提示信息*/}
        <Toast
          ref={this.toastRef}
          position="center"
          positionValue={0}
          fadeInDuration={650}
          fadeOutDuration={600}
          opacity={0.8}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
    // backgroundColor: '#ffffff'
    // backgroundColor: '#F5F6F5'
  },
  topWrapper: {
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  bottomWrapper: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ffffff'
  },
  imgWrapper: {
    marginTop: 30,
    alignSelf: 'center'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  chooseLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    marginTop: 60,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: theme.color,
    borderRadius: 40,
  },
  chooseNumber: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  number: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    color: theme.fontColor
  },
  button: {
    paddingLeft: 10,
    paddingRight: 10
  },
  operationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15
  },
  buttonText: {
    fontSize: 16,
    color: theme.fontColor
  },
  cart2: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 20,
    right: 10
  },
  circle: {
    position: 'absolute',
    top: 20,
    right: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.color
  },
  cart1: {
    height: 30,
    width: 30
  },
  message: {
    paddingTop: 20,
    alignItems: 'center'
  }
});
