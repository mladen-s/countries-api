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
      <div className="country detailed">
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
        <img src={country.flags.png} alt={"flag of " + country.name.common} />
        <h2>{countryName.single}</h2>
        <div className="base-info info">
          <p>
            <span className="medium-bold"> Native Name:</span>{" "}
            {findNativeName(country.name.nativeName)}
          </p>
          <p>
            <span className="medium-bold">Population:</span>{" "}
            {new Intl.NumberFormat().format(country.population)}
          </p>
          <p>
            <span className="medium-bold">Region:</span> {country.region}
          </p>
          <p>
            <span className="medium-bold">Sub Region:</span> {country.subregion}
          </p>
          <p>
            <span className="medium-bold">Capital:</span> {country.capital}
          </p>
        </div>
        <div className="additional-info info">
          <p>
            <span className="medium-bold">Top Level Domain:</span> {country.tld}
          </p>
          <p>
            <span className="medium-bold">Currencies:</span>{" "}
            {findCurrencies(country.currencies)}
          </p>
          <p>
            <span className="medium-bold">Languages:</span>{" "}
            {findLanguages(country.languages)}
          </p>
        </div>
        <div className="border container">
          <p className="medium-bold">Border countries:</p>
          <div className="border-countries">
            {country.borders.length > 0
              ? country.borders.map((item: string) => {
                  return <p className="element">{item}</p>;
                })
              : "Island Country"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailed;
