import React, {Component} from 'react';
import {connect} from "react-redux";
import addScriptTag from "../helpers/loadMap";
import {addGoogleMapsScriptToDocument} from "../actions";
import {styles} from "../helpers/mapStyles";


export class Map extends Component {

    componentDidMount() {
        addScriptTag.add();
    }

    initMap() {
        if (window.google) {
            let map = new window.google.maps.Map(document.getElementById('mapContainer'), {
                disableDefaultUI: false,
                center: this.props.center,
                zoom: 16,
                styles: styles
            });
        }
    };

    render() {
        const {isLocationKnown} = this.props;
        {isLocationKnown && this.initMap()}
        return (
            <div>
                {!isLocationKnown && <p className={'loading'}>Loading data ...</p>}
                <div id={'mapContainer'} className="Map"> </div>
            </div>
        )

    }

}

export const dispatchOutsideOfConnect = store => {
    store.dispatch(addGoogleMapsScriptToDocument());
};

const mapStateToProps = state => {
    return {
        state,
        mapOk: state.googleMaps.mapAvailable,
        isLocationKnown: state.currentLocation.position !== null,
        center: state.currentLocation.position
    };
};

export default connect(mapStateToProps,null)(Map);
