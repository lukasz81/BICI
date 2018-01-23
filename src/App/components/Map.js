import React, {Component} from 'react';
import {connect} from "react-redux";
import {addGoogleMapsScriptToDocument, receiveLocationGM} from "../actions";
import {styles} from "../helpers/mapStyles";


export class Map extends Component {

    componentDidMount() {
        this.props.addGoogleMapsScript();
        //this.props.receiveLocationGM();
    }

    initMap() {
        if (window.google) {
            (() => {
                new window.google.maps.Map(document.getElementById('mapContainer'), {
                    disableDefaultUI: false,
                    center: this.props.center,
                    zoom: 16,
                    styles: styles
                })
            })();
        }
    };

    render() {
        const {isLocationKnown,mapOk} = this.props;
        if (isLocationKnown && mapOk) this.initMap();
        return (
            <div>
                {(!isLocationKnown || !mapOk) && <p className={'loading'}>Loading data ...</p>}
                <div id={'mapContainer'} className="Map" />
            </div>
        )

    }

}

const mapDispatchToProps = dispatch => ({
    addGoogleMapsScript: () => dispatch(addGoogleMapsScriptToDocument)
});

const mapStateToProps = state => {
    return {
        state,
        mapOk: state.googleMaps.mapAvailable,
        isLocationKnown: state.currentLocation.position !== null,
        center: state.currentLocation.position
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Map);
