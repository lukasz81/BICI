const findCurrentLocation = geolocation => new Promise((resolve,reject) => {
    const options = {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000};
    geolocation.getCurrentPosition(
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