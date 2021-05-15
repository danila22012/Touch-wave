import styles from "./styles.module.css";

type loginProps = {
  setToken: object;
};

const Login = ({ setToken }: loginProps) => {
  console.log(setToken);

  return (
    <div className={styles.loginBg}>
      <h1>loginBg</h1>
    </div>
  );
};
export default Login;
