import ReactDOM from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware,compose} from 'redux';
import App from './App/App';
import {Provider} from 'react-redux';
import {rootReducer} from './App/reducers';
import registerServiceWorker from './registerServiceWorker';
import {dispatchOutsideOfConnect} from './App/components/Map';
import './index.css';

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk,logger)));

window.loadMap = function() {
    dispatchOutsideOfConnect(store);
};

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
