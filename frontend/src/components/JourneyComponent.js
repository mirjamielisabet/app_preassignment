import React from "react";
import "../App.css";
import axios from "axios";
import JourneyDataTable from "./JourneyDataTable";

const JourneyComponent = () => {
  const [journeyData, setJourneyData] = React.useState([
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
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getJourneyData();
  }, []);

  const getJourneyData = () => {
    setLoading(true);
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
        setLoading(false);
      });
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  return <JourneyDataTable data={journeyData} />;
};

export default JourneyComponent;
