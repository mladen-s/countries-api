import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCountry } from "../redux/countrySlice";
import { JSONValue } from "../interface";

const BorderCountries = ({ country, data }: JSONValue) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [countries, setCountries] = useState(undefined) as JSONValue;

  useEffect(() => {
    if (country.borders) {
      let cData = data.filter((c: JSONValue) => {
        let border;
        country.borders.forEach((b: string) => {
          c.cca3 === b ? (border = b) : "";
        });

        return c.cca3 === border;
      });
      setCountries(cData);
    }
  }, [country]);

  return (
    <div className="border-countries">
      {country.borders !== undefined && countries !== undefined
        ? countries.map((item: JSONValue) => {
            return (
              <p
                className="element"
                key={item.name.common}
                onClick={() => {
                  dispatch(setCountry(item));
                  router.push({
                    pathname: "/detailed",
                    query: { single: item.name.common },
                  });
                }}
              >
                {item.name.common}
              </p>
            );
          })
        : "This is an island country. It doesn't border any other country."}
    </div>
  );
};

export default BorderCountries;
