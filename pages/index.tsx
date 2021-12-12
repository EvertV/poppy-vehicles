import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import useSWR from "swr";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import DisplayVehicles from '@/components/DisplayVehicles';
import { css } from '@emotion/react'
import { LatLngBounds } from "leaflet"

//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const Home: NextPage = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [vehicleUUID, setVehicleUUID] = useState<string>();
  const [modelFilter, setModelFilter] = useState<string[]>(["car", "step", "scooter"]);
  const [filteredVehicles, setFilteredVehicles] = useState<ServerVehicle[]>()
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
        setFilteredVehicles(newVehicles.filter((v: ServerVehicle) => bounds.contains({ lat: v.locationLatitude, lng: v.locationLongitude })))
      } else {
        setFilteredVehicles(newVehicles)
      }
    }
  }, [bounds, modelFilter, vehicles])

  const { data: zones, error: zonesError } = useSWR<{ zones: ServerZone[] }, string>(
    `https://poppy.red/api/v2/zones${vehicleUUID ? `?vehicleUUID=${vehicleUUID}` : ``}`,
    fetcher
  );

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  if (vehiclesError || zonesError) return <div>failed to load</div>;

  return (
    <>
      <Head>
        <title>Poppy vehicles</title>
        <meta name="description" content="Displaying all poppy vehicles" />
      </Head>
      {(showSplash || !filteredVehicles) && <SplashScreen />}
      {(filteredVehicles) &&
        <>
          <main>
            <Header />
            <div css={css`
              display: flex;
              flex-direction: row;
              height: 100vh;
            `}>
              <div css={css`
                flex-basis: 75%;
              `}>
                <Map filteredVehicles={filteredVehicles} zones={zones?.zones} setVehicleUUID={setVehicleUUID} modelFilter={modelFilter} setBounds={setBounds} />
              </div>
              <div css={css`
                padding: 1rem;
                flex-basis: 25%;
              `}>
                <DisplayVehicles filteredVehicles={filteredVehicles} vehicleUUID={vehicleUUID} setVehicleUUID={setVehicleUUID} modelFilter={modelFilter} setModelFilter={setModelFilter} />
              </div>
            </div>
          </main>
          <footer>&copy; Poppy {new Date().getFullYear()}</footer>
        </>
      }

    </>
  );
};

export default Home;
