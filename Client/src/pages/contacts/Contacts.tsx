import styles from "./styles.module.css";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

import PageTitle from "../../components/PageTitle/PageTitle";
import { getAllContacts } from "../../actions/";

import addUser from "../../static/addUser.svg";
import Cross from "../../static/Cross.svg";
import { NavLink } from "react-router-dom";

import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root") as HTMLImageElement);

const Contacts = (props: any) => {
  console.log(props);

  const [isShwn, setIsShown] = useState(false);

  let subtitle: any;
  const openModal = () => {
    setIsShown(true);
  };

  const closeModal = () => {
    setIsShown(false);
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
        <header className={styles.addUserModalHeader}> <span >Add contact</span> <img onClick={closeModal} style={{cursor:'pointer'}} src={Cross} alt="exit"/></header>
       
        <form>
          
        </form>
      </Modal>
      <div className={styles.contactsList}>
        {props.contacts.map((el: any) => {
          return (
            <NavLink
              to={`/chats/${el.dialogId}?contactId=${el.id}`}
              className={styles.contactsListItem}
            >
              <img
                className={styles.contactsListItemImg}
                src={el.image}
                alt="ava"
                width="60"
                height="60"
              />
              <p className={styles.contactsListItemName}>{el.nameuser}</p>
              <p className={styles.contactsListItemName}>{el.secondname}</p>
            </NavLink>
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
});
export default connect(mapStateToProps, MapDispatchToProps)(Contacts);
