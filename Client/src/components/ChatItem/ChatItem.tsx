import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ContactProfile from "../ContactProfile/ContactProfile";
import MessageForm from "../MessageForm/MessageForm";
import { useChat } from "../../hooks/useChat.hook";
import styles from "./styles.module.css";

const ChatItem = () => {
  const { id } = useParams<{ id?: string }>();
  let query = new URLSearchParams(useLocation().search);
  const { sendMessage } = useChat();
  const [message, setMessage] = useState("");

  let contactId = query.get("contactId");

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };
  const submitChange = (e: any) => {
    if (message.length) {
      sendMessage(id, window.localStorage.getItem("token"), message);
      setMessage('')
    }
  };
  return (
    <div className={styles.ChatItemContainer}>
      {Number(id) === 0 ? (
        <div className={styles.ChatItemEmpty}>
          <span className={styles.ChatItemEmptyTitle}>
            Please, select a chat to start messaging
          </span>
        </div>
      ) : (
        <>
          <ContactProfile contactId={contactId} />
          <div className={styles.messageFormContainer}>
            <MessageForm dialogId={id} contactId={contactId} />
          </div>
          <div style={{ position: "absolute", width: "100%", bottom: "30px" }}>
            <div style={{ position: "relative", width: "100%" }}>
              {" "}
              <input
                placeholder="Message..."
                className={styles.messageInput}
                type="text"
                name="message"
                value={message}
                onChange={handleChange}
              />
              <span
                onClick={submitChange}
                style={{
                  position: "absolute",
                  right: "77px",
                  bottom: " 25px",
                  color: "#6E48ED",
                  fontSize: "1.2em",
                  cursor: "pointer",
                }}
              >
                Send
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatItem;
