import { GrFormDown } from "react-icons/gr";
import { BsCheckLg } from "react-icons/bs";
import React, { useState } from "react";
import { JSONValue } from "../interface";
import { sortAZ } from "./MainContent";

interface ISelect {
  regionState: string;
  regions: string[];
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<JSONValue>>;
  data: JSONValue;
  setDataLength: React.Dispatch<React.SetStateAction<number>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const Select = ({
  regionState,
  regions,
  setRegion,
  setContent,
  data,
  setDataLength,
  setHasMore,
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

                  sortAZ(regData, setContent);
                  setHasMore(true);
                  setDataLength(8);
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
