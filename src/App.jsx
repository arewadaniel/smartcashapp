import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Otp from "./pages/Otp";
import Pin from "./pages/Email";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pin" element={<Pin />} />
          <Route path="/otp" element={<Otp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
