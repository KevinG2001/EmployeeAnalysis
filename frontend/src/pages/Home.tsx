import Styles from "../styles/home.module.scss";
import Overview from "../components/DashboardPageComponents/Overview";
import YourTeam from "../components/DashboardPageComponents/YourTeam";
import Statistics from "../components/statistics/StatisticsBox";
import RecentTasks from "../components/DashboardPageComponents/RecentTasks";

function Home() {
  return (
    <div className={Styles.container}>
      <div className={Styles.leftPanel}>
        <div className={Styles.wideBox}>
          <Overview />
          <YourTeam />
        </div>
        <div className={Styles.box}>
          <Statistics />
          This is a long box and to use ChartJs
        </div>
      </div>
      <div className={Styles.rightPanel}>
        <div className={Styles.longBox}>
          <RecentTasks />
          This is for goals of the week
        </div>
      </div>
    </div>
  );
}

export default Home;
