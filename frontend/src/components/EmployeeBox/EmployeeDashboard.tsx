import EmployeeTable from "./EmployeeTable";
import style from "../../styles/Employee/employeeDashboard.module.scss";

function EmployeeDashboard() {
  return (
    <>
      <div className={style.employeeDashboardContainer}>
        <EmployeeTable />
      </div>
    </>
  );
}

export default EmployeeDashboard;
