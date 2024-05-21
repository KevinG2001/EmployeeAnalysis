import BestEmployees from "../components/EmployeeBox/BestEmployees";
import EmployeeDashboard from "../components/EmployeeBox/EmployeeTable";
import style from "../styles/tasks/TaskPage.module.scss";

function Employee() {
  return (
    <>
      <div className={style.taskContainer}>
        {/* Left */}
        <div className={style.leftWrapper}>
          <EmployeeDashboard />
        </div>
        {/* Right */}
        <div className={style.rightWrapper}>
          <BestEmployees />
        </div>
      </div>
    </>
  );
}

export default Employee;
