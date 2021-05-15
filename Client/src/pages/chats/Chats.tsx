import { useEffect } from "react";
import styles from "./styles.module.css";
import UseHttpReques from "../../hooks/UseHttpReques.hook";
import PageTitle from "../../components/PageTitle/PageTitle";

const Chats = () => {
  // importing api handler
  const { getRecentChats } = UseHttpReques();
  useEffect(() => {
    // getRecentChats();
  }, []);

  return (
    <div className={styles.chatsContainer}>
      <PageTitle title={"Chats"} />
    </div>
  );
};
export default Chats;
