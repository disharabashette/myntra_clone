
import React, { Component } from 'react';
import { View} from 'native-base';
import Gallery from 'react-native-image-gallery';
import { Actions } from 'react-native-router-flux';

import {Icon} from 'react-native-elements';
import Text from '../component/Text';

export default class ImageGallery extends Component {
  constructor(props) {
      super(props);
      this.state = {
        images: []
      };
  }

  componentWillMount() {
    let imgs = [];
    this.props.images.map((img) => {
      imgs.push({source: {uri: img}})
    });
    this.setState({images: imgs});
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Gallery
          initialPage={this.props.position ? this.props.position : 0}
          style={{flex: 1, backgroundColor: 'white'}}
          images={this.state.images}
        />
        <Icon name="close" type='ant-design'  style={styles.icon} onPress={() => Actions.pop()} />
      </View>
    );
  }
}

const styles = {
  icon: {
    color: 'black',
    fontSize: 46,
    position: 'absolute',
    top: 15,
    left: 15,
    width: 40,
    height: 40
  }
};
