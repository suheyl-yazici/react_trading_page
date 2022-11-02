import { useState, useEffect,useContext } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addStock }= useContext(WatchListContext);

  const renderDropdown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul
        className={`dropdown-menu ${dropDownClass}`}
        style={{ height: "30rem", overflowY: "scroll", overflowX: "hidden",cursor:"pointer" }}
      >
        {results.map((result) => {
          return (
            <li 
            className="dropdown-item" 
            key={result.symbol} 
            onClick={() => {
              addStock(result.symbol)
              setSearch("")
            }}
            >
              {result.description} ({result.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          type="text"
          style={{ backgroundColor: "rgba(145,158,171,0.04" }}
          id="search"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};
