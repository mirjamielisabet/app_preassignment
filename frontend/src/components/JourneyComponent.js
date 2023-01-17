import React from "react";
import { useEffect } from "react";
import "../App.css";
import JourneyDataTable from "./JourneyDataTable";

const JourneyComponent = (props) => {
  useEffect(() => {
    props.getJourneyData();
  }, [props]);

  return <JourneyDataTable data={props.data} />;
};

export default JourneyComponent;
