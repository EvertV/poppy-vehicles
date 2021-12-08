import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from "react";
import styles from "../styles/map.module.css"

interface Props {
  vehicles: any[];
  zones: any[];
}
const normaliseArrays = (arrays: any[]) => {
  const reversedValues = arrays.map((longlat: any[]) => {
    const revesedLongLat = [...longlat];
    return revesedLongLat.reverse();
  });
  return reversedValues;
};

const CustomIcon = L.Icon.extend({
  options: {
    iconSize: new L.Point(30, 30),
  }
});
const carIcon = new CustomIcon({
  iconUrl: "/car-pin.png"
});
const scooterIcon = new CustomIcon({
  iconUrl: "/scooter-pin.png"
});
const stepIcon = new CustomIcon({
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
const CAR_COLORS = [
  "red",
];
const SCOOTER_COLORS = [
  "deepskyblue",
];
const Map = ({ vehicles, zones }: Props): JSX.Element => {

  const [stack, setStack] = useState([]);
  useEffect(() => {
    const getPolygons = () => {
      const zonesArray: JSX.Element[] = [];
      zones.forEach((zoneContainer: any): JSX.Element | void => {
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
                      ? CAR_COLORS[zonesKey] || "hotpink"
                      : SCOOTER_COLORS[zonesKey] || "skyblue",
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
    getPolygons();
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
      {vehicles.map((v) => (
        <Marker
          position={[v.locationLatitude, v.locationLongitude]}
          key={v.uuid}
          icon={getIcon(v.model.type)}
        >
          <Popup>
            {v.model.type} {v.model.name}
          </Popup>
        </Marker>
      ))}
      {stack}
    </MapContainer>
  );
};

export default Map;
