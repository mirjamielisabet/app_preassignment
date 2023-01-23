import React from "react";
import { useEffect } from "react";
import "../App.css";
import StationData from "./StationData";
import StationList from "./StationList";

const StationComponent = (props) => {
  const [showStationInfo, setShowStationInfo] = React.useState(false);

  useEffect(() => {
    props.getStationNames();
  }, [props]);

  const onClick = (id) => {
    props.getStationData(id);
    props.getStartJourneys(id);
    props.getEndJourneys(id);
    setShowStationInfo(true);
  };

  const closeButtonClicked = () => {
    setShowStationInfo(false);
  };

  if (props.stationNames[0].stationName === "-") {
    return <div className="loading">Loading...</div>;
  } else if (showStationInfo === true) {
    return (
      <StationData
        data={props.stationData}
        closeButtonClicked={closeButtonClicked}
        startJourneyCount={props.startJourneyCount}
        endJourneyCount={props.endJourneyCount}
      />
    );
  }
  return <StationList data={props.stationNames} onClick={onClick} />;
};

export default StationComponent;
