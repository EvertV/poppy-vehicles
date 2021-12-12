import React, { useEffect, useState } from "react";

import { css } from '@emotion/react'

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
import DisplayVehicles from '@/components/DisplayVehicles';

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
    const newVehicles = vehicles.filter((v: ServerVehicle) => modelFilter.includes(v.model.type))
    if (bounds && bounds.isValid()) {
      setFilteredVehicles(newVehicles.filter((v: ServerVehicle) => bounds.contains({ lat: v.locationLatitude, lng: v.locationLongitude })))
    } else {
      setFilteredVehicles(newVehicles)
    }
  }, [bounds, modelFilter, vehicles])



  return (
    <div css={css`
      display: flex;
      flex-direction: row;
    `}>
      <div css={css`
        flex-basis: 75%;
      `}>
        <MapContainer
          center={[51.220290, 4.399433]} // Antwerp
          zoom={14}
          placeholder={<MapPlaceholder />}
          css={css`
            height: 100vh;
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
      </div>
      <div css={css`
        padding: 1rem;
        flex-basis: 25%;
      `}>
        <DisplayVehicles filteredVehicles={filteredVehicles} />
      </div>
    </div>
  );
};

export default Map;
