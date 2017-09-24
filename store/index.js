'use strict';

import { createStore } from 'redux';
import photoReducer from '../photoReducer';

const store = createStore(photoReducer);

export default store;