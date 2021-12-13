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

import { useStore } from 'store';
import shallow from 'zustand/shallow';

const MapBounds = () => {
  const setBounds = useStore(state => state.setBounds)
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

const Map = (): JSX.Element => {
  const { vehicles: filteredVehicles, selectedVehicle, zones } = useStore(state => state, shallow)

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
      <Markers vehicles={filteredVehicles} />
      <Zones zones={zones} />
      <EditMap />
      <MapBounds />
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
