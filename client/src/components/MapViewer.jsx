import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const campsiteMarker = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;background:#16a34a;border-radius:50%;border:2px solid white;"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 20],
});

function MapViewer({ path, campsites = [] }) {
  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <MapContainer
        center={path[0]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
