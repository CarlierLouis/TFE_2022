import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 50.694356732800614,
  lng: 5.038149998040227  
};

class MapGH extends Component {
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

export default MapGH;