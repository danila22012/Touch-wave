import React from "react";
import styles from "./styles.module.css";
import UseHttpReques from "../../hooks/UseHttpReques.hook";
import PageTitle from "../../components/PageTitle/PageTitle";

const Contacts = () => {
  return (
    <div className={styles.contactsContainer}>
      <PageTitle title={"Contacts"} />
      
    </div>
  );
};
export default Contacts;
