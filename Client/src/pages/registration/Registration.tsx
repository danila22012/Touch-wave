import styles from "./styles.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Logo from "../../static/Logo.svg";
import ShowPass from "../../static/ShowPass.svg";
import { useState } from "react";

type LoginProps = {
  setIsLogin: any;
};
const SignupSchema = Yup.object().shape({
  number: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(10, "phone must have 10 numbers")
    .required("A phone number is required"),
  login: Yup.string().required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Registration = ({ setIsLogin }: LoginProps) => {
  const [isPassShown, setIsPassShown] = useState("password");

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
            Name: "",
            SurName: "",
            login: "",
            password: "",
          }}
          // validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.loginForm}>
              <div className={styles.inputContainer}>
                <Field
                  name="Name"
                  placeholder="Name"
                  className={styles.loginFormInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <Field
                  name="SurName"
                  placeholder="Surname"
                  className={styles.loginFormInput}
                />
              </div>

              <div className={styles.inputContainer}>
                {errors.number && touched.number ? (
                  <div className={styles.inputError}>{errors.number}</div>
                ) : null}
                <Field
                  name="number"
                  placeholder="Number"
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
                  name="Password"
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
