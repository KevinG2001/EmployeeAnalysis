import { useEffect, useState } from "react";
import { Employee } from "../../types/employeeType";
import styles from "../../styles/Employee/EmployeeTable.module.scss";
import EmployeeModal from "./EmployeeModal";

function EmployeeTable() {
  const [employees, setEmployee] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const refreshEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

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
    } catch (error) {
      console.error("Error refreshing employees:", error);
    }
  };

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
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
                onClick={() => handleEmployeeClick(employee)}
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
      {isModalOpen && selectedEmployee && (
        <EmployeeModal employee={selectedEmployee} onClose={closeModal} />
      )}
    </>
  );
}

export default EmployeeTable;
