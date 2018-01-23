import React from 'react';
import ConnectedMap,{Map} from './Map';
import Adapter from 'enzyme-adapter-react-16';
import {configure,mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import AddScriptTag from "../helpers/loadMap";
configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setup(position = {lat: 10, lng: 10}, mapAvailable = true) {

    const initialState = {
        currentLocation: {
            position: position,
            rejection: null,
            isLocationKnown: true
        },
        googleMaps: {
            mapAvailable: mapAvailable
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

describe('Map initial state',() => {

    it('render the connected() component and expect componentDidMount to run and action dispatched', () => {

        const Spy = jest.spyOn(Map.prototype, 'componentDidMount');
        expect(Spy).toHaveBeenCalledTimes(0);

        const { mountWrapper } = setup();
        const store = mountWrapper.find(ConnectedMap).instance().context.store;
        const actions = store.getActions();
        const expectedActions = [{ type: 'LOAD_MAP_SCRIPT', mapAvailable: true }];

        store.subscribe(() => {
            expect(actions.length).toBe(1);
            expect(actions).toEqual(expectedActions);
        });

        expect(mountWrapper.instance()).toBeTruthy();
        expect(Spy).toHaveBeenCalledTimes(1);

        expect.hasAssertions();
        return AddScriptTag.then(outcome => expect(outcome).toEqual({mapAvailable: true}));

    });

    it('check that props match the initialState in App', () => {

        const { mountWrapper, initialState } = setup();
        const AppProps = mountWrapper.find(Map).props();
        expect(AppProps.state).toEqual(initialState);

    });

});

describe('Map "if" statement rendering ',() => {

    it('it should not call initMap method', () => {

        const Spy = jest.spyOn(Map.prototype, 'initMap');
        const { mountWrapper } = setup(true , null);

        expect(mountWrapper).toBeTruthy();
        expect(Spy).toHaveBeenCalledTimes(0);
    });

    it('it renders loading message when position is not given and will not call initMap', () => {

        const Spy = jest.spyOn(Map.prototype, 'initMap');
        const { mountWrapper } = setup(null);

        expect(mountWrapper.find('.loading').length).toEqual(1);
        expect(mountWrapper.find('.Map').length).toEqual(1);
        expect(Spy).toHaveBeenCalledTimes(0);

    });

    it('it will not render loading message when position is given and will call initMap', () => {

        const Spy = jest.spyOn(Map.prototype, 'initMap');
        const { mountWrapper } = setup();

        expect(mountWrapper.find('.loading').length).toEqual(0);
        expect(mountWrapper.find('.Map').length).toEqual(1);
        expect(Spy).toHaveBeenCalledTimes(1);

    });
});