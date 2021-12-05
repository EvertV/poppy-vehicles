import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from "react";
interface Props {
  vehicles: any[];
  zones: any[];
}

const carIcon = new L.Icon({
  iconUrl: "/car.svg",
  iconRetinaUrl: "/car.svg",
  iconSize: new L.Point(60, 30),
});
const scooterIcon = new L.Icon({
  iconUrl: "/scooter.svg",
  iconRetinaUrl: "/scooter.svg",
  iconSize: new L.Point(60, 30),
});
const stepIcon = new L.Icon({
  iconUrl: "/step.svg",
  iconRetinaUrl: "/step.svg",
  iconSize: new L.Point(60, 30),
});
const normaliseArrays = (arrays: any[]) => {
  const reversedValues = arrays.map((longlat: any[]) => {
    const revesedLongLat = [...longlat];
    return revesedLongLat.reverse();
  });
  return reversedValues;
};

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
  "darkorange",
  "coral",
  "orange",
  "yellow",
  "greenyellow",
];
const SCOOTER_COLORS = [
  "blue",
  "deepskyblue",
  "teal",
  "cyan",
  "blueviolet",
  "purple",
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
          coordinates?.forEach((zones: any) => {
            zones.forEach((zone: any, key: number) => {
              console.log(
                "zone",
                key,
                zoneContainer.name,
                normaliseArrays(zone)
              );
              zonesArray.push(
                <Polygon
                  key={`${zoneContainer.name}-${key}`}
                  pathOptions={{
                    color: zoneContainer.name.includes("car")
                      ? CAR_COLORS[key] || "black"
                      : SCOOTER_COLORS[key] || "black",
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
