import React from "react";
import { JSONValue } from "../interface";

const Country = ({ country }: JSONValue) => {
  return (
    <div className="container element country">
      <img src={country.flags.png} alt={"flag of " + country.name.common} />
      <h2>{country.name.common}</h2>
      <p>
        <span className="medium-bold">Population:</span>{" "}
        {new Intl.NumberFormat().format(country.population)}
      </p>
      <p>
        <span className="medium-bold">Region:</span> {country.region}
      </p>
      <p>
        <span className="medium-bold">Capital:</span> {country.capital}
      </p>
    </div>
  );
};

export default Country;
