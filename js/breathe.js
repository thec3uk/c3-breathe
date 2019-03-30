c3centre = {
  lat: 52.200594,
  lng: 0.156914,
  desc: "The C3 Centre <br> Coldhams Lane <br> Cambridge, CB1 3HR",
  autoOpen: true
};

var mapStyles = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
]

function renderMap(location) {
  var location = location || c3centre;
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
    var mapElement = document.getElementById("map");

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    addMarker(
      map,
      location.lat,
      location.lng,
      location.desc,
      location.autoOpen
    );
  } catch (error) {
    console.error(error);
    console.log("google not defined, no maps today!");
  }
}

function inithome() {
  renderMap({
    lat: 52.2034883,
    lng: 0.1222677,
    desc:
      "Cambridge Corn Exchange <br> 2 Wheeler Street <br> Cambridge, CB2 3QB",
    autoOpen: true
  });
}

function init2018() {
  renderMap(c3centre);
}

function init2020() {
  renderMap({
    lat: 52.2034883,
    lng: 0.1222677,
    desc:
      "Cambridge Corn Exchange <br> 2 Wheeler Street <br> Cambridge, CB2 3QB",
    autoOpen: true
  });
}

function init2019() {
  renderMap(c3centre);
}

function initother_events() {
  renderMap(c3centre);
}
