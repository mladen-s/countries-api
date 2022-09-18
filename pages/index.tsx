import { useEffect, useState } from "react";
// components
import Head from "next/head";
import MainContent from "../components/MainContent";
import { useGetCountriesQuery } from "../redux/countriesApi";

export default function Home() {
  const { data, error, isLoading } = useGetCountriesQuery();

  // useEffect(() => {
  //   setLoading(true);
  //   if (data !== undefined) {
  //     console.log(data);
  //     setFetchedData(JSON.stringify(data));
  //     setLoading(false);
  //   }
  //   console.log(data);
  //   console.log(isFetching);
  //   console.log(isLoading);
  //   console.log(isSuccess);
  //   console.log(isError);

  //   // console.log(JSON.stringify(data));
  // }, [data, loading, isSuccess, isLoading, isFetching, isError]);

  if (error)
    return (
      <p className="element">Oops! We have some technical difficulties.</p>
    );

  if (isLoading) return <p className="element">Loading...</p>;

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
      <MainContent data={data} />
    </div>
  );
}
