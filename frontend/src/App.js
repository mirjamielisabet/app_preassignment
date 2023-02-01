import "./App.css";
import NavigationBar from "./components/NavigationBar";
import JourneyComponent from "./components/JourneyComponent";
import StationComponent from "./components/StationComponent";
import { Routes, Route, BrowserRouter } from "react-router-dom";

/**
 * The main file of the Application.
 *
 * Returns the navigation bar and by using React Router creates
 * the paths to the Journey and Station views.
 *
 * @returns the App with Browser router
 */
const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<JourneyComponent />} />
        <Route path="/stations" element={<StationComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
