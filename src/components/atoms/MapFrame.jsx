import React from "react";

const MapFrame = () => {
  return (
    <iframe
      width="100%"
      height="500px"
      style={{ border: "0" }}
      Loading="lazy"
      allowfullscreen
      src="https://www.google.com/maps/embed/v1/place?q=place_id:Ek8xMiBkZSBKdWxpbyBkZSAxODU5LCBMZXllcyBkZSBSZWZvcm1hIDNyYSBTZWNjLCBDaXVkYWQgZGUgTcOpeGljbywgQ0RNWCwgTWV4aWNvIi4qLAoUChIJv5sCQrf90YURnp73wfECK6ASFAoSCVtjETew_dGFEQceQyLBrxOH&key=AIzaSyBbNWNfAkWMVouvys68l0BjJ96rFWJVYMM"
    ></iframe>
  );
};

export default MapFrame;
