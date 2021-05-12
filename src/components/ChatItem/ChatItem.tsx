import React from "react";
import { useHistory, useParams } from "react-router-dom";

const ChatItem = () => {
  const id: string = useParams();

  console.log(id);

  return <h1>Chat Item</h1>;
};

export default ChatItem;
