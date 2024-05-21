import BestEmployees from "../components/EmployeeBox/BestEmployees";
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
          <BestEmployees />
        </div>
      </div>
    </>
  );
}

export default Employee;
