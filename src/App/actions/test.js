import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './';
import * as types from './actionTypes';
//import fetchMock from 'fetch-mock';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {

    it('should create an action to set mapAvailable boolean to true', () => {

        const expectedAction = [{
            type: types.LOAD_MAP_SCRIPT,
            mapAvailable: true
        }];

        const store = mockStore();

        return store.dispatch(actions.addGoogleMapsScriptToDocument).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });

    });


    it('creates RECEIVE_INITIAL_GEOLOCATION when fetching receiveLocation has been done', () => {

        const coords = {lat:10, lng:10};

        const expectedAction = [{
            type: types.RECEIVE_INITIAL_GEOLOCATION,
            position: coords
        }];

        const store = mockStore();

        const getCurrentPosition = (callback) => {
            callback({coords});
        };

        return store.dispatch(actions.receiveLocation({getCurrentPosition})).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });

    });

    it('creates REJECT_INITIAL_GEOLOCATION when fetching receiveLocation has been failed', () => {

        const expectedAction = [{
            type: types.REJECT_INITIAL_GEOLOCATION,
            position: null,
            rejection: types.REJECTION,
            error: 'User denied Geolocation'
        }];

        const store = mockStore();

        const getCurrentPosition = (callback,errorCallback) => {
            const POSITION_ERROR = {code:1,message: 'User denied Geolocation'};
            errorCallback(POSITION_ERROR);
        };

        return store.dispatch(actions.receiveLocation({getCurrentPosition})).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });

    })

});
