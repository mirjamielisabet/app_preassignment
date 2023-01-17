import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NavigationBar = () => {
  return (
    <div className="links">
      <ul>
        <li>
          <Link to="/">Journeys</Link>
        </li>
        <li>
          <Link to="/stations">Stations</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
