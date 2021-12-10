import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import useSWR from "swr";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const Home: NextPage = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [vehicleUUID, setVehicleUUID] = useState<string>();
  const [modelFilter, setModelFilter] = useState<string[]>(["car", "step", "scooter"]);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const { data: vehicles, error: vehiclesError } = useSWR<ServerVehicle[], string>(
    `https://poppy.red/api/v2/vehicles`,
    fetcher
  );
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

  if (!vehicles) return <div>loading...</div>;

  if (!isBrowser && window) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>Poppy vehicles</title>
        <meta name="description" content="Displaying all poppy vehicles" />
      </Head>

      <main>
        <h1>Poppy vehicles</h1>
        {vehicleUUID && (<>
          Vehicle selected: {vehicleUUID}
          <button onClick={() => setVehicleUUID('')}>Reset vehicle</button>
        </>)}
        Vehicle filter:
        {['car', 'step', 'scooter'].map((v: string) => (
          <div key={v} >
            <input type="checkbox" id={v} name={v} value={v} checked={modelFilter.includes(v)}
              onChange={(e) => !e.target.checked ? setModelFilter(modelFilter.filter(item => item !== v)) : setModelFilter([...modelFilter, v])} />
            <label htmlFor={v}>{v}</label>
          </div>
        ))}

        <Map vehicles={vehicles} zones={zones?.zones} setVehicleUUID={setVehicleUUID} modelFilter={modelFilter} />
      </main>

      <footer>&copy; Poppy {new Date().getFullYear()}</footer>
    </div>
  );
};

export default Home;
