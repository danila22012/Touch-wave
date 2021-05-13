import { useParams } from "react-router-dom";

const ChatItem = () => {
  const { id } = useParams<{ id?: string }>();
  return <h1>{id}</h1>;
};

export default ChatItem;
