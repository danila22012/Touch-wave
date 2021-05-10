import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import Logo from "../../static/Logo.svg";
const Navigation = () => {
  return (
    <React.Fragment>
      <nav className={styles.nav_list}>
        <img src={Logo}/>
        
        <div>
          <NavLink to="/dialogs">dialogs</NavLink>
          <NavLink to="/settings">settings</NavLink>
          <NavLink to="/user">user</NavLink>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
