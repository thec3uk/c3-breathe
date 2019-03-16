c3centre = {
    lat: 52.200594,
    lng: 0.156914,
    desc: 'The C3 Centre <br> Coldhams Lane <br> Cambridge, CB1 3HR',
    autoOpen: true
}

function inithome(location) {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    if (window.screen.availWidth <= 1024) {
        var zoom = 13;
        var autoOpen = false;
    } else {
        var autoOpen = true;
        var zoom = 15;
    }
    try {
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            // zoom: 15,
            zoom: zoom,
            maxZoom: zoom,
            minZoom: zoom,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(location.lat, location.lng),

            // Disables the default Google Maps UI components
            disableDefaultUI: true,
            scrollwheel: false,
            draggable: false,

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: mapStyles

        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using out element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);
        addMarker(map, location.lat, location.lng, location.desc, location.autoOpen)
    } catch (ReferenceError) {
        console.log('google not defined, no maps today!');
    }

}

function init2018() {
    inithome(c3centre);
}

function init2020() {
    inithome({
        lat: 52.2034883,
        lng: 0.1222677,
        desc: 'Cambridge Corn Exchange <br> 2 Wheeler Street <br> Cambridge, CB2 3QB',
        autoOpen: true
    });
}

function init2019() {
    inithome(c3centre);
}

function initother_events() {
    inithome(c3centre);
}
