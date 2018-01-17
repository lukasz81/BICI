import React, {Component} from 'react';
import {connect} from "react-redux";
import Map from './components/Map';
import {receiveLocation} from './actions';
import './App.css';

export class App extends Component {

    componentDidMount() {
        this.updateLocation();
    }

    updateLocation() {
        this.props.receiveLocation();
    };

    render() {
        const {rejection} = this.props;
        return (
            <div className="App">
                {rejection === 'user rejection'
                    ? (<p className={'reject'}>Location detection rejected by user ...</p>)
                    : (<Map/>)
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state,
        center: state.currentLocation.position,
        rejection: state.currentLocation.rejection
    };
};

const mapDispatchToProps = dispatch => ({
    receiveLocation: () => dispatch(receiveLocation(navigator.geolocation))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
