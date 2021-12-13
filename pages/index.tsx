import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import useSWR from "swr";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { css } from '@emotion/react'
import { Center, Spinner, Alert, AlertIcon } from '@chakra-ui/react'
import { useStore } from 'store';
import shallow from 'zustand/shallow';

//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const Home: NextPage = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const {
    vehicles,
    selectedVehicle,
    setVehicles,
    filters,
    bounds,
    setZones
  } = useStore((state: Store) => (state), shallow);

  const { data: serverVehicles, error: vehiclesError } = useSWR<ServerVehicle[], string>(
    `https://poppy.red/api/v2/vehicles`,
    fetcher
  );
  const { data: serverZones, error: zonesError } = useSWR<{ zones: ServerZone[] }, string>(
    `https://poppy.red/api/v2/zones${selectedVehicle ? `?vehicleUUID=${selectedVehicle.uuid}` : ``}`,
    fetcher
  );

  useEffect(() => {
    setTimeout(() => { setShowSplash(false) }, 2000)
  }, [])
  useEffect(() => {
    if (serverVehicles)
      setVehicles(serverVehicles)
  }, [bounds, filters, setVehicles, serverVehicles])
  useEffect(() => {
    if (serverZones?.zones)
      setZones(serverZones.zones)
  }, [serverZones, setZones])

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

  if (vehiclesError || zonesError) return (
    <Alert status='error'>
      <AlertIcon />
      There was an error processing your request
    </Alert>);

  return (
    <>
      {(showSplash || !vehicles) && <SplashScreen />}
      {(vehicles) &&
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
              <Map />
            </section>
            <aside css={css`
                padding: 1rem;
                flex-basis: 25%;
                overflow: auto;
              `}>
              <Sidebar />
            </aside>
          </main>
        </>
      }
    </>
  );
};

export default Home;
