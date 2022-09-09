import Country from "./Country";
import Select from "./Select";
import Input from "./Input";
import { useEffect, useState } from "react";

const MainContent = ({ data }: any) => {
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("");

  // get unique regions from data
  const distinct = (value: string, index: number, self: any) => {
    return self.indexOf(value) === index;
  };

  const regionsFull = data.map((item: any) => {
    return item.region;
  });
  const regions: string[] = regionsFull.filter(distinct);

  useEffect(() => {
    console.log(region);
  }, [input, region]);

  return (
    <div className="container main">
      <Input setInput={setInput} />
      <Select regions={regions} setRegion={setRegion} regionState={region} />
      <div className="list">
        <ul>
          {data.map((country: any) => {
            return (
              <li key={country.name.common}>
                <Country country={country} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MainContent;
