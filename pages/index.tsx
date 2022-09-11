import { useEffect, useState } from "react";
// components
import Head from "next/head";
import MainContent from "../components/MainContent";

const API_URL = "https://restcountries.com/v3.1/all";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined) as any;

  useEffect(() => {
    setLoading(true);

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Countries</title>
        <meta
          name="description"
          content="Information about countries - using countries api. Challenge from www.frontendmentor.io"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      {data === undefined ? (
        <p className="element">Loading...</p>
      ) : (
        <MainContent data={data} />
      )}
    </div>
  );
}
