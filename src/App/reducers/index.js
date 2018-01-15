import { combineReducers } from 'redux';
import {
    RECEIVE_INITIAL_GEOLOCATION,
    LOAD_MAP_SCRIPT
} from '../actions/actionTypes';

function currentLocation(state={},action) {
    switch(action.type) {
        case RECEIVE_INITIAL_GEOLOCATION :
            return {
                ...state,
                position: {lat: action.position.latitude, lng: action.position.longitude}
            };
        default:
            return state
    }
}

function googleMaps(state={},action) {
    switch(action.type) {
        case LOAD_MAP_SCRIPT :
            return {
                ...state,
                mapAvailable: action.mapAvailable
            };
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    currentLocation,
    googleMaps
});