import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS } from "chart.js";
import useEmployeeStats from "../../../util/employeeStatsUtil";
import Efficency from "../../statistics/StatisticsBox";

ChartJS.register(ArcElement);

function EmployeeDoughnutChart() {
  const employeeId = 1;
  const { stats }: any = useEmployeeStats("doughnutStats", employeeId);

  const data = {
    labels: ["Efficency", "Timeliness"],
    datasets: [
      {
        label: "Stats",
        data: [stats.overallEfficiency, stats.timeliness],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <>
      <div>
        <Doughnut data={data} />
      </div>
    </>
  );
}

export default EmployeeDoughnutChart;
