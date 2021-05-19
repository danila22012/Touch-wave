import React, { useEffect } from "react";
import styles from "./styles.module.css";
import UseHttpReques from "../../hooks/UseHttpReques.hook";
import PageTitle from "../../components/PageTitle/PageTitle";
import MochAva from "../../static/MochAva.svg";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getAllDialogs } from "../../actions";

const Chats = (props: any) => {
  // importing api handler

  return (
    <div className={styles.chatsContainer}>
      <PageTitle title={"Chats"} />

      {props.dialogs.map((el:any) => {
        console.log(new Date(el.sentDate).getHours())
        return (
          //pass user id into query
          <NavLink
          key={el.id}
            className={styles.chatItemContainer}
            activeClassName={styles.chatItemContainerSelected}
            to={`/chats/${el.dialogId}?contactId=${el.dialogId}`}
          >
            <img
              className={styles.chatItemImg}
              src={el.image}
              alt="profileImage"
            />
            <div className={styles.chatItemDescr}>
              <div className={styles.chatItemInfo}>
                <p className={styles.chatItemName}>{el.nameuser}</p>
                <p style={{ fontSize: "0.8em" }}>{()=>{
                  console.log(Date.parse(el.sentDate));
                }}</p>
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
const mapStateToProps = (state: any) => ({
  dialogs: state.dialogReducer.dialogs,
});
const MapDispatchToProps = (dispatch: any) => ({
  getContacts: dispatch(getAllDialogs()),
});
export default connect(mapStateToProps, MapDispatchToProps)(Chats);
