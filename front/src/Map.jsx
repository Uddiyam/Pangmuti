import React, { useEffect } from "react";

const { kakao } = window;

export default function Map({ latitude, longitude }) {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(latitude, longitude);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);
  return <div id="map" style={{ width: "100%", height: "340px" }}></div>;
}
