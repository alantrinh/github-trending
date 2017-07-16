import {FETCH_TRENDING} from '../actions/index';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_TRENDING:
            return [action.payload.data, ...state];
    }
    return state;
}
