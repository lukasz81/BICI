import { combineReducers } from 'redux';
import {
    RECEIVE_INITIAL_GEOLOCATION,
    REJECT_INITIAL_GEOLOCATION,
    LOAD_MAP_SCRIPT
} from '../actions/actionTypes';

const initialState = {
    position: null,
    error: null
};

function currentLocation(state=initialState,action) {
    switch(action.type) {
        case RECEIVE_INITIAL_GEOLOCATION :
            return {
                ...state,
                position: {lat: action.position.latitude, lng: action.position.longitude}
            };
        case REJECT_INITIAL_GEOLOCATION :
            return {
                ...state,
                position: action.position,
                error: action.error
            };
        default:
            return state
    }
}

function googleMaps(state={mapAvailable:null},action) {
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