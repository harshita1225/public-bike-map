import React from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { useEffect, useState } from "react";
import Markerinfo from "./Markerinfo";

export default function MyMap(props) {
  const [center, setCenter] = useState([50.879, 4.6997]);
  const [marker, setMarker] = useState();
  const [showmarker, setShowmarker] = useState(false);
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;

  useEffect(() => {
    function geoData() {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setCenter([position.coords.latitude, position.coords.longitude]);
        },
        function (error) {
          console.log("The Locator was denied. :(");
        }
      );
    }
    geoData();
    // console.log(center);
  }, []);

  // const showcenter = props?.center ? props.center : center;
  //console.log(showcenter);
  return (
    <Map
      height={400}
      center={props.center}
      defaultCenter={center}
      defaultZoom={11}
      width={800}
    >
      {props.foundProviders.map((item, idx) => (
        <Marker
          key={idx}
          width={25}
          anchor={[item.location.latitude, item.location.longitude]}
          color={color}
          onClick={() => {
            setHue(hue + 20);
            setMarker(item);
            setShowmarker(!showmarker);
          }}
        />
      ))}
      {showmarker && <Markerinfo item={marker} />}
      <ZoomControl />
    </Map>
  );
}
