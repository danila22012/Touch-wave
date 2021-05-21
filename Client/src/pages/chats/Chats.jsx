import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

import PageTitle from "../../components/PageTitle/PageTitle";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getAllDialogs, joinConstant } from "../../actions";
import { useChat } from "../../hooks/useChat.hook";

const Chats = (props) => {
  // importing api handler
  const { socketRef } = useChat();
  useEffect(() => {
    console.log(props);
    if (props.joinStatic == 0) {
      console.log('JOINED');
      props.dialogs.map((el) => {
        socketRef.current.emit("join", { room: el.dialogId });
      });
      props.setStatic();
    }
  },[]);

  return (
    <div className={styles.chatsContainer}>
      <PageTitle title={"Chats"} />

      {props.dialogs.map((el) => {
        return (
          //pass user id into query
          <NavLink
            key={el.dialogId}
            className={styles.chatItemContainer}
            activeClassName={styles.chatItemContainerSelected}
            to={`/chats/${el.dialogId}?contactId=${el.id}`}
          >
            <img
              className={styles.chatItemImg}
              src={el.image}
              alt="profileImage"
            />
            <div className={styles.chatItemDescr}>
              <div className={styles.chatItemInfo}>
                <p className={styles.chatItemName}>{el.nameuser}</p>
                <p style={{ fontSize: "0.8em" }}>
                  {() => {
                    console.log(Date.parse(el.sentDate));
                  }}
                </p>
              </div>
              <div className={styles.chatItemStatus}>
                <p className={styles.chatItemMessage}>{el.lastMessage}</p>
                <p>{el.isSeen}</p>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
const mapStateToProps = (state) => ({
  dialogs: state.dialogReducer.dialogs,
  joinStatic: state.joinReducer.joinStatic,
});
const MapDispatchToProps = (dispatch) => ({
  getContacts: dispatch(getAllDialogs()),
  setStatic: () => dispatch({ type: "SET_JOIN_CONSTANT" }),
});
export default connect(mapStateToProps, MapDispatchToProps)(Chats);
