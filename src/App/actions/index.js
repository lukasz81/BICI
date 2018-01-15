import findCurrentLocation from '../helpers/currentLocation';

import {
    RECEIVE_INITIAL_GEOLOCATION,
    REJECT_INITIAL_GEOLOCATION,
    LOAD_MAP_SCRIPT
} from './actionTypes';

export const receiveLocation = (geolocation) => dispatch => {
    return findCurrentLocation(geolocation)
        .then(position => dispatch({
                type: RECEIVE_INITIAL_GEOLOCATION,
                position: position.coords
        }), error => dispatch({
                type: REJECT_INITIAL_GEOLOCATION,
                position: null,
                rejection: error.code === 1 ? 'user rejection' : 'error'
            }))
        .catch(error => console.log(error))
};

export function addGoogleMapsScriptToDocument () {
    return {
        type: LOAD_MAP_SCRIPT,
        mapAvailable: true
    }
}
