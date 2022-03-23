import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '300px',
};


class MapGH extends Component {
  render(props) {
    const center =  {
      lat: 50.694356732800614,
      lng: 5.038149998040227  
    };
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyCcvgi-SicUc3IGhIpqj_kr7Aw_r-6pDR4"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: this.props.lat, lng: this.props.lng}}
          zoom={15}
        >
        
        <Marker position={{lat: this.props.lat, lng: this.props.lng}} />
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default MapGH;