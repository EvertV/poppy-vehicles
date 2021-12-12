import React from "react";

import { css } from '@emotion/react'

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

import 'leaflet.markercluster';
import "react-leaflet-markercluster/dist/styles.min.css";
import 'leaflet-draw/dist/leaflet.draw.css'

import Zones from '@/components/Zones';
import Markers from '@/components/Markers';
import EditMap from '@/components/EditMap';

import { LatLngBounds } from "leaflet"

interface Props {
  filteredVehicles: ServerVehicle[];
  zones?: ServerZone[];
  setVehicleUUID: (uuid: string) => void
  setBounds: (bounds: LatLngBounds | undefined) => void
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

const Map = ({ filteredVehicles, zones, setVehicleUUID, modelFilter, setBounds }: Props): JSX.Element => {

  return (
    <MapContainer
      center={[51.220290, 4.399433]} // Antwerp
      zoom={14}
      placeholder={<MapPlaceholder />}
      css={css`
        height: 100%;
      `}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers vehicles={filteredVehicles} setVehicleUUID={setVehicleUUID} />
      <Zones zones={zones} modelFilter={modelFilter} />
      <EditMap setBounds={setBounds} />
    </MapContainer>
  );
};

export default Map;
