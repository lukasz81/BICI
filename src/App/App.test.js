import React from 'react';
import ConnectedApp, {App} from './App';
import Adapter from 'enzyme-adapter-react-16';
import {configure,mount,shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//import fetchMock from 'fetch-mock';
import {Provider} from 'react-redux';
configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setup() {

    const initialState = {
        currentLocation: {
            position: {lat: 10, lng: 10}
        },
        googleMaps: {
            mapAvailable: true
        }
    };

    const store = mockStore(initialState);
    const enzymeWrapper = mount(<Provider store={store}><ConnectedApp/></Provider>);

    return {
        enzymeWrapper
    }
}

describe('App rendering',()=> {

    const { enzymeWrapper } = setup();

    it('render the connected() component', () => {
        console.log('enzymeWrapper',enzymeWrapper.props());
        expect(enzymeWrapper.length).toEqual(1)
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