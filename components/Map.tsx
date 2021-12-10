import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

import 'leaflet.markercluster';
import "react-leaflet-markercluster/dist/styles.min.css";
import 'leaflet-draw/dist/leaflet.draw.css'
import { LatLngBounds } from "leaflet"

import Zones from '@/components/Zones';
import Markers from '@/components/Markers';
import EditMap from '@/components/EditMap';

interface Props {
  vehicles: ServerVehicle[];
  zones?: ServerZone[];
  setVehicleUUID: (uuid: string) => void
  modelFilter: string[]
}

const MapPlaceholder = () => {
  return (
    <p>
      Poppy map with vehicles and start/stop zones.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

const Map = ({ vehicles, zones, setVehicleUUID, modelFilter }: Props): JSX.Element => {
  const [bounds, setBounds] = useState<LatLngBounds>()
  const [filteredVehicles, setFilteredVehicles] = useState<ServerVehicle[]>(vehicles)

  useEffect(() => {
    if (bounds && bounds.isValid()) {
      setFilteredVehicles(vehicles.filter((v: ServerVehicle) => bounds.contains({ lat: v.locationLatitude, lng: v.locationLongitude })))
    } else {
      setFilteredVehicles(vehicles)
    }
  }, [bounds, vehicles])
  return (
    <MapContainer
      center={[51.220290, 4.399433]} // Antwerp
      zoom={14}
      placeholder={<MapPlaceholder />}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers vehicles={filteredVehicles} setVehicleUUID={setVehicleUUID} modelFilter={modelFilter} />
      <Zones zones={zones} modelFilter={modelFilter} />
      <EditMap setBounds={setBounds} />
    </MapContainer>
  );
};

export default Map;
