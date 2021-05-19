import styles from "./styles.module.css";

import EditIcon from "../../static/EditIcon.svg";
import CleanIcon from "../../static/CleanIcon.svg";

const ProfileModal = () => {
  return (
    <div className={styles.ContextMenu}>
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
  );
};

export default ProfileModal;
