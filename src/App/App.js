import React, {Component} from 'react';
import {connect} from "react-redux";
import Map from './components/Map';
import {receiveLocation} from './actions';
import './App.css';

export class App extends Component {

    componentDidMount() {
        this.props.receiveLocation();
    }

    render() {
        return (
            <div className="App">
                <Map/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        state,
        center: state.currentLocation.position
    };
}

const mapDispatchToProps = dispatch => ({
    receiveLocation: () => dispatch(receiveLocation(navigator.geolocation))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
