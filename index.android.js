'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import AppWithNavigationState from './AppNavigator';

export default class PhotoGalleryProject extends Component{
  render(){
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );  
  }
}

AppRegistry.registerComponent('PhotoGalleryProject', () => PhotoGalleryProject);
