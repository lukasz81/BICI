import React from 'react';
import ConnectedMap,{Map} from './Map';
import Adapter from 'enzyme-adapter-react-16';
import {configure,mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import addScriptTag from "../helpers/loadMap";
configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setup(position = {lat: 10, lng: 10}) {

    const initialState = {
        currentLocation: {
            position: position,
            rejection: null,
            isLocationKnown: true
        },
        googleMaps: {
            mapAvailable: true
        }
    };

    const store = mockStore(initialState);
    const app = <Provider store={store}><ConnectedMap/></Provider>;
    const mountWrapper = mount(app);

    return {
        mountWrapper,
        initialState,
        store
    }
}

describe('App initial state',() => {

    const SpySriptTag = jest.spyOn(addScriptTag, 'add');
    const { mountWrapper, initialState } = setup();

    it('render the connected() component and adds script tag', () => {
        expect(mountWrapper).toBeTruthy();
        expect(SpySriptTag).toHaveBeenCalledTimes(1);
    });

    it('check that props match the initialState in App', () => {
        const AppProps = mountWrapper.find(Map).props();
        expect(AppProps.state).toEqual(initialState);

    });

});

describe('Map "if" statement rendering ',() => {

    it('it renders loading message when isLocationKnown is false and will not call initMap', () => {

        const Spy = jest.spyOn(Map.prototype, 'initMap');
        const { mountWrapper } = setup(null);

        expect(mountWrapper.find('.loading').length).toEqual(1);
        expect(mountWrapper.find('.Map').length).toEqual(1);
        expect(Spy).toHaveBeenCalledTimes(0);

    });

    it('it will not render loading message when isLocationKnown is true and will call initMap', () => {

        const Spy = jest.spyOn(Map.prototype, 'initMap');
        const { mountWrapper } = setup();

        expect(mountWrapper.find('.loading').length).toEqual(0);
        expect(mountWrapper.find('.Map').length).toEqual(1);
        expect(Spy).toHaveBeenCalledTimes(1);

    });
});