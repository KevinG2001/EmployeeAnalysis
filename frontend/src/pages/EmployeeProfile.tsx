import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeProfile = () => {
  const { employeeId } = useParams();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/api/employees/getEmployeeData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ employeeId }),
          }
        );
        const data = await response.json();
        if (data.success) {
          setEmployee(data.employee[0]);
        } else {
          console.error("Error fetching employee data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Employee Profile</h1>
      <div>Employee Firstname: {employee.employee_firstname}</div>
      <div>Employee Surname: {employee.employee_surname}</div>
      <div>Employee ID: {employee.employee_id}</div>
    </div>
  );
};

export default EmployeeProfile;
