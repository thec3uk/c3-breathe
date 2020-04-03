import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import { RichText } from "prismic-reactjs"
import isEmpty from 'lodash/isEmpty'

const mapStyles = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#e9e9e9",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#dedede",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#ffffff",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#333333",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#f2f2f2",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#fefefe",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#fefefe",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
]

const getLatLng = (prisicLoc) => (
  {
    lat: prisicLoc.latitude,
    lng: prisicLoc.longitude
  }
)

function MapSlice({ data }) {
  const [markers, setMarkers] = useState({})
  // const [mapRef, setMapRef] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(getLatLng(data.fields[0].location))
  const [center, setCenter] = useState(getLatLng(data.fields[0].location))
  const [zoom, setZoom] = useState(5);
  const [infoOpen, setInfoOpen] = useState(true)

  const loadHandler = map => {
    // Store a reference to the google map instance in state
    // setMapRef(map)
    // Fit map bounds to contain all markers
    fitBounds(map)
  }

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place)

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false)
    }
    setInfoOpen(true)

    // if you want to center the selected Marker
    setCenter(place.location)
  }

  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds()
    data.fields.map((place, idx) => {
      bounds.extend(getLatLng(place.location))
      return idx
    })
    map.fitBounds(bounds)
  }

  const onMarkerLoad = (marker, idx) => {
    return setMarkers(prevState => {
      return { ...prevState, [idx]: marker }
    })
  }

  useEffect(() => {
      setZoom(window.screen.availWidth <= 1024 ? 13 : 15)
  }, [zoom])
  const mapOptions = {
    maxZoom: zoom,
    minZoom: zoom,

    // Disables the default Google Maps UI components
    disableDefaultUI: true,
    scrollwheel: false,
    draggable: false,

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    styles: mapStyles,
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GATSBY_GOOGLE_MAPS_KEY || "AIzaSyB-fjiF76Uh_s7gIZ7-KDfKWPQZWaMZNrk",
  })

  if (loadError) {
    console.error(loadError)
    return <div>Map cannot be loaded right now, sorry.</div>
  }
  return isLoaded && (
    <section className="px-16 -my-16 md:-my-24 lg:-my-24 text-black">
      <GoogleMap
        id="map"
        onLoad={loadHandler}
        mapContainerClassName="w-screen h-104 -mx-16 md:-mx-40 lg:-mx-40"
        zoom={zoom}
        center={center}
        options={mapOptions}
      >
        {data.fields.map(({ location, pin_content }, idx) => {
          const position = {
            lat: location.latitude,
            lng: location.longitude,
          }
          return (
            <div key={idx}>
              <Marker
                position={position}
                onLoad={m => onMarkerLoad(m, idx)}
                onClick={event => markerClickHandler(event, location)}
              >
                {!isEmpty(markers) && infoOpen && selectedPlace && (
                  <InfoWindow
                    anchor={markers[idx]}
                    onCloseClick={() => setInfoOpen(false)}
                    options={{
                      maxWidth: 300,
                    }}
                  >
                    <div className="text-center">
                      {RichText.render(pin_content)}
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            </div>
          )
        })}
      </GoogleMap>
    </section>
  )
}

export const query = graphql`
  fragment mapSlice on PRISMIC_PageBodyMap {
    type
    fields {
      location
      pin_content
    }
  }
`

export default MapSlice
