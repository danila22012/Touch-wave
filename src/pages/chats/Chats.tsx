import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import UseHttpReques from "../../hooks/UseHttpReques.hook";
import Search from "../../components/Search/Search";
import axios from "axios";

const Chats = () => {
  // importing api handler
  const { getRecentChats } = UseHttpReques();
  useEffect(() => {
    getRecentChats();
  }, []);

  return (
    <React.Fragment>
      <Search title={"Chats"} />
      <div className={styles.chatsContainer}></div>
    </React.Fragment>
  );
};
export default Chats;
