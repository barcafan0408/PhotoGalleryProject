'use strict';

import React, { Component } from 'react';
import {  
  StyleSheet,  
  View,  
  BackAndroid, 
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

import PhotoScreen from './PhotoScreen';
import GridScreen from './GridScreen';

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

export default class App extends Component{
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
});