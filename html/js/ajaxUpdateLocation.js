class UpdateLocation {

    constructor() {
        globalThis.updateLocation = this;
        this.isRunning = false;
        this.update();
        setInterval(function(){updateLocation.update()}, 5000);
    }

    // Only allow one instance at a time
    update() {
        if(!updateLocation.isRunning) {
            updateLocation.isRunning = true;
            navigator.geolocation.getCurrentPosition(updateLocation.sendLocation, updateLocation.error);
        }
    }

    // Send new location
    sendLocation(l) {
        let url = 'ajaxUpdateLocation.php';
        let payload = {latitude:l.coords.latitude,
                        longitude:l.coords.longitude}
        new AJAX(url, ()=>{
            updateLocation.isRunning = false;
        }, payload);
    }

    // Adapted from W3Schools
    error(error) {
        if (document.cookie.includes("location=false")) {
            return;
        }
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for locations access.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
        document.cookie="location=false"
    } 
}