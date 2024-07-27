import Styles from "../styles/home.module.scss";
import Overview from "../components/DashboardPageComponents/Overview";
import YourTeam from "../components/DashboardPageComponents/YourTeam";
import Statistics from "../components/statistics/StatisticsBox";
import RecentTasks from "../components/DashboardPageComponents/RecentTasks";

function Dashboard() {
  return (
    <div className={Styles.container}>
      <div className={Styles.leftPanel}>
        <div className={Styles.wideBox}>
          <Overview />
          <YourTeam />
        </div>
        <div className={Styles.box}>
          <Statistics />
        </div>
      </div>
      <div className={Styles.rightPanel}>
        <div className={Styles.longBox}>
          <RecentTasks />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


