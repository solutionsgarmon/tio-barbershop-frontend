import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function MyComponent({ lat, lng }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBbNWNfAkWMVouvys68l0BjJ96rFWJVYMM",
  });
  const center = { lat: lat, lng: lng }; // Coordenadas de la CDMX

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
      <Marker position={center} title="Ciudad de México" />
    </GoogleMap>
  ) : null;
}

export default React.memo(MyComponent);
