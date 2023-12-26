import {persistReducer} from 'redux-persist';
import {persistConfig} from './persistConfig';
import {combineReducers} from '@reduxjs/toolkit';
import userSlicer from '../utils/userSlicer';

const reducer = combineReducers({
  user: userSlicer,
});

export const customPersistReducer = reducer;