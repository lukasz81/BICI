import React, {Component} from 'react';
import {connect} from "react-redux";
import addScriptTag from "../helpers/loadMap";
import {addGoogleMapsScriptToDocument} from "../actions";
import {styles} from "../helpers/mapStyles";


class Map extends Component {

    componentDidMount() {
        addScriptTag();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.center && newProps.mapOk) {
            this.initMap(newProps.center)
        }
    }

    initMap = (center) => {
        let map = new window.google.maps.Map(document.getElementById('mapContainer'), {
            disableDefaultUI: false,
            center: center,
            zoom: 16,
            styles: styles
        });
    };

    render() {
        const {center,error} = this.props;
        return (
            <div>
                {!center && error !== 1 && <p>Loading data ...</p>}
                <div id={'mapContainer'} className="Map"> </div>
            </div>
            )

    }

}

export let dispatchOutsideOfConnect = function(store) {
    store.dispatch(addGoogleMapsScriptToDocument());
};

function mapStateToProps (state) {
    console.log('STATE =>', state.googleMaps);
    return {
        mapOk: state.googleMaps.mapAvailable,
        center: state.currentLocation.position,
        error: state.currentLocation.error
    };
}

export default connect(mapStateToProps,null)(Map);
