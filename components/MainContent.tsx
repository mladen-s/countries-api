import Country from "./Country";
import Select from "./Select";
import Input from "./Input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCountry } from "../redux/countrySlice";

const MainContent = ({ data }: any) => {
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("");
  const [content, setContent] = useState(data);
  const router = useRouter();
  const dispatch = useDispatch();

  const re = RegExp(`.*${input.toLowerCase().split("").join(".*")}.*`);

  // get unique regions from data
  const distinct = (value: string, index: number, self: any) => {
    return self.indexOf(value) === index;
  };

  const regionsFull = data.map((item: any) => {
    return item.region;
  });
  const regions: string[] = regionsFull.filter(distinct);

  // reorder searched results
  function arraymove(arr: any[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  useEffect(() => {
    if (region.length === 0) {
      if (input.length === 0) {
        setContent(data);
      } else {
        const inputData = data.filter((country: any) => {
          let countryName = country.name.common.toLowerCase();

          return countryName.match(re);
        });

        inputData.forEach((country: any, i: number) => {
          let countryName = country.name.common.toLowerCase();

          if (countryName.includes(input)) {
            const r = RegExp(`^${input}.`);
            let x = countryName.match(r);
            if (x !== null && x.length > 0) {
              arraymove(inputData, i, 0);
            }
          }
        });

        setContent(inputData);
      }
    } else {
      if (input.length > 0) {
        const regData = data.filter((country: any) => {
          return country.region == region;
        });
        const inputData = regData.filter((country: any) => {
          let countryName = country.name.common.toLowerCase();

          return countryName.match(re);
        });

        setContent(inputData);
      }
    }

    // console.log(data);
    // console.log(input);
  }, [input, region]);

  return (
    <div className="container main">
      <Input setInput={setInput} />
      <Select
        regions={regions}
        setRegion={setRegion}
        regionState={region}
        setContent={setContent}
        data={data}
      />
      <div className="list">
        <ul>
          {content.map((country: any) => {
            return (
              <li
                key={country.name.common}
                onClick={() => {
                  dispatch(setCountry(country));
                  router.push({
                    pathname: "/detailed",
                    query: { single: country.name.common },
                  });
                }}
              >
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
