import style from "../../styles/tasks/TaskModal.module.scss";
import { Employee } from "../../types/employeeType";

type EmployeeModalProps = {
  employee: Employee;
  onClose: () => void;
};

function EmployeeModal({ employee, onClose }: EmployeeModalProps) {
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <h2>Employee Details</h2>
        <p>First Name: {employee.employee_firstname}</p>
        <p>Last Name: {employee.employee_surname}</p>
        <p>Email: {employee.employee_email}</p>
        <div className={style.modalBtnGroup}>
          <button onClick={onClose} className={style.btn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeModal;
