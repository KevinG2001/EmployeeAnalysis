import { useEffect, useState } from "react";
import { Employee } from "../../types/employeeType";
import styles from "../../styles/Employee/EmployeeTable.module.scss";

function EmployeeDashboard() {
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
  const goToEmployeeProfile = (employeeID: number) => {
    window.location.href = `/profile/${employeeID}`;
  };

  useEffect(() => {
    refreshEmployees();

    const interval = setInterval(refreshEmployees, 5 * 60 * 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <table className={styles.listContainer}>
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Surname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                onClick={() => goToEmployeeProfile(employee.employee_id)}
                key={employee.employee_id}
              >
                <td>{employee.employee_firstname}</td>
                <td>{employee.employee_surname}</td>
                <td>{employee.employee_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployeeDashboard;
