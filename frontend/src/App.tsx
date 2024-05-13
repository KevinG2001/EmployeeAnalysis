import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import EmployeeProfile from "./pages/EmployeeProfile";
import Navbar from "./components/GlobalComps/Navbar";

function App() {
  return (
    <Router>
      <div id="root">
        <Navbar />
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
