import Styles from "../styles/home.module.scss";
import Statistics from "../components/statistics/StatisticsBox";
import Overview from "../components/statistics/Overview";
import YourTeam from "../components/DashboardPageComponents/YourTeam";
import RecentTasks from "../components/DashboardPageComponents/RecentTasks";

function Dashboard() {
  // This page is the home page
  // It is the main dashboard of the website
  return (
    <>
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
    </>
  );
}

export default Dashboard;
