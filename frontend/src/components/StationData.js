import React from "react";
import "../App.css";
import { Divider, Paper, Typography, Stack, Button } from "@mui/material";

const StationData = (props) => {
  return (
    <div className="stationData">
      <Paper
        sx={{
          padding: 5,
        }}
      >
        <Typography sx={{ paddingBottom: 3 }} variant="h4">
          {props.data.stationName}
        </Typography>

        <Stack
          direction="row"
          justifyContent={"space-between"}
          sx={{ paddingBottom: 0.5 }}
        >
          <Typography>Address:</Typography>
          <Typography>{props.data.address}</Typography>
        </Stack>

        <Divider />

        <Stack
          direction="row"
          justifyContent={"space-between"}
          sx={{ paddingBottom: 0.5, paddingTop: 0.5 }}
        >
          <Typography>Capacity:</Typography>
          <Typography>{props.data.capacity}</Typography>
        </Stack>

        <Divider />

        <Stack
          direction="row"
          justifyContent={"space-between"}
          sx={{ paddingBottom: 0.5, paddingTop: 0.5 }}
        >
          <Typography>Number of Journeys Starting from the Station:</Typography>
          <Typography>{props.startJourneyCount}</Typography>
        </Stack>

        <Divider />

        <Stack
          direction="row"
          justifyContent={"space-between"}
          sx={{ paddingTop: 0.5 }}
        >
          <Typography>Number of Journeys Ending at the Station:</Typography>
          <Typography>{props.endJourneyCount}</Typography>
        </Stack>

        <br />
        <Button variant="outlined" onClick={props.closeButtonClicked}>
          Close
        </Button>
      </Paper>
    </div>
  );
};

export default StationData;
