import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import Logo from "../../static/Logo.svg";
import LogOut from "../../static/Log-out.svg";

import UseLocalStorage from "../../hooks/UseLocalStorage.hook";

type navigationProps = {
  setToken: any;
};
const Navigation = ({ setToken }: navigationProps) => {
  const { deleteFromLocalStorage } = UseLocalStorage();
  return (
    <React.Fragment>
      <nav className={styles.sidebar}>
        <img alt="logo" className={styles.Logo} src={Logo} />

        <div className={styles.sidebarList}>
          <NavLink
            className={styles.sidebarListItem}
            activeClassName={styles.sidebarListItem__pressed}
            to="/contacts"
          >
            <i style={{ width: 28 }} className="far fa-user fa-2x"></i>
          </NavLink>
          <NavLink
            className={styles.sidebarListItem}
            activeClassName={styles.sidebarListItem__pressed}
            to="/chats/0?contactId=0"
          >
            <i style={{ width: 28 }} className="far fa-comment fa-2x"></i>
          </NavLink>
          <NavLink
            className={styles.sidebarListItem}
            activeClassName={styles.sidebarListItem__pressed}
            to="/settings"
          >
            <i style={{ width: 28 }} className="fas fa-cog fa-2x"></i>
          </NavLink>
        </div>
        <img
          alt="logOut"
          style={{cursor:"pointer"}}
          className={styles.LogOut}
          onClick={() => {
            deleteFromLocalStorage('token');
            setToken(false);
          }}
          src={LogOut}
        />
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
