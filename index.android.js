'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

export default class PhotoGalleryProject extends Component{
  render(){
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );  
  }
}

AppRegistry.registerComponent('PhotoGalleryProject', () => PhotoGalleryProject);
