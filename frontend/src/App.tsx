import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import EmployeeProfile from "./pages/EmployeeProfile";
import Navbar from "./components/GlobalComps/Navbar";
import Task from "./pages/Task";
import Employees from "./pages/Employee";

function App() {
  return (
    <Router>
      <div id="root">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<WithNavbarRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

function WithNavbarRoutes() {
  return (
    <>
      <Navbar />
      <div id="root">
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/account" element={<Settings />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/profile/:employeeId" element={<EmployeeProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
