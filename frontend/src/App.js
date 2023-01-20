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
      id: 0,
      departureTime: "-",
      departureStation: "-",
      returnTime: "-",
      returnStation: "-",
      duration: 0,
      distance: 0,
    },
  ]);
  const [stationNames, setStationNames] = useState([
    {
      id: 0,
      stationName: "-",
    },
  ]);
  const [stationData, setStationData] = useState({
    stationName: "-",
    address: "-",
    capacity: 0,
  });
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
            id: result.data[i].id,
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

  const getStationNames = () => {
    let tempArr = [];

    axios
      .get("http://localhost:8080/stations")
      .then((result) => {
        for (let i = 0; i < result.data.length; i++) {
          tempArr.push({
            id: result.data[i].id,
            stationName: result.data[i].name,
          });
        }
        setStationNames(tempArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStationData = (id) => {
    axios
      .get(`http://localhost:8080/stations/${id}`)
      .then((result) => {
        setStationData({
          stationName: result.data[0].name,
          address: result.data[0].osoite,
          capacity: result.data[0].kapasiteetti,
        });
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
              stationData={stationData}
              stationNames={stationNames}
              getStationNames={getStationNames}
              getStationData={getStationData}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
