'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import photoReducer from '../photoReducer';
import thunkMiddleware from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const store = createStore(
	photoReducer,
	compose(
		applyMiddleware(thunkMiddleware),
		autoRehydrate()
	)
);

persistStore(store, {storage: AsyncStorage});

export default store;