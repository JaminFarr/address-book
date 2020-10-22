import React from "react";
import PigeonMap from "pigeon-maps";
import Marker from "pigeon-marker";
import { shape, number } from "prop-types";

/**
 * Map - presenter component
 *
 */
const Map = ({ location: { latitude, longitude } }) => (
  <PigeonMap
    center={[latitude, longitude]}
    defaultZoom={10}
    height={320}
    zoomSnap={false}
    provider={osmTileProvider}
  >
    <Marker anchor={[latitude, longitude]} />
  </PigeonMap>
);

Map.propTypes = {
  location: shape({
    latitude: number.isRequired,
    longitude: number.isRequired,
  }).isRequired,
};

const osmTileProvider = (x, y, z) => {
  const s = String.fromCharCode(97 + ((x + y + z) % 3));
  return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
};

export default Map;
