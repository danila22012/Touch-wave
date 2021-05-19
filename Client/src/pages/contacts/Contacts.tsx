import React, { useEffect } from "react";
import styles from "./styles.module.css";
import UseHttpReques from "../../hooks/UseHttpReques.hook";
import PageTitle from "../../components/PageTitle/PageTitle";
import axiosConfig from "../../helpers/axiosConfig";

const Contacts = () => {
  useEffect(() => {
    axiosConfig.get('/user/allUsers')
    console.log('opened asd');
    
  });

  return (
    //add contact 
    <div className={styles.contactsContainer}>
      <PageTitle title={"Contacts"} />
    </div>
  );
};
export default Contacts;
