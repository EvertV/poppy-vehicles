import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import useSWR from "swr";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const Home: NextPage = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const { data: vehicles, error: vehiclesError } = useSWR(
    `https://poppy.red/api/v2/vehicles`,
    fetcher
  );
  const { data: zones, error: zonesError } = useSWR(
    `https://poppy.red/api/v2/zones`,
    fetcher
  ); // https://poppy.red/api/v2/zones?vehicleUUID=888f5d36-aa23-11ea-bd38-024d0cba6da4

  const Map = useMemo(
    () =>
      dynamic(() => import("../components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  if (vehiclesError || zonesError) return <div>failed to load</div>;

  if (!vehicles && !zones) return <div>loading...</div>;

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
        <Map vehicles={vehicles} />
        <div>
          {/* <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(vehicles)}
            {JSON.stringify(zones)}
          </pre> */}
        </div>
      </main>

      <footer>&copy; Poppy {new Date().getFullYear()}</footer>
    </div>
  );
};

export default Home;
