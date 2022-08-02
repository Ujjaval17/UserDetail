import {configureStore} from '@reduxjs/toolkit';
import showUserSlice from './showUserSlice';

const store = configureStore({
    reducer : {
    showUser : showUserSlice
    }
});

export default store;