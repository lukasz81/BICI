import findCurrentLocation from '../helpers/currentLocation';

import {
    RECEIVE_INITIAL_GEOLOCATION,
    REJECT_INITIAL_GEOLOCATION,
    LOAD_MAP_SCRIPT
} from './actionTypes';



export const receiveLocation = (getCurrentPosition) => dispatch => {
    return findCurrentLocation(getCurrentPosition)
        .then(position => dispatch({
                type: RECEIVE_INITIAL_GEOLOCATION,
                position: position.coords
        }))
        .catch(error => dispatch({
            type: REJECT_INITIAL_GEOLOCATION,
            position: error.code
        }))
};

export function addGoogleMapsScriptToDocument () {
    return {
        type: LOAD_MAP_SCRIPT,
        mapAvailable: true
    }
}
