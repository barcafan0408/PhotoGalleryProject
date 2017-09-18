'use strict';

import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

var device_width = Dimensions.get('window').width;
var device_height = Dimensions.get('window').height;

export default class PhotoScreen extends React.Component{
  render() {
    return (
      <View style={styles.contentContainer}>
        <Image
          source={getImageSource(this.props.photo)}
          style={[styles.detailsImage, calculateImgSize(this.props.photo)]}
        />
      </View>
    );
  }
}

function getImageSource(photo) {
  return {uri: photo.image_url};
}
function calculateImgSize(photo) {
  var ratio = photo.width / photo.height;
  var width = device_width;
  var height = width * ratio;
  if (height > device_height) {
    height = device_height;
    width = height / ratio;
  }
  return {};
  return {width, height};
}

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 5,
    overflow: 'hidden',
    backgroundColor: '#eaeaea',
  },
  detailsImage: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
