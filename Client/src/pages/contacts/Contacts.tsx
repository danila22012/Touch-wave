import styles from "./styles.module.css";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

import PageTitle from "../../components/PageTitle/PageTitle";
import { addContact, getAllContacts, deleteContact } from "../../actions/";

import addUser from "../../static/addUser.svg";
import Cross from "../../static/Cross.svg";
import Check from "../../static/check.svg";
import Delete from "../../static/Delete.svg";
import { NavLink } from "react-router-dom";

import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root") as HTMLImageElement);

const Contacts = (props: any) => {
  console.log(props);

  const [isShwn, setIsShown] = useState(false);
  const [inputNumber, setInputNumber] = useState("");

  let subtitle: any;
  const openModal = () => {
    setIsShown(true);
  };

  const closeModal = () => {
    setIsShown(false);
  };
  const handleChange = (e: any) => {
    let value = e.target.value;
    let res = setInputNumber(value);
  };
  const handleSubmit = () => {
    props.addContact(inputNumber);
    setIsShown(false);
  };
  const handleDeleting = (id: any) => {
    deleteContact(id);
  };
  return (
    <div className={styles.contactsContainer}>
      <PageTitle title={"Contacts"} />
      <div onClick={openModal} className={styles.addUserContainer}>
        <img src={addUser} alt="addUser" style={{ marginRight: "20px" }} />{" "}
        <span>Add Contact</span>
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={isShwn}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={styles.addUserModalContainer}
        overlayClassName={styles.addUserModalOverlay}
      >
        <header className={styles.addUserModalHeader}>
          {" "}
          <span>Add contact</span>{" "}
          <img
            onClick={closeModal}
            style={{ cursor: "pointer" }}
            src={Cross}
            alt="exit"
          />
        </header>
        <form className={styles.addUserModalForm}>
          <input
            placeholder="Enter number of user"
            className={styles.addUserModalInput}
            type="text"
            onChange={handleChange}
          />
        </form>
        <div className={styles.addUserModalSubmit}>
          {" "}
          <img onClick={handleSubmit} src={Check} alt="submit" />
        </div>
      </Modal>
      <div className={styles.contactsList}>
        {props.contacts.map((el: any) => {
          return (
            <div className={styles.contactsListItem}>
              <NavLink
                className={styles.contactsListItem}
                to={`/chats/${el.dialogId}?contactId=${el.id}`}
              >
                <img
                  className={styles.contactsListItemImg}
                  src={el.image}
                  alt="ava"
                  width="60"
                  height="60"
                />{" "}
                <p className={styles.contactsListItemName}>{el.nameuser}</p>
                <p className={styles.contactsListItemName}>{el.secondname}</p>
              </NavLink>

              <img
                src={Delete}
                onClick={() => {
                  props.deleteContact(el.id);
                }}
                width="30"
                style={{
                  position: "absolute",
                  right: "30px",
                  cursor: "pointer",
                }}
                alt="deleteContact"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  contacts: state.contactsReducer.contacts,
});
const MapDispatchToProps = (dispatch: any) => ({
  getContacts: dispatch(getAllContacts()),
  addContact: (payload: any) => {
    dispatch(addContact(payload));
  },
  deleteContact: (payload: any) => {
    dispatch(deleteContact(payload));
  },
});
export default connect(mapStateToProps, MapDispatchToProps)(Contacts);
