import { useState } from "react";
import styles from "./styles.module.css";
import MochAva from "../../static/MochAva.svg";
import EditIcon from "../../static/EditIcon.svg";
import CleanIcon from "../../static/CleanIcon.svg";
import BackIcon from "../../static/BackIcon.svg";
import CleanGrey from "../../static/CleanGrey.svg";
import EditGrey from "../../static/EditGrey.svg";
import ContextMenu from "../../static/ContextMenu.svg";
import { NavLink } from "react-router-dom";

type ContactProfileProps = {
  contactId: any;
};

const ContactProfile = ({ contactId }: ContactProfileProps) => {
  const [contextMenu, setContextMenu] = useState(false);

  return (
    <div className={styles.ContactProfileContainer}>
      <div className={styles.ContactProfileUser}>
        <NavLink to="/chats/0">
          {" "}
          <img src={BackIcon} style={{ marginRight: "20px" }} alt="BackIcon" />
        </NavLink>

        <img src={MochAva} width="60" alt="ava" />
        <p className={styles.ContactProfileUserName}>Test Name${contactId}</p>
      </div>

      <div className={styles.ContactProfileBtns}>
        <div className={styles.ContactProfileBtnsEdit}>
          <img src={EditIcon} alt="Edit" />
          <span style={{ color: " #6E48ED", marginLeft: "10px" }}>
            Edit contact
          </span>
        </div>
        <div className={styles.ContactProfileBtnsClean}>
          <img src={CleanIcon} alt="Clean" />
          <span style={{ color: " #D20980", marginLeft: "10px" }}>
            Clean chat
          </span>
        </div>
      </div>
      <div className={styles.mobileDotsMenu} >
        <img
          src={ContextMenu}
          alt="ContextMenu"
          onClick={() => setContextMenu(prevstate=>!prevstate)}
        />
        {contextMenu ? (
          <div className={styles.ProfileContextMenu}>
            <div style={{display:'flex', marginBottom:'10px'}}>
              <img src={EditGrey} alt="Edit" />
              <span style={{  marginLeft: "10px" ,whiteSpace:"nowrap"}}>
                Edit contact
              </span>
            </div>
            <div style={{display:'flex'}}>
              <img src={CleanGrey} alt="Clean" />
              <span style={{ marginLeft: "10px" ,whiteSpace:"nowrap"}}>
                Clean chat
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ContactProfile;

// {
//     userId:"value"
//     conerseId:"value"
// }