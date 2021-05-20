import { useParams, useLocation } from "react-router-dom";
import ContactProfile from "../ContactProfile/ContactProfile";

import styles from "./styles.module.css";

const ChatItem = () => {
  const { id } = useParams<{ id?: string }>();
  let query = new URLSearchParams(useLocation().search);

  let contactId = query.get("contactId");
  console.log(contactId);
  

  return (
    
    <div className={styles.ChatItemContainer}>
      {Number(id) === 0 ? (
        <div className={styles.ChatItemEmpty}>
          <span className={styles.ChatItemEmptyTitle}>
            Please, select a chat to start messaging
          </span>
        </div>
      ) : (
        <ContactProfile contactId={contactId} />
      )}
    </div>
  );
};

export default ChatItem;
