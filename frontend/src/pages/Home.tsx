import Styles from "../styles/home.module.scss";
import Overview from "../components/statistics/Overview";
import YourTeam from "../components/DashboardPageComponents/YourTeam";
import Statistics from "../components/statistics/StatisticsBox";
import RecentTasks from "../components/DashboardPageComponents/RecentTasks";

function Home() {
  return (
    <div className={Styles.container}>
      <div className={Styles.leftPanel}>
        <div className={Styles.longBox}>
          <Overview />
        </div>
        <div className={Styles.longBox}>
          <YourTeam />
        </div>
        <div className={Styles.longBox}>
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

export default Home;

