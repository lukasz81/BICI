import React from 'react';
import ConnectedApp, {App} from './App';
import Adapter from 'enzyme-adapter-react-16';
import {configure,mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import * as types from './actions/actionTypes';

configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setup(position = {lat: 10, lng: 10}, mapAvailable = true, rejection = null) {

    const initialState = {
        currentLocation: {
            position: position,
            rejection: rejection,
            isLocationKnown: position !== null
        },
        googleMaps: {
            mapAvailable: mapAvailable
        }
    };

    const store = mockStore(initialState);
    const app = <Provider store={store}><ConnectedApp/></Provider>;
    const mountWrapper = mount(app);

    return {
        mountWrapper,
        initialState,
        store
    }
}

describe('Test if statement rendering',() => {

    it('Should render "Map" component if receives location', () => {
        const {mountWrapper} = setup();

        expect(mountWrapper.find('.reject').length).toEqual(0);
        expect(mountWrapper.find('.Map').length).toEqual(1);

    });

    it('Should render "reject" message if user rejects location detection', () => {
        const {mountWrapper} = setup(null,null,types.REJECTION);
        const store = mountWrapper.find(ConnectedApp).instance().context.store;
        const actions = store.getActions();

        expect(mountWrapper.find('.reject').length).toEqual(1);
        expect(mountWrapper.find('.Map').length).toEqual(0);

        const expectedActions = [{
            type: types.REJECT_INITIAL_GEOLOCATION,
            position: null,
            rejection: types.REJECTION,
            error: null
        }];

        store.subscribe(() => {
            expect(actions.length).toBe(1);
            expect(actions).toEqual(expectedActions);
        });

    });

});

describe('App initial state',() => {

    it('render the connected() component', () => {
        const { mountWrapper } = setup();
        expect(mountWrapper).toBeTruthy()
    });

    it('check that props match the initialState in App', () => {
        const { mountWrapper, initialState } = setup();
        const AppProps = mountWrapper.find(App).props();
        expect(AppProps.state).toEqual(initialState);

    });

    it('componentDidMount calls receiveLocation', () => {
        const Spy = jest.spyOn(App.prototype, 'componentDidMount');
        expect(Spy).toHaveBeenCalledTimes(0);
        setup();
        expect(Spy).toHaveBeenCalledTimes(1);
    });

});

describe('App middleware',()=> {

    const create = () => {
        const store = {
            getState: jest.fn(() => ({})),
            dispatch: jest.fn(),
        };
        const next = jest.fn();
        const invoke = (action) => thunk(store)(next)(action);
        return {store, next, invoke}
    };

    it('passes through non-function action', () => {
        const { next, invoke } = create();
        const action = {type: 'TEST'};
        invoke(action);
        expect(next).toHaveBeenCalledWith(action)
    });

    it('calls the function', () => {
        const { invoke } = create();
        const fn = jest.fn();
        invoke(fn);
        expect(fn).toHaveBeenCalled()
    });

    it('passes dispatch and getState', () => {
        const { store, invoke } = create();
        invoke((dispatch, getState) => {
            dispatch('TEST DISPATCH');
            getState();
        });
        expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH');
        expect(store.getState).toHaveBeenCalled()
    });

});