import findCurrentLocation from '../helpers/currentLocation';
import AddScriptTag from "../helpers/loadMap";

import {
    RECEIVE_INITIAL_GEOLOCATION,
    REJECT_INITIAL_GEOLOCATION,
    LOAD_MAP_SCRIPT
} from './actionTypes';

export const receiveLocation = (geolocation) => dispatch => {
    return findCurrentLocation(geolocation).then(
        position => dispatch({
                type: RECEIVE_INITIAL_GEOLOCATION,
                position: position.coords
        }),
        () => dispatch({
                type: REJECT_INITIAL_GEOLOCATION,
                position: null,
                rejection: 'user rejection'
        }))
        .catch(error => console.log(error))
};

export const addGoogleMapsScriptToDocument = (dispatch) => {
    return AddScriptTag.then(
        () => dispatch({
            type: LOAD_MAP_SCRIPT,
            mapAvailable: true
        }),
        () => dispatch({
            type: LOAD_MAP_SCRIPT,
            mapAvailable: false
        }))
        .catch(error => console.log(error))
};
