import React from "react";
import "../App.css";
import Button from "@mui/material/Button";

const StationData = (props) => {
  if (props.data.stationName === "-") {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="dataTable">
      <h1>{props.data.stationName}</h1>

      <p>Address: {props.data.address}</p>
      <p>Capacity: {props.data.capacity}</p>
      <br />
      <Button onClick={props.backButtonClicked}>Back</Button>
    </div>
  );
};

export default StationData;
