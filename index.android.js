/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  BackAndroid,  
  ToolbarAndroid
} from 'react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components';

var GridScreen = require('./GridScreen');
import PhotoScreen from './PhotoScreen';

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'grid') {
    return (
      <GridScreen navigator={navigationOperations} />
    );
  } else if (route.name === 'photo') {
    return (
      <View style={{flex: 1}}>
        <PhotoScreen
          style={{flex: 1}}
          navigator={navigationOperations}
          photo={route.photo}
        />
      </View>
    );
  }  
};

class PhotoGalleryProject extends Component{
  render() {
    var initialRoute = {name: 'grid'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },  
});

AppRegistry.registerComponent('PhotoGalleryProject', () => PhotoGalleryProject);
