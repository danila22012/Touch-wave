import styles from "./styles.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Logo from "../../static/Logo.svg";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  login: Yup.string().required("Required"),
});

type loginProps = {
  setToken: object;
};

const Login = ({ setToken }: loginProps) => {
  console.log(setToken);

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <img src={Logo} width="100px" alt="logo" />
          <p className={styles.loginHeaderTitle}>
            <span style={{ color: "#d20980" }}>Touch</span>
            <span style={{ color: "#6e48ed" }}>Wave</span>
          </p>
        </div>
        <Formik
          initialValues={{
            number: "",
            password: "",
            login: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.loginForm}>
              <Field
                name="number"
                placeholder="number"
                className={styles.loginFormInput}
              />
              <Field
                name="login"
                placeholder="login"
                className={styles.loginFormInput}
              />
              <Field
                placeholder="password"
                name="password"
                type="password"
                className={styles.loginFormInput}
              />

              <p className={styles.loginSwitch}>
              Already have an account? <span style={{color:'#6E48ED', cursor:"pointer", fontWeight:500}}>Sign in</span> 
              </p>

              <button type="submit" className={styles.loginFormSubmit}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
