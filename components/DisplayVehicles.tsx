import { FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import { LatLngBounds, latLngBounds } from "leaflet"

interface Props {
  filteredVehicles: ServerVehicle[]
}
const DisplayVehicles = ({ filteredVehicles }: Props) => (
  <>
    Vehicle amount: {filteredVehicles.length}
    {filteredVehicles.map(vehicle => {
      return (
        <div key={vehicle.uuid}>
          <ul>
            <li>UUID: {vehicle.uuid}</li>
            <li>Name: {vehicle.name}</li>
            <li>Type: {vehicle.model.type}</li>
            <li>Status: {vehicle.status}</li>
          </ul>
        </div>
      )
    })}
  </>
);

export default DisplayVehicles;
