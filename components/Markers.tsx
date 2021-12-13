import L from "leaflet";

import { Marker, Popup } from "react-leaflet";
import styles from "../styles/map.module.css"
import 'leaflet.markercluster';
//@ts-ignore
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Vehicle from '@/components/Vehicle';
import { useStore } from 'store';


interface Props {
  vehicles: ServerVehicle[]
}
const carIcon = new L.Icon({
  iconSize: new L.Point(30, 30),
  iconUrl: "/pins/car.png"
});
const scooterIcon = new L.Icon({
  iconSize: new L.Point(30, 30),
  iconUrl: "/pins/scooter.png"
});
const stepIcon = new L.Icon({
  iconSize: new L.Point(30, 30),
  iconUrl: "/pins/step.png"
});

const getIcon = (model: "scooter" | "car" | "step") => {
  switch (model) {
    case "scooter":
      return scooterIcon;
    case "car":
      return carIcon;
    case "step":
      return stepIcon;
    default:
      return carIcon;
  }
};
const createClusterCustomIcon = (cluster: any) => {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: `${styles['marker-cluster-custom']}`,
    iconSize: L.point(25, 25, true),
  });
}

const Markers = ({ vehicles }: Props): JSX.Element => {
  const setSelectedVehicle = useStore((state: Store) => state.setSelectedVehicle)

  return (
    <MarkerClusterGroup spiderfyOnMaxZoom={false} showCoverageOnHover={false} maxClusterRadius={40} iconCreateFunction={createClusterCustomIcon}>
      {vehicles.map((v: ServerVehicle) => (
        <Marker
          position={[v.locationLatitude, v.locationLongitude]}
          key={v.uuid}
          icon={getIcon(v.model.type)}
          eventHandlers={{
            popupopen: () => {
              setSelectedVehicle(v)
            },
            popupclose: () => {
              setSelectedVehicle(undefined)
            },
          }}
        >
          <Popup>
            <Vehicle vehicle={v} noBorder />
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

export default Markers;
