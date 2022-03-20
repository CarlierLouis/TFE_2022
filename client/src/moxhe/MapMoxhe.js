import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 50.631599000038925,
  lng:  5.081328142211933
};

class MapMoxhe extends Component {
  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyCcvgi-SicUc3IGhIpqj_kr7Aw_r-6pDR4"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
        
        <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default MapMoxhe;