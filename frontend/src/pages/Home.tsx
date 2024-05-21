import Styles from "../styles/home.module.scss";
import Statistics from "../components/statistics/StatisticsBox";
import Overview from "../components/statistics/Overview";
import YourTeam from "../components/DashboardPageComponents/YourTeam";
import RecentTasks from "../components/DashboardPageComponents/RecentTasks";

function Home() {
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

export default Home;
