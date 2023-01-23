import React from "react";
import "../App.css";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";

const StationData = (props) => {
  if (props.data.stationName === "-") {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="dataTable">
      <Paper
        sx={{
          padding: 5,
          width: "50%",
        }}
      >
        <h1>{props.data.stationName}</h1>

        <p>Address: {props.data.address}</p>
        <p>Capacity: {props.data.capacity}</p>
        <p>
          Number of Journeys Starting from the Station:{" "}
          {props.startJourneyCount}
        </p>
        <p>Number of Journeys Ending at the Station: {props.endJourneyCount}</p>
        <br />
        <Button variant="outlined" onClick={props.closeButtonClicked}>
          Close
        </Button>
      </Paper>
    </div>
  );
};

export default StationData;
