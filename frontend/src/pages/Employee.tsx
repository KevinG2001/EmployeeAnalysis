import EmployeeStats from "../components/EmployeeBox/EmployeeStats";
import EmployeeDashboard from "../components/EmployeeBox/EmployeeTable";
import style from "../styles/Employee/EmployeePage.module.scss";

function Employee() {
  //This page is the employee page
  //It holds the list of employees and the "Your stats"
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
