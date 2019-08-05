import React, { Component } from 'react';
// import propTypes from 'prop-types';
import { Image } from 'react-native';

const TabBarItem = ({ focused, tintColor, selectedImage, normalImage }) => (
  <Image
    source={focused ? selectedImage : normalImage}
    style={{ tintColor, width: 25, height: 25, alignItems: 'center' }}
  />
);

// export default class TabBarItem extends Component {
//   render() {
//     return (
//       <Image
//         source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
//         style={{tintColor: this.props.tintColor, width: 25, height: 25, alignItems: 'center'}}
//       />
//     )
//   }
// }

// TabBarItem.propTypes = {
//   focused: propTypes.bool.isRequired,
//   tintColor: propTypes.string.isRequired,
//   selectedImage: propTypes.number.isRequired,
//   normalImage: propTypes.number.isRequired
// };

export default TabBarItem;
