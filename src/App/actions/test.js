import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './';
import * as types from './actionTypes';
import fetchMock from 'fetch-mock';
import expect from 'expect';

//import findCurrentLocation from '../helpers/currentLocation';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('should create an action to set mapAvailable boolean to true', () => {

        const expectedAction = {
            type: types.LOAD_MAP_SCRIPT,
            mapAvailable: true
        };

        expect(actions.addGoogleMapsScriptToDocument()).toEqual(expectedAction);

    });


    it('creates RECEIVE_INITIAL_GEOLOCATION when fetching receiveLocation has been done', () => {

        const coords = {lat:10,lng:10};

        const expectedAction = [{
            type: types.RECEIVE_INITIAL_GEOLOCATION,
            position: coords
        }];

        const store = mockStore();

        const getCurrentPosition = (callback) => {
            callback({ coords })
        };

        return store.dispatch(actions.receiveLocation({ getCurrentPosition })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });

    })

    it('creates REJECT_INITIAL_GEOLOCATION when fetching receiveLocation has been failed', () => {

        const expectedAction = [{
            type: types.REJECT_INITIAL_GEOLOCATION,
            position: null,
            rejection: 'error'
        }];

        const store = mockStore();

        const getCurrentPositionWithRejection = (callback, errorCallback) => {
            errorCallback()
        };

        return store.dispatch(actions.receiveLocation({ getCurrentPositionWithRejection })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });

    })

});
