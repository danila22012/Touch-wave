import styles from "./styles.module.css";
import { connect } from "react-redux";

import PageTitle from "../../components/PageTitle/PageTitle";
import { getAllContacts } from "../../actions/";
import MochAva from "../../static/MochAva.svg";
import { NavLink } from "react-router-dom";

const Contacts = (props: any) => {
  return (
    //add contact
    <div className={styles.contactsContainer}>
      <PageTitle title={"Contacts"} />
      <div className={styles.contactsList}>
        {props.contacts.map((el:any) => {
          return (
            <NavLink to={`/chats/${el.dialogId}`} className={styles.contactsListItem}>
              <img
                className={styles.contactsListItemImg}
                src={MochAva}
                alt="ava"
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
const mapStateToProps = (state: any) => state;
const MapDispatchToProps = (dispatch: any) => ({
  getContacts: dispatch(getAllContacts()),
});
export default connect(mapStateToProps, MapDispatchToProps)(Contacts);
