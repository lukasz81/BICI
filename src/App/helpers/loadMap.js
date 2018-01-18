import {MAP_ENDPOINT} from './endpoints';

const addScriptTag = {
    add() {
        const script = document.createElement('script');
        script.src = MAP_ENDPOINT;
        script.async = true;
        script.defer = true;
        script.crossorigin = true;
        script.id = 'GoogleMapsScript';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
};

export default addScriptTag;