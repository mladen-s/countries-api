import Country from "./Country";
import Select from "./Select";
import Input from "./Input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCountry } from "../redux/countrySlice";
import { JSONValue } from "../interface";
import InfiniteScroll from "react-infinite-scroll-component";

// reorder alphabetically
export const sortAZ = (arr: JSONValue) => {
  arr.sort((a: JSONValue, b: JSONValue) =>
    a.name.common.localeCompare(b.name.common)
  );
};

const MainContent = ({ data }: JSONValue) => {
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("");
  const [content, setContent] = useState(data);
  const router = useRouter();
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const [dataLength, setDataLength] = useState(8);

  const re = RegExp(`.*${input.toLowerCase().split("").join(".*")}.*`);

  // get unique regions from data
  const distinct = (value: string, index: number, self: JSONValue) => {
    return self.indexOf(value) === index;
  };

  const regionsFull = data.map((item: JSONValue) => {
    return item.region;
  });
  const regions: string[] = regionsFull.filter(distinct);

  // reorder searched results
  function arraymove(arr: JSONValue, fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  // infinite scroll load more countries
  const loadMore = () => {
    setDataLength((lng) => {
      return (lng = lng + 8);
    });
    if (dataLength > content.length) {
      setDataLength(content.length);
    }
  };

  useEffect(() => {
    if (region.length === 0) {
      if (input.length === 0) {
        let array = [...data];
        sortAZ(array);
        setContent(array);
        setDataLength(8);
      } else {
        const inputData = data.filter((country: JSONValue) => {
          let countryName = country.name.common.toLowerCase();

          return countryName.match(re);
        });

        inputData.forEach((country: JSONValue, i: number) => {
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
        setDataLength(8);
      }
    } else {
      if (input.length > 0) {
        const regData = data.filter((country: JSONValue) => {
          return country.region == region;
        });
        const inputData = regData.filter((country: JSONValue) => {
          let countryName = country.name.common.toLowerCase();

          return countryName.match(re);
        });

        setContent(inputData);
        setDataLength(8);
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
        setDataLength={setDataLength}
      />
      <div className="list">
        <ul>
          <InfiniteScroll
            dataLength={dataLength}
            next={loadMore}
            hasMore={hasMore}
            loader={<p className="element">Loading...</p>}
          >
            {content.map((country: JSONValue, index: number) => {
              if (index >= dataLength) {
                return;
              } else {
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
              }
            })}
          </InfiniteScroll>
        </ul>
      </div>
    </div>
  );
};

export default MainContent;
