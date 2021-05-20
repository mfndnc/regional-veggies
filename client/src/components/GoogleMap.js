import React, { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '50vh',
};
const libraries = ['places'];

const options = {
  zoomControl: true,
  disableDefaultUi: true,
};

const center = {
  lat: 52.375893,
  lng: 9.73201,
};

let zoommap = 9;

export default function GoogleMapComp(props) {
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEKEY,
    libraries,
  });

  const iniSelected = props.selectedMarker || null;

  const [selected, setSelected] = useState(iniSelected);

  const selectMarker = (marker) => {
    //console.log('GGGGGGGGG', marker, props.selectedMarker);
    props.childtoParent(marker);
    setSelected(marker);
  };

  if (loadError) return <>Error loading maps</>;

  if (!isLoaded) return <>Loading Maps</>;
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoommap}
      options={options}
    >
      {props.markers.map((marker) => {
        if (marker.geo && marker.geo.lat && marker.geo.lng) {
          return (
            <Marker
              key={marker._id}
              position={{ lat: marker.geo.lat, lng: marker.geo.lng }}
              onClick={() => {
                selectMarker(marker);
              }}
            />
          );
        } else {
          return '';
        }
      })}

      {selected ? (
        <InfoWindow
          position={{ lat: selected.geo.lat, lng: selected.geo.lng }}
          onCloseClick={() => {
            selectMarker(null);
          }}
        >
          <div>
            <p>{selected.name}</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}
