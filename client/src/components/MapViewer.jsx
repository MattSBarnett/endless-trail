import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//Restrict to the UK
const MAP_BOUNDS = [
  [49.5, -8.0],
  [61.0, 2.0],
];

const campsiteMarker = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;background:#16a34a;border-radius:50%;border:2px solid white;"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 20],
});

function FitBounds({ path }) {
  const map = useMap()
  useEffect(() => {
    if (path && path.length > 0) {
      map.fitBounds(L.latLngBounds(path), { padding: [40, 40] })
    }
  }, [path, map])
  return null
}

function MapViewer({ path, campsites = [] }) {
  /*
    MapContainer variables:
    minZoom 6 - allows you to zoom out until you see all of the UK
    maxBoundsViscosity 1.0 - stops users going outsdie the max bounds*/
  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <MapContainer
        center={path[0]}
        maxBoundsViscosity={1.0}
        zoom={13}
        minZoom={6}
        maxBounds={MAP_BOUNDS}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
      >
        <FitBounds path={path} />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <Polyline positions={path} color="#16a34a" />
        {campsites.map((campsite, i) => (
          <Marker
            key={i}
            position={[campsite.location.latitude, campsite.location.longitude]}
            icon={campsiteMarker}
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapViewer;
