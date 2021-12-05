import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
interface Props {
  vehicles: any[];
  zones: any[];
}

const carIcon = new L.Icon({
  iconUrl: "/car.svg",
  iconRetinaUrl: "/car.svg",
  iconSize: new L.Point(60, 30),
  style: { fill: "blue" },
});
const scooterIcon = new L.Icon({
  iconUrl: "/scooter.svg",
  iconRetinaUrl: "/scooter.svg",
  iconSize: new L.Point(60, 30),
  style: { fill: "blue" },
});
const stepIcon = new L.Icon({
  iconUrl: "/step.svg",
  iconRetinaUrl: "/step.svg",
  iconSize: new L.Point(60, 30),
  style: { fill: "blue" },
});
const purpleOptions = { color: "purple" };
const multiPolygon = [
  [
    [4.434047, 51.305948],
    [4.433885, 51.305973],
    [4.432753, 51.304427],
    [4.431197, 51.303472],
    [4.429888, 51.302635],
    [4.429137, 51.302235],
    [4.428574, 51.302879],
    [4.427666, 51.30346],
    [4.427797, 51.303557],
    [4.426582, 51.304312],
    [4.427532, 51.304868],
    [4.424245, 51.308372],
    [4.420967, 51.311754],
    [4.422113, 51.312238],
    [4.420869, 51.313432],
    [4.424667, 51.314946],
    [4.426666, 51.316108],
    [4.427797, 51.316587],
    [4.428542, 51.315809],
    [4.429124, 51.315022],
    [4.428342, 51.314585],
    [4.427877, 51.314398],
    [4.426995, 51.314165],
    [4.425559, 51.313607],
    [4.424021, 51.312986],
    [4.423189, 51.312651],
    [4.423351, 51.312501],
    [4.425729, 51.313486],
    [4.427024, 51.313979],
    [4.427762, 51.314184],
    [4.428263, 51.314328],
    [4.428867, 51.314605],
    [4.429308, 51.314862],
    [4.429348, 51.314697],
    [4.429074, 51.314199],
    [4.428642, 51.313539],
    [4.428647, 51.313373],
    [4.428823, 51.313147],
    [4.426338, 51.312355],
    [4.426443, 51.312237],
    [4.428904, 51.31302],
    [4.430143, 51.31128],
    [4.430264, 51.311194],
    [4.431006, 51.31022],
    [4.431075, 51.310151],
    [4.432089, 51.31223],
    [4.432752, 51.313713],
    [4.431119, 51.31441],
    [4.429783, 51.314944],
    [4.42998, 51.315376],
    [4.429749, 51.315419],
    [4.429434, 51.315135],
    [4.42869, 51.316083],
    [4.428455, 51.316318],
    [4.431392, 51.317595],
    [4.43127, 51.317688],
    [4.428309, 51.316473],
    [4.428057, 51.316735],
    [4.426117, 51.318779],
    [4.425777, 51.318616],
    [4.424794, 51.31965],
    [4.435746, 51.325689],
    [4.438036, 51.323567],
    [4.433089, 51.313915],
    [4.433539, 51.313743],
    [4.433334, 51.313536],
    [4.433068, 51.313387],
    [4.432409, 51.31212],
    [4.432558, 51.312016],
    [4.433812, 51.309994],
    [4.435549, 51.310426],
    [4.437215, 51.307791],
    [4.435593, 51.307125],
    [4.435153, 51.306894],
    [4.434342, 51.306329],
    [4.434343, 51.306194],
    [4.434291, 51.306053],
    [4.434206, 51.305963],
    [4.434047, 51.305948],
  ],
  [
    [4.423579, 51.311382],
    [4.42423, 51.310704],
    [4.425213, 51.311039],
    [4.426323, 51.311486],
    [4.426158, 51.311893],
    [4.425813, 51.31222],
    [4.423579, 51.311382],
  ],
  [
    [4.432572, 51.317353],
    [4.433064, 51.317073],
    [4.433233, 51.317215],
    [4.432763, 51.317486],
    [4.432572, 51.317353],
  ],
];
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
const Map = ({ vehicles, zones }: Props): JSX.Element => {
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
      <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
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
      {zones.map((zoneContainer: any): JSX.Element | undefined => {
        const coordinates = zoneContainer.geom.geometry.coordinates;
        const type = zoneContainer.geom.geometry.type;

        if (coordinates && type === "MultiPolygon") {
          coordinates?.map((zone: any) => {
            console.log("zone", zone);
            return (
              <Polygon
                key={zoneContainer.name}
                pathOptions={purpleOptions}
                positions={zone}
              />
            );
          });
        }
        return undefined;
      })}
    </MapContainer>
  );
};

export default Map;
