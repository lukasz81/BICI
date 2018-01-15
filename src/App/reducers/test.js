import * as types from '../actions/actionTypes';
import {currentLocation,googleMaps} from './index';

describe('Testing reducers initial state', () => {

    describe('currentLocation reducer initial state', () => {
        it('should return the initial state', () => {
            expect(currentLocation(undefined, {})).toEqual(
                {
                    error: null,
                    position: null
                }
            )
        });
    });

    describe('googleMaps reducer initial state', () => {
        it('should return the initial state', () => {
            expect(googleMaps(undefined, {})).toEqual(
                {
                    mapAvailable: null
                }
            )
        });
    });

});

describe('Testing handling reducers', () => {

    const coords = {lat:10,lng:10};

    it('shoule handle currentLocation RECEIVE_INITIAL_GEOLOCATION', () => {
        expect(currentLocation([], {
            type: types.RECEIVE_INITIAL_GEOLOCATION,
            position: {latitude:10,longitude:10}
        })).toEqual({
            position: coords
        })

    });

    it('shoule handle currentLocation REJECT_INITIAL_GEOLOCATION', () => {
        expect(currentLocation([], {
            type: types.REJECT_INITIAL_GEOLOCATION,
            position: null,
            rejection: 'error'
        })).toEqual({
            position: null,
            rejection: 'error'
        })

    });

    it('shoule handle googleMaps LOAD_MAP_SCRIPT', () => {
        expect(googleMaps([], {
            type: types.LOAD_MAP_SCRIPT,
            mapAvailable: true
        })).toEqual({
            mapAvailable: true
        })

    });

});