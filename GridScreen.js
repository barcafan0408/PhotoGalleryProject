'use strict';

import React, {Component} from 'react';
import {
  ListView,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';

var CONSUMER_KEY = 'wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF';
var API_URL = 'https://api.500px.com/v1/photos';
var PAGE_SIZE = 26;
var FEATURE = 'popular';
var PARAMS = '?feature=' + FEATURE + '&consumer_key=' + CONSUMER_KEY + '&rpp=' + PAGE_SIZE;
PARAMS += '&image_size=3';
var REQUEST_URL = API_URL + PARAMS;

var device_width = Dimensions.get('window').width;
var device_height = Dimensions.get('window').height;
var resultsCache = {
  data: []
};

var GridScreen = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isLoading: false,
      isLoadingTail: false,
      currentScreenWidth: device_width,
      currentScreenHeight: device_height,
      viewHeight: 200,
      currentPage: 0,
      maxPage: 1
    };
  },

  handleRotation: function(event) {
    var layout = event.nativeEvent.layout;
    this.setState({
      currentScreenWidth: layout.width,
      currentScreenHeight: layout.height,
    });
  },

  componentDidMount: function() {
    this.fetchData();
  },

  _urlForPage: function() {
    return (
      REQUEST_URL + '&page=' + this.state.currentPage
    );
  },

  fetchData: function() {
    this.setState({
      isLoading: true,
      currentPage: this.state.currentPage + 1,
    });
    fetch(this._urlForPage())
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
          dataSource: this.state.dataSource.cloneWithRows(resultsCache.data),
          isLoading: false,
          maxPage: responseData.total_pages,
        });
      })
      .done();
  },

  onEndReached: function() {
    if (this.state.currentPage === this.state.maxPage) {
      return;
    }

    this.setState({
      currentPage: this.state.currentPage + 1,
      isLoadingTail: true,
    });

    fetch(this._urlForPage())
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
          dataSource: this.state.dataSource.cloneWithRows(resultsCache.data),
          isLoadingTail: false,
        });
      })
      .done();
  },

  selectPhoto: function(photo) {
    this.props.navigator.push({
      title: photo.name,
      name: 'photo',
      photo: photo,
    });
  },

  renderFooter: function() {
    if (!this.state.isLoadingTail) {
      return <View style={styles.scrollSpinner} />;
    }

    return (
      <View  style={{alignItems: 'center'}}>
        <ProgressBarAndroid styleAttr="Large"/>
      </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading photos...
        </Text>
      </View>
    );
  },

  renderPhoto: function(photo) {
    return (
      <TouchableHighlight onPress={() => this.selectPhoto(photo)}>
        <View
          style={[styles.container, this.calculateViewSize()]}
        >          
          <Text style={styles.text}> name: {"\n"} {photo.name} </Text>          
          <Text style={styles.text}>creator: {photo.user.username}</Text>
          <Image
            source={{uri: photo.image_url}}
            style={[styles.image, this.calculateImgSize(photo)]}
          />          
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        onLayout={this.handleRotation}//TODO not work
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
        renderRow={this.renderPhoto}
        onEndReached={this.onEndReached}
        style={styles.listView}
        contentContainerStyle={styles.containerView}
      />
    );
  },

  calculateViewSize: function() {
    return {
      width: this.state.currentScreenWidth / 2 - 10,
      height: this.state.viewHeight,
    };
  },

  calculateImgSize: function(photo) {
    var ratio = photo.width / photo.height;
    var width = this.state.currentScreenWidth / 2;
    var height = width * ratio;
    if (height < this.state.viewHeight) {
      height = this.state.viewHeight;
      width = height / ratio;
    }
    return {width, height};
  },
});

var styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    marginRight: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  text: {    
    //lines: 1,    
  },
  image: {
  },
  containerView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
    // paddingBottom: 5,
  },
  listView: {
    paddingTop: 5,
    paddingBottom: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = GridScreen;