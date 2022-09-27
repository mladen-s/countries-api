import { GrFormDown } from "react-icons/gr";
import { BsCheckLg } from "react-icons/bs";
import React, { useState } from "react";
import { JSONValue } from "../interface";

interface ISelect {
  regionState: string;
  regions: string[];
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<JSONValue>>;
  data: JSONValue;
}

const Select = ({
  regionState,
  regions,
  setRegion,
  setContent,
  data,
}: ISelect) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="select">
      <div
        className="select-btn element"
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <p>Filter by Region</p>
        <GrFormDown />
      </div>
      <div
        className={
          clicked ? "select-list element select-modal" : "select-list element "
        }
      >
        <ul>
          {regions.map((region: string) => {
            return (
              <li
                value={region}
                key={region}
                onClick={() => {
                  region === regionState ? setRegion("") : setRegion(region);

                  const regData = data.filter((country: JSONValue) => {
                    return country.region == region;
                  });
                  setContent(regData);
                }}
              >
                {region}
                {region === regionState ? <BsCheckLg /> : ""}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Select;
