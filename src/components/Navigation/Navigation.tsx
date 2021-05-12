import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import Logo from "../../static/Logo.svg";
import LogOut from "../../static/Log-out.svg";



const Navigation = () => {
  return (
    <React.Fragment>
      <nav className={styles.sidebar}>
        <img alt="logo" className={styles.Logo} src={Logo} />

        <div className={styles.sidebarList}>
          <NavLink className={styles.sidebarListItem} activeClassName={styles.sidebarListItem__pressed} to="/contacts">
            <i style={{ width: 28 }} className="far fa-user fa-2x"></i></NavLink>
          <NavLink className={styles.sidebarListItem} activeClassName={styles.sidebarListItem__pressed} to="/chats">
            <i style={{ width: 28 }} className="far fa-comment fa-2x"></i></NavLink>
          <NavLink className={styles.sidebarListItem} activeClassName={styles.sidebarListItem__pressed} to="/settings">
            <i style={{ width: 28 }} className="fas fa-cog fa-2x"></i></NavLink>

        </div>
        <img alt="logOut" className={styles.LogOut} src={LogOut} />
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
