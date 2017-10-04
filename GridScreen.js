'use strict';

import React, { Component, } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PhotoGrid from './PhotoGrid';
import store from './store';
import { fetchPhotos, selectPhoto } from './actions'

class GridScreen extends Component {
   
  componentDidMount() {
    this.props.fetchData(this.props.currentPage);    
  }      
  
  render() {
    if (this.props.photos.length===0) {
      return this.renderLoadingView();
    }
    return(
      <PhotoGrid
        data = { this.props.photos }
        itemsPerRow = { 4 }
        itemMargin = { 1 }
        renderItem = { this.renderItem.bind(this) }
        onEndReached={ this.props.onEndReached }
      />      
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading photos...
        </Text>
      </View>
    );
  }
 
  renderItem(item, itemSize) {
    return(      
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => 
          this.props.selectPhotoDispatch(item)        
        }>
        <Image
          resizeMode = "cover"
          style = {{ flex: 6 }}
          source = {{ uri: item.image_url }}
        />
        <Text style={{flex: 1, fontSize : 10 }}> {item.name} </Text>
        <Text style={{flex: 1, fontSize : 10 }}> by {item.user.username} </Text>
      </TouchableOpacity>      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },  
});

const mapStateToProps = (store) => {
  return {
    currentPage: store.photoReducer.page,
    maxPage: store.photoReducer.maxPage,
    photos: store.photoReducer.photos
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEndReached: () => {
      if (store.getState().photoReducer.page === store.getState().photoReducer.maxPage) {
        return;
      }
      dispatch(fetchPhotos(store.getState().photoReducer.page))
    },
    fetchData: (page) => {
      dispatch(fetchPhotos(page))
    },    
    selectPhotoDispatch: (photo) => {
        dispatch(selectPhoto(photo))
    }
  }
}

GridScreen.navigationOptions = {
  title: 'Grid of photos',
};

export default connect(mapStateToProps, mapDispatchToProps)(GridScreen);