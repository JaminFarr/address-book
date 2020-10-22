import React from "react";
import PigeonMap from "pigeon-maps";
import Marker from "pigeon-marker";
import { shape, number } from "prop-types";

/**
 * Map - presenter component
 *
 */
const Map = ({ location: { latitude, longitude } }) => (
  <PigeonMap center={[latitude, longitude]} defaultZoom={10} height={320}>
    <Marker anchor={[latitude, longitude]} />
  </PigeonMap>
);

Map.propTypes = {
  location: shape({
    latitude: number.isRequired,
    longitude: number.isRequired
  }).isRequired
};

export default Map;
