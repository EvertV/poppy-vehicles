import { useEffect, useState } from "react";

import { Polygon } from "react-leaflet";

import { LatLngExpression } from "leaflet";

interface Props {
  zones?: ServerZone[];
  modelFilter: string[]
}
const normaliseArrays = (arrays: LatLngExpression[][]): LatLngExpression[][] => {
  const reversedValues = arrays.map((longlat: LatLngExpression[]) => {
    return [...longlat].reverse();
  });
  return reversedValues;
};
const Zones = ({ zones, modelFilter }: Props): JSX.Element => {
  const [stack, setStack] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const getPolygons = () => {
      const zonesArray: JSX.Element[] = [];
      zones?.filter((z: ServerZone) => modelFilter.some(filter => z.name.includes(filter))).forEach((zoneContainer: ServerZone): JSX.Element | void => {
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
  }, [zones, modelFilter]);

  return <>{stack}</>;
};

export default Zones;
