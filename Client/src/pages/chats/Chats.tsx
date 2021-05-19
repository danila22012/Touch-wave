import React,{ useEffect } from "react";
import styles from "./styles.module.css";
import UseHttpReques from "../../hooks/UseHttpReques.hook";
import PageTitle from "../../components/PageTitle/PageTitle";
import MochAva from "../../static/MochAva.svg";
import { NavLink } from "react-router-dom";

const mochup = [
  { id:'1', name: "olya", dataCreated:'6.42', img: MochAva, message:'sasasasdsadasdasdasdasdasakjshdkasdkjsadlkhsakjsaasdasdasdasdasasdasds ', isSeen:true},
  { id:'2', name: "pitya", dataCreated:'6.221', img: MochAva, message:'lmao', isSeen:false},
  { id:'3', name: "gaga", dataCreated:'6.1', img: MochAva, message:'asd', isSeen:true},
  { id:'4', name: "wawa", dataCreated:'6.432', img: MochAva, message:'Xd', isSeen:false},
  { id:'5', name: "yal", dataCreated:'6.2', img: MochAva, message:'asd', isSeen:true},
];


const Chats = () => {
  // importing api handler
  const { getRecentChats } = UseHttpReques();
  useEffect(() => {
    // getRecentChats();
  }, []);

  return (
    <div className={styles.chatsContainer}>
      <PageTitle title={"Chats"} />
      

      {mochup.map(el=>{
        return(
          <NavLink className={styles.chatItemContainer} activeClassName={ styles.chatItemContainerSelected}  to={`/chats/${el.id}`}>
           
              <img className={styles.chatItemImg} src={el.img} alt="profileImage"/>
              <div className={styles.chatItemDescr}>
                <div className={styles.chatItemInfo}>
                  <p className={styles.chatItemName}>{el.name}</p>
                  <p style={{fontSize:"0.8em"}}>{el.dataCreated}</p>
                </div>
                <div className={styles.chatItemStatus}>
                  <p className={styles.chatItemMessage}>{el.message}</p>
                  <p>{el.isSeen}</p>
                </div>
              </div>
           
          </NavLink>
        )
      })}
    </div>
  );
};
export default Chats;
