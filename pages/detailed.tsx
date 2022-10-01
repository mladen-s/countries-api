import { MdKeyboardBackspace } from "react-icons/md";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useGetCountriesQuery } from "../redux/countriesApi";
import { useSelector, useDispatch } from "react-redux";
import { setCountry } from "../redux/countrySlice";
import BorderCountries from "../components/BorderCountries";
import { JSONValue } from "../interface";

const Detailed = () => {
  const router = useRouter();
  let countryName = router.query.single;
  const { data, error, isLoading } = useGetCountriesQuery();
  const dispatch = useDispatch();
  const country = useSelector((state: JSONValue) => state.country.value);

  useEffect(() => {
    if (!country && data) {
      let cData = data.filter((c: JSONValue) => {
        if (countryName) {
          return (
            c.name.common.toLowerCase() == countryName.toString().toLowerCase()
          );
        }
      });

      dispatch(setCountry(cData[0]));
    }
  }, [countryName, data, country]);

  const findLanguages = (object: JSONValue) => {
    let element = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        element.push(object[key]);
      }
    }
    return element;
  };

  const findCurrencies = (object: JSONValue) => {
    let element = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        element.push(object[key].name);
      }
    }
    return element;
  };

  const findNativeName = (object: JSONValue) => {
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

  if (country !== undefined)
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
          <h2 className="country-name">{country.name.common}</h2>
          <div className="base-info info">
            <p>
              <span className="medium-bold"> Native Name:</span>{" "}
              {findNativeName(country.name.nativeName)}
              {country.altSpellings.length > 1
                ? " (" + country.altSpellings[1] + ")"
                : ""}
            </p>
            <p>
              <span className="medium-bold">Population:</span>{" "}
              {new Intl.NumberFormat().format(country.population)}
            </p>
            <p>
              <span className="medium-bold">Region:</span> {country.region}
            </p>
            <p>
              <span className="medium-bold">Sub Region:</span>{" "}
              {country.subregion}
            </p>
            <p>
              <span className="medium-bold">Capital:</span> {country.capital}
            </p>
          </div>
          <div className="additional-info info">
            <p>
              <span className="medium-bold">Top Level Domain:</span>{" "}
              {country.tld ? country.tld[0] : "/"}
            </p>
            <p>
              <span className="medium-bold">Currencies:</span>{" "}
              {findCurrencies(country.currencies).map(
                (currency, index, curArr) => {
                  if (index === curArr.length - 1) {
                    return currency;
                  } else {
                    return currency + ", ";
                  }
                }
              )}
            </p>
            <p>
              <span className="medium-bold">Languages:</span>{" "}
              {findLanguages(country.languages).map(
                (language, index, langArr) => {
                  if (index === langArr.length - 1) {
                    return language;
                  } else {
                    return language + ", ";
                  }
                }
              )}
            </p>
          </div>
          <div className="border container">
            <p className="medium-bold">Border countries:</p>
            <BorderCountries country={country} data={data} />
          </div>
        </div>
      </div>
    );
};

export default Detailed;
