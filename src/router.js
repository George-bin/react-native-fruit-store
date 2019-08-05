import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {
  Image,
  Text
} from 'react-native';
import TabBarItem from './common/TabBarItem';
import HomeScreen from './pages/Home/index.js';
import CategoryScreen from './pages/Category/index.js';
import CartScreen from './pages/Cart/index.js';
import MineScreen from './pages/Mine/index.js';
import ItemDetailScreen from './pages/ItemDetail/index.js';
import OrderScreen from './pages/Order';
import { routeOptMap } from './router-config';

// const AppNavigator = createStackNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Category: { screen: AboutScreen }
//   },
//   {
//     initialRouteName: 'Home',
//     /* 主屏幕的标题配置现在在这里 */
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: '#f4511e',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }
//   }
// )
// export default createAppContainer(AppNavigator);

const theme = {
  color: '#AB956D',
  background: '#f3f3f3',
  fontColor: '#F7F7F7'
};

const defaultHeaderOpts = {
  headerTitleStyle: {
    flex: 1, // 解决安卓机title不居中
    textAlign: 'center', // 解决安卓机title不居中
    fontSize: 15,
    color: theme.fontColor
  },
  headerStyle: {
    height: 38,
    backgroundColor: theme.color
  }
};

const HeaderBackImage = () => (
  <Image
    style={{ marginLeft: 2, width: 25, height: 25 }}
    source={require('./assets/img/back.png')}
  />
);



const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Category: CategoryScreen,
  Cart: CartScreen,
  Mine: MineScreen
}, {
  // 首次加载默认路由
  // initialRouteName: 'Category',
  // 定义屏幕的默认导航选项
  defaultNavigationOptions: ({navigation}) => {
    const { routeName } = navigation.state;
    // debugger
    return {
      // 设置选项卡中的标题
      tabBarLabel: routeOptMap[routeName].tabBarLabel,
      tabBarIcon: ({focused, tintColor}) => {
        return <TabBarItem
          tintColor={tintColor}
          focused={focused}
          selectedImage={routeOptMap[routeName].selectedImage}
          normalImage={routeOptMap[routeName].normalImage}
        />
      }
    }
  },
  tabBarOptions: {
    activeTintColor: theme.color,
    inactiveTintColor: 'gray',
    // 定义tab选项卡中的字体样式
    labelStyle: {
      fontSize: 12
    }
  }
})
// header相关配置需要在这里写
TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  console.log('routeName:', routeName)
  return {
    ...defaultHeaderOpts,
    title: routeOptMap[routeName].headerTitle
  };
};

const AppNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
    ItemDetail: ItemDetailScreen,
    OrderScreen: OrderScreen
  },
  {
    initialRouteName: 'Tab',
    // 定义渲染和转换的样式
    mode: 'card',
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return {
        ...defaultHeaderOpts,
        // 是否支持手势关闭屏幕
        gesturesEnabled: true,
        headerBackTitle: null,
        headerTitle: routeOptMap[routeName] && routeOptMap[routeName].headerTitle,
        headerBackImage: HeaderBackImage
      }
    },
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      console.log('routeName:', routeName)
      return {
        ...defaultHeaderOpts,
        title: routeOptMap[routeName].headerTitle
      };
    }
  }
)

export default createAppContainer(AppNavigator);
