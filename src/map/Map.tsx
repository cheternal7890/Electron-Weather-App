import { Popup, Marker, TileLayer, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  lon?: number;
  lat?: number;
  name?: string;
}

export default function Map({ lon, lat, name }: MapProps) {
  return (
    <MapContainer center={[lat || 0, lon || 0]} zoom={2} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {lon != null && lat != null && (
        <Marker position={[lat, lon]}>
          <Popup>
            {name}
            </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
