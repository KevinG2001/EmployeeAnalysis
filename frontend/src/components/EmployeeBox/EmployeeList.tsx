import React, { useEffect, useState } from "react";
import Styles from "../../styles/BoxCards/tasks.module.scss";
import listStyles from "../../styles/BoxCards/tableStyle.module.scss";
import { Employee } from "../../types/employeeType";

function EmployeeDetails() {
  const [employees, setEmployee] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      //Fetchs the tasks from backend
      const response = await fetch(
        "http://localhost:5000/api/employees/listEmployees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      setEmployee(data.employees);
      setIsLoading(false);
    } catch (error) {
      console.error("Error refreshing employees:", error);
    }
  };

  // Timer to refresh tasks every 5 minutes and automatically refresh it when mounted
  useEffect(() => {
    refreshEmployees();

    const interval = setInterval(refreshEmployees, 5 * 60 * 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={Styles.container}>
        {isLoading ? (
          <p>Loading...</p>
        ) : employees.length === 0 ? (
          <p>No employees available</p>
        ) : (
          <table className={listStyles.listContainer}>
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Surname</th>
                <th>Employee Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr>
                  {/* <td>{employee.employee_pic}</td> */}
                  <td>{employee.employee_firstname}</td>
                  <td>{employee.employee_surname}</td>
                  <td>{employee.employee_email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default EmployeeDetails;
