import React from 'react';
import ConnectedApp, {App} from './App';
import Adapter from 'enzyme-adapter-react-16';
import {configure,mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setup() {

    const successInitialState = {
        currentLocation: {
            position: {lat: 10, lng: 10},
            rejection: null
        },
        googleMaps: {
            mapAvailable: true
        }
    };

    const rejectInitialState = {
        currentLocation: {
            position: null,
            rejection: 'user rejection'
        },
        googleMaps: {
            mapAvailable: null
        }
    };

    const store = mockStore(successInitialState);
    const app = <Provider store={store}><ConnectedApp/></Provider>;
    const Spy = jest.spyOn(App.prototype, 'updateLocation');
    const mountWrapper = mount(app);
    return {
        mountWrapper,
        successInitialState,
        rejectInitialState,
        Spy,
        store
    }
}

describe('Test if statement rendering',() => {

    it('Should render "Map" component if receives location', () => {

        const {successInitialState} = setup();
        const store = mockStore(successInitialState);
        const app = <Provider store={store}><ConnectedApp/></Provider>;
        const mountWrapper = mount(app);
        expect(mountWrapper.find('.reject').length).toEqual(0);
        expect(mountWrapper.find('.Map').length).toEqual(1);

    });

    it('Should render "reject" message if user rejects location detection', () => {

        const {rejectInitialState} = setup();
        const store = mockStore(rejectInitialState);
        const app = <Provider store={store}><ConnectedApp/></Provider>;
        const mountWrapper = mount(app);
        expect(mountWrapper.find('.reject').length).toEqual(1);
        expect(mountWrapper.find('.Map').length).toEqual(0);

    });

});

describe('App initial state',() => {

    const { mountWrapper, successInitialState, Spy,} = setup();

    it('render the connected() component', () => {
        expect(mountWrapper).toBeTruthy()
    });

    it('check that props match the initialState in App', () => {
        const AppProps = mountWrapper.find(App).props();
        expect(AppProps.state).toEqual(successInitialState);

    });

    it('componentDidMount calls receiveLocation', () => {
        const instance = mountWrapper.find(App).instance();
        instance.componentDidMount();
        expect(Spy).toHaveBeenCalled();
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