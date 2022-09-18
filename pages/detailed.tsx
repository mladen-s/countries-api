import { MdKeyboardBackspace } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useGetCountriesQuery } from "../redux/countriesApi";
import { useSelector } from "react-redux";

const Detailed = () => {
  const router = useRouter();
  let countryName = router.query;
  const { data, error, isLoading } = useGetCountriesQuery();
  const country = useSelector((state: any) => state.country.value);

  //   const [countryData, setCountryData]: any = useState();
  //   const [data, setData]: any[] = useState();

  useEffect(() => {
    // console.log(country);
  }, []);

  const findLanguages = (object: any) => {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = object[key];
        return element;
      }
    }
  };

  const findCurrencies = (object: any) => {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = object[key];
        return element.name;
      }
    }
  };

  const findNativeName = (object: any) => {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = object[key];
        return element.common;
      }
    }
  };

  if (error)
    return (
      <p className="element">Oops! We have some technical difficulties.</p>
    );

  if (isLoading) return <p className="element">Loading...</p>;

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
        <div className="base-info info">
          <p>Native Name: {findNativeName(country.name.nativeName)}</p>
          <p>
            Population: {new Intl.NumberFormat().format(country.population)}
          </p>
          <p>Region: {country.region}</p>
          <p>Sub Region: {country.subregion}</p>
          <p>Capital: {country.capital}</p>
        </div>
        <div className="additional-info info">
          <p>Top Level Domain: {country.tld}</p>
          <p>Currencies: {findCurrencies(country.currencies)}</p>
          <p>Languages: {findLanguages(country.languages)}</p>
        </div>
        <div className="border container">
          {country.borders.length > 0
            ? country.borders.map((item: string) => {
                return <p className="element">{item}</p>;
              })
            : "Island Country"}
        </div>
      </div>
    </div>
  );
};

export default Detailed;
