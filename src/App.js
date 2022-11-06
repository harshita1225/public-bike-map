import { useEffect, useState } from "react";
import "./App.css";
import MyMap from "./map";

function App() {
  const [foundProviders, setFoundProviders] = useState([]);
  const [allProviders, setAllProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://api.citybik.es/v2/networks`);
      const data = await res.json();
      //console.log(data, data.networks);
      setAllProviders(data.networks);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterProviders = () => {
      return allProviders.filter((item) =>
        item.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };
    filterProviders();
    setFoundProviders(filterProviders);
  }, [searchTerm, allProviders]);

  // console.log(foundProviders);
  const center = [
    foundProviders[0]?.location.latitude,
    foundProviders[0]?.location.longitude,
  ];
  // console.log(center);
  return (
    <div className="App">
      <div className="container">
        <input
          className="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="map-container ">
          <MyMap
            foundProviders={foundProviders}
            searchTerm={searchTerm}
            center={center}
          />
          <p>Bike list will be displayed here:</p>
          <div className="table-container">
            <table className="providers ">
              <tr>
                <th>City</th>
                <th>Provider</th>
              </tr>
              {foundProviders.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.location.city}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
