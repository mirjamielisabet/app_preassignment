import { useEffect, useState } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import JourneyComponent from "./components/JourneyComponent";
import StationComponent from "./components/StationComponent";
import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  const [journeyData, setJourneyData] = useState([
    {
      departureTime: "-",
      departureStation: "-",
      returnTime: "-",
      returnStation: "-",
      duration: "-",
      distance: "-",
    },
  ]);
  const [stationData, setStationData] = useState([
    {
      stationName: "-",
      address: "-",
      capacity: "-",
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
        setJourneyData(tempArr);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStationData = () => {
    let tempArr = [];

    axios
      .get("http://localhost:8080/stations")
      .then((result) => {
        for (let i = 0; i < result.data.length; i++) {
          tempArr.push({
            stationName: result.data[i].name,
            address: result.data[i].osoite,
            capacity: result.data[i].kapasiteetti,
          });
        }
        setStationData(tempArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <JourneyComponent
              data={journeyData}
              getJourneyData={getJourneyData}
            />
          }
        />
        <Route
          path="/stations"
          element={
            <StationComponent
              data={stationData}
              getStationData={getStationData}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
