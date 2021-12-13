import React, { useEffect, useState, useMemo } from "react";
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

import styled from '@emotion/styled'

const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 65px);
`
const SectionLeft = styled.section`
  overflow: hidden;
  flex-basis: 75%;
`
const AsideRight = styled.aside`
  padding: 1rem;
  flex-basis: 25%;
  overflow: auto;
`

//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const Home: NextPage = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const {
    selectedVehicle,
    setVehicles,
    filters,
    bounds,
    setZones
  } = useStore((state: Store) => (state), shallow);

  const { data: serverVehicles, error: serverVehiclesError } = useSWR<ServerVehicle[], string>(
    `https://poppy.red/api/v2/vehicles`,
    fetcher
  );
  const { data: serverZones, error: serverZonesError } = useSWR<{ zones: ServerZone[] }, string>(
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

  if (serverVehiclesError || serverZonesError) return (
    <Alert status='error'>
      <AlertIcon />
      There was an error processing your request
    </Alert>);

  return (
    <>
      {(showSplash || !serverVehicles) && <SplashScreen />}
      {(serverVehicles) &&
        <>
          <Header />
          <MainContainer>
            <SectionLeft>
              <Map />
            </SectionLeft>
            <AsideRight>
              <Sidebar />
            </AsideRight>
          </MainContainer>
        </>
      }
    </>
  );
};

export default Home;
