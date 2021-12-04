import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

interface Props {
  vehicles: any[];
}

const Map = ({ vehicles }: Props): JSX.Element => {
  return (
    <MapContainer
      center={[51.260197, 4.402771]} // Antwerp
      zoom={13}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehicles.map((v) => (
        <Marker
          position={[v.locationLatitude, v.locationLongitude]}
          key={v.uuid}
        >
          <Popup>
            {v.model.type} {v.model.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
