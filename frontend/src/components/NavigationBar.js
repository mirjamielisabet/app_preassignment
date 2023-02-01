import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

/**
 * Returns links that let the user navigate between views.
 * @returns the navigation bar component
 */
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
