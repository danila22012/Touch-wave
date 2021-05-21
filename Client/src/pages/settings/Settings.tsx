import React, { useEffect, useState } from "react";
import Cross from "../../static/Cross.svg";
import Check from "../../static/check.svg";
import AddPhoto from "../../static/AddPhoto.svg";
import styles from "./styles.module.css";
import UseGetUser from "../../hooks/UseGetUser.hook";

const Settings = () => {
  const { getMyUser,updateSettings } = UseGetUser();

  const [username, setUsername] = useState("");
  const [secondname, setSecondname] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getMyUser().then(({ data }) => {
      console.log(data);
      setUsername(data.nameuser);
      setSecondname(data.secondname);
      setImage(data.image);
    });
  }, []);
  const handleName = (e: any) => {
    setUsername(e.target.value);
  };
  const handleSecondName = (e: any) => {
    setSecondname(e.target.value);
  };
  const handleImage = (e: any) => {
    setImage(e.target.value);
  };
  const submitChanges = () => {
    updateSettings(username, secondname, image);
  };
  return (
    <div className={styles.settingsContainer}>
      <p className={styles.pageTitle}>Settings</p>
      <div className={styles.settingsHandler}>
        <label className={styles.settingsImg}>
          {" "}
          <img src={image} width="120px" alt="ikmg" />
          <img style={{position:"absolute", bottom:"-5px", right:"-7px"}} src={AddPhoto} alt="AddPhoto" />
          <input type="file" style={{display:"none"}} name="image" onChange={handleImage} />
        </label>
        <input
        className={styles.addUserModalInput}
          type="text"
          value={username}
          name="username"
          onChange={handleName}
        />
        <input
        className={styles.addUserModalInput}
          type="text"
          value={secondname}
          name="secondname"
          onChange={handleSecondName}
        />

        <img src={Check} style={{marginTop:"10px"}} alt="check" onClick={submitChanges} />
      </div>
    </div>
  );
};
export default Settings;
