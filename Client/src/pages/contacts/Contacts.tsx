import styles from "./styles.module.css";
import { connect } from "react-redux";

import PageTitle from "../../components/PageTitle/PageTitle";
import { getAllContacts } from "../../actions/";
import MochAva from "../../static/MochAva.svg";
import { NavLink } from "react-router-dom";

const Contacts = (props: any) => {
  console.log(props);
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
const mapStateToProps = (state: any) =>({
  contacts:state.contactsReducer.contacts
}) 
const MapDispatchToProps = (dispatch: any) => ({
  getContacts: dispatch(getAllContacts()),
});
export default connect(mapStateToProps, MapDispatchToProps)(Contacts);
