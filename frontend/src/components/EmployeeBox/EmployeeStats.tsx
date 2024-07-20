import style from "../../styles/Employee/EmployeeStats.module.scss";
import useEmployeeStats from "../../util/employeeStatsUtil";
import EmployeeDoughnutChart from "./Stats/EmployeeDoughnutChart";

function EmployeeStats() {
  const employeeId = 1;
  const { stats }: any = useEmployeeStats("doughnutStats", employeeId);
  console.log(stats);
  return (
    <>
      <div className={style.employeeStatContainer}>
        Your Stats
        <EmployeeDoughnutChart />
        <div className={style.textWrapper}>
          <div>Efficency: {stats.overallEfficiency}%</div>
          <div>Produxxxxctivity: </div>
          <div>Timeleness: {stats.timeliness}%</div>
          <div>Attendance: </div>
          <div>Quality of Work: </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeStats;
