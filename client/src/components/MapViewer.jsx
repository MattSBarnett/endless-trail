import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapViewer({ path }) {
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
      </MapContainer>
    </div>
  );
}

export default MapViewer;
