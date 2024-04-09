import React from "react";
import GoogleMapReact from "google-map-react";

const GoogleMap = ({ center, zoom, points }) => {
  const GOOGLE_KEY = "AIzaSyBbNWNfAkWMVouvys68l0BjJ96rFWJVYMM";
  const Marker = () => (
    <div style={{ color: "red", fontSize: "20px" }}>
      <img
        src="https://maps.google.com/mapfiles/kml/paddle/red-circle.png"
        alt="marker"
      />
    </div>
  );

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {points.map((point, index) => (
          <Marker key={index} lat={point.lat} lng={point.lng} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
