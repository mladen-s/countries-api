import React from "react";

const Country = ({ country }: any) => {
  return (
    <div className="container element country">
      <img src={country.flags.png} alt="country flag" />
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
