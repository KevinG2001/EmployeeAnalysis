import EmployeeTable from "./EmployeeTable";
import style from "../../styles/tasks/taskDashboard.module.scss";

function EmployeeDashboard() {
  return (
    <>
      <div className={style.taskDashboardContainer}>
        <EmployeeTable />
      </div>
    </>
  );
}

export default EmployeeDashboard;
