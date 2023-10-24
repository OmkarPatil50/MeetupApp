import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./Pages/Landing";
import { EventDetails } from "./Pages/EventDetails";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/event/:eventID" element={<EventDetails />} />
      </Routes>
    </div>
  );
}
