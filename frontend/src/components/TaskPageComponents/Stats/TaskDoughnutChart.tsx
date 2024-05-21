import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS } from "chart.js";
import useTaskStats from "../../../util/taskStatsUtil";

ChartJS.register(ArcElement);

function TaskBarChart() {
  const { stats } = useTaskStats("amountOfTasks");

  const { assignedTaskCount, upComingTaskCount, totalTaskCount } = stats;

  const data = {
    labels: ["Assigned Tasks", "Upcoming Tasks", "Total Tasks"],
    datasets: [
      {
        label: "Tasks",
        data: [assignedTaskCount, upComingTaskCount, totalTaskCount],
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

export default TaskBarChart;
