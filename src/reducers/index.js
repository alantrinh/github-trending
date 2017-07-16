import { combineReducers } from 'redux';
import TrendingReducer from './reducer_trending';

const rootReducer = combineReducers({
    trending: TrendingReducer
});

export default rootReducer;
