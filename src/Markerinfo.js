import React from "react";

const markerinfo = ({ item }) => {
  return (
    <>
      <div className="marker-container">
        <p>Cityname: {item?.location.city}</p>
        <p>CountryCode:{item?.location.country}</p>
        <p>Provider:{item?.name}</p>
      </div>
    </>
  );
};

export default markerinfo;
