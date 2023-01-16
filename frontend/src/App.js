import { useEffect, useState } from "react";
import "./App.css";
import DataTable from "./components/Table";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([
    {
      departureTime: "-",
      departureStation: "-",
      returnTime: "-",
      returnStation: "-",
      duration: "-",
      distance: "-",
    },
  ]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getJourneyData();
  }, []);

  const getJourneyData = () => {
    let tempArr = [];

    axios
      .get("http://localhost:8080/journey_data")
      .then((result) => {
        for (let i = 0; i < result.data.length; i++) {
          tempArr.push({
            departureTime: result.data[i].departure_date,
            departureStation: result.data[i].departure_station_name,
            returnTime: result.data[i].return_date,
            returnStation: result.data[i].return_station_name,
            duration: result.data[i].duration,
            distance: result.data[i].covered_distance,
          });
        }
        setData(tempArr);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="App">
      <DataTable data={data} />
    </div>
  );
};

export default App;
