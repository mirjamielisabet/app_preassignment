import React from "react";
import "../App.css";
import axios from "axios";
import StationData from "./StationData";
import StationList from "./StationList";

const StationComponent = () => {
  const [stationNames, setStationNames] = React.useState([
    {
      id: 0,
      stationName: "-",
    },
  ]);
  const [stationData, setStationData] = React.useState({
    stationName: "-",
    address: "-",
    capacity: 0,
  });
  const [startJourneyCount, setStartJourneyCount] = React.useState(0);
  const [endJourneyCount, setEndJourneyCount] = React.useState(0);
  const [showStationInfo, setShowStationInfo] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  const getStationNames = () => {
    setLoading(true);
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
        console.log(error);
        setLoading(false);
      });
  };

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
        console.log(error);
        setLoading(false);
      });
  };

  const getStartJourneys = (id) => {
    axios
      .get(`http://localhost:8080/journey_data/start/${id}`)
      .then((result) => {
        setStartJourneyCount(result.data[0].startCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEndJourneys = (id) => {
    axios
      .get(`http://localhost:8080/journey_data/end/${id}`)
      .then((result) => {
        setEndJourneyCount(result.data[0].endCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getStationNames();
  }, []);

  const onClick = (id) => {
    getStationData(id);
    getStartJourneys(id);
    getEndJourneys(id);
    setShowStationInfo(true);
  };

  const closeButtonClicked = () => {
    setShowStationInfo(false);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  } else if (showStationInfo === true) {
    return (
      <StationData
        data={stationData}
        closeButtonClicked={closeButtonClicked}
        startJourneyCount={startJourneyCount}
        endJourneyCount={endJourneyCount}
      />
    );
  }
  return <StationList data={stationNames} onClick={onClick} />;
};

export default StationComponent;
