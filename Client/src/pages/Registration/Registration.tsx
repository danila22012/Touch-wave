import { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import useAuth from "../../hooks/UseAuth.hook";
import UseLocalStorage from "../../hooks/UseLocalStorage.hook";

import Logo from "../../static/Logo.svg";
import ShowPass from "../../static/ShowPass.svg";
import styles from "./styles.module.css";


type LoginProps = {
  setIsLogin: any;
  setToken:any,
};


const Registration = ({ setIsLogin ,setToken}: LoginProps) => {
  const [isPassShown, setIsPassShown] = useState("password");

  const { signUp } = useAuth();
  const { setToLocalStorage } = UseLocalStorage();

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
            phonenumber: "",
            username: "",
            secondname: "",
            login: "",
            password: "",
          }}
        
          onSubmit={(values) => {
            signUp(values).then(({data})=>{
              setToLocalStorage(data.token)
              document.location.reload();
              setToken(true)
            });
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.loginForm}>
              <div className={styles.inputContainer}>
                <Field
                  name="username"
                  placeholder="Username"
                  className={styles.loginFormInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <Field
                  name="secondname"
                  placeholder="Secondname"
                  className={styles.loginFormInput}
                />
              </div>

              <div className={styles.inputContainer}>
                {errors.phonenumber && touched.phonenumber ? (
                  <div className={styles.inputError}>{errors.phonenumber}</div>
                ) : null}
                <Field
                  name="phonenumber"
                  placeholder="Phonenumber"
                  className={styles.loginFormInput}
                />
              </div>
              <div className={styles.inputContainer}>
                {errors.login && touched.login ? (
                  <div className={styles.inputError}>{errors.login}</div>
                ) : null}
                <Field
                  name="login"
                  placeholder="Login"
                  className={styles.loginFormInput}
                />
              </div>
              <div className={styles.inputContainer}>
                {errors.password && touched.password ? (
                  <div className={styles.inputError}>{errors.password}</div>
                ) : null}
                <Field
                  placeholder="password"
                  name="password"
                  type={isPassShown}
                  className={styles.loginFormInput}
                />
                <img
                  className={styles.inputShowPass}
                  onClick={() => {
                    if (isPassShown == "password") setIsPassShown("text");
                    else setIsPassShown("password");
                  }}
                  src={ShowPass}
                  alt="ShowPass"
                />
              </div>
              <p className={styles.loginSwitch}>
                Already have an account?
                <span
                  style={{
                    color: "#6E48ED",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={() => {
                    setIsLogin((prevState: any) => !prevState);
                  }}
                >
                  Sign in
                </span>
              </p>
              <button type="submit" className={styles.loginFormSubmit}>
                Registration
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Registration;
