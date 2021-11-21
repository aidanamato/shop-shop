import { createStore } from 'redux';
import storeReducer from './reducers';

const store = createStore(storeReducer);

export default store;