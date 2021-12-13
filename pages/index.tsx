import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import useSWR from "swr";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { css } from '@emotion/react'
import { LatLngBounds } from "leaflet"
import { Center, Spinner } from '@chakra-ui/react'
import { useStore } from 'store';

//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const Home: NextPage = () => {
  const setVehicles = useStore(state => state.setVehicles)
  const filteredVehicles = useStore(state => state.vehicles)

  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [selectedVehicle, setSelectedVehicle] = useState<ServerVehicle | undefined>();
  const [modelFilter, setModelFilter] = useState<string[]>(["car", "step", "scooter"]);
  // const [filteredVehicles, setFilteredVehicles] = useState<ServerVehicle[]>()
  const [bounds, setBounds] = useState<LatLngBounds>()

  useEffect(() => {
    setTimeout(() => { setShowSplash(false) }, 2000)
  }, [])
  const { data: vehicles, error: vehiclesError } = useSWR<ServerVehicle[], string>(
    `https://poppy.red/api/v2/vehicles`,
    fetcher
  );

  useEffect(() => {
    if (vehicles) {
      const newVehicles = vehicles.filter((v: ServerVehicle) => modelFilter.includes(v.model.type))
      if (bounds && bounds.isValid()) {
        setVehicles(newVehicles.filter((v: ServerVehicle) => bounds.contains({ lat: v.locationLatitude, lng: v.locationLongitude })))
      } else {
        setVehicles(newVehicles)
      }
    }
  }, [bounds, modelFilter, vehicles])

  const { data: zones, error: zonesError } = useSWR<{ zones: ServerZone[] }, string>(
    `https://poppy.red/api/v2/zones${selectedVehicle ? `?vehicleUUID=${selectedVehicle.uuid}` : ``}`,
    fetcher
  );

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => (
          <Center css={css`height: calc(100vh - 65px);`}>
            <Spinner color='red.500' />
          </Center>
        ),
        ssr: false,
      }),
    []
  );

  if (vehiclesError || zonesError) return <div>failed to load</div>;

  return (
    <>
      {(showSplash || !filteredVehicles) && <SplashScreen />}
      {(filteredVehicles) &&
        <>
          <Header />
          <main css={css`
              display: flex;
              flex-direction: row;
              height: calc(100vh - 65px);
            `}>
            <section css={css`
                overflow: hidden;
                flex-basis: 75%;
              `}>
              <Map filteredVehicles={filteredVehicles} zones={zones?.zones} selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} modelFilter={modelFilter} setBounds={setBounds} />
            </section>
            <aside css={css`
                padding: 1rem;
                flex-basis: 25%;
                overflow: auto;
              `}>
              <Sidebar filteredVehicles={filteredVehicles} selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} modelFilter={modelFilter} setModelFilter={setModelFilter} />
            </aside>
          </main>
        </>
      }

    </>
  );
};

export default Home;
