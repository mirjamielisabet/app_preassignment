import React from "react";
import "../App.css";
import axios from "axios";
import JourneyDataTable from "./JourneyDataTable";
import CopyrightIcon from "@mui/icons-material/Copyright";

const JourneyComponent = () => {
  const [journeyData, setJourneyData] = React.useState([
    {
      id: "",
      departureTime: "",
      departureStation: "",
      returnTime: "",
      returnStation: "",
      duration: "",
      distance: "",
    },
  ]);
  const [isLoading, setLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
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
        setErrorMsg(error.response.status + " " + error.response.data);
        setLoading(false);
      });
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  } else if (errorMsg !== "") {
    return <div className="errormsg">{errorMsg}</div>;
  }
  return (
    <div className="journeyContainer">
      <JourneyDataTable data={journeyData} />
      <p className="footerText">
        Journey data{" "}
        <CopyrightIcon
          style={{ fontSize: "1em", position: "relative", top: "2.5px" }}
        />{" "}
        City Bike Finland
      </p>
    </div>
  );
};

export default JourneyComponent;
