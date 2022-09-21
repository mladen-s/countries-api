import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCountry } from "../redux/countrySlice";

const BorderCountries = ({ country, data }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [countries, setCountries] = useState(undefined) as any;

  useEffect(() => {
    if (country.borders) {
      let cData = data.filter((c: any) => {
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
        ? countries.map((item: any) => {
            return (
              <p className="element" key={item.name.common}>
                <span
                  onClick={() => {
                    dispatch(setCountry(item));
                    router.push({
                      pathname: "/detailed",
                      query: { single: item.name.common },
                    });
                  }}
                >
                  {item.name.common}
                </span>
              </p>
            );
          })
        : "This is an island country. It doesn't border any other country."}
    </div>
  );
};

export default BorderCountries;
