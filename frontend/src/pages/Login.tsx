import Styles from "../styles/login/login.module.scss";

function login() {
  return (
    <>
      <div className={Styles.loginContainer}>
        <div className={Styles.loginWrapper}>
          <div className={Styles.title}>Sign In</div>
          <div className={Styles.usernameBox}>
            <input type="text" placeholder="Username" />
          </div>
          <div className={Styles.passwordBox}>
            <input type="text" placeholder="Password" />
          </div>
          <div className={Styles.btnBox}>
            <button>Sign In</button>
            <div>------ or ------</div>
            <button>Create Account</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default login;
