import React from 'react';
import ConnectedApp, {App} from './App';
import Adapter from 'enzyme-adapter-react-15';
import {configure,mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {Provider} from 'react-redux';
configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const state = {
    currentLocation: {
        position: {lat: 10, lng: 10}
    }
};
const initialState = {center: state.currentLocation.position};

let store, wrapper;

describe('App component',()=> {

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount( <Provider store={store}><ConnectedApp/></Provider> )
    });

    xit('renders without crashing', () => {
        expect(wrapper.contains(<h2>using React and Redux</h2>)).toBe(true);
    });
});