import { MdKeyboardBackspace } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Detailed = () => {
  const router = useRouter();
  let countryName = router.query;

  //   const [countryData, setCountryData]: any = useState();
  //   const [data, setData]: any[] = useState();

  useEffect(() => {
    console.log(countryName);
  }, [router.query]);

  return (
    <div className="container main">
      <div className="country">
        <Link
          href={{
            pathname: "/",
          }}
        >
          <a className="back element">
            <MdKeyboardBackspace />
            Back
          </a>
        </Link>
        <img src="" alt="" />
        <h1>{countryName.single}</h1>
        {/* <div className="base-info info">
          <p>Native Name: {}</p>
          <p>Population: {countryData.population}</p>
          <p>Region: {countryData.region}</p>
          <p>Sub Region: {}</p>
          <p>Capital: {countryData.capital}</p>
        </div>
        <div className="additional-info info">
          <p>Top Level Domain: {}</p>
          <p>Currencies: {}</p>
          <p>Languages: {}</p>
        </div> */}
        <div className="border">
          {}
          <p className="element">country1</p>
        </div>
      </div>
    </div>
  );
};

export default Detailed;
