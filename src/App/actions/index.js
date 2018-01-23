import findCurrentLocation from '../helpers/currentLocation';
import AddScriptTag from "../helpers/loadMap";
import * as URL from "../helpers/endpoints";
import * as API from "../api";

import {
    RECEIVE_INITIAL_GEOLOCATION,
    REJECT_INITIAL_GEOLOCATION,
    RECEIVE_GM_GEOLOCATION,
    LOAD_MAP_SCRIPT
} from './actionTypes';

export const receiveLocation = (Geolocation) => dispatch => {
    return findCurrentLocation(Geolocation).then(
        position => dispatch({
                type: RECEIVE_INITIAL_GEOLOCATION,
                position: position.coords
        }),
        error => dispatch({
                type: REJECT_INITIAL_GEOLOCATION,
                position: null,
                rejection: 'rejection',
                error: error.code === 1 ? error.message : null
        })
    )
};

export const receiveLocationGM = () => {
    return (dispatch) => {
        API.postActions(URL.GEO_ENDPOINT, {}).then(
            position => dispatch({
                type: RECEIVE_INITIAL_GEOLOCATION,
                position: position.location
            }),
            error => dispatch({
                type: REJECT_INITIAL_GEOLOCATION,
                position: null,
                rejection: error.message
            })
        )
    }
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
