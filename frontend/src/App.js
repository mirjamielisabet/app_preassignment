import "./App.css";
import NavigationBar from "./components/NavigationBar";
import JourneyComponent from "./components/JourneyComponent";
import StationComponent from "./components/StationComponent";
import { Routes, Route, BrowserRouter } from "react-router-dom";

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
