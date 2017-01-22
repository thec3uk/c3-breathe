

function inithome() {
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
            center: new google.maps.LatLng(map_center_lat, map_center_lng),

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
        console.log(mapElement);

        // Create the Google Map using out element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);
        addMarker(map, 52.200594, 0.156914, 'The C3 Centre <br> Coldhams Lane <br> Cambridge, CB1 3HR', true)
    } catch (ReferenceError) {
        console.log('google not defined, no maps today!');
    }

}

function init2017() {
    inithome();
}

function initother_events() {
    inithome();
}
