import React from "react";
import "../App.css";
import axios from "axios";
import StationData from "./StationData";
import StationList from "./StationList";
import CopyrightIcon from "@mui/icons-material/Copyright";

/**
 * A component containing the city bike station view of the Application.
 *
 * @returns the view of the city bike stations
 */
const StationComponent = () => {
  const [stationNames, setStationNames] = React.useState([
    {
      id: "",
      stationName: "",
    },
  ]);
  const [stationData, setStationData] = React.useState({
    stationName: "",
    address: "",
    capacity: "",
  });
  const [startJourneyCount, setStartJourneyCount] = React.useState(0);
  const [endJourneyCount, setEndJourneyCount] = React.useState(0);
  const [showStationInfo, setShowStationInfo] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState("");

  /**
   * Retrieves the station names and ids by using Axios.
   * Saves the data to the state.
   */
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
        setLoading(false);
      })
      .catch((error) => {
        setErrorMsg(error.response.status + " " + error.response.data);
        setLoading(false);
      });
  };

  /**
   * Retrieves information about a single station based on a station id.
   * The data is saved to the state.
   * @param {number} id - The id of the station
   */
  const getStationData = (id) => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/stations/${id}`)
      .then((result) => {
        setStationData({
          stationName: result.data[0].name,
          address: result.data[0].osoite,
          capacity: result.data[0].kapasiteetti,
        });
        setLoading(false);
      })
      .catch((error) => {
        setErrorMsg(error.response.status + " " + error.response.data);
        setLoading(false);
      });
  };

  /**
   * Retrieves the count of the starting journeys based on a station id.
   * The count is saved to the state.
   * @param {number} id - The id of the station
   */
  const getStartJourneys = (id) => {
    axios
      .get(`http://localhost:8080/journey_data/start/${id}`)
      .then((result) => {
        setStartJourneyCount(result.data[0].startCount);
      })
      .catch((error) => {
        setErrorMsg(error.response.status + " " + error.response.data);
      });
  };

  /**
   * Retrieves the count of the ending journeys based on a station id.
   * The count is saved to the state.
   * @param {number} id - The id of the station
   */
  const getEndJourneys = (id) => {
    axios
      .get(`http://localhost:8080/journey_data/end/${id}`)
      .then((result) => {
        setEndJourneyCount(result.data[0].endCount);
      })
      .catch((error) => {
        setErrorMsg(error.response.status + " " + error.response.data);
      });
  };

  /**
   * Calls getStationNames function after the first render.
   */
  React.useEffect(() => {
    getStationNames();
  }, []);

  /**
   * Handles a click of a station list item.
   *
   * By setting showStationInfo to true, shows the single station info view.
   * The id of the clicked station name is passed on to the data retrieving functions.
   * @param {number} id - The id of the station
   */
  const onClick = (id) => {
    getStationData(id);
    getStartJourneys(id);
    getEndJourneys(id);
    setShowStationInfo(true);
  };

  /**
   * Handles a click of a close button.
   *
   * Hides single station info view and shows station list by setting showStationInfo to false.
   */
  const closeButtonClicked = () => {
    setShowStationInfo(false);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  } else if (errorMsg !== "") {
    return <div className="errormsg">{errorMsg}</div>;
  }
  return (
    <div className="stationContainer">
      {showStationInfo ? (
        <StationData
          data={stationData}
          closeButtonClicked={closeButtonClicked}
          startJourneyCount={startJourneyCount}
          endJourneyCount={endJourneyCount}
        />
      ) : (
        <StationList data={stationNames} onClick={onClick} />
      )}
      <br />
      <p className="footerText">
        Helsinki Region Transport’s (HSL) city bicycle stations data{" "}
        <CopyrightIcon
          style={{ fontSize: "1em", position: "relative", top: "2.5px" }}
        />{" "}
        <a href="https://www.avoindata.fi/data/en_GB/dataset/hsl-n-kaupunkipyoraasemat">
          Helsingin seudun liikenne (HSL)
        </a>
      </p>
    </div>
  );
};

export default StationComponent;
