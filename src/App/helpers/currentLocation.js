const findCurrentLocation = (Geolocation) => new Promise((resolve,reject) => {
    const options = {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000};
    Geolocation.getCurrentPosition(
        position => {
            resolve(position)
        },
        error => {
            reject(error)
        },
        options
    );
});
export default findCurrentLocation;