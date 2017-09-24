'use strict';

import React, { Component, } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import PhotoGrid from './PhotoGrid';

var CONSUMER_KEY = 'wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF';
var API_URL = 'https://api.500px.com/v1/photos';
var PAGE_SIZE = 40;
var FEATURE = 'popular';
var PARAMS = '?feature=' + FEATURE + '&consumer_key=' + CONSUMER_KEY + '&rpp=' + PAGE_SIZE;
PARAMS += '&image_size=3';
var REQUEST_URL = API_URL + PARAMS;

var resultsCache = {
  data: []
};

export default class GridScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isLoading: false,
      isLoadingTail: false,
      currentPage: 0,
      maxPage: 1,
      //currentPhoto: {},
    };       
  }  
  
  componentDidMount() {
    this.fetchData();    
  }
  
  urlForPage() {
    return (
      REQUEST_URL + '&page=' + this.state.currentPage
    );
  }
  
  fetchData(){
    this.setState({
      isLoading: true,
      currentPage: this.state.currentPage + 1,
    });
    fetch(this.urlForPage())    
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        this.setState({
          isLoading: false,
        });
      })
      .then((responseData) => {
        var photos = responseData.photos.slice();
        for (var i in photos) {
          resultsCache.data.push(photos[i]);          
        }
        this.setState({
          ds: this.state.ds.cloneWithRows(resultsCache.data),
          isLoading: false,
          maxPage: responseData.total_pages,          
        });
      })
      .done();      
  }
  
  onEndReached() {
    if (this.state.currentPage === this.state.maxPage) {
      return;
    }
    this.setState({
      currentPage: this.state.currentPage + 1,
      isLoadingTail: true,
    });
    fetch(this.urlForPage())
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        this.setState({
          isLoadingTail: false,
        });
      })
      .then((responseData) => {
        var photos = responseData.photos.slice();
        for (var i in photos) {
          resultsCache.data.push(photos[i]);
        }
        this.setState({
          ds: this.state.ds.cloneWithRows(resultsCache.data),
          isLoadingTail: false,
        });
      })
      .done();
  }
  
  selectPhoto(photo) {
    this.props.navigator.push({
      title: photo.name,
      name: 'photo',
      photo: photo,
    });
  }
  
  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }
    return(
      <PhotoGrid
        data = { resultsCache.data }
        itemsPerRow = { 4 }
        itemMargin = { 1 }
        renderItem = { this.renderItem.bind(this) }
        onEndReached={ this.onEndReached.bind(this) }
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
          this.selectPhoto(item)        
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