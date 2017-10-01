'use strict';

var CONSUMER_KEY = 'wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF';
var API_URL = 'https://api.500px.com/v1/photos';
var PAGE_SIZE = 40;
var FEATURE = 'popular';
var PARAMS = '?feature=' + FEATURE + '&consumer_key=' + CONSUMER_KEY + '&rpp=' + PAGE_SIZE;
PARAMS += '&image_size=3';
var REQUEST_URL = API_URL + PARAMS;

function requestPosts(page) {
  return {
    type: 'REQUEST_LOAD_PHOTOS',
    page
  }
}

function receivePosts(page, json) {  
  return {
    type: 'LOAD_PHOTOS_SUCCESS',
    page,    
    photos : json.photos.slice(),    
    maxPage: json.total_pages
  }
}

export function fetchPhotos(page) {
  return dispatch => {
    dispatch(requestPosts(page))
    return fetch(urlForPage(page))
      .then(response => response.json())
      .then(json => dispatch(receivePosts(page, json)))
  }
}

function urlForPage(currentPage) {
  return (
    REQUEST_URL + '&page=' + currentPage
  );
}
