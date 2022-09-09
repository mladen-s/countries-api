import { GrFormDown } from "react-icons/gr";
import { BsCheckLg } from "react-icons/bs";
import React, { useState } from "react";

interface ISelect {
  regionState: string;
  regions: string[];
  setRegion: React.Dispatch<React.SetStateAction<string>>;
}

const Select = ({ regionState, regions, setRegion }: ISelect) => {
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
