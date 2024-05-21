import AccountDetails from "../components/Settings/AccountDetails";
import style from "../styles/Settings/Settings.module.scss";

function Settings() {
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.btnWrapper}>
            <button className={style.btn} id={style.leftBtn}>
              Account Details
            </button>
            <button className={style.btn} id={style.leftBtn}>
              Personal Details
            </button>
          </div>
          <div className={style.content}>
            <AccountDetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
