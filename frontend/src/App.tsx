import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import EmployeeProfile from "./pages/EmployeeProfile";
import Navbar from "./components/GlobalComps/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  }, []);

  return (
    <Router>
      <div id="root">
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile/:employeeId" element={<EmployeeProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
