// import React from 'react';
// import ConnectedApp, {Map} from './Map';
// import Adapter from 'enzyme-adapter-react-16';
// import {configure,mount,shallow} from 'enzyme';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import {Provider} from 'react-redux';
// configure({adapter: new Adapter()});
//
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
//
// function setup() {
//
//     const successInitialState = {
//         currentLocation: {
//             position: {lat: 10, lng: 10},
//             rejection: null
//         },
//         googleMaps: {
//             mapAvailable: true
//         }
//     };
//
//     const rejectInitialState = {
//         currentLocation: {
//             position: null,
//             rejection: 'user rejection'
//         },
//         googleMaps: {
//             mapAvailable: null
//         }
//     };
//
//     const store = mockStore(successInitialState);
//     const app = <Provider store={store}><ConnectedApp/></Provider>;
//     const Spy = jest.spyOn(App.prototype, 'updateLocation');
//     const mountWrapper = mount(app);
//     return {
//         mountWrapper,
//         successInitialState,
//         rejectInitialState,
//         Spy,
//         store
//     }
// }