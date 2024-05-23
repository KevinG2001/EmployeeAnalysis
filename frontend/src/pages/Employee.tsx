import EmployeeStats from "../components/EmployeeBox/EmployeeStats";
import EmployeeDashboard from "../components/EmployeeBox/EmployeeTable";
import style from "../styles/Employee/EmployeePage.module.scss";

function Employee() {
  return (
    <>
      <div className={style.employeeContainer}>
        {/* Left */}
        <div className={style.leftWrapper}>
          <EmployeeDashboard />
        </div>
        {/* Right */}
        <div className={style.rightWrapper}>
          <EmployeeStats />
        </div>
      </div>
    </>
  );
}

export default Employee;
