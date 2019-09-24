
import React from 'react';
import GoogleMapReact from 'google-map-react';

const SimpleMap = (props: any) => {
    const center = { lat: 57.137301, lng: 65.559365 };
    const zoom = 18;

    return (
        <div className="map" style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAU1Qf0--zjtWjlfJtaNyllnMyge_0qr3E' }}
          defaultCenter={center}
          defaultZoom={zoom}
        ></GoogleMapReact>
      </div>
    );
}

export default SimpleMap;