'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import AppReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const store = createStore(
	AppReducer,
	compose(
		applyMiddleware(thunkMiddleware),
		autoRehydrate()
	)
);

persistStore(store, {storage: AsyncStorage});

export default store;