import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

import 'leaflet.markercluster';
import "react-leaflet-markercluster/dist/styles.min.css";

import Zones from '@/components/Zones';
import Markers from '@/components/Markers';

interface Props {
  vehicles: ServerVehicle[];
  zones?: ServerZone[];
  setVehicleUUID: (uuid: string) => void
  modelFilter: string[]
}

const Map = ({ vehicles, zones, setVehicleUUID, modelFilter }: Props): JSX.Element => {

  return (
    <MapContainer
      center={[51.220290, 4.399433]} // Antwerp
      zoom={14}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers vehicles={vehicles} setVehicleUUID={setVehicleUUID} modelFilter={modelFilter} />
      <Zones zones={zones} modelFilter={modelFilter} />
    </MapContainer>
  );
};

export default Map;
