'use strict';

const initialState = {
  photos: []
}

const photoReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'LOAD_PHOTOS_SUCCESS':
    return Object.assign({}, state, { photos: action.photos });
  }
  return state;
};

export default photoReducer;