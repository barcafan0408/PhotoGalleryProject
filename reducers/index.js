'use strict';

import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../AppNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('Grid');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

const nav = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {    
    case 'SELECT_PHOTO':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Photo' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
};

const initialState = {
	page: 1,
 	maxPage: 0,
 	photos: [],
 	currentPhoto: {},
}

const photoReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_LOAD_PHOTOS':  	
  			return Object.assign({}, { page: action.page + 1, maxPage: state.maxPage, photos: state.photos, currentPhoto: state.currentPhoto });
		case 'LOAD_PHOTOS_SUCCESS':
    		return Object.assign({}, { page: state.page, maxPage: action.maxPage, photos: state.photos.concat(action.photos), currentPhoto: state.currentPhoto });
    case 'SELECT_PHOTO':
  			return Object.assign({}, { page: state.page, maxPage: state.maxPage, photos: state.photos, currentPhoto: action.currentPhoto });	
	}
	return state;
};

const AppReducer = combineReducers({
  nav,
  photoReducer,
});

export default AppReducer;