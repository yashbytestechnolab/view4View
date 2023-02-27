import { PostReducer } from './../postReducer/postReducer';
// import { UserReducer } from '../userReducer/UserReducer';
import { UserReducer } from './../userReducer/UserReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    postReducer: PostReducer,
    userReducer: UserReducer
});
