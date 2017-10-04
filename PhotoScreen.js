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
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import store from './store';

var device_width = Dimensions.get('window').width;
var device_height = Dimensions.get('window').height;

class PhotoScreen extends React.Component{
  render() {
    return (
      <View style={styles.contentContainer}>
        <Image
          source={getImageSource(this.props.currentPhoto)}
          style={[styles.detailsImage, calculateImgSize(this.props.currentPhoto)]}
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

const mapStateToProps = function(store) {
  return { 
    currentPhoto: store.photoReducer.currentPhoto, 
  };
}

PhotoScreen.navigationOptions = {
  title: 'Photo',
};

export default connect(mapStateToProps)(PhotoScreen);