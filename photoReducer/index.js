'use strict';

const initialState = {
	page: 1,
 	maxPage: 0,
 	photos: []
}

const photoReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_LOAD_PHOTOS':  	
  			return Object.assign({}, { page: action.page + 1, maxPage: state.maxPage, photos: state.photos });
		case 'LOAD_PHOTOS_SUCCESS':
    		return Object.assign({}, { page: state.page, maxPage: action.maxPage, photos: state.photos.concat(action.photos) });
	}
	return state;
};

export default photoReducer;