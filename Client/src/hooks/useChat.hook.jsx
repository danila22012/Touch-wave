import { useEffect, useRef, useState } from "react";
// получаем класс IO
import io from "socket.io-client";
import { nanoid } from "nanoid";
// наши хуки
import { useLocalStorage } from "./UseLocalStorageChat.hook";
import { useBeforeUnload } from "./useBeforeUnload.hook";

// адрес сервера
// требуется перенаправление запросов - смотрите ниже
const SERVER_URL = "http://localhost:5000";

// хук принимает название комнаты
export const useChat = (dialogId) => {
  const [messages, setMessages] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.emit("join", { room: dialogId });

    socketRef.current.emit("message:get", dialogId);

    socketRef.current.on("messages", (messages) => {
      setMessages(messages);
    });
    return () => {
      // при размонтировании компонента выполняем отключение сокета
      socketRef.current.disconnect();
    };
  }, [dialogId]);
  const sendMessage = (dialogId, token, message) => {
    socketRef.current.emit("message:add", dialogId, token, message);
  };

  return { messages, sendMessage };
};
