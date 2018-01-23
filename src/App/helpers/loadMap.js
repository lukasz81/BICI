import {MAP_ENDPOINT} from './endpoints';

const AddScriptTag = new Promise((resolve, reject) => {
    const ID = 'GoogleMapsScript';
    const script = document.createElement('script');
    script.src = MAP_ENDPOINT;
    script.async = true;
    script.defer = true;
    script.crossorigin = true;
    script.id = ID;
    document.getElementsByTagName('head')[0].appendChild(script);

    if (document.getElementById(ID)) {
        resolve({mapAvailable: true});
    } else {
        reject({mapAvailable: false});
    }
});

export default AddScriptTag;