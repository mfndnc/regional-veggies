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

export default function GoogleMapComp(props) {
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEKEY,
    libraries,
  });

  const iniSelected = props.selectedMarker || null;

  const [selected, setSelected] = useState(iniSelected);

  const selectMarker = (marker) => {
    console.log(marker);
    props.doChildtoParent(marker);
    setSelected(marker);
  };

  if (loadError) return <>Error loading maps</>;

  if (!isLoaded) return <>Loading Maps</>;
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={options}
    >
      {props.markers.map((marker) => (
        <Marker
          key={marker._id}
          position={{ lat: marker.geo.lat, lng: marker.geo.lng }}
          onClick={() => {
            setSelected(marker);
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{ lat: selected.geo.lat, lng: selected.geo.lng }}
          onCloseClick={() => {
            selectMarker(null);
          }}
        >
          <div>
            <p>{selected.name}</p>
            <p>{selected.note}</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}
