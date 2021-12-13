import React, { useEffect } from "react";

import { css } from '@emotion/react'

import { MapContainer, TileLayer, useMapEvents, Circle, useMap } from "react-leaflet";
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
import { useStore } from 'store';

interface Props {
  filteredVehicles: ServerVehicle[];
  selectedVehicle?: ServerVehicle;
  zones?: ServerZone[];
  setSelectedVehicle: (v?: ServerVehicle) => void
  setBounds: (bounds: LatLngBounds | undefined) => void
  modelFilter: string[]
}

const MapBounds = ({ setBounds }: { setBounds: (bounds: LatLngBounds) => void }) => {
  const map = useMapEvents({
    moveend: () => {
      setBounds(map.getBounds())
    }
  })
  // Filter on load
  useEffect(() => {
    setBounds(map.getBounds())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
const MapCenter = ({ selectedVehicle }: { selectedVehicle?: ServerVehicle }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedVehicle) {
      map.setView([selectedVehicle.locationLatitude, selectedVehicle.locationLongitude], 18)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVehicle])
  return null
}

const Map = ({ zones, selectedVehicle, setSelectedVehicle, modelFilter, setBounds }: Props): JSX.Element => {
  const filteredVehicles = useStore(state => state.vehicles)

  return (
    <MapContainer
      center={[51.220290, 4.399433]} // Antwerp
      zoom={14}
      css={css`
        height: 100%;
      `}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers vehicles={filteredVehicles} setSelectedVehicle={setSelectedVehicle} />
      <Zones zones={zones} modelFilter={modelFilter} />
      <EditMap setBounds={setBounds} />
      <MapBounds setBounds={setBounds} />
      {selectedVehicle && (
        <Circle
          center={[selectedVehicle.locationLatitude, selectedVehicle.locationLongitude]}
          color='red'
        />
      )}
      <MapCenter selectedVehicle={selectedVehicle} />
    </MapContainer>
  );
};

export default Map;
