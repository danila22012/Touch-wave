import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { useChat } from "../../hooks/useChat.hook";


const MessageFrom = ({ dialogId, contactId }) => {
  const { messages } = useChat(dialogId);

  

  useEffect(() => {
    console.log(messages);
  });
  return (
    <>

      {messages.map((el) => {

       console.log(el.userid);
       console.log(el.contactId);
        return (
          <div
            className={
              el.userid == contactId ? styles.floatLeft : styles.floatRight
            }
          >
            <p
              className={
                el.userid == contactId ? styles.floatLeftData : styles.floatRightData
              }
            >
               <span className={ el.userid == contactId ? styles.messageDateLeft : styles.messageDateRight}>{new Date(el.date).getHours()}:{new Date(el.date).getMinutes()}</span>
              {el.usermessage}
            </p>
           
          </div>
        );
      })}
    </>
  );
};
export default MessageFrom;
