const findCurrentLocation = geolocation => new Promise((resolve,reject) => {
    console.log('geolocation =>', geolocation);
    const options = {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000};
    geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        options
    );
});
export default findCurrentLocation;