import React from "react";
import { useEffect } from "react";
import "../App.css";
import StationDataTable from "./StationDataTable";

const StationComponent = (props) => {
  useEffect(() => {
    props.getStationData();
  }, [props]);

  if (props.data[0].stationName === "-") {
    return <div className="loading">Loading...</div>;
  }
  return <StationDataTable data={props.data} />;
};

export default StationComponent;
