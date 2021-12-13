import { useEffect, useState } from "react";

import { Polygon } from "react-leaflet";

import { LatLngExpression } from "leaflet";
import { useStore } from 'store';

const normaliseArrays = (arrays: LatLngExpression[][]): LatLngExpression[][] => {
  const reversedValues = arrays.map((longlat: LatLngExpression[]) => {
    return [...longlat].reverse();
  });
  return reversedValues;
};
const Zones = (): JSX.Element => {
  const filters = useStore(state => state.filters)
  const zones = useStore(state => state.zones)
  const [stack, setStack] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const getPolygons = () => {
      const zonesArray: JSX.Element[] = [];
      zones?.filter((z: ServerZone) => filters.some(filter => z.name.includes(filter))).forEach((zoneContainer: ServerZone): JSX.Element | void => {
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
  }, [zones, filters]);

  return <>{stack}</>;
};

export default Zones;
