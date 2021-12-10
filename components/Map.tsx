import { useEffect, useState } from "react";
import L from "leaflet";

import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

import 'leaflet.markercluster';
//@ts-ignore
import MarkerClusterGroup from 'react-leaflet-markercluster';
import "react-leaflet-markercluster/dist/styles.min.css";

import { LatLngExpression } from "leaflet";

import styles from "../styles/map.module.css"

interface Props {
  vehicles: ServerVehicle[];
  zones: ServerZone[] | undefined;
  setVehicleUUID: (uuid: string) => void
}
const normaliseArrays = (arrays: LatLngExpression[][]): LatLngExpression[][] => {
  const reversedValues = arrays.map((longlat: LatLngExpression[]) => {
    return [...longlat].reverse();
  });
  return reversedValues;
};

const carIcon = new L.Icon({
  iconSize: new L.Point(30, 30),
  iconUrl: "/car-pin.png"
});
const scooterIcon = new L.Icon({
  iconSize: new L.Point(30, 30),
  iconUrl: "/scooter-pin.png"
});
const stepIcon = new L.Icon({
  iconSize: new L.Point(30, 30),
  iconUrl: "/step-pin.png"
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

const Map = ({ vehicles, zones, setVehicleUUID }: Props): JSX.Element => {

  const [stack, setStack] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const getPolygons = () => {
      const zonesArray: JSX.Element[] = [];
      zones?.forEach((zoneContainer: ServerZone): JSX.Element | void => {
        const coordinates = zoneContainer.geom.geometry.coordinates;
        const type = zoneContainer.geom.geometry.type;

        if (coordinates && type === "MultiPolygon") {
          coordinates?.forEach((zones: any, coorKey: number) => {
            zones.forEach((zone: any, zonesKey: number) => {
              zonesArray.push(
                <Polygon
                  key={`${zoneContainer.name}-${coorKey}-${zonesKey}`}
                  pathOptions={{
                    color: zoneContainer.name.includes("car")
                      ? 'red'
                      : 'deepskyblue',
                    fillOpacity: zonesKey === 0 ? 0.2 : 0.5,
                    stroke: true,
                    lineJoin: 'round',
                    fillRule: 'nonzero',
                    dashArray: zonesKey !== 0 ? '5,5' : undefined,
                    dashOffset: zonesKey !== 0 ? '5' : undefined
                  }}
                  positions={normaliseArrays(zone)}
                />
              );
            });
          });
        }
      });
      setStack(zonesArray);
    };
    if (zones) {
      getPolygons();
    }
  }, [zones]);

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
      <MarkerClusterGroup spiderfyOnMaxZoom={false} showCoverageOnHover={false} maxClusterRadius={40} iconCreateFunction={createClusterCustomIcon}>
        {vehicles.map((v: ServerVehicle) => (
          <Marker
            position={[v.locationLatitude, v.locationLongitude]}
            key={v.uuid}
            icon={getIcon(v.model.type)}
            eventHandlers={{
              click: () => {
                setVehicleUUID(v.uuid)
              },
            }}
          >
            <Popup>
              {v.model.type} {v.model.name}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      {stack}
    </MapContainer>
  );
};

export default Map;
